#!/bin/sh
echo -e "START...\n---------------------------------"

if [ -d "org" ] && [ -d "public" ]
then
    mv "org" "org.bak"
    mv "public" "public.bak"

    echo -e "START pull the latest repo...\n"
    git pull virgo master
    echo -e "... ... ...\n"
    echo -e "Pull DONE."

    rm -rf "org" && mv "org.bak" "org"
    rm -rf "public" && mv "public.bak" "public"
    echo -e "... ... ...\n"
    echo -e "Posts recover DONE."

    rm -rf "public/assets" && cp -r "assets" "public/"
    rm -rf "public/css" && cp -r "css" "public/"
    rm -rf "public/images" && cp -r "images" "public/"
    rm -rf "public/js" && cp -r "js" "public/"
    rm -rf "public/user.config.js" && cp -r "user.config.js" "public/"
    rm -rf "public/webfonts" && cp -r "webfonts" "public/"

    echo -e "... ... ...\n"
    echo -e "Static resources recover DONE."
    echo -e "---------------------------------\nDONE."
fi
