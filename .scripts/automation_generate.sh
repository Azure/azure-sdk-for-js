#!/usr/bin/env bash

cd ..

if [ -d "azure-sdk-tools" ]; then
    echo "Delete folder azure-sdk-tools"
    rm -rf azure-sdk-tools
else
    echo "azure-sdk-tools folder does not exist."
fi

echo 'clone azure-sdk-tools'
git clone https://github.com/Azure/azure-sdk-tools/

cd azure-sdk-tools
# azure-sdk-tools always uses localEmitter branch
echo 'azure-sdk-tools using localEmitter branch'
git checkout -b localEmitter origin/localEmitter

echo '-------------- git status start'
git status
echo '-------------- git status end'

cd tools/js-sdk-release-tools
npm install
npm run build
cd ../../..

# Read branch from azure-rest-api-specs for autorest.typescript
file_path="azure-rest-api-specs/.js/branch.txt"
autorest_branch=""
# Check if the file exists
if [ -f "$file_path" ]; then
    # Load the content of the file into a variable
    autorest_branch=$(cat "$file_path")
    echo "get autorest.typescript branch: $autorest_branch"
else
    echo "Branch file does not exist."
fi

# Clone autorest.typescript repository
if [ -d "autorest.typescript" ]; then
    echo "Delete folder autorest.typescript"
    rm -rf autorest.typescript
else
    echo "autorest.typescript folder does not exist."
fi

echo 'clone autorest.typescript'
git clone https://github.com/Azure/autorest.typescript/

cd autorest.typescript
if [ -z "$autorest_branch" ]; then
  echo 'branch is empty for autorest.typescript, using default branch'
else
    git checkout -b test $autorest_branch
    echo git checkout -b test $autorest_branch
fi

echo '-------------- autorest.typescript git status start'
git status
echo '-------------- autorest.typescript git status end'

rush update
rush build
cd ..

cd azure-sdk-for-js
node ../azure-sdk-tools/tools/js-sdk-release-tools/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=../autorest.typescript/packages/autorest.typescript --typespecEmitter=../azure-sdk-for-js/packages/typespec-ts
