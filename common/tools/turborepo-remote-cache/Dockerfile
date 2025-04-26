# Use an official node 22-slim image
FROM node:22-alpine

# Install Node.js LTS, pnpm, and other dependencies
RUN npm install -g pnpm

# Install to /bin/bash
RUN apk add --no-cache bash

ARG NODE_ENV=production

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
