from bs4 import BeautifulSoup

import requests
from duckduckgo import *
page_url = 'https://en.wikipedia.org/wiki/List_of_fish_common_names'
page = requests.get(page_url)
soup = BeautifulSoup(page.content, 'html.parser')

#print(soup.prettify())
fish_list = []
mis=0
for i in soup.find_all('a'):
    try:
        if len(i['title'])>40 or '.' in i['title'] or len(i['title'])<3:
            continue
        fish_list.append(i['title'])
    except:
        mis+=1
#print(fish_list.index('African glass catfish'))
#print(fish_list.index('Zebra tilapia'))
#print(fish_list[30:1128])
fish_list=fish_list[30:1128]

#special
fish_list = fish_list[0:10]

for i in range (len(fish_list)):
    fish_list[i]=("byry/"+fish_list[i].replace(" ", "_") + ".md", fish_list[i])
    byry(fish_list[i][1])



with open("ryby/index.md", "w") as f:
    with open("title.md", "r") as r:
        f.write(r.read() + "\n") 
    for i in fish_list:
        f.write('- [' + i[1] + '](' + i[0] + ')' + "\n")


#print(mis)
#print(type(list_all_p))