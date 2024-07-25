FROM node:19-alpine

ENV PORT=4000

WORKDIR /app

COPY package*.json .

RUN npm install --production

COPY ./src ./src

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
