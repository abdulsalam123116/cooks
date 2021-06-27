from datetime import datetime
from random import choices, randint
from flask import Flask,request,redirect,url_for,render_template,jsonify,sessions
# from lib.clean_data import clean_ingredients,clean_ingredient
from lib.dbconnect import *
import pandas,re,json,uuid, time
from difflib import SequenceMatcher
import warnings
import base64,socket,os
from collections import defaultdict
from flask_cors import CORS

warnings.filterwarnings("ignore", 'This pattern has match groups')
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config.from_pyfile('config.py')
determine_question = ["salt","egg","water","butter","milk","onion","meat","sugar","rice"]
hostname = socket.gethostname()   
IPAddr   = socket.gethostbyname(hostname)  
foods = ""
# print("Your Computer Name is:" + hostname)   
# print("Your Computer IP Address is:" + IPAddr)  

# @app.route('/')
# def hello():
#     return 'Hello World!'

# http://127.0.0.1:3000/new_session
@app.route('/new_session',methods=["GET"])
def new_session():
    frontaddr            = base64.b64encode(bytes(IPAddr, encoding='utf8'))
    session_id           = time.time() * 1000
    new_player_id        = insert_players_table(session_id)
    choice_question      = select_random_type()
    data                 = select_random_row("cooks_ml",choice_question[1])
    data                 = clean_ingredient(data[3].split("&")[0]) if choice_question[1] == "ingredients" else data[3].split("&")[0]
    question             = choice_question[2].format(data)
    
    weight_ingredients   = []
    for item in determine_question:
        weight_ingredients.append(max_value_question(item))
    max_value = max(weight_ingredients)
    max_index = weight_ingredients.index(max_value)
    question = "Does your food contain {}?".format(determine_question[max_index])
    return jsonify({
        "completion"       : "NO",
        "channel"          : str(new_player_id),
        "session"          : str(int(session_id)),
        "challenge_auth"   : uuid.uuid5(uuid.uuid4(),"matched"+str(new_player_id)),
        "question"         : question,
        "answers"          : ["Yes" , "No" ,"Don't know"],
        "step"             : "1",
        "progression"      : "0.00000",
        "questionid"       : "2",
        "infogain"         : "0"})

# http://127.0.0.1:3000/answer_api
@app.route('/answer_api',methods=["GET","POST"])

def post_answer():
    if request.method == 'POST':
        # return jsonify(str(time.time() * 1000)) #for session ID
        # return jsonify(str(datetime.now().timestamp()).partition(".")[0]) #for session ID
        # return str(session_id/20310) for progressing
        # return str(uuid.uuid5(uuid.uuid4(),"abd")) #for unique value
        # return jsonify({'ip': request.remote_addr}), 200
        question                   = request.json['question']
        session_id                 = request.json['session_id']
        answer                     = request.json['answer']
        question_id                = request.json['questionid']
        step                       = int(request.json['step'])
        next_pattern               = get_question_next_pattern(question_id,session_id)
        count_categories           = count_categories_foods()
        no_game_progressing        = defaultdict(list)
        yes_game_progressing       = defaultdict(list)
        dont_know_game_progressing = defaultdict(list)
        
        insert_game_table(session_id,question,answer,question_id)
        yes_query         = select_question(session_id,0)
        no_query          = select_question(session_id,1)
        dont_know_query   = select_question(session_id,2)
                
        for item in yes_query:
            pattern = get_question_pattern(item[2])            
            food_database = re.search(pattern[0], item[3]).group(1).strip()
            # if pattern[1] == "ingredients":
            #     food_database = food_database.split(' ')
            #     food_database =[ value[:-1] if value[len(value)-1] == 'e' else value for value in food_database]
            #     food_database = '(.*)'.join(food_database)
            # else:
            food_database = '(.*)'.join(food_database.split(' '))
            if food_database not in yes_game_progressing[pattern[1]]:
                yes_game_progressing[pattern[1]].append(food_database)
        
        for item in no_query:
            pattern = get_question_pattern(item[2])            
            food_database = re.search(pattern[0], item[3]).group(1).strip()
            # if pattern[1] == "ingredients":
            #     food_database = food_database.split(' ')
            #     food_database =[ value[:-1] if value[len(value)-1] == 'e' else value for value in food_database]
            #     food_database = '(.*)'.join(food_database)
            # else:
            food_database = '(.*)'.join(food_database.split(' '))
            if food_database not in no_game_progressing[pattern[1]]:
                no_game_progressing[pattern[1]].append(food_database)      
                
        for item in dont_know_query:
            pattern = get_question_pattern(item[2])            
            food_database = re.search(pattern[0], item[3]).group(1).strip()
            # if pattern[1] == "ingredients":
            #     food_database = food_database.split(' ')
            #     food_database =[ value[:-1] if value[len(value)-1] == 'e' else value for value in food_database]
            #     food_database = '(.*)'.join(food_database)
            # else:
            food_database = '(.*)'.join(food_database.split(' '))
            if food_database not in dont_know_game_progressing[pattern[1]]:
                dont_know_game_progressing[pattern[1]].append(food_database)   
        data          = get_filter_data(yes_game_progressing,no_game_progressing)
        count_classes = len(data)
        print("count_classes = "+str(count_classes))
        if count_classes > 1:
            question = []
            question1 = []
            question2 = []
            question3 = []
            step = step + 1
            # return jsonify()
            # if step not in [2,3,4,7,10,15]:

            if step == 25 :
                return jsonify({
                "completion"     : "OK",
                "channel"        : "0",
                "session"        : "196",
                "challenge_auth" : "d72076a8-62a6-4c74-b1c5-c36358d56d3e",
                "cook"           : str(data[0][0]),
                "step"           : str( step ),
                "progression"    : str( 100 ) ,
                "infogain"       : "0"
                })
            else:
                count = 0
                while len(question1) == 0 or question1[1].strip() == "" :
                    if count == 10 :
                        return jsonify({
                            "completion"     : "OK",
                            "channel"        : "0",
                            "session"        : "196",
                            "challenge_auth" : "d72076a8-62a6-4c74-b1c5-c36358d56d3e",
                            "cook"           : str(data[0][0]),
                            "step"           : str( step ),
                            "progression"    : str( 100 ) ,
                            "infogain"       : "0"
                            })
                    print("Section1") 
                    if count_classes > 50 :
                        samples =["'"+x[0]+"'" for x in random.sample(data,45)]  
                    elif count_classes > 10 :
                        samples =["'"+x[0]+"'" for x in random.sample(data,10)]  
                        # question = select_random_question_update(random.sample(data,1)[0][0], yes_game_progressing, dont_know_game_progressing,next_pattern[1],no_game_progressing)
                    elif count_classes > 5:
                        samples =["'"+x[0]+"'" for x in random.sample(data,5)]  
                    else:
                        samples =["'"+x[0]+"'" for x in random.sample(data,2)]  
                    question1 = select_random_question_update(samples, yes_game_progressing, dont_know_game_progressing,next_pattern[1],no_game_progressing)
                    count += 1
                question1 = [str(question1[0]),str(question1[1]),str(question1[2])]                
                
                # if step in [2,3,4,7,10,15] and count_classes > 10:
                # new_determine_question = [value for value in determine_question if (value not in yes_game_progressing["ingredients"] and value not in no_game_progressing["ingredients"] and value not in dont_know_game_progressing["ingredients"])]
                    # if len(new_determine_question) > 0:
                    #     value = random.sample(new_determine_question,1)[0]
                    #     question = ["ingredients",value]
                    # weight_ingredients   = []
                    # for item in new_determine_question:
                    #     value = max_value_question_with_yes_no(item,yes_game_progressing,no_game_progressing)
                    #     weight_ingredients.append(value)
                # if(len(new_determine_question) > 0):
                #     result = max_value_question_with_yes_no(new_determine_question,yes_game_progressing,no_game_progressing)
                    # max_value = max(weight_ingredients)
                    # max_index = weight_ingredients.index(max_value)
                    # if max_value > 0 :
                    #     question = ["ingredients",new_determine_question[max_index]]
                    # question2 = ["ingredients",result[0],str(result[1])]
                
                # if next_pattern[1] == "category":
                category = max_category_question(yes_game_progressing , no_game_progressing,dont_know_game_progressing)
                if len(category) > 0:
                    question3 = ["category",category[0],str(category[1])]
                
                
                if len(question1) > 0 and len(question2) > 0:
                    question_temp = question1 if int(question1[2]) > int(question2[2]) else question2
                    if len(question3 ) > 0:
                        print("question1 = {} ,question2 = {} ,question3 = {}".format(question1[2],question2[2],question3[2]))
                        question = question_temp if int(question_temp[2]) > int(question3[2]) else question3
                    else:
                        print("question1 = {} ,question2 = {} ".format(question1[2],question2[2]))
                        question = question_temp
                        
                elif len(question1) > 0 and len(question3) > 0:
                    question_temp = question1 if int(question1[2]) > int(question3[2]) else question3
                    if len(question2  ) > 0:
                        print("question1 = {} ,question2 = {} ,question3 = {}".format(question1[2],question2[2],question3[2]))
                        question = question_temp if int(question_temp[2]) > int(question2[2]) else question2
                    else:
                        print("question1 = {} ,question3 = {}".format(question1[2],question3[2]))
                        question = question_temp
                        
                elif len(question1) > 0 and len(question3) == 0 and len(question2) == 0:
                        print("question1 = {} ".format(question1[2]))
                        question = question1
                        
                question_data = clean_ingredient(question[1]) if question[0] == "ingredients" else question[1]
                type_question = get_question_format_pattern_by_type(question[0])[1]
                question_data = re.sub('\s*([}?])\s*', r'\1', type_question).format(question_data)
                
                return jsonify({
                    "completion"     : "NO",
                    "channel"        : "0",
                    "session"        : "196",
                    "challenge_auth" : "d72076a8-62a6-4c74-b1c5-c36358d56d3e",
                    "question"       : question_data,
                    "answers"        : ["Yes" , "No" ,"Don't know"],
                    "step"           : str( step ),
                    "progression"    : str( 100 - ( (100 * count_classes) / count_categories ) ),
                    "questionid"     : str(get_question_format_pattern_by_type(question[0])[0]),
                    "infogain"       : "0"})

        if count_classes == 1:
            return jsonify({
                "completion"     : "OK",
                "channel"        : "0",
                "session"        : "196",
                "challenge_auth" : "d72076a8-62a6-4c74-b1c5-c36358d56d3e",
                "cook"           : str(data[0][0]),
                "step"           : str( step ),
                "progression"    : str( 100 ) ,
                "infogain"       : "0"
                })
        if count_classes == 0:
            question = "no body"
            return question

if __name__ == '__main__':
    app.run(port= app.config['PORT'],debug=app.config['DEBUG'])