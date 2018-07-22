###########################
# Website
###########################
FROM node:alpine as build

ENV HOME=/app

COPY package.json $HOME/

WORKDIR $HOME

RUN npm install

COPY app $HOME/app
COPY public $HOME/public

RUN npm run build

###########################
# Server
###########################
FROM node:alpine

ENV HOME=/app \
    NODE_ENV=production

COPY config.json package.json $HOME/

WORKDIR $HOME

RUN npm install --production

COPY --from=build /app/public $HOME/public

EXPOSE 3000

CMD ["npm", "start"]
