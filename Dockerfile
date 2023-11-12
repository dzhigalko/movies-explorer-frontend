FROM node:18 AS builder

WORKDIR /app
COPY . /app

ARG REACT_APP_MAIN_API_URL
ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV
ENV REACT_APP_MAIN_API_URL=$REACT_APP_MAIN_API_URL

RUN npm i && npm run build

FROM nginx

COPY nginx /etc/nginx/templates/
COPY --from=builder /app/build /usr/share/nginx/html
