import mysql.connector
database = mysql.connector.connect(host="localhost",user="root",password="",database="crawl")
dbcursor = database.cursor()
def select_query(table,limit = 0):
    if(limit == 0):
        dbcursor.execute("SELECT * FROM "+table+" WHERE is_crawled = 0")
    else:
        
        dbcursor.execute("SELECT * FROM "+table+" WHERE is_crawled = 0 LIMIT "+str(limit))
    return dbcursor.fetchall()
def select_query_without_crawled(table,limit = 0,custom_id = 0):
    if(limit == 0 and custom_id == 0):
        dbcursor.execute("SELECT * FROM "+table)
    if(limit > 0 and custom_id == 0):
            dbcursor.execute("SELECT * FROM "+table+"  LIMIT "+str(limit))
    if(limit == 0 and custom_id > 0):
        dbcursor.execute("SELECT * FROM "+table+"  WHERE id > "+str(custom_id))
    if(limit > 0 and custom_id > 0):
        dbcursor.execute("SELECT * FROM "+table+"  WHERE id > "+str(custom_id)+"  LIMIT "+str(limit))
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

def insert_cooks(name,category,image,multi_ingredients,multi_preparing_cooks):
    sql = "INSERT INTO cooks (name,category,image,multi_ingredients,multi_preparing_cooks) VALUES (%s,%s,%s,%s,%s)"
    dbcursor.execute(sql, (name,category,image,multi_ingredients,multi_preparing_cooks))
    database.commit()
    return dbcursor.lastrowid

def insert_cook_ingredients(cook_id,value,sort,title_sort):
    sql = "INSERT INTO cook_ingredients (cook_id,value,sort,title_sort) VALUES (%s,%s,%s,%s)"
    dbcursor.execute(sql, (cook_id,value,int(sort),title_sort) )
    database.commit()
    return dbcursor.lastrowid

def insert_cook_preparing(cook_id,value,sort,title_sort):
    sql = "INSERT INTO cook_preparing (cook_id,value,sort,title_sort) VALUES (%s,%s,%s,%s)"
    dbcursor.execute(sql, (cook_id,value,int(sort),title_sort) )
    database.commit()
    return dbcursor.lastrowid

def insert_cook_informations(cook_id,name,value):
    sql = "INSERT INTO cook_informations (cook_id,name,value) VALUES (%s,%s,%s)"
    dbcursor.execute(sql, (cook_id,name,value) )
    database.commit()
    return dbcursor.lastrowid

def insert_to_crawled(text,title,image,category):
    sql = "INSERT INTO to_crawled (text,title,image,category) VALUES (%s,%s,%s,%s)"
    dbcursor.execute(sql, (text,title,image,category) )
    database.commit()
    return dbcursor.lastrowid
