FROM node:8-alpine
RUN mkdir -p /src
ADD dist/* /src/
ADD  ./package.json /src/
ADD ./package-lock.json /src/
RUN cd /src && npm install
WORKDIR /src
ENTRYPOINT ["node"];
