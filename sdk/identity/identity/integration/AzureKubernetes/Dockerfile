# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=18

# docker can't tell when the repo has changed and will therefore cache this layer
# internal users should provide MCR registry to build via 'docker build . --build-arg REGISTRY="mcr.microsoft.com/mirror/docker/library/"'
# public OSS users should simply leave this argument blank or ignore its presence entirely
ARG REGISTRY=""

FROM ${REGISTRY}node:${NODE_VERSION}-alpine as builder
WORKDIR /app

COPY . .

RUN npm install --no-package-lock

RUN npm run build

FROM ${REGISTRY}node:${NODE_VERSION}-alpine
WORKDIR /app

# Copy only the built app and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm install --only=production

CMD ["node", "dist/index.js"]
