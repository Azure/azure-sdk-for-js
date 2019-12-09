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
