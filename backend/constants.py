DB_HOST = "localhost"
DB_PASS = "add@postgres"
DB_USER = "postgres"
DB_PORT = 5432
DB_NAME = "postgres"


pg_col_name_dict = {}
PG_TABLE_IDS_USERS = "users"

# Constants for "users" table
pg_col_name_dict[PG_TABLE_IDS_USERS] = {}
pg_col_name_dict[PG_TABLE_IDS_USERS][0] = 'user_id'
pg_col_name_dict[PG_TABLE_IDS_USERS][1] = 'user_name'
pg_col_name_dict[PG_TABLE_IDS_USERS][3] = 'user_password'
pg_col_name_dict[PG_TABLE_IDS_USERS][2] = 'user_email'
pg_col_name_dict[PG_TABLE_IDS_USERS][4] = 'created_timestamp'
pg_col_name_dict[PG_TABLE_IDS_USERS][5] = 'last_updated_timestamp'
pg_col_name_dict[PG_TABLE_IDS_USERS][6] = 'status'

PG_TABLE_IDS_USERS_user_id                  = 0
PG_TABLE_IDS_USERS_user_name                = 1
PG_TABLE_IDS_USERS_user_password            = 3
PG_TABLE_IDS_USERS_user_email               = 2
PG_TABLE_IDS_USERS_created_timestamp        = 4
PG_TABLE_IDS_USERS_last_updated_timestamp   = 5
PG_TABLE_IDS_USERS_status                   = 6



PG_TABLE_IDS_QUESTIONS = "questions"

# Constants for "questions" table
pg_col_name_dict[PG_TABLE_IDS_QUESTIONS] = {}
pg_col_name_dict[PG_TABLE_IDS_QUESTIONS][0] = 'ques_id'
pg_col_name_dict[PG_TABLE_IDS_QUESTIONS][1] = 'ques_name'
pg_col_name_dict[PG_TABLE_IDS_QUESTIONS][2] = 'ques_answer'
pg_col_name_dict[PG_TABLE_IDS_QUESTIONS][3] = 'created_timestamp'
pg_col_name_dict[PG_TABLE_IDS_QUESTIONS][4] = 'last_updated_timestamp'
pg_col_name_dict[PG_TABLE_IDS_QUESTIONS][5] = 'status'

PG_TABLE_IDS_QUESTIONS_ques_id               = 0
PG_TABLE_IDS_QUESTIONS_ques_name             = 1
PG_TABLE_IDS_QUESTIONS_ques_answer           = 2
PG_TABLE_IDS_QUESTIONS_created_timestamp     = 3
PG_TABLE_IDS_QUESTIONS_last_updated_timestamp = 4
PG_TABLE_IDS_QUESTIONS_status                = 5




PG_TABLE_IDS_USER_SESSION_STATS = "user_session_stats"

# Constants for "user_session_stats" table
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS] = {}
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][0] = 'user_session_id'
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][1] = 'user_session_user_id'
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][2] = 'user_session_score'
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][3] = 'created_timestamp'
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][4] = 'last_updated_timestamp'
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][5] = 'status'
pg_col_name_dict[PG_TABLE_IDS_USER_SESSION_STATS][6] = 'consecutive_score'


PG_TABLE_IDS_USER_SESSION_STATS_user_session_id          = 0
PG_TABLE_IDS_USER_SESSION_STATS_user_session_user_id     = 1
PG_TABLE_IDS_USER_SESSION_STATS_user_session_score       = 2
PG_TABLE_IDS_USER_SESSION_STATS_created_timestamp        = 3
PG_TABLE_IDS_USER_SESSION_STATS_last_updated_timestamp   = 4
PG_TABLE_IDS_USER_SESSION_STATS_status                   = 5
PG_TABLE_IDS_USER_SESSION_STATS_consecutive_score        = 6
