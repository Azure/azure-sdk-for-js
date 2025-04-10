# Use an official Ubuntu base image
FROM ubuntu:24.04

# Set environment variables
ENV NODE_VERSION=22 \
  DEBIAN_FRONTEND=noninteractive

# Install Node.js LTS, pnpm, and other dependencies
RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g pnpm \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the .env file explicitly if it exists
COPY .env .env

# Copy the rest of the application code, excluding node_modules and .env
COPY . ./
RUN rm -rf node_modules && pnpm install --offline

# Build the project
RUN pnpm build

# Expose the port the application will run on (if applicable)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/index.js"]
