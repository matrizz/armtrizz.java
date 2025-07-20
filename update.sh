#!/bin/sh

pm2 stop matrizz.java

git pull

pnpm i

pm2 start index.js --name matrizz.java