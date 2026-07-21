#!/usr/bin/env bash

cd ..

echo 'Build js-sdk-release-tools from local source'
pushd azure-sdk-for-js/eng/tools/js-sdk-release-tools-src
npm install
npm run build
popd

cd azure-sdk-for-js
node eng/tools/js-sdk-release-tools-src/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.74 --typespecEmitter=@azure-tools/typespec-ts
