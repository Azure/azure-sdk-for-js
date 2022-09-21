# Azure AppService TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/arm-compute"
title: ComputeManagementClient
description: Compute Management Rest Client
generate-metadata: true
generate-test: true
generate-sample: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/2e48c102980cfe2a330e634fd018dc6646c02183/specification/compute/resource-manager/readme.md
package-version: 1.0.0-beta.1
rest-level-client: true
add-credentials: true
security: AADToken
security-scopes: "https://management.azure.com/.default"
modelerfour:
  lenient-model-deduplication: true
  treat-type-object-as-anything: true
```
