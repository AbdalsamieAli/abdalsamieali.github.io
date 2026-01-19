import sys

import json
from jinja2 import *


env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('posts_template.html')

index = int(sys.argv[1]) 

with open('data.json', 'r') as data:
    context = json.load(data)

context.update({'index': index})

content = template.render(context)

with open(f"posts/no{index +1}.html", 'w') as f:
    f.write(content)
