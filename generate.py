import json
from jinja2 import *


env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('index_template.html')

with open('data.json', 'r') as data:
    context = json.load(data)

content = template.render(context)

with open("index.html", 'w') as f:
    f.write(content)
