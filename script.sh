#!/bin/bash

read -p 'Enter Post number Start Index/s: ' st
read -p 'End Index/s: ' en

$(python generate.py | for ((i=$st; i <= $en; i++)) ;do python postsgenerate.py $i ;done)
echo 'Done'

echo 'The server is starting...' 
$(python -m http.server 8000)
