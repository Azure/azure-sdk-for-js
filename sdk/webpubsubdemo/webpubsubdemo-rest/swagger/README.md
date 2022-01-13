# Azure Sample Readme for RLC

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/webpubsubdemo"
title: WebPubSubDemoClient
description: webpubsub demo
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/webpubsub/data-plane/WebPubSub/stable/2021-10-01/webpubsub.json
package-version: 1.0.0-beta.1
rest-level-client: true
add-credentials: true
credential-scopes: "https://webpubsubdemo/.default"
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
```
