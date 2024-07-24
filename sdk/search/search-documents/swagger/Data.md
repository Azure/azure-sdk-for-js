# Azure Cognitive Search TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/search-documents"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated/data
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/dc27f9b32787533cd4d07fe0de5245f2f8354dbe/specification/search/data-plane/Azure.Search/stable/2024-07-01/searchindex.json
add-credentials: false
title: SearchClient
use-extension:
  "@autorest/typescript": "6.0.23"
core-http-compat-mode: true
package-version: 12.1.0
disable-async-iterators: true
api-version-parameter: choice
v3: true
hide-clients: true
use-core-v2: true
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
```

### Give a less-common name for actionType

```yaml
directive:
  - from: swagger-document
    where: $.definitions.IndexAction
    transform: >
      $.required = ['@search.action'];

modelerfour:
  naming:
    override:
      ActionType: $DO_NOT_NORMALIZE$__actionType
```

### Change text to \_text in SuggestResult

```yaml
modelerfour:
  naming:
    override:
      Text: $DO_NOT_NORMALIZE$_text
```

### Change score to \_score & highlights to \_highlights in result types

```yaml
modelerfour:
  naming:
    override:
      Score: $DO_NOT_NORMALIZE$_score
      Highlights: $DO_NOT_NORMALIZE$_highlights
      RerankerScore: $DO_NOT_NORMALIZE$_rerankerScore
      Captions: $DO_NOT_NORMALIZE$_captions
```

### Mark score, key and text fields as required in AnswerResult Object

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnswerResult
    transform: >
      $.required = ['score', 'key', 'text'];
```

### Renames

```yaml
directive:
  - from: swagger-document
    where: $.definitions.VectorQuery.properties.k
    transform: $["x-ms-client-name"] = "KNearestNeighborsCount";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchRequest.properties.semanticConfiguration
    transform: $["x-ms-client-name"] = "semanticConfigurationName";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RawVectorQuery
    transform: $["x-ms-client-name"] = "VectorizedQuery";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.QueryResultDocumentSemanticFieldState
    transform: $["x-ms-enum"].name = "SemanticFieldState";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnswerResult
    transform: $["x-ms-client-name"] = "QueryAnswerResult";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.CaptionResult
    transform: $["x-ms-client-name"] = "QueryCaptionResult";
```

### Fix incorrect type of SearchRequest.hybridSearch

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchRequest.properties.hybridSearch
    transform: >
      delete $["type"];
      delete $.items;
      $["$ref"] = "#/definitions/HybridSearch";
```
