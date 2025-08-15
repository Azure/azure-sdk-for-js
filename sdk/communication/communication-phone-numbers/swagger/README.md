# Azure Communication Services Phone Numbers Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
description: Phone number configuration client
package-version: 1.5.0
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-phonenumber-2025-06-01
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/14800a01400c295af0bfa5886e5f4042e4f6c62e/specification/communication/data-plane/PhoneNumbers/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
skip-enum-validation: true
title: Phone Numbers Client
v3: true
use-extension:
  "@autorest/typescript": "6.0.34"
use-legacy-lro: true
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"
typescript:
  generate-metadata: false
  azure-arm: false
module-kind: esm
```

## Customizations

### Set remove-empty-child-schemas
```yaml
modelerfour:
    remove-empty-child-schemas: true
```

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

``` yaml
directive:
  from: swagger-document
  where: $.parameters.Endpoint
  transform: >
    $["format"] = "";
```

### Remove readonly attributes from AvailablePhoneNumber properties
```yaml
directive:
  - from: swagger-document
    where: $.definitions.AvailablePhoneNumber
    transform: >
      $["properties"]["cost"].readOnly = false;
      $["properties"]["id"].readOnly = false;
      $["properties"]["isAgreementToNotResellRequired"].readOnly = false;
      $["properties"]["phoneNumber"].readOnly = false;
      $["properties"]["status"].readOnly = false;
      $["properties"]["error"].readOnly = false;
```
### Remove readonly attributes from AvailablePhoneNumberError properties
```yaml
directive:
  - from: swagger-document
    where: $.definitions.AvailablePhoneNumberError
    transform: >
      $["readOnly"] = false;
      $["properties"]["code"].readOnly = false;
      $["properties"]["message"].readOnly = false;
```

### Mark attributes from AvailablePhoneNumberError as required
```yaml
directive:
  - from: swagger-document
    where: $.definitions.AvailablePhoneNumberError
    transform: >
      if (!$.required) {
        $.required = [];
      }
      if (!$.required.includes("code")) {
        $.required.push("code");
      }
      if (!$.required.includes("message")) {
        $.required.push("message");
      }
```

### Remove readonly attributes from PhoneNumbersReservation properties
```yaml
directive:
  - from: swagger-document
    where: $.definitions.PhoneNumbersReservation
    transform: >
      $["properties"]["expiresAt"].readOnly = false;
      $["properties"]["id"].readOnly = false;
      $["properties"]["status"].readOnly = false;
```

### Rename AvailablePhoneNumberStatus to PhoneNumberAvailabilityStatus
```yaml
directive:
  from: swagger-document
  where: $.definitions.AvailablePhoneNumber.properties.status.x-ms-enum
  transform: >
    $["name"] = "PhoneNumberAvailabilityStatus";
```

### Replace type from AvailablePhoneNumberError to CommunicationError
```yaml
directive:
  - from: swagger-document
    where: $.definitions.AvailablePhoneNumber.properties.error
    transform: >
      $.type = "object";
      $.$ref = "../../../Common/stable/2021-03-07/common.json#/definitions/CommunicationError";
```
