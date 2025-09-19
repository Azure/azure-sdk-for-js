# Azure Agrifood Farming TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
generate-test: true
package-name: "@azure-rest/agrifood-farming"
title: FarmBeats
description: Azure FarmBeats Service
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://github.com/Azure/azure-rest-api-specs/blob/e38daec67d57ef9c4804b1e3055753407e45fa71/specification/agrifood/data-plane/Microsoft.AgFoodPlatform/preview/2022-11-01-preview/agfood.json
package-version: 1.0.0-beta.5
rest-level-client: true
security: AADToken
security-scopes: https://farmbeats.azure.net/.default
use-extension:
  "@autorest/typescript": "6.0.34"
modelerfour:
  treat-type-object-as-anything: true
module-kind: esm
```
