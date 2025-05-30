FROM node:18

WORKDIR /application

COPY package*.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production

CMD ["node", "./src/app/index.js"]