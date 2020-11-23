# Cognitive Services QnAMaker SDK

> see https://aka.ms/autorest

Configuration for generating QnAMaker SDK.

```yaml
add-credentials: true
openapi-type: data-plane
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/cognitiveservices/data-plane/QnAMaker/preview/v5.0-preview.1/QnAMaker.json
use-extension:
  "@microsoft.azure/autorest.typescript": "4.4.4"
```

## TypeScript

These settings apply only when `--typescript` is specified on the command line.

```yaml $(typescript)
typescript:
  package-version: 3.2.0
  package-name: "@azure/cognitiveservices-qnamaker"
  output-folder: ..
  azure-arm: false
  generate-metadata: true
  auto-publish: true
```
