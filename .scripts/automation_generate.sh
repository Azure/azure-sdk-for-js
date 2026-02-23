#!/usr/bin/env bash
npm --prefix eng/tools/js-sdk-release-tools exec --no -- code-gen-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.58 --typespecEmitter=@azure-tools/typespec-ts
