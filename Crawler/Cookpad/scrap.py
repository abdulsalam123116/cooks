from recipe_scrapers import scrape_me

from general import *
hrefs = []
to_crawled = []
crawled = []
# give the url as a string, it can be url from any site listed below
# categories = scrape_me('https://cookpad.com/us/search_categories').links()
import requests
  
# Making a get request
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
response = requests.get('https://cookpad.com/us/search_categories',headers=headers)
print(response.content)