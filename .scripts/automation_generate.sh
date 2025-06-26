#!/usr/bin/env bash

cd ../../../..
cd azure-sdk-for-js
node ../azure-sdk-tools/tools/js-sdk-release-tools/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.12 --typespecEmitter=@azure-tools/typespec-ts
