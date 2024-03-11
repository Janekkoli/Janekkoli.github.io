from duckduckgo_search import DDGS
from langchain_community.tools import DuckDuckGoSearchRun
from bs4 import BeautifulSoup
# results = DDGS().text("African glass catfish", max_results=5)
# soup = BeautifulSoup(str(results),features="lxml")

search = DuckDuckGoSearchRun() 

def filename(name : str):
    whitelist = set('abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ_')

    return ''.join(filter(whitelist.__contains__, name.replace(" ","_")))+ ".md"


def text_for_fish(name : str): 
    return search.run(name)


def byry(name : str):
    with open("ryby/byry/"+filename(name), "w") as s:
        s.write("## [back](../index.md) \n" +"# "+name+"\n"+text_for_fish(name))