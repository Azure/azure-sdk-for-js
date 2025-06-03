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

# Install the latest nightly build of identity
RUN npm install --no-package-lock

# Build the identity package
RUN npm run build

# Remove unnecessary files to reduce image size
FROM ${REGISTRY}node:${NODE_VERSION}-alpine
WORKDIR /app

# Copy only the built app and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only production dependencies
RUN npm install --only=production

# Start the app
CMD ["node", "dist/index.js"]
