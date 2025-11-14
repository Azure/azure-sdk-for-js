#!/usr/bin/env bash
echo "Running: npm --prefix eng/common/js-sdk-release-tools exec --no -- code-gen-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.51 --typespecEmitter=@azure-tools/typespec-ts"
npm --prefix eng/common/js-sdk-release-tools exec --no -- code-gen-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.51 --typespecEmitter=@azure-tools/typespec-ts
