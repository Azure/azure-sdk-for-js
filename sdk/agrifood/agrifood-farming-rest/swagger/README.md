# Azure Agrifood Farming TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/agrifood-farming"
title: FarmBeats
description: Azure FarmBeats Service
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/683e3f4849ee1d84629d0d0fa17789e80a9cee08/specification/agfood/data-plane/Microsoft.AgFoodPlatform/preview/2021-03-31-preview/agfood.json
package-version: 1.0.0-beta.2
rest-level-client: true
add-credentials: true
credential-scopes: https://farmbeats.azure.net/.default
use-extension:
  "@autorest/typescript": "latest"

modelerfour:
  treat-type-object-as-anything: true
```
