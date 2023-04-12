# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/ai-language-textauthoring"
title: TextAuthoringClient
description: Text Authoring Client
generate-metadata: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: ../authoring.json
#input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/cognitiveservices/data-plane/Language/preview/2022-10-01-preview/analyzetext-authoring.json
#add-credentials: false
package-version: 1.0.0-beta.1
v3: true
hide-clients: false
rest-level-client: true
generate-sample: true
typescript: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

## General customizations

```yaml $(tag) == 'release_authoring_1_1_preview'
# Give LROs return types
directive:
  - from: swagger-document
  - where: $.definitions.TextAnalysisAuthoringStringIndexType
    transform: >
      $["x-ms-enum"]["name"] = "StringIndexType1";
      delete $["x-ms-client-name"];
```