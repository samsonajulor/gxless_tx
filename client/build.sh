#! /bin/bash -e

rm -rf ./build/html/
mkdir ./build/html/

rm -rf ../index.html
rm -rf ../bundle.js

./node_modules/browserify/bin/cmd.js index.js -o  ../doc/bundle.js

cp ./index.html ./build/html/
cp ./index.html ../

echo "Done building \"./build/html\" at `date`"
