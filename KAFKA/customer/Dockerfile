FROM node:18.15.0-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm i
RUN npm i -g nodemon
COPY . .
CMD [ "nodemon", "index.js"]