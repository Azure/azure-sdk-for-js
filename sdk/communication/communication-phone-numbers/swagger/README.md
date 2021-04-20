# Azure Communication Services Phone Numbers Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-communication-phone-numbers
description: Phone number configuration client
package-version: 1.0.0-beta.5
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-phonenumber-2021-03-07
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/bf081421869ccd31d9fd87084b07a1e246aee310/specification/communication/data-plane/Microsoft.CommunicationServicesPhoneNumbers/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210223.1"
add-credentials: false
azure-arm: false
skip-enum-validation: true
title: Phone Numbers Client
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
