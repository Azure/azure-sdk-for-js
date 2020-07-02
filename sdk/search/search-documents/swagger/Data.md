# Azure Cognitive Search TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/search-documents"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated/data
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/search/data-plane/Azure.Search/preview/2020-06-30/searchindex.json
add-credentials: false
title: SearchClient
use-extension:
  "@microsoft.azure/autorest.typescript": "5.0.1"
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
      $.properties['@search.action']['x-ms-client-name'] = '__actionType';
      $.required = ['@search.action'];
```


### Change text to _text in SuggestResult

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SuggestResult.properties['@search.text']
    transform: >
      $['x-ms-client-name'] = '_text'
```

### Change score to _score & highlights to _highlights in SuggestResult

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchResult
    transform: >
      $.properties['@search.score']['x-ms-client-name'] = '_score';
      $.properties['@search.highlights']['x-ms-client-name'] = '_highlights';
```
