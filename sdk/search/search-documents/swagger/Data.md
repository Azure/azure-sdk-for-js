# Azure Cognitive Search TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/search-documents"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated/data
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/4e3ae66b8b25c53be84bb0c35c3d6d43291f7a40/specification/search/data-plane/Azure.Search/preview/2021-04-30-Preview/searchindex.json
add-credentials: false
title: SearchClient
use-extension:
  "@autorest/typescript": "6.0.0-beta.13"
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

### Change score to \_score & highlights to \_highlights in SuggestResult

```yaml
modelerfour:
  naming:
    override:
      Score: $DO_NOT_NORMALIZE$_score
      Highlights: $DO_NOT_NORMALIZE$_highlights
```

### Mark score, key and text fields as required in AnswerResult Object

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnswerResult
    transform: >
      $.required = ['score', 'key', 'text'];
```
