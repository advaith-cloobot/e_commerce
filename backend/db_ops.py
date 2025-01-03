from postgre_utils import get_rows_by_col,exec_fetch_all,exec_without_fetch,insert_new_row_return_id,update_row

from constants import *
from datetime import datetime


def verify_login(user_email,user_password):
    user_row = get_rows_by_col(PG_TABLE_IDS_USERS,pg_col_name_dict[PG_TABLE_IDS_USERS][2],user_email)
    print('user_row :: ',user_row)
    if user_row:
        print('user_row[0][3] :: ',user_row[0][3])
        print('user_password :: ',user_password)
        if user_row[0][3] == user_password:
            return True,user_row[0][0]
        else:
            return False,None
    else:
        return False,None
    


def insert_new_user(user_email,user_password,user_name):
    user_row = get_rows_by_col(PG_TABLE_IDS_USERS,pg_col_name_dict[PG_TABLE_IDS_USERS][3],user_email)
    if not user_row:
        rowDict = {
            pg_col_name_dict[PG_TABLE_IDS_USERS][1]:user_name,
            pg_col_name_dict[PG_TABLE_IDS_USERS][2]:user_email,
            pg_col_name_dict[PG_TABLE_IDS_USERS][3]:user_password,
            pg_col_name_dict[PG_TABLE_IDS_USERS][4]: datetime.utcnow(),
            pg_col_name_dict[PG_TABLE_IDS_USERS][5]: datetime.utcnow(),
            pg_col_name_dict[PG_TABLE_IDS_USERS][6]: 1
        }
        status,user_id = insert_new_row_return_id(PG_TABLE_IDS_USERS,rowDict,pg_col_name_dict[PG_TABLE_IDS_USERS][0])
        return status,user_id
    else:
        return False,None
    



def fetch_questions_list():
    question_list = get_rows_by_col(PG_TABLE_IDS_QUESTIONS,pg_col_name_dict[PG_TABLE_IDS_QUESTIONS][5],1,order_by=" ques_id Desc LIMIT 10")
    print('question_list :: ',question_list)
    ques_json_list = []
    for row in question_list:
        json_element = {
            'ques_id': row[PG_TABLE_IDS_QUESTIONS_ques_id],
            'ques_name': row[PG_TABLE_IDS_QUESTIONS_ques_name],
            'ques_answer': row[PG_TABLE_IDS_QUESTIONS_ques_answer]
        }
        ques_json_list.append(json_element)
    print('ques_json_list :: ',ques_json_list)
    return ques_json_list



def record_session_end_score(user_id,score,consecutive_score):
    rowDict = {
        pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][1]:user_id,
        pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][2]:score,
        pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][3]: datetime.utcnow(),
        pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][4]: datetime.utcnow(),
        pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][5]: 1,
        pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][6]: consecutive_score
    }
    status,user_session_id = insert_new_row_return_id(PG_TABLE_IDS_USER_SESSION_STATS,rowDict,pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][0])
    return status,user_session_id


def fetch_user_highest_score(user_id):
    query =f"""SELECT *
                FROM user_session_stats
                WHERE user_session_user_id = {user_id}
                ORDER BY user_session_score DESC
                LIMIT 1;
            """
    max_score_row = exec_fetch_all(query)
    max_score = max_score_row[0][PG_TABLE_IDS_USER_SESSION_STATS_user_session_score]
    return max_score

def fetch_user_highest_consecutive_score(user_id):
    query = f"""SELECT MAX(consecutive_score) AS highest_consecutive_score
                FROM user_session_stats
                WHERE user_session_user_id = {user_id};"""
    max_consecutive_score_row = exec_fetch_all(query)
    max_consecutive_score = max_consecutive_score_row[0][0]
    return max_consecutive_score



def fetch_top_scoring_users():
    top_score_json_list = []
    query ="""WITH ranked_sessions AS (
                SELECT
                    uss.*,
                    RANK() OVER (PARTITION BY uss.user_session_user_id ORDER BY uss.user_session_score DESC) AS rank
                FROM user_session_stats uss
            ),
            top_sessions AS (
                SELECT *
                FROM ranked_sessions
                WHERE rank = 1
                ORDER BY user_session_score DESC
                LIMIT 3
            )
            SELECT
                ts.user_session_user_id,
                u.user_name,
                ts.user_session_score,
                ts.created_timestamp,
                ts.last_updated_timestamp
            FROM top_sessions ts
            JOIN users u ON ts.user_session_user_id = u.user_id;"""
    top_score_rows = exec_fetch_all(query)
    print('top_score_rows :: ',top_score_rows)
    for top_score in top_score_rows:
        top_score_json_list.append(
            {
                'user_id': top_score[0],
                'user_name': top_score[1],
                'user_score': top_score[3],
            }
        )
    return top_score_json_list