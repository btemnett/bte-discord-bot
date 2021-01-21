#!/bin/bash
cd /home/ubuntu/nodejs
pwd
ls
tsc -p .
cross-env NODE_ENV=production pm2 start ./dist/index.js