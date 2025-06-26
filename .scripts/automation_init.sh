#!/usr/bin/env bash
npm install -g @azure-tools/typespec-client-generator-cli@0.21.0
npm install -g @microsoft/rush@5.92.0
npm install -g @azure-tools/js-sdk-release-tools




echo "Before changing directory: $(pwd)"
cd tools/js-sdk-release-tools
echo "After changing to tools/js-sdk-release-tools: $(pwd)"
npm install
npm run build
