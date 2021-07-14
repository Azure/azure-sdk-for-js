# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=12

# docker can't tell when the repo has changed and will therefore cache this layer
FROM alpine/git as repo
RUN echo "hello there BEFORE clone"
RUN git clone https://github.com/KarishmaGhiya/azure-sdk-for-js --single-branch --branch service-fabric --depth 1 /azure-sdk-for-js

FROM node:${NODE_VERSION}-slim

RUN echo "hello there BEFORE copy"
COPY --from=repo /azure-sdk-for-js/sdk/identity /sdk/identity

RUN echo "hello there BEFORE workdir"
WORKDIR /sdk/identity/identity/test/manual-integration/AzureServiceFabric

RUN echo "hello there BEFORE npm install"
RUN npm install
RUN npm install -g typescript
RUN echo "hello there BEFORE ts-node"
CMD ["./node_modules/.bin/ts-node", "index"]