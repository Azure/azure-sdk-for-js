#!/usr/bin/env bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install v18.15.0 
nvm alias default node
npm install -g @microsoft/rush@5.92.0
npm install -g @azure-tools/js-sdk-release-tools
