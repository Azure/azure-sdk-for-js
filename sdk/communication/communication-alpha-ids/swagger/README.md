# Azure Communication Services Alpha IDs Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-alpha-ids"
description: Alpha IDs administration client
package-version: 1.0.0-beta.1
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./alphaids.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
add-credentials: false
azure-arm: false
skip-enum-validation: true
title: Alpha IDs Client
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
