# Azure AppService TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: arm
package-name: "@azure-rest/arm-compute"
title: ComputeManagementClient
description: Compute Management Rest Client
generate-metadata: false
generate-test: true
generate-sample: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/a5df773378a8b52f84bee08b3edaaa6ef520f058/specification/compute/resource-manager/readme.md
package-version: 1.0.0-beta.4
rest-level-client: true
add-credentials: true
security: AADToken
security-scopes: "https://management.azure.com/.default"
use-extension:
  "@autorest/typescript": "6.0.34"
modelerfour:
  lenient-model-deduplication: true
  treat-type-object-as-anything: true
module-kind: esm
```
