# Azure IOT Device Update TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/iot-device-update"
title: DeviceUpdate
description: Iot Device Update Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/7c840caa77ac200f43636930d82fc31cf117241e/specification/deviceupdate/data-plane/Microsoft.DeviceUpdate/stable/2022-10-01/deviceupdate.json
package-version: 1.0.0
rest-level-client: true
add-credentials: true
credential-scopes: https://api.adu.microsoft.com/.default
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"
```

### Fix 304s
``` yaml
directive:
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met.",
      "x-az-response-name": "ConditionNotMetError",
      "headers": { "x-ms-error-code": { "x-ms-client-name": "ErrorCode", "type": "string" } }
    };
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met.",
      "x-az-response-name": "ConditionNotMetError",
      "headers": { "x-ms-error-code": { "x-ms-client-name": "ErrorCode", "type": "string" } }
    };
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/updates/operations/{operationId}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met.",
      "x-az-response-name": "ConditionNotMetError",
      "headers": { "x-ms-error-code": { "x-ms-client-name": "ErrorCode", "type": "string" } }
    };
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/management/operations/{operationId}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met.",
      "x-az-response-name": "ConditionNotMetError",
      "headers": { "x-ms-error-code": { "x-ms-client-name": "ErrorCode", "type": "string" } }
    };
```

