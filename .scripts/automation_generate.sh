#!/usr/bin/env bash

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo 'Build js-sdk-release-tools from local source'
cd "$REPO_ROOT/eng/tools/js-sdk-release-tools-src"
npm install
npm run build

cd "$REPO_ROOT"
node eng/tools/js-sdk-release-tools-src/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.74 --typespecEmitter=@azure-tools/typespec-ts
