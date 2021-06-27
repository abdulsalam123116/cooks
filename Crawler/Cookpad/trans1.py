from dbconnect import *
from deep_translator import GoogleTranslator

results=select_query_without_crawled("cook_preparing_en",0,259128)

for result in results:
    try:
        trans = GoogleTranslator(source='ar', target='en').translate(result[2]) 
        update_query("cook_preparing_en",result[0],"value",trans)
        print(result[0])
    except:
        print("error"+str(result[0]))
        continue
