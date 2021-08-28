# tempStr = ""
# tempCnt = 0
# for x in X_test.columns:
#     if x.startswith('Average School Rating_'):
#         tempStr = tempStr + "'" + x.split('Average School Rating_')[1] + "'" + ","
# print(tempStr)


# for i, x in enumerate(X_test.columns):
#     print(f"'{x}': houseFeatures[{i}],")

# zeros = 0
# zer = ""
# while zeros < 157:
#     zer = zer + "0,"
#     zeros += 1
# print(zer)

# cities = ['Aliso Viejo','Anaheim','Brea','Buena Park','Costa Mesa',
#               'Cypress','Dana Point','Fountain Valley','Fullerton','Garden Grove',
#               'Huntington Beach','Irvine','La Habra','La Palma','Laguna Beach',
#               'Laguna Hills','Laguna Niguel','Lake Forest','Los Alamitos',
#               'Mission Viejo','Newport Beach','Orange','Placentia',
#               'Rancho Santa Margarita','San Clemente','San Juan Capistrano',
#               'Santa Ana','Seal Beach','Stanton','Tustin','Villa Park',
#               'Westminster','Yorba Linda']
# zips = ['90620','90621','90623','90630','90631','90680','90720','90740',
#             '92602','92603','92604','92606','92610','92612','92614','92618','92620',
#             '92624','92626','92627','92629','92630','92646','92647','92648','92649',
#             '92651','92653','92656','92660','92661','92663','92672','92673','92675',
#             '92677','92679','92683','92688','92691','92692','92701','92703','92704',
#             '92705','92706','92707','92708','92780','92782','92801','92802','92804',
#             '92805','92806','92807','92821','92823','92831','92832','92833','92835',
#             '92840','92841','92843','92844','92845','92861','92865','92866','92867',
#             '92868','92869','92870','92886','92887']
# schoolRatings = ['2.333','2.667','3.0','3.333','3.667','4.0','4.333','4.4',
#                       '4.429','4.6','4.667','4.75','4.833','5.0','5.25','5.333','5.5','5.667',
#                       '5.75','6.0','6.25','6.333','6.5','6.667','6.75','7.0','7.25','7.333',
#                       '7.667','7.75','8.0','8.2','8.25','8.333','8.5','8.667','8.75','9.0','9.333']
# for x in cities:
#     print(f"<option value='{x}'>{x}</option>")

# for x in zips:
#     print(f"<option value='{x}'>{x}</option>")

# for x in schoolRatings:
#     print(f"<option value='{x}'>{x}</option>")


from flask import Flask, render_template, request, jsonify
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


engine = create_engine("postgresql://root:postgres@mypostgresdb.c57smewha8wr.us-west-1.rds.amazonaws.com:5432/finalproject")
Base = automap_base()
Base.prepare(engine, reflect=True)

from sqlalchemy import inspect
inspector = inspect(engine)

for table_name in inspector.get_table_names():
   for column in inspector.get_columns(table_name):
       print("Column: %s" % column['name'])
print(inspector.get_table_names())