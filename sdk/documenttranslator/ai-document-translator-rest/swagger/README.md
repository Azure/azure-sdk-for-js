# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
generate-test: true
package-name: "@azure-rest/ai-document-translator"
title: DocumentTranslator
description: Document Translator Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://github.com/Azure/azure-rest-api-specs/blob/ebbdda9f9ba6cab2fbd4efccad59019a62649ea6/specification/cognitiveservices/data-plane/TranslatorText/stable/v1.0/TranslatorBatch.json
package-version: 1.0.0-beta.2
hide-clients: true
rest-level-client: true
add-credentials: true
credential-scopes: "https://cognitiveservices.azure.com/.default"
credential-key-header-name: "Ocp-Apim-Subscription-Key"
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```
