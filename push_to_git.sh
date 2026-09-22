#!/bin/bash

git status
git add .

read -p 'commit massige/s: ' co

git commit -m "$co"


read -p 'Ready to push/s: ' pu
if (( pu==1 )); then
    git push origin main
fi
