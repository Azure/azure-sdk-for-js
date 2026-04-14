# Go Public API Graph Engine - Minimal Docker image
# Fully static binary, no runtime dependencies.
#
# Build:  docker build -f engines/go/Dockerfile -t public-api-graph-engine-go:latest .
# Size:   ~5MB
#
# Usage:
#   docker run --rm -v /path/to/sdk:/path/to/sdk:ro public-api-graph-engine-go:latest /path/to/sdk --json

FROM golang:1.22-alpine AS build

WORKDIR /src
COPY src/PublicApiGraphEngine.Go/graph_api.go .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags='-s -w' \
    -o /go_engine graph_api.go

FROM scratch
COPY --from=build /go_engine /engine
ENTRYPOINT ["/engine"]
