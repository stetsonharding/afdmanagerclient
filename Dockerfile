FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
COPY . .
RUN npm install
EXPOSE 44455
CMD npm start