# Azure Form Recognizer Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/ai-form-recognizer"
title: GeneratedClient
description: AnomalyDetector Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/cognitiveservices/data-plane/AnomalyDetector/preview/v1.0/AnomalyDetector.json
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200817.1"
package-version: "3.0.0-preview.1"
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.EntireDetectResponse
    transform: >
      $["x-ms-client-name"] = "DetectEntireResponse";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.LastDetectResponse
    transform: >
      $["x-ms-client-name"] = "DetectLastPointResponse";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ChangePointDetectRequest
    transform: >
      $["x-ms-client-name"] = "DetectChangePointRequest";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ChangePointDetectResponse
    transform: >
      $["x-ms-client-name"] = "DetectChangePointResponse";
```
