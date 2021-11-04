#!/bin/bash

if [ -z $1 ]; then
    echo "Please input resource provider name"
    exit 1
fi
ResourceProvider=$1

if [ -z $2 ]; then
    echo "Please input swagger folder path"
    exit 1
fi
SWAGGER_PATH=$2

if [ -z $3 ]; then
    echo "Please input sdk output folder path"
    exit 1
fi
SDK_PATH=$3

TAG=""
if [ -z $4]; then
    echo "NOT Specified tag"
else
    echo "specified tag $4"
    TAG=$4
fi

npm install -g dwtest-release-tools
npm install -g autorest
cd $3
README=$SWAGGER_PATH/$ResourceProvider/resource-manager/readme.md
if [ "$TAG" == "" ]; then
  track2-codegen-automation-for-sdk-generation-pipeline --task=generateCode --use=@autorest/typescript@6.0.0-beta.14 --readme=$README
else
  track2-codegen-automation-for-sdk-generation-pipeline --task=generateCode --use=@autorest/typescript@6.0.0-beta.14 --readme=$README --tag=$TAG
fi
if [ $? != 0 ]; then
  echo -e "\e[31m[$(date -u)] ERROR: [$ResourceProvider]: Generate go sdk failed"
  exit 1
fi
