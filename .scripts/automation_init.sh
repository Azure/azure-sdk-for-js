#!/usr/bin/env bash
echo "Install tsp-client"
cd eng/common/tsp-client
npm ci
cd ../../..
npm install -g pnpm
npm install -g @azure-tools/js-sdk-release-tools
