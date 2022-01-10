#!/usr/bin/env bash
npm install -g @microsoft/rush
npm install -g autorest
rush update
# install release tools
npm install -g dw-azure-track2-js-sdk-release-tools
