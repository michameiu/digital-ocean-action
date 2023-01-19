#!/bin/bash
echo -e $1 $2
git add *
git commit -m "$1"
git tag -a -m "$1" "$2"
git push --follow-tags