#!/usr/bin/


source $NVM_DIR/nvm.sh
nvm install
nvm user

nvm as user

# Install utilities
npm install -g pnpm autorest @typespec/compiler
pnpm install

# Install PowerShell. 
# common/scripts and eng/common.
 apt-get update
 


