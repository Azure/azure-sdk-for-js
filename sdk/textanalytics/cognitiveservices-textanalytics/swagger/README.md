# Azure Storage TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/cognitiveservices-textanalytics"
title: TextAnalyticsClient
description: TextAnalytics Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/cognitiveservices/data-plane/TextAnalytics/preview/v3.0-preview.1/TextAnalytics.json
add-credentials: true
use-extension:
  "@microsoft.azure/autorest.typescript": "5.0.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Rename InnerError

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Error.properties.innererror
    transform: >
      $["x-ms-client-name"] = "innerError";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.InnerError.properties.innererror
    transform: >
      $["x-ms-client-name"] = "innerError";
```

### Rename plurals in DocumentStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentStatistics.properties.charactersCount
    transform: >
      $["x-ms-client-name"] = "characterCount";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentStatistics.properties.transactionsCount
    transform: >
      $["x-ms-client-name"] = "transactionCount";
```

### Rename plurals in RequestStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.documentsCount
    transform: >
      $["x-ms-client-name"] = "documentCount";
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.validDocumentsCount
    transform: >
      $["x-ms-client-name"] = "validDocumentCount";
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.erroneousDocumentsCount
    transform: >
      $["x-ms-client-name"] = "erroneousDocumentCount";
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.transactionsCount
    transform: >
      $["x-ms-client-name"] = "transactionCount";
```

### Rename the model for Error to TextAnalyticsError

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.TextAnalyticsError) {
          $.TextAnalyticsError = $.Error;
          $.TextAnalyticsError.properties.details.items["$ref"] = "#/definitions/TextAnalyticsError";
          $.DocumentError.properties.error.items["$ref"] = "#/definitions/TextAnalyticsError";
          delete $.Error;
      }
  - from: swagger-document
    where: $["paths"]..responses["default"].schema
    transform: >
      if ($["$ref"] && $["$ref"] === "#/definitions/Error") {
          $["$ref"] = "#/definitions/TextAnalyticsError";
      }
```

### Handle enum collisions

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SentenceSentiment.properties.sentiment
    transform: >
      $["x-ms-enum"] = {
        name: "SentenceSentimentValue"
      }
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentSentiment.properties.sentiment
    transform: >
      $["x-ms-enum"] = {
        name: "DocumentSentimentValue"
      }
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TextAnalyticsError.properties.code
    transform: >
      $["x-ms-enum"] = {
        name: "TextAnalyticsErrorCode"
      }
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.InnerError.properties.code
    transform: >
      $["x-ms-enum"] = {
        name: "InnerErrorCode"
      }
```

### Add missing ref for scores

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentSentiment.properties.documentScores
    transform: >
      $["$ref"] = "#/definitions/SentimentConfidenceScorePerLabel";
  - from: swagger-document
    where: $.definitions.SentenceSentiment.properties.sentenceScores
    transform: >
      $["$ref"] = "#/definitions/SentimentConfidenceScorePerLabel";
```

### Fix bad reference for DocumentError.error

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentError.properties.error
    transform: >
      $["$ref"] = "#/definitions/TextAnalyticsError";
      delete $["items"]
```

### sentences => sentenceSentiments

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentSentiment.properties.sentences
    transform: >
      $["x-ms-client-name"] = "sentenceSentiments";
```

### DocumentStatistics => TextDocumentStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.TextDocumentStatistics) {
          $.TextDocumentStatistics = $.DocumentStatistics;
          delete $.DocumentStatistics;
      }
  - from: swagger-document
    where: $.definitions..properties.statistics
    transform: >
      if ($["$ref"] && $["$ref"] === "#/definitions/DocumentStatistics") {
          $["$ref"] = "#/definitions/TextDocumentStatistics";
      }
```

### RequestStatistics => TextDocumentBatchStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.TextDocumentBatchStatistics) {
          $.TextDocumentBatchStatistics = $.RequestStatistics;
          delete $.RequestStatistics;
      }
  - from: swagger-document
    where: $.definitions..properties.statistics
    transform: >
      if ($["$ref"] && $["$ref"] === "#/definitions/RequestStatistics") {
          $["$ref"] = "#/definitions/TextDocumentBatchStatistics";
      }
```
