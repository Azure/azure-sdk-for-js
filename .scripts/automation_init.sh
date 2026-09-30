#!/usr/bin/env bash
set -e
npm --prefix eng/common/tsp-client ci
package_manager=$(node -p "require('./package.json').packageManager")
npm install -g "$package_manager"
pnpm install --frozen-lockfile
pnpm turbo build --filter=@azure-tools/js-sdk-release-tools... --token 1
echo "Using local @azure-tools/js-sdk-release-tools version:"
node -p "require('./eng/tools/js-sdk-release-tools/package.json').version" || true
