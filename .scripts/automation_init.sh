#!/usr/bin/env bash
set -e
npm --prefix eng/common/tsp-client ci
npm install -g pnpm
npm --prefix eng/tools/js-sdk-release-tools ci
npm --prefix eng/tools/js-sdk-release-tools run build
echo "Using local @azure-tools/js-sdk-release-tools version:"
npm --prefix eng/tools/js-sdk-release-tools pkg get version || true
