# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=24

ARG BASE_IMAGE="mcr.microsoft.com/azurelinux/base/nodejs:${NODE_VERSION}"

FROM ${BASE_IMAGE} AS builder
WORKDIR /app

COPY . .

RUN npm install --no-package-lock

RUN npm run build

FROM ${BASE_IMAGE}
WORKDIR /app

# Azure Linux base image does not include wget by default
RUN tdnf install -y wget && tdnf clean all

# Copy only the built app and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm install --only=production

CMD ["node", "dist/index.js"]
