#!/usr/bin/env bash

cd ..

file_path="azure-rest-api-specs/.js/branch.txt"
# Check if the file exists
if [ -f "$file_path" ]; then
    # Load the content of the file into a variable
    branch=$(cat "$file_path")
    echo "get branch $branch"
else
    echo "Branch file does not exist."
fi

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
pnpm install
pnpm run build
cd ../../..

cd azure-sdk-for-js
node ../azure-sdk-tools/tools/js-sdk-release-tools/dist/autoGenerateInPipeline.js --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@6.0.45 --typespecEmitter=@azure-tools/typespec-ts
