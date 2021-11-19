# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/ai-text-analytics"
title: GeneratedClient
description: TextAnalytics Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/cognitiveservices/data-plane/TextAnalytics/preview/v3.2-preview.2/TextAnalytics.json
add-credentials: false
package-version: 5.2.0-beta.3
v3: true
hide-clients: true
typescript: true
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

### Rename BingId to bingEntitySearchApiId

```yaml
directive:
  - from: swagger-document
    where: $.definitions.LinkedEntity.properties.bingId
    transform: >
      $["x-ms-client-name"] = "bingEntitySearchApiId";
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
    where: $.definitions.DocumentStatistics
    transform: >
      $["x-ms-client-name"] = "TextDocumentStatistics";
```

### RequestStatistics => TextDocumentBatchStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RequestStatistics
    transform: >
      $["x-ms-client-name"] = "TextDocumentBatchStatistics";
```

### Rename showStats -> includeStatistics

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ShowStats
    transform: >
      $["x-ms-client-name"] = "includeStatistics";
  - from: swagger-document
    where: $.definitions[*]
    transform: >
      if ($.description && $.description.includes("showStats")) {
        $.description = $.description.replace("showStats", "includeStatistics");
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

### Fix capitalization of Code enum values

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.code
    transform: >
      $.enum = $.enum.map((val) => val.charAt(0).toUpperCase() + val.slice(1));
```

### Rename LinkedEntity id -> dataSourceEntityId

```yaml
directive:
  - from: swagger-document
    where: $.definitions.LinkedEntity.properties.id
    transform: >
      $["x-ms-client-name"] = "dataSourceEntityId";
```

### Rename SentimentConfidenceScorePerLabel -> SentimentConfidenceScores

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SentimentConfidenceScorePerLabel
    transform: >
      $["x-ms-client-name"] = "SentimentConfidenceScores";
```

### Change some casing to use camelCase

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Entity.properties.subcategory
    transform: >
      $["x-ms-client-name"] = "subCategory";
```

### WarningCodeValue => WarningCode

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TextAnalyticsWarning.properties.code
    transform: >
      $["x-ms-enum"].name = "WarningCode";
```

### Remove targetRef

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TextAnalyticsWarning.properties
    transform: >
      delete $["targetRef"];
```

### Rename text input objects to avoid "export as"

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.TextDocumentInput) {
          $.TextDocumentInput = $.MultiLanguageInput;
          delete $.MultiLanguageInput;
      }
  - from: swagger-document
    where: $.definitions.MultiLanguageBatchInput.properties.documents.items
    transform: >
      $["$ref"] = "#/definitions/TextDocumentInput";
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.DetectLanguageInput) {
          $.DetectLanguageInput = $.LanguageInput;
          delete $.LanguageInput;
      }
  - from: swagger-document
    where: $.definitions.LanguageBatchInput.properties.documents.items
    transform: >
      $["$ref"] = "#/definitions/DetectLanguageInput";
```

### Disable LRO

```yaml
directive:
  - from: swagger-document
    where: $["paths"][*]
    transform: >
      for (var op of Object.values($)) {
          if (op["x-ms-long-running-operation"]) {
              delete op["x-ms-long-running-operation"];
          }
      }
```

### Enhance documentation strings for some exported swagger types

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TextAnalyticsWarning
    transform: $.description = "Represents a warning encountered while processing a document."
  - from: swagger-document
    where: $.definitions.SentenceSentiment
    transform: $.description = "The predicted sentiment for a given span of text. For more information regarding text sentiment, see https://docs.microsoft.com/azure/cognitive-services/Text-Analytics/how-tos/text-analytics-how-to-sentiment-analysis."
  - from: swagger-document
    where: $.definitions.Match
    transform: $.description = "Details about the specific substring in a document that refers to a linked entity identified by the Text Analytics model."
  - from: swagger-document
    where: $.definitions.Entity
    transform: $.description = "A word or phrase identified as an entity that is categorized within a taxonomy of types. The set of categories recognized by the Text Analytics service is described at https://docs.microsoft.com/azure/cognitive-services/Text-Analytics/named-entity-types ."
  - from: swagger-document
    where: $.definitions.LinkedEntity
    transform: $.description = "A word or phrase identified as a well-known entity within a database, including its formal (disambiguated) name and a link to the entity information within the source database."
  - from: swagger-document
    where: $.definitions.DetectLanguageInput
    transform: $.description = "An input to the language detection operation. This object specifies a unique document id, as well as the full text of a document and a hint indicating the document's country of origin to assist the text analytics predictive model in detecting the document's language."
  - from: swagger-document
    where: $.definitions.TextDocumentInput
    transform: $.description = "An object representing an individual text document to be analyzed by the Text Analytics service. The document contains a unique document ID, the full text of the document, and the language of the document's text."
  - from: swagger-document
    where: $.definitions.DetectedLanguage
    transform: $.description = "Information about the language of a document as identified by the Text Analytics service."
```
