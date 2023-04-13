# Builder
FROM node:latest as builder

WORKDIR /social-network
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./src/ ./src/

RUN yarn install
RUN yarn build

WORKDIR /social-network

# Runner
FROM node:latest as runner

WORKDIR /social-network
COPY --from=builder /social-network/package.json .
COPY --from=builder /social-network/dist/ ./dist/

ENV NODE_ENV production

RUN yarn install

WORKDIR /social-network

EXPOSE 4000

ENV MONGO_DB_URI="mongodb://mongo-db:27017"

CMD ["yarn","start:build"]