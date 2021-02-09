#!/bin/sh

if [ -d "../public" ]
then
    b=''
    for ((i=0;$i<=100;i+=2))
    do 
        printf "statics copying:[%-50s]%d%%\r" $b $i
        sleep 0.01s
        b=#$b
    done  

    rm -rf "public/assets" && cp -r "assets" "public/"
    rm -rf "public/images" && cp -r "images" "public/"
    rm -rf "public/user.config.js" && cp -r "user.config.js" "public/"
    rm -rf "public/webfonts" && cp -r "webfonts" "public/"

    echo -e "\n---DONE---"

fi