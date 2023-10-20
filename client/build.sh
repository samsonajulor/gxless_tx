#! /bin/bash -e

rm -rf ./build/html/
mkdir ./build/html/

rm -rf ../index.html
rm -rf ../index.js

rm -rf ../doc/index.html
rm -rf ../doc/index.js

./node_modules/browserify/bin/cmd.js index.js -o  ../doc/index.js
./node_modules/browserify/bin/cmd.js index.js -o  ./build/html/index.js

cp ./index.html ./build/html/
cp ./index.html ../doc

echo "Done building \"./build/html\" at `date`"
