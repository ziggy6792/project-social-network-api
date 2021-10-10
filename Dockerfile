# Builder
FROM node:latest as builder

WORKDIR /horangi-assignment
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./src/ ./src/

RUN yarn install
RUN yarn build

WORKDIR /horangi-assignment

# Runner
FROM node:latest as runner

WORKDIR /horangi-assignment
COPY --from=builder /horangi-assignment/package.json .
COPY --from=builder /horangi-assignment/dist/ ./dist/

ENV NODE_ENV production

RUN yarn install

WORKDIR /horangi-assignment

EXPOSE 4000

ENV MONGO_DB_URI="mongodb://mongo-db:27017"

CMD ["yarn","start:build"]