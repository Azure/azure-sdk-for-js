# Azure AI Search TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/search-documents"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated/service
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/429fd8c039c5b08541df2389f8c58d1090e01127/specification/search/data-plane/Azure.Search/preview/2025-08-01-preview/searchservice.json
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.46"
core-http-compat-mode: true
package-version: 12.2.0-beta.3
disable-async-iterators: true
api-version-parameter: choice
v3: true
hide-clients: true
use-core-v2: true
module-kind: esm
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Remove duplicate header parameter

```yaml
directive:
  - from: swagger-document
    where: $.paths..post
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
  - from: swagger-document
    where: $.paths..get
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
  - from: swagger-document
    where: $.paths..put
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
  - from: swagger-document
    where: $.paths..delete
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
```

### Make AnalyzerName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.analyzer
    transform: >
      const extraDocs = " KnownAnalyzerNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.Field.properties[*]
    transform: >
      const extraDocs = " KnownAnalyzerNames is an enum containing known values.";
      if ($['$ref'] === "#/definitions/AnalyzerName") {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make TokenizerName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.tokenizer
    transform: >
      const extraDocs = " KnownTokenizerNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.CustomAnalyzer.properties.tokenizer
    transform: >
      const extraDocs = " KnownTokenizerNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make TokenFilterName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.tokenFilters.items
    transform: >
      const extraDocs = " KnownTokenFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.CustomAnalyzer.properties.tokenFilters.items
    transform: >
      const extraDocs = " KnownTokenFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make CharFilterName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.charFilters.items
    transform: >
      const extraDocs = " KnownCharFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.CustomAnalyzer.properties.charFilters.items
    transform: >
      const extraDocs = " KnownCharFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make RegexFlags a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.PatternAnalyzer.properties.flags
    transform: >
      if ($['$ref']) {
        delete $['$ref'];
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.PatternTokenizer.properties.flags
    transform: >
      if ($['$ref']) {
        delete $['$ref'];
        $.type = 'string'
      }
```

### Lowercase eTag

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties["`@odata.etag"]
    transform: >
      $["x-ms-client-name"] = "etag"
```

### Make maximumPageLength to maxPageLength

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SplitSkill.properties.maximumPageLength
    transform: >
      $["x-ms-client-name"] = "maxPageLength"
```

### Change odataType to odatatype

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties["`@odata.type"]
    transform: >
      $["x-ms-client-name"] = "odatatype"
```

### Change tokenizer to tokenizerName

```yaml
directive:
  - from: swagger-document
    where: $.definitions.CustomAnalyzer.properties.tokenizer
    transform: >
      $["x-ms-client-name"] = "tokenizerName"
```

### Add discriminator to LexicalNormalizer

```yaml
directive:
  from: swagger-document
  where: $.definitions.LexicalNormalizer
  transform: >
    $["discriminator"] = "@odata.type";
```

### Renames

```yaml
directive:
  from: swagger-document
  where: $.definitions.IndexerCurrentState
  transform: >
    $["x-ms-client-name"] = "IndexerState";
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.IndexerCurrentState.properties.allDocsInitialChangeTrackingState
  transform: >
    $["x-ms-client-name"] = "allDocumentsInitialChangeTrackingState";
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.IndexerCurrentState.properties.allDocsFinalChangeTrackingState
  transform: >
    $["x-ms-client-name"] = "allDocumentsFinalChangeTrackingState";
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.IndexerCurrentState.properties.resetDocsInitialChangeTrackingState
  transform: >
    $["x-ms-client-name"] = "resetDocumentsInitialChangeTrackingState";
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.IndexerCurrentState.properties.resetDocsFinalChangeTrackingState
  transform: >
    $["x-ms-client-name"] = "ResetDocumentsFinalChangeTrackingState";
```

```yaml
directive:
  from: swagger-document
  where: $.definitions.SemanticField.properties.fieldName
  transform: >
    $["x-ms-client-name"] = "name";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchField.properties.dimensions
    transform: $["x-ms-client-name"] = "vectorSearchDimensions";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.HnswVectorSearchAlgorithmConfiguration
    transform: $["x-ms-client-name"] = "HnswAlgorithmConfiguration";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ExhaustiveKnnVectorSearchAlgorithmConfiguration
    transform: $["x-ms-client-name"] = "ExhaustiveKnnAlgorithmConfiguration";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.PIIDetectionSkill.properties.piiCategories
    transform: $["x-ms-client-name"] = "categories";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchField.properties.vectorSearchProfile
    transform: $["x-ms-client-name"] = "vectorSearchProfileName";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SemanticSettings.defaultConfiguration
    transform: $["x-ms-client-name"] = "defaultConfigurationName";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchIndex.properties.semantic
    transform: $["x-ms-client-name"] = "semanticSearch";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SemanticSettings
    transform: $["x-ms-client-name"] = "SemanticSearch";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.VectorSearchProfile.properties.algorithm
    transform: $["x-ms-client-name"] = "algorithmConfigurationName";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.PIIDetectionSkill.properties.maskingCharacter
    transform: $["x-ms-client-name"] = undefined;
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.VectorSearchCompressionConfiguration
    transform: $["x-ms-client-name"] = "VectorSearchCompression";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ScalarQuantizationVectorSearchCompressionConfiguration
    transform: $["x-ms-client-name"] = "ScalarQuantizationCompression"
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.BinaryQuantizationVectorSearchCompressionConfiguration
    transform: $["x-ms-client-name"] = "BinaryQuantizationCompression"
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.VectorSearchVectorizer.properties.name
    transform: $["x-ms-client-name"] = "vectorizerName"
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.VectorSearchCompressionConfiguration.properties.name
    transform: $["x-ms-client-name"] = "compressionName";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.OcrSkillLineEnding
    transform: $["x-ms-enum"].name = "OcrLineEnding";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchIndexerDataUserAssignedIdentity.properties.userAssignedIdentity
    transform: $["x-ms-client-name"] = "resourceId";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchIndexerIndexProjections
    transform: $["x-ms-client-name"] = "SearchIndexerIndexProjection";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchIndexerIndexProjectionsParameters
    transform: $["x-ms-client-name"] = "SearchIndexerIndexProjectionParameters";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchIndexerSkillset.properties.indexProjections
    transform: $["x-ms-client-name"] = "indexProjection";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.VectorSearchCompressionTargetDataType
    transform: $["x-ms-enum"].name = "VectorSearchCompressionTarget";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.VectorSearchProfile.properties.compression
    transform: $["x-ms-client-name"] = "compressionName";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.WebApiVectorizer.properties.customWebApiParameters
    transform: $["x-ms-client-name"] = "parameters";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AzureOpenAIVectorizer.properties.azureOpenAIParameters
    transform: $["x-ms-client-name"] = "parameters";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AzureOpenAIParameters.properties.resourceUri
    transform: $["x-ms-client-name"] = "resourceUrl";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AzureOpenAIParameters.properties.deploymentId
    transform: $["x-ms-client-name"] = "deploymentId";
```

### Deprecations

```yaml
directive:
  from: swagger-document
  where: $.definitions[?(@['x-ms-discriminator-value'] == "#Microsoft.Skills.Text.EntityRecognitionSkill")]
  transform: $.description += "\n\n@deprecated";
```

```yaml
directive:
  from: swagger-document
  where: $.definitions[?(@['x-ms-discriminator-value'] == "#Microsoft.Skills.Text.SentimentSkill")]
  transform: $.description += "\n\n@deprecated";
```

```yaml
directive:
  from: swagger-document
  where: $.definitions[?(@['x-ms-discriminator-value'] == "#Microsoft.Skills.Text.NamedEntityRecognitionSkill")]
  transform: $.description += "\n\n@deprecated";
```

### Add `arm-id` format for `AuthResourceId`

Add `"format": "arm-id"` for `AuthResourceId` to generate as [Azure.Core.ResourceIdentifier]
(https://learn.microsoft.com/dotnet/api/azure.core.resourceidentifier?view=azure-dotnet).

```yaml
directive:
  - from: swagger-document
    where: $.definitions.WebApiSkill.properties.authResourceId
    transform: $["x-ms-format"] = "arm-id";
```
