import mysql.connector
database = mysql.connector.connect(host="localhost",user="root",password="",database="crawl")
dbcursor = database.cursor()
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

def select_question(session_id):
    dbcursor.execute("SELECT * FROM game WHERE session_id = "+str(session_id))
    return dbcursor.fetchall()
