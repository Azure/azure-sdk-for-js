# internal users should provide MCR registry to build via 'docker build . --build-arg REGISTRY="mcr.microsoft.com/mirror/docker/library/"'
# public OSS users should simply leave this argument blank or ignore its presence entirely
ARG REGISTRY=""
FROM ${REGISTRY}node:18
RUN mkdir -p /app/src/
ADD ./app/src/*.ts /app/src/
COPY ./azure-core-util-1.5.0.tgz .
COPY ./azure-event-hubs-5.11.2.tgz .
ADD ./app/package.json /app/package.json
ADD ./app/tsconfig.json /app/tsconfig.json
WORKDIR /app
RUN npm install
RUN npm install ../azure-core-util-1.5.0.tgz
RUN npm install ../azure-event-hubs-5.11.2.tgz 
RUN npm run build
RUN ls
# ENV DEBUG=azure*,rhea*
ENTRYPOINT ["node"];
