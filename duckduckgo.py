from duckduckgo_search import DDGS
from langchain_community.tools import DuckDuckGoSearchRun
from bs4 import BeautifulSoup

import urllib.request 
# results = DDGS().text("African glass catfish", max_results=5)
# soup = BeautifulSoup(str(results),features="lxml")

search = DuckDuckGoSearchRun() 

def filename(name : str):
    whitelist = set('abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ_')

    return ''.join(filter(whitelist.__contains__, name.replace(" ","_")))+ ".md"

def fotoname(name : str):
    return filename(name)[0:-3]+ ".jpg"

def text_for_fish(name : str): 
    return search.run(name)


def byry(name : str):
    with open("ryby/byry/"+filename(name), "w") as s:
        s.write("## [back](../index.md) \n" +"# "+name+"\n"+text_for_fish(name) + "\n")
        foto(name)
        s.write("![zdjecie ryby :)](../fotki/"+fotoname(name)+")\n")

def foto(name : str):
    results = DDGS().images(
    keywords=name,
    region="wt-wt",
    safesearch="off",
    size=None,
    color="Monochrome",
    type_image=None,
    layout=None,
    license_image=None,
    max_results=10,
    )


    for i in results:
        try:
            urllib.request.urlretrieve(i['image'], "ryby/fotki/" + fotoname(name))
            break
        except:
            continue