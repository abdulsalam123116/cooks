import sys
import requests
from general import *
from bs4 import BeautifulSoup
# from dbconnect import *
hrefs = []
create_data_files("cookpad")
path_crawled    = "cookpad/crawled_pages.txt"
path_to_crawled = "cookpad/to_crawled_pages.txt"
with open(path_to_crawled, 'r') as f:
    unique_lines = set(f.readlines())
with open(path_to_crawled, 'w') as f:
    f.writelines(unique_lines)
with open(path_crawled, 'r') as f:
    unique_lines = set(f.readlines())
with open(path_crawled, 'w') as f:
    f.writelines(unique_lines)
file1 = open(path_to_crawled, 'r')
hrefs = file1.readlines()
crawled_file = open(path_crawled).read()
to_crawled_file = open(path_to_crawled).read()
hdr = {
'Host': 'cookpad.com',
'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36",
"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"Accept-Language": "ar,en-US;q=0.9,en;q=0.8",
"Connection": "keep-alive",
"Cookie":'_pxhd=356ec55bdbaa7490817ed85ac8add449e507e60caf2229f31252e7d569c2e572:e0ca8211-c375-11eb-b6fa-03e8a4278143; _pxvid=e0ca8211-c375-11eb-b6fa-03e8a4278143; ab_session=0.449301125296225; f_unique_id=1d9a9ef4-5650-4f9a-bcc2-17553a0902b7; _ga=GA1.2.1151172900.1622619695; _gid=GA1.2.798092451.1622619695; accept_cookies_and_privacy_and_terms=1; seen_bookmark_reminder=true; keyword_history_en=["peanut+butter+frosting","pasta+alfredo","taco+salad","on","the","custard","trix","breakfast"]; recipe_view_count_en=4; _global_web_session=+e3A/X7qnccG8yqTC1k9NCJHEBYrkx1rf0mNAMFQ9ecgJaienPp47xhzpteAuxdzH9PaVWskn/R5XOpjj/0nBlyUBKzAcEfOVgpopXpP2gyu2CzE/r3GZsM5jnnbKeWAv8Qjmg9aXlEAz+7QbhEpNUX8o8+ZfChjSLB6xkc7gdbV3de7SPRZkVigawY/NLwVA/mmMGcWHr79gTY4aQUSg4LPAIzCBDU3QM2TnY60tFs4BX7egF4dhEBU1Y2ILlRdXgZtDjUzIHFbrQC/ha9pXNzlGT3tFR0rmcjLkCEt5nJzUOmtc5wheX4Rd74kwLFlXC7v2ZIL47oSKbK45smuLLC1kD/W2W++mIhGySAtJ4wqyX5UFAcEYg8D3IuruOCVGEcNAUma+36P0A9zLwH1V9rWH/OttdoHjdxLGuJOegLsEhE=--zewIAs6okLYVuq/f--OEiDD3inhh5anC3LGGz56Q==; _pxff_rf=1; _pxff_fp=1; _pxff_ne=1; _px2=eyJ1IjoiZDcxYWExODAtYzNkMS0xMWViLTg3OTQtYmRjZWNkNWM4YWEyIiwidiI6ImUwY2E4MjExLWMzNzUtMTFlYi1iNmZhLTAzZThhNDI3ODE0MyIsInQiOjE1NjE1MDcyMDAwMDAsImgiOiJmN2M1ZWI2Y2M1NGM0ZjUwZWE2MGRkMjgxNDk3Yjk5MDVjZGE5ZWViOTBiYjdmNDdjZTBjZDAzZjlkODhjMjkxIn0=',
"Upgrade-Insecure-Requests": "1",
"Cache-Control": "max-age=0",
"TE": "Trailers",
"If-None-Match": 'W/"4adada1c6b76ffde2bd901353d94b8bd"'
}
for link in hrefs:  
    if link not in crawled_file:     
        response = requests.get(link,headers=hdr)
        if "Please verify you are a human" not in str(response.content):
            soup = BeautifulSoup(response.content,'lxml')
            categories = soup.find('div',{'id':'main_contents'})
            if not(categories is None):
                categories = categories.find_all('a')
                for category in categories:
                    if "us/recipes" in category['href']:
                        if category['href'].strip() not in to_crawled_file:
                            file_object = open("cookpad/products.txt", 'a',encoding="utf-8")
                            file_object.write(category['href'])
                            file_object.write("\n") 
                            file_object.close()
            file_object = open(path_crawled, 'a',encoding="utf-8")
            file_object.write(link)
            file_object.close()            
        else:
            print("reAuth Please")
            sys.exit()
        


