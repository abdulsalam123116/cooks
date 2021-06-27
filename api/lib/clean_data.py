# Load libraries
import pandas as pd
import string
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from lib.dbconnect import *
stop = stopwords.words('english')
porter = PorterStemmer()
except_words = ["one","two","tow","allpurpos","three","four","five","six","take", "fridg", "advanc", "put", "normal" ,"room", "atmospher",
                "seven","eight","nine","ten","temperatur","dri","tablespoon","past","teaspoon","tablespoon","orang blossom","grate",
                "kilogram","cut" ,"piec","ninetyf","marin", "mixtur", "sever","good","qualiti","hour", "entir" ,"day",
                "young","¼","½","medium","twelv","small","larg","quarter","half","halv","fine",
                "size","mash","hundr","good","qualiti","grain","natur","packag","smoke","eighti","gram","amount",
                "tast","centuri","cup","thousand","sixti","diagon","inch","thick","bundl","to","fifti","millilit","kilo","liter","littl",
                "color","squar","big","spoon","twenti","stick","uncook","warm","white","chop","slice","less","make","​​in",
                "prefer","beaten","divid","wash","peel","long","thin","option","\n","spoonful","twentyf","and","glass","pinch","soft","melt","box","condens","eleven",
                "veget","hold","cube","sesam","seventi","egyptian","hare","ground","bell","hot","gentlemen","knead","coars","extract","cool","mix","homogen","ingredi","bowl","becom",
                "pickl","serv","readymad","cake","appli","crush","granul","powder","drop","cold","doubl","sift",
                "packet","fill","liquid","accord","favorit","twentyfour","fifteen","centimet","bone","mold",
                "pharmaci","decor","ring","portion","broth","quinc","fresh","cook","grill","oven","forti","milligram",
                "boil","thirti","whole","seventyf","selfrais","account","separ","yolk","purpos","anoint","chines",
                "threequart","third","buttermilk","replac","lukewarm","substitut","empti","bottl","face","paint","selfroast","light","strong",
                "filter","section","mani","use","curdl","need","sixteen","well","use","readytous","to","mediums","italian",
                "improv"
                ]

def remove_punctuation(value):
    """The function to remove punctuation"""
    table = str.maketrans('', '', string.punctuation)
    return value.translate(table)


def remove_stopwords(text):
    """The function to removing stopwords"""
    text = [word.lower() for word in text.split() if word.lower() not in stop]
    return " ".join(text)


def stemmer(stem_text):
    """The function to apply stemming"""
    stem_text = [porter.stem(word) for word in stem_text.split()]
    return " ".join(stem_text)

def clean_ingredients(url):
    from sklearn.preprocessing import LabelEncoder
    import pandas
    dataframe = pandas.read_csv(url)
    dataframe.drop_duplicates(inplace=True)
    data = dataframe['value']
    encoder = LabelEncoder()
    encoder.fit(data)
    final = []
    for item in encoder.classes_:
        foods = item.split(' ')
        final_food = ""
        for food in foods:
            if food not in except_words and not(food.isdigit()):
                final_food += (food + " ")        
        final.append(final_food.rstrip())
    final = list(dict.fromkeys(final))
    final = pandas.DataFrame(data=final)  
    final.to_csv('food.csv', encoding='utf-8')
    print(len(final))

def save_questoins_database():
    import pandas
    dataframe = pandas.read_csv("food.csv")
    dataframe.drop_duplicates(inplace=True)
    data = dataframe['food']
    for item in data:
        new_question = "Does your food contain " + item + " ?"
        insert_question_table(new_question,1)
        
def clean_ingredient(value):
    value = remove_punctuation(value)
    value = remove_stopwords(value)
    value = stemmer(value)
    value = value.lower()
    
    valueArray = value.split(' ')

    final_food = ""
    for food in valueArray:
        if food not in except_words and not(food.isdigit()):
            final_food += (food + " ")        
    if len(final_food.split(' ')) > 4:
        return ""
    return final_food.rstrip()
    
def runClean():
    # Load dataset
    url = 'test.csv'
    dataset = pd.read_csv(url)
    # shape
    print(dataset.shape)
    print(dataset.head(5))
    dataset['value'] = dataset['value'].astype(str)
    # dataset['value'] = dataset['value'].apply(remove_punctuation)
    dataset['value'] = dataset['value'].apply(remove_stopwords)
    dataset['value'] = dataset['value'].apply(stemmer)
    print(dataset[:5])
    data = dataset.to_csv('test_clean.csv', encoding='utf-8')
    clean_ingredients('test_clean.csv')
    
if __name__ == "__main__":
    runClean()