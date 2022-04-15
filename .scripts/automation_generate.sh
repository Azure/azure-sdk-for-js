#!/usr/bin/env bash
cat $2
code-gen-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@6.0.0-alpha.19.20220414.1
cat $2