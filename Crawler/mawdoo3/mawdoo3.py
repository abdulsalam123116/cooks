from bs4 import BeautifulSoup
from urllib.request import urlopen
from dbconnect import *
import urllib 
import json

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
        cook_id = insert_cooks(arrdict[i]['name'],category,image,multi_ingredient,multi_preparing);
        for j in range(len(ingredients)):
            insert_cook_ingredients(cook_id,ingredients[j]['value'],ingredients[j]['sort'],ingredients[j]['title_sort'])
        for j in range(len(preparings)):
            insert_cook_preparing(cook_id,preparings[j]['value'],preparings[j]['sort'],preparings[j]['title_sort'])
        for j in range(len(informations)):
            insert_cook_informations(cook_id,informations[j]['name'],informations[j]['value'])
            
         
def toc_not_exist(text,category,name,image):
    insert_to_crawled(text,name,image,category)

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

db_results = select_query("kitchen_pages")
for db_result in db_results:

    print(db_result[0])
    if '%' in db_result[1]:
        url = db_result[1]
    else:
        url = urllib.parse.quote(db_result[1].encode('utf-8'))
    html = urlopen('https://mawdoo3.com'+url)
    soup = BeautifulSoup(html.read().decode("utf-8"),'lxml')
    result = soup.find('div',{'id':'mw-content-text'})
    
    toc_result = result.find('div',{'id':'toc'})
        
    categories = soup.find('ul',{'class':'breadcrumbs'}).find_all('li')
    category ='لا تصنيف'
    for res in categories:
        a = res.find('a')
        if a:
            if len(a['href']) > 1:
                category = a.get_text()
    name = soup.find('h1').get_text()
    image = soup.find('img',{'id':'articleimagediv'})['src']
    if toc_result is not None:
        toc_exist(toc_result,result,category,image)
    else:
        toc_not_exist(result.get_text(),category,name,image)
    update_query("kitchen_pages",db_result[0],'is_crawled',1,False)
