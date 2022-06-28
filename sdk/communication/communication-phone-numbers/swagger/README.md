# Azure Communication Services Phone Numbers Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
description: Phone number configuration client
package-version: 1.2.0-beta.4
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-phonenumber-2022-06-01-preview
require: https://github.com/Azure/azure-rest-api-specs/blob/6de2e5bf9286b2dddea9a372c78cc0de214897dd/specification/communication/data-plane/PhoneNumbers/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
add-credentials: false
azure-arm: false
skip-enum-validation: true
title: Phone Numbers Client
v3: true
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

### Change naming of update capabilities to ommit the OC specification

``` yaml
directive:
  from: swagger-document
  where: $.paths.*[?(@.operationId == "PhoneNumbers_UpdateCapabilitiesOC")]
  transform: >
    $.operationId = "PhoneNumbers_UpdateCapabilities"
```
