# Use an official node 22 image
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install to /bin/bash
RUN apk add --no-cache bash

# Conditionally install Azure CLI if NODE_ENV is development
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "development" ]; then \
  curl -sL https://aka.ms/InstallAzureCLIDeb | bash; \
  fi

# Set the working directory in the container
WORKDIR /app

# Copy package.json
COPY package.json ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

FROM base AS build
COPY . ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

# Expose the port the application will run on (if applicable)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/index.js"]
