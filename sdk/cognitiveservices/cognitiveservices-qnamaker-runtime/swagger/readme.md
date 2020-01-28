# Cognitive Services QnAMaker Runtime SDK

> see https://aka.ms/autorest

Configuration for generating QnAMaker Runtime SDK.

```yaml
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/cognitiveservices/data-plane/QnAMaker/stable/v4.0/QnAMakerRuntime.json
add-credentials: true
openapi-type: data-plane
license-header: MICROSOFT_MIT_NO_VERSION
title: QnAMakerRuntimeClient
```

## TypeScript

These settings apply only when `--typescript` is specified on the command line.

```yaml $(typescript)
typescript:
  package-version: 1.0.0
  package-name: "@azure/cognitiveservices-qnamaker-runtime"
  output-folder: ".."
  azure-arm: false
  generate-metadata: true
  auto-publish: true
```
