# Azure IOT Device Update TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
generate-test: true
package-name: "@azure-rest/iot-device-update"
title: DeviceUpdate
description: Iot Device Update Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/d7c9be23749467be1aea18f02ba2f4948a39db6a/specification/deviceupdate/data-plane/Microsoft.DeviceUpdate/stable/2022-10-01/deviceupdate.json
package-version: 1.1.2
rest-level-client: true
add-credentials: true
credential-scopes: https://api.adu.microsoft.com/.default
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```

### Fix 304s
``` yaml
directive:
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met."
    };
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met."
    };
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/updates/operations/{operationId}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met."
    };
- from: swagger-document
  where: $["paths"]["/deviceUpdate/{instanceId}/management/operations/{operationId}"]
  transform: >
    $.get.responses["304"] = {
      "description": "The condition specified using HTTP conditional header(s) is not met."
    };
```
