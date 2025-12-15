import json
from jinja2 import *


env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('posts_template.html')

index = 1

with open('data.json', 'r') as data:
    context = json.load(data)

context.update({'index': index-1})
content = template.render(context)

with open(f"posts/no{index}.html", 'w') as f:
    f.write(content)
