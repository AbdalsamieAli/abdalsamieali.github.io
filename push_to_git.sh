#!/bin/bash

git status
git add .

read -p 'commit massige/s: ' co

git commit -m "$co"

git push origin main
