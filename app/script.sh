#!/bin/sh

# Ensure prisma is installed globally
npm install -g prisma

npx prisma db push
npx prisma generate
npm run build
cd /app && npm run start
