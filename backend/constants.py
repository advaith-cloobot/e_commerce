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