#!/usr/bin/env bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm use default
code-gen-pipeline --inputJsonPath=$1 --outputJsonPath=$2 --use=@autorest/typescript@^6.0.11 --typespecEmitter=@azure-tools/typespec-ts
