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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/7cc0a47e7808f3247c71cda25b7c1da8503272ba/specification/agrifood/data-plane/Microsoft.AgFoodPlatform/preview/2021-03-31-preview/agfood.json
package-version: 1.0.0-beta.2
rest-level-client: true
add-credentials: true
credential-scopes: https://farmbeats.azure.net/.default
use-extension:
  "@autorest/typescript": "dev"
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Farmer
    transform: >
      $.properties.properties["additionalProperties"] = {};
```