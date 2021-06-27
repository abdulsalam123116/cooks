from dbconnect import *
from deep_translator import GoogleTranslator

results=select_query_without_crawled("cook_informations_en",0,1613)

for result in results:
    try:
        trans = GoogleTranslator(source='ar', target='en').translate(result[2]) 
        update_query("cook_informations_en",result[0],"name",trans)
        trans = GoogleTranslator(source='ar', target='en').translate(result[3]) 
        update_query("cook_informations_en",result[0],"value",trans)
        print(result[0])
    except:
        continue
