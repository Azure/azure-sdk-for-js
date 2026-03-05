# SDK Chat Demo Recording Container
# Used for: VHS demo recording with Docker-in-Docker
#
# Build:  docker build -f demo/Dockerfile -t sdk-chat-demo .
# Record: docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd):/workspace -w /workspace \
#           -v ~/.copilot:/root/.copilot:ro -v ~/.config/github-copilot:/root/.config/github-copilot:ro \
#           -e GH_TOKEN sdk-chat-demo

FROM ubuntu:24.04

LABEL org.opencontainers.image.source="https://github.com/deyaaeldeen/sdk-chat"
LABEL org.opencontainers.image.description="SDK Chat demo recording environment"

# Install demo recording dependencies + Docker CLI
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Core tools
    curl git ca-certificates wget \
    # VHS demo recording dependencies
    ffmpeg ttyd fonts-liberation \
    libasound2t64 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 \
    libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libxcomposite1 \
    libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils \
    # Docker CLI for Docker-in-Docker
    docker.io \
    && rm -rf /var/lib/apt/lists/*

# Install .NET SDK 10.0 (needed by the CLI)
RUN curl -fsSL https://dot.net/v1/dotnet-install.sh -o /tmp/dotnet-install.sh \
    && bash /tmp/dotnet-install.sh --channel 10.0 --install-dir /usr/share/dotnet \
    && ln -sf /usr/share/dotnet/dotnet /usr/local/bin/dotnet \
    && rm /tmp/dotnet-install.sh
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1

# Install Chrome for VHS headless rendering
RUN curl -fsSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /tmp/chrome.deb \
    && (dpkg -i /tmp/chrome.deb || apt-get install -fy) \
    && rm -rf /tmp/chrome.deb

# Install VHS
RUN curl -fsSL https://github.com/charmbracelet/vhs/releases/download/v0.10.0/vhs_0.10.0_Linux_x86_64.tar.gz \
    | tar -xz --strip-components=1 -C /usr/local/bin vhs_0.10.0_Linux_x86_64/vhs

# Clone demo SDK
RUN git clone --depth 1 https://github.com/openai/openai-dotnet /root/openai-dotnet

# Create scripts directory
RUN mkdir -p /root/scripts

# Install GitHub Copilot CLI
RUN curl -fsSL https://gh.io/copilot-install | bash

# Environment
ENV VHS_NO_SANDBOX=true

WORKDIR /workspace

# Copy entrypoint
COPY demo/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copilot auth dirs are mounted at runtime (-v ~/.copilot:/root/.copilot:ro etc.)
# VHS needs root for Chrome sandbox
ENTRYPOINT ["/entrypoint.sh"]
