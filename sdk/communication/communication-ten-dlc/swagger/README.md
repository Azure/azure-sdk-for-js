# Azure Communication Services Alpha IDs Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-ten-dlc"
description: 10 DLC administration client
package-version: "1.0.0"
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./swagger.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
skip-enum-validation: true
title: 10 DLC Client
use-extension:
  "@autorest/typescript": "latest"
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"

typescript:
  generate-metadata: false
  azure-arm: false
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
  - from: swagger-document
    where: $.definitions[*].properties[*].items["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }    
```
