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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1ef769ae890b5f5a952f9ba6e46e0ef6d38241da/specification/communication/data-plane/Microsoft.CommunicationServicesPhoneNumbers/stable/2021-03-07/phonenumbers.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210223.1"
add-credentials: false
azure-arm: false
skip-enum-validation: true
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
