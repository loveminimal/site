#!/bin/sh
echo -e "---------\n- START -\n---------"

if [ -d "public" ]
then
    echo -e "Copying..."
    
    for i in 1 2 3 4 5 6
    do 
        sleep 0.1
        echo -e "    |>>> +++ +++ +++ +++ +++ >>>|"
    done  

    rm -rf "public/assets" && cp -r "assets" "public/"
    rm -rf "public/css" && cp -r "css" "public/"
    rm -rf "public/images" && cp -r "images" "public/"
    rm -rf "public/js" && cp -r "js" "public/"
    rm -rf "public/user.config.js" && cp -r "user.config.js" "public/"
    rm -rf "public/webfonts" && cp -r "webfonts" "public/"


echo -e "---------\n- DONE  -\n---------"
fi