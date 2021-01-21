#!/bin/bash
pwd
ls ~/home/ubuntu/nodejs
tsc -p .
cross-env NODE_ENV=production pm2 start ./dist/index.js