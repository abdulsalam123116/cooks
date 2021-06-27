from datetime import datetime
from random import choices, randint
from flask import Flask,request,redirect,url_for,render_template,jsonify,sessions
from lib.clean_data import clean_ingredients,clean_ingredient
from lib.dbconnect import *
import pandas,re,json,uuid, time
from difflib import SequenceMatcher
import warnings
import base64,socket,os
warnings.filterwarnings("ignore", 'This pattern has match groups')
app = Flask(__name__)
app.config.from_pyfile('config.py')

hostname = socket.gethostname()   
IPAddr   = socket.gethostbyname(hostname)  
foods             = pandas.read_csv("data/test_clean.csv") 
# print("Your Computer Name is:" + hostname)   
# print("Your Computer IP Address is:" + IPAddr)  

# @app.route('/')
# def hello():
#     return 'Hello World!'

# http://127.0.0.1:3000/new_session
@app.route('/new_session')
def new_session():
    # if len(select_question(1)) == 0 :
    # print(foods.sample()[0]['value'])
    # queries.append(clean_ingredient(foods.sample()[0]['value'])) 
    # foods                = pandas.read_csv("data/test_clean.csv")
    data                 = foods['value']
    frontaddr            = base64.b64encode(bytes(IPAddr, encoding='utf8'))
    session_id           = time.time() * 1000
    new_player_id        = insert_players_table(session_id)
    choice_question      = "category"  if randint(0,100) % 2 == 0 else "ingredients"
    question_category    = "Is your food considered a {}?"
    question_ingredients = "Does your food contain {}?"
    question             = question_ingredients if choice_question == "ingredients" else question_category
    # return jsonify(foods.sample().values.tolist()[0][2])
    return jsonify({
        "completion"       : "OK",
        "channel"          : 0,
        "session"          : "196",
        "signature"        : "2025596072",
        "challenge_auth"   : uuid.uuid5(uuid.uuid4(),"matched"+str(new_player_id)),
        "question"         : question.format(clean_ingredient(data.sample().values.tolist()[0])),
        "answers"          : [{"answer": "Yes"},{"answer": "No"},{"answer": "Don't know"}],
        "step"             : "0",
        "progression"      : "0.00000",
        "questionid"       : "0",
        "infogain"         : "0"})

# http://127.0.0.1:3000/answer_api
@app.route('/answer_api',methods=["GET","POST"])
def post_answer():
    if request.method == 'POST':
        # return jsonify(str(time.time() * 1000)) #for session ID
        # return jsonify(str(datetime.now().timestamp()).partition(".")[0]) #for session ID
        # return str() for full count classes
        # return str(session_id/20310) for progressing
        # return str(uuid.uuid5(uuid.uuid4(),"abd")) #for unique value
        # return jsonify({'ip': request.remote_addr}), 200
        question                     = request.json['question']
        session_id                   = request.json['session_id']
        answer                       = request.json['answer']
        pattern_question_category    = "Is your food considered a (.*?)\?"
        pattern_question_ingredients = "Does your food contain (.*?)\?"
        choice_question   = "ingredients"  if question[:4] == "Does" else "category"
        pattern           = pattern_question_ingredients if choice_question == "ingredients" else pattern_question_category
        yes_queries       = []
        yes_queries_full  = []
        no_queries        = []
        dont_know_queries = []
        food              = re.search(pattern, question).group(1).strip()
        # foods             = pandas.read_csv("data/test_clean.csv")
        count_categories  = len(list(dict.fromkeys(foods['name'].values.tolist())))
        insert_game_table(session_id,question,answer)
        if len(select_question(session_id)) == 0 :
            if answer == 0:
                for k in foods['value']:
                    if food in k:
                        yes_queries_full.append(k)
                yes_queries.append(food)
            if answer == 1:
                for k in foods['value']:
                    if food in k:
                        no_queries.append(k)
        else:
            yes_query       = select_question(session_id,0)
            no_query        = select_question(session_id,1)
            dont_know_query = select_question(session_id,2)
            for item in yes_query:
                for k in foods['value']:
                    food_database = re.search(pattern, item[2]).group(1).strip()
                    names         = foods[(foods['value'].str.contains('(.*)'.join(food_database.split(' '))))]['value'].values.tolist()
                    for sub_word in names:
                        yes_queries_full.append(sub_word)
                yes_queries.append(food_database)
            for item in no_query:
                for k in foods['value']:
                    food_database = re.search(pattern, item[2]).group(1).strip()
                    names         = foods[(foods['value'].str.contains('(.*)'.join(food_database.split(' '))))]['value'].values.tolist()
                    for sub_word in names:
                        no_queries.append(sub_word)
            for item in dont_know_query:
                for k in foods['value']:
                    food_database = re.search(pattern, item[2]).group(1).strip()
                    names         = foods[(foods['value'].str.contains('(.*)'.join(food_database.split(' '))))]['value'].values.tolist()
                    for sub_word in names:
                        dont_know_queries.append(sub_word)
        if len(yes_queries) > 0 and len(no_queries) > 0:
            class_name_rejected = list(dict.fromkeys(foods.name[foods['value'].isin(no_queries)].values.tolist()))
            data                = foods[~foods['name'].isin(class_name_rejected)]
            for item in yes_queries:
                names = data[(data['value'].str.contains('(.*)'.join(item.split(' '))))]['name'].values.tolist()
                data  = data[data['name'].isin(names)]   
        if len(yes_queries) > 0 and len(no_queries) == 0:
            data = foods
            for item in yes_queries:
                names = data[(data['value'].str.contains('(.*)'.join(item.split(' '))))]['name'].values.tolist()
                data  = data[data['name'].isin(names)]
        if len(yes_queries) == 0 and len(no_queries) > 0:
            class_name_rejected = foods.name[foods['value'].isin(no_queries)].values.tolist()
            data                = foods[~foods['name'].isin(class_name_rejected)]
        data_cleaned  = list(dict.fromkeys(data['name'].values.tolist()))
        count_classes = len(list(dict.fromkeys(data['name'].values.tolist())))
        
        if count_classes > 1:
            if len(data.value[ ~data['value'].isin(yes_queries_full) & ~data['value'].isin(no_queries) & ~data['value'].isin(dont_know_queries)].values.tolist()) == 0 :
                return jsonify(data_cleaned[:10])
            else:
                # question_category    = "Is your food considered a {}?"
                # question_ingredients = "Does your food contain {}?"
                # question             = question_ingredients if choice_question == "ingredients" else question_category
                # question = 'Does your food contain {} ?'.format(clean_ingredient(data.value[ ~data['value'].isin(yes_queries_full) & ~data['value'].isin(no_queries) & ~data['value'].isin(dont_know_queries)].sample().values[0]))
                return "abd"
                return jsonify({ data[ ~data['value'].isin(yes_queries_full) & ~data['value'].isin(no_queries) & ~data['value'].isin(dont_know_queries)].sample().values[0]})
                return jsonify({
                    "completion"       : "OK",
                    "channel"          : 0,
                    "session"          : "196",
                    "signature"        : "2025596072",
                    "challenge_auth"   : "d72076a8-62a6-4c74-b1c5-c36358d56d3e",
                    "question"         : question,
                    "answers"          : [{"answer": "Yes"},{"answer": "No"},{"answer": "Don't know"}],
                    "step"             : "0",
                    "progression"      : str( 100-( (100 * count_classes) / count_categories ) ),
                    "questionid"       : "0",
                    "infogain"         : "0"})

        if count_classes == 1:
            return data_cleaned[0]
            return jsonify({'question':class_name_accepted.values[0],'answers':[{"answer":"Yes"},{"answer":"No"},{"answer":"Dont't know"}]})
        if count_classes == 0:
            question = "no body"
            return question
        
        

if __name__ == '__main__':
    app.run(port= app.config['PORT'],debug=app.config['DEBUG'])