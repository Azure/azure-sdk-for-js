#!/usr/bin/env bash
npm install -g @azure-tools/typespec-client-generator-cli@0.21.0
npm install -g @microsoft/rush@5.92.0
npm install -g @azure-tools/js-sdk-release-tools


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
