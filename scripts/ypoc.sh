#!/bin/sh
# ------------------------------
# Copy`themes, images` and `user.config.js` 
# from PUBLIC to ROOT directory.
# PUBLIC ==> ROOT
# ------------------
# Generally run it in or after develpment job.
# ------------------------------

if [ -d "public" ]
then
    b=''
    for ((i=0;$i<=100;i+=2))
    do 
        printf "YPOC:[%-50s]%d%%\r" $b $i
        sleep 0.01s
        b=#$b
    done  

    rm -rf "themes" && cp -r "public/themes" "./"
    rm -rf "images" && cp -r "public/images" "./"
    rm -rf "user.config.js" && cp -r "public/user.config.js" "./"

    echo -e "\e[1;42mDONE\e[0m\n"
fi