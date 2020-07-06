# Azure Tables Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/tables"
title: TablesClient
description: Tables Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/cosmos-db/data-plane/Microsoft.Tables/preview/2019-02-02/table.json
add-credentials: false
override-client-name: GeneratedClient
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200521.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### `page` property renamed to `pageNumber`

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.page
    transform: >
      $["x-ms-client-name"] = "pageNumber";
```

### CopyOperationResult `createdDateTime` => `createdOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.CopyOperationResult.properties.createdDateTime
    transform: >
      $["x-ms-client-name"] = "createdOn";
```

### CopyOperationResult `lastUpdatedDateTime` => `lastModified`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.CopyOperationResult.properties.lastUpdatedDateTime
    transform: >
      $["x-ms-client-name"] = "lastModified";
```

### AnalyzeOperationResult `createdDateTime` => `createdOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeOperationResult.properties.createdDateTime
    transform: >
      $["x-ms-client-name"] = "createdOn";
```

### AnalyzeOperationResult `lastUpdatedDateTime` => `lastModified`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeOperationResult.properties.lastUpdatedDateTime
    transform: >
      $["x-ms-client-name"] = "lastModified";
```

### Models `lastUpdatedDateTime` => `lastModified`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Models.properties.summary.properties.lastUpdatedDateTime
    transform: >
      $["x-ms-client-name"] = "lastModified";
```

### ModelInfo `createDateTime` => `requestedOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ModelInfo.properties.createdDateTime
    transform: >
      $["x-ms-client-name"] = "requestedOn";
```

### ModelInfo `lastUpdatedDateTime` => `completedOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ModelInfo.properties.lastUpdatedDateTime
    transform: >
      $["x-ms-client-name"] = "completedOn";
```

### `TrainingDocumentInfo.pages` => `TrainingDocumentInfo.pageCount`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TrainingDocumentInfo.properties.pages
    transform: >
      $["x-ms-client-name"] = "pageCount";
```

### Hide LROs
``` yaml
directive:
- from: swagger-document
  where: $["paths"]
  transform: >
    for (var path in $) {
        for (var op of Object.values($[path])) {
            if (op["x-ms-long-running-operation"]) {
                delete op["x-ms-long-running-operation"];
            }
        }
    }
```
