#!/bin/bash
if [ -z $1 ]; then
    echo "Please input resource Provider name"
    exit 1
fi
ResourceProvider=$1

if [ -z $2 ]; then
    echo "Please input sdk dir path"
    exit 1
fi
SDK_REPO=$2
cd $SDK_REPO
npm install -g dwtest-release-tools
track2-build-codes-for-sdk-generation-pipeline 
