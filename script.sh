#!/bin/bash

read -p 'Enter Post number/s: ' num

$(python generate.py | for i in $num ;do python postsgenerate.py $i ;done)
echo 'Done'

echo 'The server is starting...' 
$(python -m http.server 8000)
