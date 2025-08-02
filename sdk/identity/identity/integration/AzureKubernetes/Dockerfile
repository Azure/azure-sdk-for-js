# ------------------------------------
# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.
# ------------------------------------
ARG NODE_VERSION=20

# Using Azure Linux base Node.js images instead of deprecated MCR mirror
# All users (internal and public) now use the same Azure Linux base image
FROM mcr.microsoft.com/azurelinux/base/nodejs:${NODE_VERSION} as builder
WORKDIR /app

COPY . .

RUN npm install --no-package-lock

RUN npm run build

FROM mcr.microsoft.com/azurelinux/base/nodejs:${NODE_VERSION}
WORKDIR /app

# Copy only the built app and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN npm install --only=production

CMD ["node", "dist/index.js"]
