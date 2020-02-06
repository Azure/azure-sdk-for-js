# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/ai-text-analytics"
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

### Rename showStats -> includeStatistics

```yaml
directive:
  - from: swagger-document
    where: $.paths..parameters[*]
    transform: >
      if ($.name === "showStats") {
        $["x-ms-client-name"] = "includeStatistics";
      }
```

### Rename type, subtype -> category, subCategory

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Entity.properties
    transform: >
      $.type["x-ms-client-name"] = "category";
      $.subtype["x-ms-client-name"] = "subCategory";
```

### Rename sentenceScores -> sentimentScores

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SentenceSentiment.properties.sentenceScores
    transform: >
      $["x-ms-client-name"] = "sentimentScores";
```

### Rename SentimentConfidenceScorePerLabel -> SentimentScorePerLabel 

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.SentimentScorePerLabel) {
          $.SentimentScorePerLabel = $.SentimentConfidenceScorePerLabel;
          delete $.SentimentConfidenceScorePerLabel;
      }
  - from: swagger-document
    where: $.definitions..properties[*]
    transform: >
      if ($["$ref"] && $["$ref"] === "#/definitions/SentimentConfidenceScorePerLabel") {
          $["$ref"] = "#/definitions/SentimentScorePerLabel";
      }
```

### Rename {Document,Sentence}SentimentValue -> Label 

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentSentiment.properties.sentiment
    transform: >
      $["x-ms-enum"].name = "DocumentSentimentLabel";
  - from: swagger-document
    where: $.definitions.SentenceSentiment.properties.sentiment
    transform: >
      $["x-ms-enum"].name = "SentenceSentimentLabel";
```

