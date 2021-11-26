#!/usr/bin/env bash

ls /usr/bin/node*

npm install -g @microsoft/rush
rush install
# install release tools
npm install -g dw-azure-track2-js-sdk-release-tools
