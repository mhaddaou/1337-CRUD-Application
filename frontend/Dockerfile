FROM node:20

WORKDIR /frontend

RUN apt-get update -y

COPY ./*.json ./

RUN npm i

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]