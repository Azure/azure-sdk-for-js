# Azure Communication Services Phone Numbers Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
description: Phone number configuration client
package-version: 1.2.1
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-phonenumber-2023-05-01-preview
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/7049721aa66d8e56847ba81553b25a7200152560/specification/communication/data-plane/PhoneNumbers/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
skip-enum-validation: true
title: Phone Numbers Client
v3: true
use-extension:
  "@autorest/typescript": "latest"
use-legacy-lro: true
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
```

### Change naming of update capabilities to ommit the OC specification

``` yaml
directive:
  from: swagger-document
  where: $.paths.*[?(@.operationId == "PhoneNumbers_UpdateCapabilitiesOC")]
  transform: >
    $.operationId = "PhoneNumbers_UpdateCapabilities"
```

### Change naming of AreaCodeResult to AreaCodeItem
``` yaml
directive:
  from: swagger-document
  where: "$.definitions.AreaCodeResult"
  transform: >
    $["x-ms-client-name"] = "AreaCodeItem";
```

``` yaml
directive:
  from: swagger-document
  where: $.definitions.PhoneNumberSearchResult.properties.error.x-ms-enum
  transform: >
    $["name"] = "PhoneNumberSearchResultError";
```
