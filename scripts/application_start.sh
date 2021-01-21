#!/bin/bash
tsc -p .
cross-env NODE_ENV=production pm2 start ./dist/index.js