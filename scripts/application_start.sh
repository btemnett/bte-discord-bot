#!/bin/bash
cd /home/ubuntu/nodejs/slooky
tsc -p /home/ubuntu/nodejs/slooky
cross-env NODE_ENV=production pm2 start /home/ubuntu/nodejs/slooky/dist/index.js