# TypeScript Public API Graph Engine - Minimal Docker image
# Bun-compiled binary on debian-slim for glibc compatibility.
#
# Build:  docker build -f engines/typescript/Dockerfile -t public-api-graph-engine-typescript:latest .
# Size:   ~90MB
#
# Usage:
#   docker run --rm -v /path/to/sdk:/path/to/sdk:ro public-api-graph-engine-typescript:latest /path/to/sdk --json

FROM oven/bun:1-debian AS build

WORKDIR /src
COPY src/PublicApiGraphEngine.TypeScript/package.json src/PublicApiGraphEngine.TypeScript/package-lock.json* ./
COPY src/PublicApiGraphEngine.TypeScript/src/ ./src/
RUN bun install && bun run build
RUN bun build --compile --minify ./dist/graph_api.js --outfile ts_engine

FROM debian:trixie-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build /src/ts_engine /engine
ENTRYPOINT ["/engine"]
