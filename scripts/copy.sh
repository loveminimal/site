#!/bin/sh

if [ -d "public" ]
then
    b=''
    for ((i=0;$i<=100;i+=2))
    do 
        printf "COPY:[%-50s]%d%%\r" $b $i
        sleep 0.01s
        b=#$b
    done  

    rm -rf "public/themes" && cp -r "themes" "public/"
    rm -rf "public/images" && cp -r "images" "public/"
    # rm -rf "public/user.config.js" && cp -r "user.config.js" "public/"

    echo -e "\e[1;42mDONE\e[0m\n"
fi