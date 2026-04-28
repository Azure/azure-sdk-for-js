# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=22

# Use the MCR-hosted Node.js image (Azure Linux 3) instead of docker.io/library/node
# to avoid Docker Hub pull rate limits and intermittent registry timeouts in CI.
# Override REGISTRY (e.g. with an ACR login server) if pulling through a cache.
ARG REGISTRY="mcr.microsoft.com/"

FROM ${REGISTRY}azurelinux/base/nodejs:${NODE_VERSION} AS builder
WORKDIR /app

COPY . .

RUN npm install --no-package-lock

RUN npm run build

FROM ${REGISTRY}azurelinux/base/nodejs:${NODE_VERSION}
WORKDIR /app

# Copy only the built app and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm install --only=production

CMD ["node", "dist/index.js"]
