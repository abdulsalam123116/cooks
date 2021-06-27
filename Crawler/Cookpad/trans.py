from dbconnect import *
from deep_translator import GoogleTranslator

results=select_query_without_crawled("cook_ingredients_en",0,359072)

for result in results:
    try:
        
        trans = GoogleTranslator(source='ar', target='en').translate(result[2]) 
        update_query("cook_ingredients_en",result[0],"value",trans)
        print(result[0])
    except:
        continue
    
