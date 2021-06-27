import requests
from general import *
from bs4 import BeautifulSoup
# from dbconnect import *
import urllib 
import json
from urllib.request import Request, urlopen


def toc_exist(toc_result,mw_result,category,image):
    cooks_crawled = toc_result.find_all('li',{'class':'toclevel-1'})
    arrdict = []
    for cook in cooks_crawled:
        multi_ingredient = 0
        multi_preparing = 0
        ul = cook.find('ul')
        
        
        if ul is not None:
            count = count_bs4_elements(ul.find_all('li',{'class','toclevel-2'}),'li')
            if count == 2 : 
                arrdict.append({'name':cook.a.find('span',{'class','toctext'}).get_text(),'name_id': cook.a['href'][1:],'ingredient_id': ul.find_all('li',{'class','toclevel-2'})[0].a['href'][1:],'preparing_id': ul.find_all('li',{'class','toclevel-2'})[1].a['href'][1:]}) 

    for i in range(len(arrdict)):
        informations = []
        ingredients  = []
        preparings  = []
        tag_informations = mw_result.find('span',{'id':arrdict[i]['name_id']}).parent
        
        
        tag_informations = tag_informations.find_next_sibling()
        if tag_informations is not None:
            if tag_informations.name == 'table':
                childth = tag_informations.find('th')
                if childth  is not None :
                    th = [] 
                    td = [] 
                    tr1 = tag_informations.find('tr')
                    tr2 = tag_informations.find_next_sibling()
                    for t in tr1.find_all('th'):
                        th.append(t.get_text())
                    for t in tr2.find_all('td'):
                        td.append(t.get_text())
                else:        
                    trs = tag_informations.find_all('tr')
                    for tr in trs:
                        count = count_bs4_elements(tr.find_all('td'),'td')
                        if count == 2 : 
                            informations.append({'name':tr.td.get_text(),'value':tr.td.find_next_sibling().get_text()})

        tag_ingredient = mw_result.find('span',{'id':arrdict[i]['ingredient_id']}).parent
        count_ul = count_bs4_elements_between(tag_ingredient,'h3','ul')
        if count_ul > 1:
            multi_ingredient = 1
        while True:
            tag_ingredient = tag_ingredient.find_next_sibling()
            if tag_ingredient is None :
                break
            if tag_ingredient.name == 'ul':
                if multi_ingredient and count_ul != count_bs4_elements_between(tag_ingredient,'h2','ul'):
                    title_sort = tag_ingredient.find_previous_sibling().get_text()
                else:
                    title_sort = ''
                for li in tag_ingredient.find_all('li'):
                    ingredients.append({'title_sort':title_sort,'value':li.get_text(),'sort':(count_ul if multi_ingredient else 0)})
            count_ul -= 1
            if tag_ingredient.name == 'h3' or tag_ingredient is None :
                break
            
        tag_preparing = mw_result.find('span',{'id':arrdict[i]['preparing_id']}).parent
        count_ul = count_bs4_elements_between(tag_preparing,'h2','ul')
        if count_ul > 1:
            multi_preparing = 1
        while True:
            tag_preparing = tag_preparing.find_next_sibling()
            if tag_preparing is None:
                break
            
            if tag_preparing.name == 'ul':
                if multi_preparing == 1 and count_ul != count_bs4_elements_between(tag_ingredient,'h2','ul'):
                    title_sort = tag_preparing.find_previous_sibling().get_text()
                else:
                    title_sort = ''
                for li in tag_preparing.find_all('li'):
                    preparings.append({'title_sort':title_sort,'value':li.get_text(),'sort':(count_ul if multi_preparing else 0)})
            count_ul -= 1
            if tag_preparing.name == 'h2':
                break
            # if next_tag.name is not None:
            #     # print('{} - {}/{} - {}'.format(i, header.text, j, next_tag.string))
            #     j += 1
        # cook_id = insert_cooks(arrdict[i]['name'],category,image,multi_ingredient,multi_preparing);
        # for j in range(len(ingredients)):
        #     insert_cook_ingredients(cook_id,ingredients[j]['value'],ingredients[j]['sort'],ingredients[j]['title_sort'])
        # for j in range(len(preparings)):
        #     insert_cook_preparing(cook_id,preparings[j]['value'],preparings[j]['sort'],preparings[j]['title_sort'])
        # for j in range(len(informations)):
        #     insert_cook_informations(cook_id,informations[j]['name'],informations[j]['value'])
            
         
# def toc_not_exist(text,category,name,image):
#     insert_to_crawled(text,name,image,category)

def write_tofile(name_file,results):
    # db_result[1][1:]
    file_object = open('mawdoo3/cooks/'+name_file+'.txt', 'w',encoding="utf-8")
    for result in results:
        file_object.write(result.get_text())
    file_object.close()

def count_bs4_elements(query,search):
    counter = 0
    for item in query:
         if item.name == search:
            counter += 1
    return counter

def count_bs4_elements_between (startElement, stopElement, searchFor):
    counter = 0
    while True:
        if startElement is None :
            break
        startElement = startElement.find_next_sibling()
        if startElement is None :
            break
        if startElement.name == searchFor:
            counter += 1
        if startElement.name == stopElement or startElement is None :
            break
    return counter

# hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
#     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#     'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
#     'Accept-Encoding': 'none',
#     'Accept-Language': 'en-US,en;q=0.8',
#     'Connection': 'keep-alive'}

# req = Request('https://cookpad.com/us/search_categories', headers=hdr)
# html = urlopen(req).read().decode("utf-8")
# headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
# response = requests.get('https://cookpad.com/us/search_categories',headers=hdr)
# soup = BeautifulSoup(response.content,'lxml')
# result = soup.find('div',{'id':'main_contents'})
# categories = soup.find_all('a',{'class':'uppercase'})
hrefs = []
to_crawled = []
crawled = []
path_crawled    = "cookpad/crawled.txt"
path_to_crawled = "cookpad/to_crawled.txt"
# for category in categories:
#     if "/us/search" in category['href'] :
#         hrefs.append(str(category['href']))
# for item in hrefs:
#     file_object = open("cookpad/to_crawled.txt", 'a',encoding="utf-8")
#     file_object.write(item)
#     file_object.write("\n") 
#     file_object.close()
# hdrs = {'User-Agent': 'Mozilla / 5.0 (X11 Linux x86_64) AppleWebKit / 537.36 (KHTML, like Gecko) Chrome / 52.0.2743.116 Safari / 537.36'}    
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
"Cookie":'_pxhd=356ec55bdbaa7490817ed85ac8add449e507e60caf2229f31252e7d569c2e572:e0ca8211-c375-11eb-b6fa-03e8a4278143; _pxvid=e0ca8211-c375-11eb-b6fa-03e8a4278143; ab_session=0.449301125296225; f_unique_id=1d9a9ef4-5650-4f9a-bcc2-17553a0902b7; _ga=GA1.2.1151172900.1622619695; _gid=GA1.2.798092451.1622619695; accept_cookies_and_privacy_and_terms=1; recipe_view_count_en=1; seen_bookmark_reminder=true; keyword_history_en=["pasta+alfredo","taco+salad","on","the","custard","trix","breakfast"]; _global_web_session=SfmD6UXDxhZHE60S7PgayG76isZacGEvDdnnQr64zdDuSp217WZc7RWV5qw10Og5oADbezHDJlapYkJOOoRhhQEZwS9lVQ0QT8VhuV3LLqzBO6a3VdJikj4fotxnQhp30ES3JY5yIt24pW3dAIyoI+npF1TIj05gmY5fx8AXWRN89w286KN1iw1tEJNr6bJwRQCMgmhyLE0N4bDylH5ygyzPnbtfTuOr3d1+98qCCK0aEeZow8NFPa35GspEozl4TxKqW3ZlMi1uwyH0k9iK/o4TUJhQ2QTdrtvZpOir9xMAp3mY03guZ6nuUMn3Gz9M1KXm+Ua43e92qgo9LAJR/YYGoYlR7UiG7P+zyVdSdeRIztPLUjqld6twC/Gk0nsm9vTDDp2U/0YIHEXNWhfw95diA7Q+Iv0zTWkV4YqgmbLtYIU=--v+cxytlpJ28j7urG--anWNvo2JkN+kSkzCA0iWtg==; _pxff_rf=1; _pxff_fp=1; _px2=eyJ1IjoiY2UwN2VmZjAtYzNhYy0xMWViLTlhNDctZGZiMjk0YzY2YmQxIiwidiI6ImUwY2E4MjExLWMzNzUtMTFlYi1iNmZhLTAzZThhNDI3ODE0MyIsInQiOjE2MjI2NDM3MDcyNzksImgiOiIxZTM4NzJjMmQzMDIzOGIzYzU1NmNkYjg3ODk3YWZkMDM0ZTJiYmQ2YmViNWQwMmM1OGUwZGY5YjY4YTRjZTBmIn0=',
"Upgrade-Insecure-Requests": "1",
"Cache-Control": "max-age=0",
"TE": "Trailers",
"If-None-Match": 'W/"4adada1c6b76ffde2bd901353d94b8bd"'
}
for link in hrefs:  
    # with requests.Session() as s:
    if link.strip() not in crawled_file:
        response = requests.get('https://cookpad.com'+link.strip()+"?event=search.category_keyword",headers=hdr)
        print(link.strip())
        soup = BeautifulSoup(response.content,'lxml')
        categories = soup.find('div',{'id':'main_contents'}).find('header').find_all('a')
        # print(categories)
        for category in categories:
            if category['href'].strip() not in to_crawled_file:
                file_object = open(path_to_crawled, 'a',encoding="utf-8")
                file_object.write(category['href'])
                file_object.write("\n") 
                file_object.close()
        #         to_crawled.append(category['href'])
        # crawled.append(link)
        file_object = open(path_crawled, 'a',encoding="utf-8")
        file_object.write(link)
        # file_object.write("\n") 
        file_object.close()
# for item in crawled:
#     file_object = open(path_crawled, 'a',encoding="utf-8")
#     file_object.write(item)
#     file_object.write("\n") 
#     file_object.close()
# for item in to_crawled:
#     file_object = open(path_to_crawled, 'a',encoding="utf-8")
#     file_object.write(item)
#     file_object.write("\n") 
#     file_object.close()
