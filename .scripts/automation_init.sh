#!/usr/bin/env bash
echo "Install tsp-client"
npm --prefix eng/common/tsp-client ci
npm install -g pnpm
npm install -g @azure-tools/js-sdk-release-tools
