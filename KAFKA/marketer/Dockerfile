FROM node:18.15.0-alpine
WORKDIR /app
COPY package.json index.js /app/
RUN npm i
RUN npm i -g nodemon
CMD [ "nodemon", "index.js"]