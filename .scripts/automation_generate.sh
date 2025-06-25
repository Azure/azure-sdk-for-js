#!/usr/bin/env bash

cd ..

# Hardcode branch to applyLegacySettingsMapping
branch="applyLegacySettingsMapping"
echo "Using branch: $branch"

if [ -d "azure-sdk-tools" ]; then
    echo "Delete folder azure-sdk-tools"
    rm -rf azure-sdk-tools
else
    echo "azure-sdk-tools folder does not exist."
fi

echo 'clone azure-sdk-tools'
git clone https://github.com/Azure/azure-sdk-tools/

cd azure-sdk-tools
if [ -z "$branch" ]; then
  echo 'branch is empty'
else
    git checkout -b test $branch
    echo git checkout -b test $branch
fi

echo '-------------- git status start'
git status
echo '-------------- git status end'

cd tools/js-sdk-release-tools
npm install
npm run build
cd ../../..

cd azure-sdk-for-js
node ../azure-sdk-tools/tools/js-sdk-release-tools/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.12 --typespecEmitter=@azure-tools/typespec-ts
