FROM node:24-alpine

WORKDIR /api

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "node", "src/server.js" ]