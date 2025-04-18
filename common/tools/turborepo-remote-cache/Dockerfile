# Use an official Ubuntu base image
FROM node:22-slim

# Install Node.js LTS, pnpm, and other dependencies
RUN apt-get update && apt-get install -y \
  curl \
  && npm install -g pnpm \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Azure CLI
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

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
