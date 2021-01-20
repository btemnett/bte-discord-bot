tsc -p .
pm2 start cross-env NODE_ENV=production ./dist/index.js