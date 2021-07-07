#!/usr/bin/env bash
# rush install
npm install -g @microsoft/rush
rush install
# generate
npm install -g azure-track2-js-sdk-release-tools
track2-codegen-automation-for-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@6.0.0-beta.5
