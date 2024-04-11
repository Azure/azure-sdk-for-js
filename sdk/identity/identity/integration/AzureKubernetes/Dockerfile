# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=20

# docker can't tell when the repo has changed and will therefore cache this layer
# internal users should provide MCR registry to build via 'docker build . --build-arg REGISTRY="mcr.microsoft.com/mirror/docker/library/"'
# public OSS users should simply leave this argument blank or ignore its presence entirely
ARG REGISTRY=""

FROM ${REGISTRY}node:${NODE_VERSION}-alpine as repo
WORKDIR /app

COPY . .

# Install the latest nightly build of identity
RUN npm install --no-package-lock

# Wait for the test to `exec` into the container and run the script
CMD ["sleep", "infinity"]
