#!/bin/bash
# Record the SDK Chat demo GIF
# Usage: ./demo/record.sh
set -e

cd "$(git rev-parse --show-toplevel)"

docker build -f demo/Dockerfile -t sdk-chat-demo .

docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$(pwd)":/workspace -w /workspace \
  -v ~/.copilot:/root/.copilot:ro \
  -v ~/.config/github-copilot:/root/.config/github-copilot:ro \
  -e GH_TOKEN \
  sdk-chat-demo
