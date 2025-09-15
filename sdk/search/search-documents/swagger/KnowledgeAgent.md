# Azure Cognitive Search TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/search-documents"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated/knowledgeAgent
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/429fd8c039c5b08541df2389f8c58d1090e01127/specification/search/data-plane/Azure.Search/preview/2025-08-01-preview/knowledgeagent.json
add-credentials: false
title: SearchClient
use-extension:
  "@autorest/typescript": "6.0.39"
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
```

