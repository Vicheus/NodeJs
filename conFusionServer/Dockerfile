FROM node:11-alpine as node

RUN apk add python

COPY package*.json /app/

WORKDIR /app

RUN npm i npm@latest -g
RUN npm i express-generator-ts -g
#RUN npm install
#RUN npm rebuild node-sass --force
#RUN npm audit

EXPOSE 8090
