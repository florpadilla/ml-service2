FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN apt-get update || : && apt-get install -y python build-essential

RUN npm install

EXPOSE 3000

COPY . .

CMD [ "npm", "start"]
