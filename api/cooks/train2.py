from clean_data import clean_ingredients,clean_ingredient
import pandas,re
foods = pandas.read_csv("test_clean.csv")
queries = ["Does your dish contain rice ?"]
pattern = "Does your dish contain(.*?)\?"
refused = ["small onion fine chop" , "four cup hot broth","eighti gram vermicelli"]
resultName = foods.name[ ~foods['value'].isin(refused)] 
resultValue = foods.value[foods['value'] != "small onion fine chop"] 
print(len(resultName.values))
# from difflib import SequenceMatcher
# r = SequenceMatcher(None, k, qq).ratio()
        # print('q={} k={} ratio={}'.format(q, k, r))
        # if r > 0.1:
out = []
for q in queries:
    # qq = re.search(pattern, q).group(1).strip()
    # qq = "tomato"
    for k in foods['value']:
        # r = SequenceMatcher(None, k, qq).ratio()
        # print('q={} k={} ratio={}'.format(q, k, r))
        # if r > 0.1:
        if q in k:
            out.append(k)
print(out)
resultName = foods.name[ foods['value'].isin(out)] 
name = foods.name[ foods['name'].isin(resultName.values)]
values = foods.value[ foods['name'].isin(resultName.values)]
print(len(name))
