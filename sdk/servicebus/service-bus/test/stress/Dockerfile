FROM node:8-alpine
RUN mkdir -p /src
ADD ./src/*.ts /src
ADD ./package.json /package.json
ADD ./tsconfig.json /tsconfig.json
RUN npm install && npm run build
WORKDIR /
ENTRYPOINT ["node"];
