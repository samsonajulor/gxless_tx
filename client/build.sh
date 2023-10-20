#! /bin/bash -e

rm -rf ./build/html/
mkdir ./build/html/

./node_modules/browserify/bin/cmd.js index.js -o  ./build/html/bundle.js
cp ./index.html ./build/html/

echo "Done building \"./build/html\" at `date`"
