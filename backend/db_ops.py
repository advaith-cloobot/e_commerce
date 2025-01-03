from postgre_utils import get_rows_by_col,exec_fetch_all,exec_without_fetch,insert_new_row_return_id,update_row

from constants import *
from datetime import datetime


def verify_login(user_email,user_password):
    user_row = get_rows_by_col(PG_TABLE_IDS_USERS,pg_col_name_dict[PG_TABLE_IDS_USERS][3],user_email)
    if user_row:
        if user_row[0][2] == user_password:
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
            pg_col_name_dict[PG_TABLE_IDS_USERS][3]:user_email,
            pg_col_name_dict[PG_TABLE_IDS_USERS][2]:user_password,
            pg_col_name_dict[PG_TABLE_IDS_USERS][4]: datetime.utcnow(),
            pg_col_name_dict[PG_TABLE_IDS_USERS][5]: datetime.utcnow(),
            pg_col_name_dict[PG_TABLE_IDS_USERS][6]: 1
        }
        rowDict[pg_col_name_dict[PG_TABLE_IDS_USERS][3]] = user_email
        rowDict[pg_col_name_dict[PG_TABLE_IDS_USERS][2]] = user_password
        status,user_id = insert_new_row_return_id(PG_TABLE_IDS_USERS,rowDict,pg_col_name_dict[PG_TABLE_IDS_USERS][0])
        return status,user_id
    else:
        return False,None