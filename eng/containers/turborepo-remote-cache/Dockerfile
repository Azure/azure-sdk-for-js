FROM mcr.microsoft.com/azurelinux/base/nodejs:20.14 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

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
