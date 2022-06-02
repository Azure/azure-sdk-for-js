# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=10

# docker can't tell when the repo has changed and will therefore cache this layer
# internal users should provide MCR registry to build via 'docker build . --build-arg REGISTRY="mcr.microsoft.com/mirror/docker/library/"'
# public OSS users should simply leave this argument blank or ignore its presence entirely
ARG REGISTRY=""
FROM ${REGISTRY}alpine:3.14 as repo
RUN apk --no-cache add git
RUN git clone https://github.com/azure/azure-sdk-for-js --single-branch --branch master --depth 1 /azure-sdk-for-js

FROM ${REGISTRY}node:${NODE_VERSION}-slim

COPY --from=repo /azure-sdk-for-js/sdk/identity /sdk/identity
COPY --from=repo /azure-sdk-for-js/sdk/core /sdk/core
COPY --from=repo /azure-sdk-for-js/sdk/keyvault/keyvault-secrets /sdk/keyvault/keyvault-secrets

WORKDIR /sdk/identity/identity/test/manual-integration/Kubernetes
RUN npm install
RUN npm install -g typescript
RUN tsc -p .
CMD ["node", "index"]
