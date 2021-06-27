from clean_data import clean_ingredients,clean_ingredient
from dbconnect import *
import pandas
foods = pandas.read_csv("test_clean.csv")
data = foods['value']
session_id = 1
queries = []
if len(select_question(1)) == 0 :
    queries.append(clean_ingredient(data[0])) 
  
# out = []
# for q in queries:
#     for k in foods['value']:
#         if q in k:
#             out.append(k)
# print(out)
def listToString(s): 
    str1 = "," 
    return (str1.join(s))
resultName = foods.name[ foods['value'].isin(queries)] 
name = foods.name[ foods['name'].isin(resultName.values)]
values = foods.value[ foods['name'].isin(resultName.values)]
print(len(name))
