# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=22

# Optional registry prefix. Leave blank to use default Docker.
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
