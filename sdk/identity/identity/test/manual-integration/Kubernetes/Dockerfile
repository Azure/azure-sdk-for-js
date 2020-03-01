# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=10

# docker can't tell when the repo has changed and will therefore cache this layer
FROM alpine/git as repo
RUN git clone https://github.com/azure/azure-sdk-for-js --single-branch --branch master --depth 1 /azure-sdk-for-js

FROM node:${NODE_VERSION}-slim

COPY --from=repo /azure-sdk-for-js/sdk/identity /sdk/identity
COPY --from=repo /azure-sdk-for-js/sdk/core /sdk/core
COPY --from=repo /azure-sdk-for-js/sdk/keyvault/keyvault-secrets /sdk/keyvault/keyvault-secrets

WORKDIR /sdk/identity/identity/test/manual-integration/Kubernetes
RUN npm install
RUN npm install -g typescript
RUN tsc -p .
CMD ["node", "index"]