import math
import json
from jinja2 import *



env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('index_template.html')

with open('data.json', 'r') as data:
    context = json.load(data)


postsOR = context['posts']
postsOR.reverse()

total_posts = len(postsOR)

pages = math.ceil(total_posts / 10)

page_n = "index.html"
i = 0
for page in range(pages):

    prev = f"index_{page -1}.html"
    if page == 1 or page == 0:
        prev = "index.html"
    if page == pages-1:
        posts = postsOR[i:]
        nex = 0

    else:
        posts = postsOR[i:i+10]
        nex = page + 1
    
    i = i + 10

    page_obj = {
        "page_obj": {
            "has_previous":page,   #newer
            "has_next":nex,        #older
            "previous_page": prev,
            "next_page":  f"index_{nex}.html"            }
        }

    context['posts'] = posts
    context |= page_obj

    content = template.render(context)
    with open(page_n, 'w') as f:
        f.write(content)

    page_n = f"index_{nex}.html"
