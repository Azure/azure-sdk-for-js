#!/usr/bin/env bash
node eng/tools/js-sdk-release-tools-src/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.74 --typespecEmitter=@azure-tools/typespec-ts
