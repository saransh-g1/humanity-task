FROM node:23-alpine AS base

WORKDIR /app

COPY package.json package-lock.json .
RUN npm install


COPY . .


EXPOSE 8080

CMD ["npm","start"]