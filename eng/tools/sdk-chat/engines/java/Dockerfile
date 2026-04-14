# Java Public API Graph Engine - Minimal Docker image
# GraalVM native image on debian-slim for glibc compatibility.
#
# Build:  docker build -f engines/java/Dockerfile -t public-api-graph-engine-java:latest .
# Size:   ~90MB
#
# Usage:
#   docker run --rm -v /path/to/sdk:/path/to/sdk:ro public-api-graph-engine-java:latest /path/to/sdk --json

FROM ghcr.io/graalvm/native-image-community:21 AS build

ENV JBANG_DIR=/opt/jbang
RUN curl -Ls https://sh.jbang.dev | bash -s - app setup
ENV PATH="$PATH:/opt/jbang/bin"

WORKDIR /src
COPY src/PublicApiGraphEngine.Java/GraphApi.java .
RUN jbang export native --fresh --force -O java_engine GraphApi.java

FROM debian:trixie-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build /src/java_engine /engine
ENTRYPOINT ["/engine"]
