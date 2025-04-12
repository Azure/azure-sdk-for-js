#!/usr/bin/


source $NVM_DIR/nvm.sh
nvm install
nvm user

nvm as user

# Install utilities
npm install -g @microsoft/rush autorest @typespec/compiler
rush update

# Install PowerShell. 
# common/scripts and eng/common.
 apt-get update
 


