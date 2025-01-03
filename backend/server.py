from flask import Flask,request,render_template, jsonify,Response,make_response
import json
from flask_cors import CORS
import pickle
import random 
import sys
# from Monolithic.postgres_utils import global_init_db,global_init_db_vector
# from Monolithic.utils import print_statement
# from Monolithic.postgres_utils import global_init_db,global_init_db_vector
import logging
from logging import FileHandler
import traceback

import datetime
import traceback

from db_ops import verify_login,insert_new_user,fetch_questions_list,record_session_end_score,fetch_user_highest_score,fetch_top_scoring_users,fetch_user_highest_consecutive_score
# from constants import *
from utils import print_statement,find_largest_number
from datetime import datetime
app = Flask(__name__,template_folder='assets/html_templates')

app.debug = True

cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.logger.handlers.clear()
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)

app.logger.debug("Hello World")
ENVIRONMENT = "Server"





@app.route("/check_login",methods=['POST'])
def check_login():
    try:
        print_statement('In check_login :: ',request.json)
        user_email = request.json['user_email']
        user_password = request.json['user_password']
        status,user_id = verify_login(user_email,user_password)
        return {"status":status,"user_id":user_id}
    except Exception as e:
        print('Exception in check_login ::',e)
        return make_response(jsonify({'error':'Internal error'}), 500)
    

@app.route("/sign_up_user",methods=['POST'])
def sign_up_user():
    try:
        print_statement('In check_ sign up :: ',request.json)
        user_name = request.json['user_name']
        user_email = request.json['user_email']
        user_password = request.json['user_password']
        status,user_id = insert_new_user(user_email,user_password,user_name)
        return {"status":status,'user_id':user_id}
    except Exception as e:
        print('Exception in sign_up_user ::',e)
        return make_response(jsonify({'error':'Internal error'}), 500)
    

@app.route("/get_questions_list",methods=['POST'])
def get_questions_list():
    try:
        question_list = fetch_questions_list()
        return {"status":True,"question_list":question_list}
    except Exception as e:
        print('Exception in fetch_questions_list ::',e)
        return make_response(jsonify({'error':'Internal error'}), 500)

@app.route("/finish_session_record_score",methods=['POST'])
def finish_session_record_score():
    try:
        user_id = request.json['user_id']
        score = request.json['score']
        consecutive_score_list = request.json['consecutive_score_list']
        consecutive_score = find_largest_number(consecutive_score_list)
        if not consecutive_score:
            consecutive_score = 0
        record_session_end_score(user_id,score,consecutive_score)
        return {"status":True}
    except Exception as e:
        print('Exception in finish_session_record_score ::',e)
        return make_response(jsonify({'error':'Internal error'}), 500)
    
@app.route("/get_user_highest_score",methods=['POST'])
def get_user_highest_score():
    try:
        user_id = request.json['user_id']
        score = fetch_user_highest_score(user_id)
        consecutive_score = fetch_user_highest_consecutive_score(user_id)
        return {"status":True,"score":score,"consecutive_score":consecutive_score}
    except Exception as e:
        print('Exception in fetch_user_highest_score ::',e)
        return make_response(jsonify({'error':'Internal error'}), 500)

@app.route("/get_top_scoring_users",methods=['POST'])
def get_top_scoring_users():
    try:
        top_users = fetch_top_scoring_users()
        return {"status":True,"top_users":top_users}
    except Exception as e:
        print('Exception in fetch_top_scoring_users ::',e)
        return make_response(jsonify({'error':'Internal error'}), 500)

# @app.route("/get_offer_list",methods=['POST'])
# def get_offer_list():
#     try:
#         offer_list = fetch_offer_list()
#         return {"status":True,"offer_list":offer_list}
#     except Exception as e:
#         print('Exception in fetch_offer_list ::',e)
#         return make_response(jsonify({'error':'Internal error'}), 500)
    
# @app.route("/confirm_payment_details",methods=['POST'])
# def confirm_payment_details():
#     try:
#         user_id = request.json['user_id']
#         user_prod_map_list = request.json['user_prod_map_list']
#         amount = calulate_total_amount(user_id,user_prod_map_list)
#         payment_details = request.json['payment_details']
#         amount = check_offers_and_calculate_amount(user_id,user_prod_map_list,amount,payment_details)
#         return {"status":True,"amount":amount}
#     except Exception as e:
#         print('Exception in confirm_payment_details ::',e)
#         return make_response(jsonify({'error':'Internal error'}), 500)
    

# @app.route("/get_bank_list",methods=['POST'])
# def get_bank_list():
#     try:
#         bank_list = fetch_bank_list()
#         return {"status":True,"bank_list":bank_list}
#     except Exception as e:
#         print('Exception in get_bank_list ::',e)
#         return make_response(jsonify({'error':'Internal error'}), 500)
    
# @app.route("/make_transaction",methods=['POST'])
# def make_transaction():
#     try:
#         user_id = request.json['user_id']
#         user_prod_map_id = request.json['user_prod_map_id']
#         # user_prod_map_list = request.json['user_prod_map_list']
#         amount = request.json['amount']
#         insert_purchase_hist(user_id,user_prod_map_id,amount)
#         return {"status":True}
#     except Exception as e:
#         print('Exception in make_transaction ::',e)
#         return make_response(jsonify({'error':'Internal error'}), 500)

    



@app.route("/")
def hello2():
    return "<h1 style='color:blue'>Hello world :)</h1>"

if __name__ == '__main__':
    # print_statement("Server initated")
    # Initialisaing logger
    logging.basicConfig(filename='serverlog_'+str(datetime.today().strftime("%D").replace("/","-"))+'.log', level=logging.DEBUG, force=True, filemode='a')
    # print_statement('---------------------------------------Started')
    
    #initialising db
    # global_init_db()
    
    #For live x.cloobot.ai/backend
    if ENVIRONMENT == "Server":
        app.run(host='0.0.0.0', port=5000, debug=True ,use_reloader=False)
