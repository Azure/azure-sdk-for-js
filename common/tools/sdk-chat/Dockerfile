# SDK Chat Development Container
# Used for: local development, CI, testing
#
# Build:  docker build -t sdk-chat-dev .
# Run:    docker run --rm -u $(id -u):$(id -g) -v $(pwd):/workspace sdk-chat-dev dotnet build
# Shell:  docker run --rm -it -u $(id -u):$(id -g) -v $(pwd):/workspace sdk-chat-dev bash
# Test:   docker run --rm -u $(id -u):$(id -g) -v $(pwd):/workspace sdk-chat-dev
#
# For demo recording: use demo/Dockerfile

FROM mcr.microsoft.com/dotnet/sdk:10.0

LABEL org.opencontainers.image.source="https://github.com/deyaaeldeen/sdk-chat"
LABEL org.opencontainers.image.description="SDK Chat development environment"

# Install language runtimes for Public API Graph Engines and AOT compilation tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Core tools
    curl git unzip openssh-client \
    # AOT native compilation (linker)
    clang zlib1g-dev \
    # Docker CLI (uses host's Docker via socket mount)
    docker.io \
    # Python engine
    python3 python3-pip \
    # Go engine
    golang-go \
    # Java engine (JDK for JBang to compile .java scripts)
    default-jdk-headless \
    && rm -rf /var/lib/apt/lists/*

# Install Volta and Node.js 20+ (system nodejs is too old for ESM / ts-morph)
ENV VOLTA_HOME=/opt/volta
RUN curl https://get.volta.sh | bash -s -- --skip-setup && \
    /opt/volta/bin/volta install node@22 && \
    chmod -R a+rx /opt/volta
ENV PATH="$VOLTA_HOME/bin:$PATH"

# Install JBang for Java engine
ENV JBANG_DIR=/opt/jbang
RUN curl -Ls https://sh.jbang.dev | bash -s - app setup && \
    chmod -R a+rx /opt/jbang && \
    mkdir -p /opt/jbang/cache && \
    chmod -R a+rwx /opt/jbang/cache
ENV PATH="$PATH:/opt/jbang/bin"

# Install GitHub Copilot CLI
RUN curl -fsSL https://gh.io/copilot-install | bash

# Security: Create non-root user
# Use UID/GID 1000 to match typical Linux host user (avoids permission issues in dev containers)
# Handle case where GID/UID 1000 already exists in base image
ARG USER_UID=1000
ARG USER_GID=1000
RUN if ! getent group $USER_GID >/dev/null; then groupadd --gid $USER_GID sdkchat; fi && \
    if ! getent passwd $USER_UID >/dev/null; then \
        useradd --uid $USER_UID --gid $USER_GID --shell /bin/bash --create-home sdkchat; \
    else \
        # User exists, just ensure home directory and shell are correct
        existing_user=$(getent passwd $USER_UID | cut -d: -f1) && \
        usermod -d /home/sdkchat -m -l sdkchat "$existing_user" 2>/dev/null || true; \
    fi && \
    mkdir -p /workspace /home/sdkchat && \
    chown -R $USER_UID:$USER_GID /workspace /home/sdkchat

# Environment
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1
ENV DOTNET_NOLOGO=1

WORKDIR /workspace

# Switch to non-root user
USER sdkchat

# Default: run tests
CMD ["dotnet", "test"]
