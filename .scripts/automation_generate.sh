#!/usr/bin/env bash
echo "Before changing directory: $(pwd)"
cd ../../../../..
echo "After changing to azure-sdk-for-js root: $(pwd)"
cd azure-sdk-for-js
echo "After changing to azure-sdk-for-js: $(pwd)"
node ../azure-sdk-tools/tools/js-sdk-release-tools/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.12 --typespecEmitter=@azure-tools/typespec-ts
