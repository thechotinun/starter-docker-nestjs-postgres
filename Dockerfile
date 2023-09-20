FROM node:20.7.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3100

CMD ["npm", "run", "start:prod"]