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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/cognitiveservices/data-plane/FormRecognizer/preview/v2.0/FormRecognizer.json
add-credentials: true
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200320.1"
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

### `createdDateTime` => `createdOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.createdDateTime
    transform: >
      $["x-ms-client-name"] = "createdOn";
```

### `lastUpdatedDateTime` => `lastUpdatedOn`

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.lastUpdatedDateTime
    transform: >
      $["x-ms-client-name"] = "lastModified";
```

### `TrainingDocumentInfo.pages` => `TrainingDocumentInfo.pageCount`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TrainingDocumentInfo.properties.pages
    transform: >
      $["x-ms-client-name"] = "pageCount";
```
