#!/bin/sh
# -------------------
# Deploy posts to `loveminimal.github.io`
# -------------------

if [ -d "public" ]
then
    cp -r "public" "../.temp"
    cd "../.temp"
    pwd
    git init
    git add .
    git commit -m "Posts update."
    git remote add origin https://github.com/loveminimal/loveminimal.github.io.git
    git push -f origin master:main
    cd ..
    rm -rf ".temp"
    cd "site"
fi