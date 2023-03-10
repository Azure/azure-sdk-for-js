# Azure Communication Services Recipient Verification Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-recipient-verification"
description: Allows users to verify the phone number of recipients before sending messages or making calls to the phone number.
package-version: 1.0.0-beta.1
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./swagger.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
skip-enum-validation: true
v3: true
title: Recipient Verification Client
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"
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
