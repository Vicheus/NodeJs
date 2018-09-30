FROM node:10.10-alpine as node

COPY package*.json /app/

WORKDIR /app

RUN npm i npm@latest -g
RUN npm install
RUN npm audit

EXPOSE 8090
