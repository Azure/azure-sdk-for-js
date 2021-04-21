FROM node:8-alpine
RUN mkdir -p /src
ADD ./*.ts /src
ADD  ./temp.package.json /src/package.json
ADD  ./tsconfig.json /src/tsconfig.json
RUN cd /src && npm install && npm run build
WORKDIR /src
ENTRYPOINT ["node"];