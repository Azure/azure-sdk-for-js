#!/usr/bin/env bash
code-gen-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.52 --typespecEmitter=@azure-tools/typespec-ts
