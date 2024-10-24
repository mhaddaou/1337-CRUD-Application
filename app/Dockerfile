FROM node:18

WORKDIR /frontend

RUN apt-get update -y

COPY ./*.json ./

RUN npm i

COPY ./ ./

RUN npm run build
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]