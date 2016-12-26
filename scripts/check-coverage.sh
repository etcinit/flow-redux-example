#!/bin/bash

for file in src/*.js; do
  echo "$file"
  flow coverage "$file"
done
for file in src/*/**.js; do
  echo "$file"
  flow coverage "$file"
done
