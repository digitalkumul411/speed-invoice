FROM node:16-alpine AS builder
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.js .
RUN npm install 
COPY backend/ .

RUN npm install && npm install nodemon --save-dev

EXPOSE 5000
CMD ['yarn', 'start']