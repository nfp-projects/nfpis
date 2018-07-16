###########################
# Website
###########################
FROM node:alpine as build

ENV HOME=/app

COPY package.json $HOME/

WORKDIR $HOME

RUN apk add --no-cache make gcc g++ python && \
    npm install && \
    apk del make gcc g++ python

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

RUN apk add --no-cache make gcc g++ python && \
    npm install --production && \
    apk del make gcc g++ python

COPY --from=build /app/public $HOME/public

EXPOSE 3000

CMD ["npm", "start"]
