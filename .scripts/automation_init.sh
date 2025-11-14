#!/usr/bin/env bash
npm --prefix eng/common/tsp-client ci
npm install -g pnpm
npm --prefix eng/common/js-sdk-release-tools ci
