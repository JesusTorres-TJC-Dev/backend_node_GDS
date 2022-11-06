FROM node:16.18.0

WORKDIR /app

RUN npm install npm@latest ts-node ts-node-dev -g

COPY package.json package-lock*.json ./

RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .

ENV PORT 3001
EXPOSE $PORT
CMD ["node", "src/index.ts"]