#! /bin/bash -e

rm -rf ./build/html/
mkdir ./build/html/

rm -rf ../doc/
mkdir ../doc/

./node_modules/browserify/bin/cmd.js index.js -o  ../doc/bundle.js
cp ./index.html ./build/html/
cp ./index.html ../doc/

echo "Done building \"./build/html\" at `date`"
