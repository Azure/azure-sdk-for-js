# Azure Communication Services Phone Numbers Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
namespace: "azure.communication.trunkstatus"
description: TrunkStatus
package-version: 1.2.0-beta.3
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
source-code-folder-path: src/trunkstatus
output-folder: ../src/generated
tag: package-2022-07-01-preview1
input-file: ./trunk_status.json
# require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/56cf1008f95c0d13eeb746e25d7d7f21ea94d3d5/specification/communication/data-plane/TrunkStatus/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
add-credentials: false
azure-arm: false
title: Trunk Status Client
v3: true
typescript: "true"
```

## Customizations

### Disable extensible enums

```yaml
directive:
  - from: swagger-document
    where: $.definitions[*].properties[*]["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }
```
