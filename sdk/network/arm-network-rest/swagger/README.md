# Azure AppService TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: arm
package-name: "@azure-rest/arm-network"
title: NetworkManagementClient
description: Network Management Rest Client
generate-metadata: false
generate-test: true
generate-sample: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/b41f929626289b59e31be8a1091c99994864b096/specification/network/resource-manager/readme.md
package-version: 1.0.0-beta.4
rest-level-client: true
add-credentials: true
security: AADToken
security-scopes: "https://management.azure.com/.default"
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```
