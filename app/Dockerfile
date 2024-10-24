FROM node:18

WORKDIR /application

RUN apt-get update -y

COPY ./*.json ./

RUN npm i

COPY ./ ./

RUN chmod +x script.sh

CMD ["sh", "./script.sh"]