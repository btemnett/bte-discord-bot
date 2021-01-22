#!/bin/bash
cd /home/ubuntu/nodejs/slooky
npm i
tsc -p .
cross-env NODE_ENV=production pm2 start ./dist/index.js