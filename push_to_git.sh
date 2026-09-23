#!/bin/bash

git status
git add .

read -p 'commit massige/s: ' co

git commit -m "$co"


read -p 'Ready to push 0/1/s: ' pu
if (( pu==1 )); then
    git push origin main
fi
