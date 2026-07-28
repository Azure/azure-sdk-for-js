FROM mcr.microsoft.com/azurelinux/base/nodejs:20.14 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set the working directory in the container
WORKDIR /app

# Copy the .npmrc (points npm/pnpm at the internal azure-sdk feed) and
# package.json before installing pnpm so both the npm bootstrap of pnpm and
# all subsequent pnpm installs use the internal registry.
COPY .npmrc package.json ./

# npm ignores a project/cwd-level .npmrc when installing global packages
# (`npm install -g`), so point npm's *user* config at the copied .npmrc. This
# makes the internal feed apply to the pnpm bootstrap below. pnpm's later
# installs run in WORKDIR /app and pick up the same .npmrc as project config.
ENV NPM_CONFIG_USERCONFIG=/app/.npmrc

RUN npm install -g pnpm

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
