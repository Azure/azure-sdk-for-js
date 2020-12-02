# Azure Form Recognizer Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/ai-form-recognizer"
title: FormRecognizerClient
description: FormRecognizer Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/97ae1493ff37d947cc26e00a3a5abd096982517b/specification/cognitiveservices/data-plane/FormRecognizer/preview/v2.1-preview.2/FormRecognizer.json
add-credentials: false
override-client-name: GeneratedClient
use-extension:
  "@autorest/typescript": "6.0.0-dev.20201113.1"
package-version: "3.1.0-beta.1"
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

### ModelInfo `createDateTime` => `trainingStartedOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ModelInfo.properties.createdDateTime
    transform: >
      $["x-ms-client-name"] = "trainingStartedOn";
```

### ModelInfo `lastUpdatedDateTime` => `trainingCompletedOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ModelInfo.properties.lastUpdatedDateTime
    transform: >
      $["x-ms-client-name"] = "trainingCompletedOn";
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

```yaml
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

### `documentName` => `name`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TrainingDocumentInfo.properties.documentName
    transform: >
      $["x-ms-client-name"] = "name";
```

### `includeSubFolders` => `includeSubfolders`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TrainSourceFilter.properties.includeSubFolders
    transform: >
      $["x-ms-client-name"] = "includeSubfolders";
```

### Add "image/bmp" to `consumes` for custom form to work around autorest bug

```yaml
directive:
  - from: swagger-document
    where: $.paths["/custom/models/{modelId}/analyze"].post
    transform: >
      $.consumes.push("image/bmp");
```
