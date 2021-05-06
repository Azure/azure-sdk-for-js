# Azure Purview Catalog TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/purview-catalog"
title: PurviewCatalog
description: Purview Catalog Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/purview/data-plane/Azure.Purview.Catalog/preview/2021-05-01-preview/purviewcatalog.json
package-version: 1.0.0-beta.1
rest-level-client: true
add-credentials: true
credential-scopes: "https://purview.azure.net/.default"
use-extension:
  "@autorest/typescript": "https://aka.ms/azsdk/typescript/rlc"
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchParameters
    transform: >
      $["x-ms-client-name"] = "searchParams";
```
