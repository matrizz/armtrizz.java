#!/bin/sh

mkdir -p ./db

touch ./db/database.json

pnpm i

pm2 start index.js --name matrizz.java
