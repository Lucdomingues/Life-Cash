FROM node:24-alpine

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "--watch", "src/server.js" ]