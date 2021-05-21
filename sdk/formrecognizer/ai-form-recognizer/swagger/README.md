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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1a8a869d1a96dc007f116d320f5c2659323bbe7c/specification/cognitiveservices/data-plane/FormRecognizer/stable/v2.1/FormRecognizer.json
add-credentials: false
override-client-name: GeneratedClient
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210121.2"
package-version: "3.1.0"
disable-async-iterators: true
hide-clients: true
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

### Rename Appearance types

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.TextAppearance) {
          $.TextAppearance = $.Appearance;
          delete $.Appearance;
      }
  - from: swagger-document
    where: $.definitions.TextLine.properties.appearance
    transform: >
      $["$ref"] = "#/definitions/TextAppearance";
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.TextStyle) {
          $.TextStyle = $.Style;
          delete $.Style;
      }
  - from: swagger-document
    where: $.definitions.TextAppearance.properties.style
    transform: >
      $["$ref"] = "#/definitions/TextStyle";
  - from: swagger-document
    where: $.definitions.TextStyle.properties.name
    transform: >
      $["x-ms-enum"].name = "StyleName"
```

### `ReadingOrder` => `FormReadingOrder`

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ReadingOrder
    transform: >
      $["x-ms-enum"].name = "FormReadingOrder";
```

### `Language`, `Locale` => `FormLanguage`, `FormLocale`

```yaml
directive:
  - from: swagger-document
    where: $.parameters.Language
    transform: >
      $["x-ms-enum"].name = "FormLanguage";
  - from: swagger-document
    where: $.parameters.Locale
    transform: >
      $["x-ms-enum"].name = "FormLocale";
```

### Stronger SelectionMarkState and TextStyle

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SelectionMark.properties.state
    transform: >
      $["x-ms-enum"] = {
        name: "SelectionMarkState",
        modelAsString: false
      };
  - from: swagger-document
    where: $.definitions.TextStyle.properties.name
    transform: >
      $["x-ms-enum"].modelAsString = false;
```
