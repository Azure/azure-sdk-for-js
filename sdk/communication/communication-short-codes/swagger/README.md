# Azure Communication Services Short Codes Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-short-codes"
description: Short code acquiring and management client
package-version: 1.0.0-beta.2
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-shortcode-2021-10-25-preview
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ca0335b44b4eca2c5b5673ee2c58a87e524b669f/specification/communication/data-plane/ShortCodes/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
add-credentials: false
azure-arm: false
skip-enum-validation: true
title: Short Codes Client
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
