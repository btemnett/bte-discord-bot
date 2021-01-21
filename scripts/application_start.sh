#!/bin/bash
cd /home/ubuntu/nodejs/slooky
ls
npm run build
cross-env NODE_ENV=production pm2 start ./dist/index.js