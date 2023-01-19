#!/bin/bash
echo -e $1 $2
ncc build index.js --license licenses.txt  
git add *
git commit -m "$1"
git tag -a -m "$1" "$2"
git push --follow-tags