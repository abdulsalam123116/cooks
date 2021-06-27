from collections import defaultdict
import random, re, sys, numpy as np, mysql.connector
from queue import Queue
from threading import Thread
from difflib import SequenceMatcher,get_close_matches
from lib.clean_data import clean_ingredient
database = mysql.connector.connect(host="localhost",user="root",password="",database="crawl",charset="utf8",use_unicode=True)
# dbcursor = database.cursor()
dbcursor = database.cursor(buffered=True)

def select_query_raw(sql):
    dbcursor.execute(sql)
    return dbcursor.fetchall()

def select_random_row(table,type):
    dbcursor.execute("SELECT * FROM "+str(table)+" WHERE type = '"+str(type)+"' ORDER BY RAND() LIMIT 1")
    return dbcursor.fetchone()

def select_random_type():
    dbcursor.execute("SELECT * FROM nlp_type_search ORDER BY RAND() LIMIT 1")
    return dbcursor.fetchone()

def count_categories_foods():
    dbcursor.execute("SELECT COUNT(DISTINCT(name))  FROM cooks_ml")
    return int(dbcursor.fetchone()[0])

def select_query(table,limit = 0):
    if(limit == 0):
        dbcursor.execute("SELECT * FROM "+table)
    else:
        dbcursor.execute("SELECT * FROM "+table+" LIMIT "+str(limit))
    return dbcursor.fetchall()

def update_query(table,id,key,value,is_string = True):
    if is_string :
        sql = "UPDATE "+table+" SET "+key+" = '"+str(value)+"' WHERE id = "+str(id)
    else:
        sql = "UPDATE "+table+" SET "+key+" = "+str(value)+" WHERE id = "+str(id)
    try:
        dbcursor.execute(sql)
        database.commit()
        return True        
    except Exception as e:
        return False

def insert_question_table(question,accepted):
    sql = "INSERT INTO questions (question,accepted) VALUES (%s,%s)"
    dbcursor.execute(sql, (question,str(accepted)))
    database.commit()
    return dbcursor.lastrowid

def select_question(session_id,answer = -1):
    if answer == -1:
        dbcursor.execute("SELECT * FROM game_reports WHERE session_id = "+str(session_id))
    else:
        dbcursor.execute("SELECT * FROM game_reports WHERE session_id = "+str(session_id)+" AND answer = "+str(answer))
    return dbcursor.fetchall()

    
def insert_game_table(session_id,question,answer,question_id):
    sql = "INSERT INTO game_reports (session_id,question,answer,question_id) VALUES (%s,%s,%s,%s)"
    dbcursor.execute(sql, (str(session_id),question,str(answer),str(question_id)))
    database.commit()
    return dbcursor.lastrowid

def insert_players_table(session_id):
    sql = "INSERT INTO players (session_id) VALUES ("+str(session_id)+")"
    dbcursor.execute(sql)
    database.commit()
    return dbcursor.lastrowid

def get_question_pattern(id):
    dbcursor.execute("SELECT question,value FROM nlp_type_search WHERE id = "+str(id))
    result = dbcursor.fetchone()
    return [re.sub('\s*([}?])\s*', r'\1', result[0]).replace("{}?", "(.*?)\?"),result[1]]

def get_question_next_pattern(id,session_id):
    dbcursor.execute("SELECT COUNT(id) FROM game_reports WHERE question_id = 1 AND answer = 0 AND session_id = "+str(session_id))
    count = dbcursor.fetchone()[0]
    if count > 0 :
        dbcursor.execute("SELECT question,value FROM nlp_type_search WHERE id <> 1")
    else:
        dbcursor.execute("SELECT question,value FROM nlp_type_search WHERE id <> "+str(id))
    result = dbcursor.fetchone()
    return [re.sub('\s*([}?])\s*', r'\1', result[0]),result[1]]

def select_names_contains_foods(foods):
    dbcursor.execute("SELECT GROUP_CONCAT(DISTINCT name SEPARATOR '|') AS name FROM nlp_search WHERE value REGEXP '"+str(foods)+"'")
    return dbcursor.fetchone()[0].split("|")

def get_available_categories():
    dbcursor.execute("SELECT GROUP_CONCAT(DISTINCT value SEPARATOR '|') AS value FROM nlp_type_search")
    return dbcursor.fetchone()[0].split("|")    

def select_names_not_contains_foods(foods):
    dbcursor.execute("SELECT DISTINCT GROUP_CONCAT(DISTINCT name SEPARATOR '|') AS name FROM cooks_ml WHERE name NOT IN ( SELECT DISTINCT name AS name FROM cooks_ml WHERE value REGEXP '"+str(foods)+"')")
    return dbcursor.fetchone()[0].split("|")

def get_filter_data(yes_arrays,no_arrays):
    
    yes_keys    = [i for i in yes_arrays if yes_arrays[i]!=yes_arrays.default_factory()]
    no_keys     = [i for i in no_arrays if no_arrays[i]!=no_arrays.default_factory()]
    yes_length  = len(yes_keys)
    no_length   = len(no_keys)
    yes_temp    = []
    no_temp     = []
    sql_pattern = "SELECT DISTINCT name FROM cooks_ml WHERE type = '{}' {} "
    if yes_length > 0:
        for i in range(0,yes_length):
            if i != (yes_length-1):
                yes_temp.append( sql_pattern.format(yes_keys[i],' '.join([" AND value REGEXP '"+ ele+"'" for ele in yes_arrays[yes_keys[i]]]))+ " AND name IN({}) ")
            else:
                yes_temp.append( sql_pattern.format(yes_keys[i],' '.join([" AND value REGEXP '"+ ele+"'" for ele in yes_arrays[yes_keys[i]]])))
        
        i = yes_length - 1
        yes_sql = yes_temp[i]
        i -= 1
        while i >= 0:
            yes_sql = yes_temp[i].format(yes_sql)
            i -= 1
    if no_length > 0:
        for i in range(0,no_length):
            if i != (no_length-1):
                no_temp.append( sql_pattern.format(no_keys[i]," AND value REGEXP '"+'|'.join(no_arrays[no_keys[i]])+"'")+ " OR name IN({}) ")
            else:
                no_temp.append( sql_pattern.format(no_keys[i]," AND value REGEXP '"+'|'.join(no_arrays[no_keys[i]])+"'"))
        
        i = no_length - 1
        no_sql = no_temp[i]
        i -= 1
        while i >= 0:
            no_sql = no_temp[i].format(no_sql)
            i -= 1
    if yes_length > 0 and no_length > 0:
        sql = yes_sql+" AND name NOT IN("+no_sql+")"    
    if yes_length > 0 and no_length == 0:
        sql = yes_sql
    if yes_length == 0 and no_length > 0:
        sql = "SELECT DISTINCT name FROM cooks_ml WHERE name NOT IN("+no_sql+")"
    dbcursor.execute(sql)
    return dbcursor.fetchall()

def count_filter_data(yes_arrays,no_arrays):
    if len(yes_arrays) == 0 :
        return len(no_arrays)
    yes_arrays = [ "value REGEXP '"+ ele+"'" for ele in yes_arrays]
    dbcursor.execute("SELECT DISTINCT name FROM cooks_ml WHERE "+" AND ".join(yes_arrays))
    if  len(no_arrays) > 0:
        temp = []
        for ele in dbcursor.fetchall():
            if ele[0] in no_arrays:
                temp.append(ele[0])
        return len(temp)
    return len(dbcursor.fetchall())


def select_random_question(yes_arrays,no_arrays,dont_know_arrays):
    # yes_arrays       = ["'" + ele + "'" for ele in yes_arrays]
    no_arrays        = ["'" + ele + "'" for ele in no_arrays]
    dont_know_arrays = ["'" + ele + "'" for ele in dont_know_arrays]
    
    yes_sql = "1"
    if len(yes_arrays) > 0:
        yes_sql = "value NOT REGEXP  '"+str('|'.join(yes_arrays))+"'"
        
    # no_sql = ""
    # if len(no_arrays) > 0:
    #     # dbcursor.execute("SELECT DISTINCT name FROM nlp_search WHERE value NOT IN ( "+str(','.join(no_arrays))+")")
    #     # no_names  = ["'" + ele[0] + "'" for ele in dbcursor.fetchall()]
    #     no_sql = "AND name NOT IN ( "+str(','.join(no_arrays))+")"

    dont_know_sql = ""
    if len(dont_know_arrays) > 0:
        dont_know_sql = " AND value NOT REGEXP  '"+str('|'.join(yes_arrays))+"'"
    if  len(no_arrays) > 0:
        dbcursor.execute("SELECT type,value,name FROM cooks_ml WHERE "+str(yes_sql)+" "+str(dont_know_sql)+" AND name IN ("+','.join(no_arrays)+") ORDER BY RAND() LIMIT 1")
    else:
        dbcursor.execute("SELECT type,value,name FROM cooks_ml WHERE "+str(yes_sql)+" "+str(dont_know_sql)+" ORDER BY RAND() LIMIT 1")
    # dbcursor.execute("SELECT type,value,name FROM nlp_search WHERE "+str(yes_sql)+" "+str(dont_know_sql)+" ORDER BY RAND() LIMIT 1")
    # if  len(no_arrays) > 0:
        # temp = []
        # for ele in dbcursor.fetchall():
        #     if ele[2] in no_arrays:
        #         temp.append([ele[0],ele[1]])
        # return temp[0]
    
    return dbcursor.fetchone()

def get_question_regex_pattern_by_type(type):
    dbcursor.execute("SELECT question FROM nlp_type_search WHERE value = '"+str(type)+"'")
    return re.sub('\s*([}?])\s*', r'\1', dbcursor.fetchone()[0]).replace("{}?", "(.*?)\?")

def get_question_format_pattern_by_type(type):
    dbcursor.execute("SELECT id,question FROM nlp_type_search WHERE value = '"+str(type)+"'")
    return dbcursor.fetchone()

def select_contains_foods(foods):
    dbcursor.execute("SELECT DISTINCT value FROM nlp_search WHERE value REGEXP '"+str(foods)+"'")
    values  = [ ele[0]  for ele in dbcursor.fetchall()]
    return values


def select_random_question_update(names,yes_queries,dont_know_queries,next_pattern,no_queries):
    
    gains       = []
    value_gains = []
    yes_keys    = [i for i in yes_queries if yes_queries[i]!=yes_queries.default_factory()]
         
    if len(yes_keys) == 0:
        
        # for name in names:
        temp   = []
        # key = next_pattern
        result = []
        # dbcursor.execute("SELECT GROUP_CONCAT(DISTINCT value SEPARATOR '&') AS value FROM cooks_ml WHERE name IN ("+','.join(names)+") AND type = '"+str(key)+"' ")
        # result = dbcursor.fetchone()

        # while len(result) == 0:
            # yes_keys = [x for x in yes_keys if x != next_pattern]
            # key = yes_keys.pop()
        key = "ingredients"
        dbcursor.execute("SELECT GROUP_CONCAT(DISTINCT value SEPARATOR '&') AS value FROM cooks_ml WHERE name IN ("+','.join(names)+") AND type = '"+str(key)+"' ")
        result = dbcursor.fetchone() 
            
        # weight_values   = []
        
        values = result[0].split("&")
        if key == "ingredients":
            temp = []
            for value in values:
                food_after_clean = clean_ingredient(str(value))
                if len(food_after_clean) > 0 and food_after_clean not in temp:
                    temp.append(food_after_clean)
            values = temp
        # for value in values:
        #     item = max_value_question_with_yes_no(value,yes_queries,no_queries)
        #     weight_values.append(item)
        # max_value = max(weight_values)
        # max_index = weight_values.index(max_value)
        if len(values) == 0:
            return []
        max_value = max_value_question_with_yes_no(values,yes_queries,no_queries)
        
        return [key,max_value[0],max_value[1]]
        value_gains.append([result[1],values[max_index]])
        gains.append(max_value)
        
        max_value = max(gains)
        max_index = gains.index(max_value)
        return value_gains[max_index]
    
    if not(next_pattern in yes_keys):
        # for name in names:
        temp        = []
        dbcursor.execute("SELECT GROUP_CONCAT(DISTINCT value SEPARATOR '&') AS value FROM cooks_ml WHERE name IN ("+','.join(names)+") AND type = '"+next_pattern+"'")
        result = dbcursor.fetchone()
        yes_keys = [x for x in yes_keys if x != next_pattern]
        key = next_pattern
        
        for item in result[0].split("&"):
            temp.append(item)        
        if len(dont_know_queries[key]) > 0 :
            searchs = dont_know_queries[key]
            search  = '|'.join(searchs).lower()
            heroRegex = re.compile (search)
            temp_delete = []
            for i in range(0,len(temp)):
                if not(heroRegex.search(temp[i].lower()) is None ):
                    temp_delete.append(temp[i])
            if len(temp_delete) > 0:
                for i in range(0,len(temp)):
                    temp = [x for x in temp if x != temp_delete[i]]
        if len(temp) > 0:
            # weight_values   = []
            if key == "ingredients":
                values = []
                for value in temp:
                    food_after_clean = clean_ingredient(str(value))
                    if len(food_after_clean) > 0 and food_after_clean not in values:
                        values.append(food_after_clean)
            else:
                values = temp
                temp = []
                for value in values:
                    if value not in yes_queries[key]:
                        temp.append(value)
                values = temp
            # for value in values:
            #     item = max_value_question_with_yes_no(value,yes_queries,no_queries)
            #     weight_values.append(item)
            # max_value = max(weight_values)
            # max_index = weight_values.index(max_value)
        if len(values) == 0:
            return []
        max_value = max_value_question_with_yes_no(values,yes_queries,no_queries)
        return [key,max_value[0],max_value[1]]
        value_gains.append([key,values[max_index]])
        gains.append(max_value)
        max_value = max(gains)
        max_index = gains.index(max_value)
        return value_gains[max_index]
    
    key = next_pattern
    # for name in names:
    temp        = []
    dbcursor.execute("SELECT GROUP_CONCAT(DISTINCT value SEPARATOR '&') AS value FROM cooks_ml WHERE name IN ("+','.join(names)+") AND type = '"+next_pattern+"'")
    # dbcursor.execute("SELECT value FROM cooks_ml WHERE name = '"+name[0]+"' AND type = '"+next_pattern+"' ORDER BY RAND() LIMIT 1")
    result = dbcursor.fetchone()   
    yes_keys = [x for x in yes_keys if x != next_pattern]
    
    if len(result) == 0 :
        key = yes_keys.pop()
        dbcursor.execute("SELECT value FROM cooks_ml WHERE name IN ("+','.join(names)+") AND type = '"+key+"' ORDER BY RAND() LIMIT 1")
        result = dbcursor.fetchone()
    if len(result) > 0:
        reject_temp = []        
        searchs = yes_queries[key]
        search = '|'.join(searchs).lower()
        heroRegex = re.compile(search)
        for item in result[0].split("&"):
            if not(heroRegex.search(item.lower()) is None ) :
                reject_temp.append(item)
        for item in result[0].split("&"):
            if item not in reject_temp:
                temp.append(item)
    if len(dont_know_queries[key]) > 0 :
        
        searchs = dont_know_queries[key]
        search = '|'.join(searchs).lower()
        heroRegex = re.compile (search)
        temp_delete = []
        for i in range(0,len(temp)):
            if not(heroRegex.search(temp[i].lower())is None ):
                temp_delete.append(temp[i])
                # temp.pop(i)
        if len(temp_delete) > 0:
            for i in range(0,len(temp)):
                temp = [x for x in temp if x != temp_delete[i]]
    # weight_values   = []
    if key == "ingredients":
        values = []
        for value in temp:
            food_after_clean = clean_ingredient(str(value))
            if len(food_after_clean) > 0 and food_after_clean not in values:
                values.append(food_after_clean)
    else:
        values = temp
        temp = []
        for value in values:
            if value not in yes_queries[key]:
                temp.append(value)
        values = temp



    if len(values) == 0:
        return []
        
    max_value = max_value_question_with_yes_no(values,yes_queries,no_queries)
    return [key,max_value[0],max_value[1]]
    # for value in values:
    #     item = max_value_question_with_yes_no(value,yes_queries,no_queries)
    #     weight_values.append(item)
    # max_value = max(weight_values)
    # max_index = weight_values.index(max_value)
    # value_gains.append([key,values[max_index]])
    # gains.append(max_value)
    return [key,values[max_index]]
        # return [key,random.sample(temp,1)[0]]
    max_value = max(gains)
    max_index = gains.index(max_value)
    return value_gains[max_index]
def max_category_question(yes_arrays,no_arrays,dont_know_arrays):
    yes_keys    = [i for i in yes_arrays if yes_arrays[i]!=yes_arrays.default_factory()]
    no_keys     = [i for i in no_arrays if no_arrays[i]!=no_arrays.default_factory()]
    yes_length  = len(yes_keys)
    no_length   = len(no_keys)
    yes_temp    = []
    no_temp     = []
    sql_pattern = "SELECT DISTINCT name FROM cooks_ml WHERE type = '{}' {} "
    if yes_length > 0:
        for i in range(0,yes_length):
            if i != (yes_length-1):
                yes_temp.append( sql_pattern.format(yes_keys[i],' '.join([" AND value REGEXP '"+ ele+"'" for ele in yes_arrays[yes_keys[i]]]))+ " AND name IN({}) ")
            else:
                yes_temp.append( sql_pattern.format(yes_keys[i],' '.join([" AND value REGEXP '"+ ele+"'" for ele in yes_arrays[yes_keys[i]]])))
        i = yes_length - 1
        yes_sql = yes_temp[i]
        i -= 1
        while i >= 0:
            yes_sql = yes_temp[i].format(yes_sql)
            i -= 1
            
    if no_length > 0:
        for i in range(0,no_length):
            if i != (no_length-1):
                no_temp.append( sql_pattern.format(no_keys[i]," AND value REGEXP '"+'|'.join(no_arrays[no_keys[i]])+"'")+ " OR name IN({}) ")
            else:
                no_temp.append( sql_pattern.format(no_keys[i]," AND value REGEXP '"+'|'.join(no_arrays[no_keys[i]])+"'"))
        
        i = no_length - 1
        no_sql = no_temp[i]
        i -= 1
        while i >= 0:
            no_sql = no_temp[i].format(no_sql)
            i -= 1
    if yes_length > 0 and no_length > 0:
        sql = yes_sql+" AND name NOT IN("+no_sql+") "    
    if yes_length > 0 and no_length == 0:
        sql = yes_sql
    if yes_length == 0 and no_length > 0:
        sql = "SELECT DISTINCT name FROM cooks_ml WHERE name NOT IN("+no_sql+") AND type = 'category' "
    # sql = "SELECT value , COUNT(value) AS count_value FROM cooks_ml WHERE type = 'category' GROUP BY value ORDER BY count_value DESC LIMIT 1"            
    # sql = sql.replace('DISTINCT name', 'value , COUNT(value) AS count_value', 1)
    
    if len(yes_arrays["category"]) > 0:
        sql = "SELECT value , COUNT(value) AS count_value  FROM cooks_ml WHERE name IN ({}) AND type = 'category' {} GROUP BY value ORDER BY COUNT(value) DESC".format(sql,"AND value REGEXP '"+'|'.join(yes_arrays["category"])+"'")
    else:
        sql = "SELECT value , COUNT(value) AS count_value  FROM cooks_ml WHERE name IN ({}) AND type = 'category'  GROUP BY value ORDER BY COUNT(value) DESC".format(sql)
    dbcursor.execute(sql)
    result = dbcursor.fetchone()
    temp = []
    
    # result = [x[0] for x in results ]
    # for item in result:
    #     matched = 0
    #     item = item.split("&")
    #     for i in item:
    #         for j in yes_arrays["category"]:
    #             if i == j :
    #                 matched += 1
    #     if matched > 0:            
    #         temp.append(item)
    
    # for item in result:
    accept_category = [value.replace("(.*)", " ") for value in yes_arrays["category"]]
    dont_know_category = [value.replace("(.*)", " ") for value in dont_know_arrays["category"]]
    item = result[0].split("&")
    for i in item:
        if i not in accept_category and i not in dont_know_category:
            temp.append(i)
             
    temp = list(dict.fromkeys(temp))     
    # temp = [x for x in temp if (x not in yes_arrays["category"]) and (x not in dont_know_arrays["category"])]
    # yes_categories = ["(^"+x+"$)" for x in yes_arrays["category"] ]
    if len(temp) > 0 :
        return [temp[0],result[1]]
    else:
        return []

def max_value_question(word):
    sql = "SELECT COUNT(value) AS count_value FROM cooks_ml WHERE value REGEXP '"+str(word)+"' ORDER BY count_value DESC LIMIT 1"
    dbcursor.execute(sql)
    return dbcursor.fetchone()[0]

def max_value_question_with_yes_no(words,yes_arrays,no_arrays):
    yes_keys    = [i for i in yes_arrays if yes_arrays[i]!=yes_arrays.default_factory()]
    no_keys     = [i for i in no_arrays if no_arrays[i]!=no_arrays.default_factory()]
    yes_length  = len(yes_keys)
    no_length   = len(no_keys)
    yes_temp    = []
    no_temp     = []
    sql_pattern = "SELECT DISTINCT name FROM cooks_ml WHERE type = '{}' {} "
    if yes_length > 0:
        for i in range(0,yes_length):
            if i != (yes_length-1):
                yes_temp.append( sql_pattern.format(yes_keys[i],' '.join([" AND value REGEXP '"+ ele+"'" for ele in yes_arrays[yes_keys[i]]]))+ " AND name IN({}) ")
            else:
                yes_temp.append( sql_pattern.format(yes_keys[i],' '.join([" AND value REGEXP '"+ ele+"'" for ele in yes_arrays[yes_keys[i]]])))
        i = yes_length - 1
        yes_sql = yes_temp[i]
        i -= 1
        while i >= 0:
            yes_sql = yes_temp[i].format(yes_sql)
            i -= 1
            
    if no_length > 0:
        for i in range(0,no_length):
            if i != (no_length-1):
                no_temp.append( sql_pattern.format(no_keys[i]," AND value REGEXP '"+'|'.join(no_arrays[no_keys[i]])+"'")+ " OR name IN({}) ")
            else:
                no_temp.append( sql_pattern.format(no_keys[i]," AND value REGEXP '"+'|'.join(no_arrays[no_keys[i]])+"'"))
        
        i = no_length - 1
        no_sql = no_temp[i]
        i -= 1
        while i >= 0:
            no_sql = no_temp[i].format(no_sql)
            i -= 1
    if yes_length > 0 and no_length > 0:
        sql = yes_sql+" AND name NOT IN("+no_sql+")"    
        # sql = yes_sql+" AND name NOT IN("+no_sql+") AND value REGEXP '"+str(word)+"' ORDER BY count_value DESC LIMIT 1"    
    if yes_length > 0 and no_length == 0:
        sql = yes_sql
    if yes_length == 0 and no_length > 0:
        sql = "SELECT DISTINCT name FROM cooks_ml WHERE name NOT IN("+no_sql+")" 
    if yes_length == 0 and no_length == 0:
        sql = "SELECT DISTINCT name FROM cooks_ml" 
        # sql = "SELECT DISTINCT name FROM cooks_ml WHERE name NOT IN("+no_sql+") AND value REGEXP '"+str(word)+"' ORDER BY count_value DESC LIMIT 1"
    # sql = "SELECT COUNT(value) AS count_value FROM cooks_ml WHERE value REGEXP '"+str(word)+"' ORDER BY count_value DESC LIMIT 1"
    ws =["SUM( CASE WHEN value REGEXP '"+word.replace(" ", "(.*)")+"' THEN 1 ELSE 0 END) "  for word in words]
    # ws =["SUM( CASE WHEN value REGEXP '"+word.replace(" ", "(.*)")+"' THEN 1 ELSE 0 END) AS "+word.replace(" ", "_")  for word in words]

    try:
        sql = sql.replace('DISTINCT name', ','.join(ws), 1)
        dbcursor.execute(sql)
        result =  dbcursor.fetchone()
    except:
        print(sql)
    # columns = [col[0].replace("_", " ") for col in dbcursor.description]
    # rows = defaultdict(list)
    # for index in range(0,len(result)):
    #     rows[columns[index]] = int(result[index])
    # return rows
    max_value = max(result)
    max_index = result.index(max_value)
    return [words[max_index],max_value]

def test():
    sql = "SELECT GROUP_CONCAT(DISTINCT value SEPARATOR '&') AS value ,COUNT(id) FROM cooks_ml WHERE type = 'ingredients'"
    dbcursor.execute(sql)
    temp = dbcursor.fetchone()[0].split("&")
    
    # columns = [col[0] for col in dbcursor.description]
    # rows = [dict(zip(columns, row)) for row in dbcursor.fetchall()][0]
    values = []
    for value in temp:
        food_after_clean = clean_ingredient(str(value))
        if len(food_after_clean) > 0 and food_after_clean not in values:
            values.append(food_after_clean)

    values = np.array_split(values, 100)
    temp = []
    for item in values:
        temp.append(list(item))
    results = [{} for x in values]

    # return dbcursor.lastrowid
    for i in range(len(temp)):
        max_value = max_value_question_with_yes_no(temp[i],{},{})
        for x in max_value:
            sql = "INSERT INTO trains (type, name, value) VALUES('ingredients', '"+str(x)+"', "+str(max_value[x])+") ON DUPLICATE KEY UPDATE value= "+str(max_value[x])
            dbcursor.execute(sql)
            database.commit()
            print(str(x) + "  A : A  " + str(max_value[x]))
    return results

    