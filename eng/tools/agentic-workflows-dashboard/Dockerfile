# Agentic Workflows Collector - Container Image
# 
# Includes Node.js, gh CLI, and gh-aw extension for auditing workflow runs

FROM node:20-slim

# Install dependencies for gh CLI
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install gh CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y gh \
    && rm -rf /var/lib/apt/lists/*

# Install gh-aw extension (GitHub Agentic Workflows)
RUN gh extension install github/gh-aw || true

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built application
COPY dist/ ./dist/

# Set environment
ENV NODE_ENV=production

# Run the collector
CMD ["node", "dist/collector-job.js"]
