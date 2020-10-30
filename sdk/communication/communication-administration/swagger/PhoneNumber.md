# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-communication-administration-phoneNumber
override-client-name: PhoneNumberRestClient
description: Phone number configuration client
package-version: 1.0.0-beta.1
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/phoneNumber/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/257f060be8b60d8468584682aa2d71b1faa5f82c/specification/communication/data-plane/Microsoft.CommunicationServicesAdministration/preview/2020-07-20-preview1/communicationservicesadministration.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use: "@microsoft.azure/autorest.typescript@5.0.1"
azure-arm: false
```

### Rename searchId to reservationId

```yaml
directive:
  - from: swagger-document
    where: $.definitions.PhoneNumberSearch.properties.searchId
    transform: >
      $["x-ms-client-name"] = "reservationId";
```

### Rename PhoneNumberSearch to PhoneNumberReservation

```yaml
custom-types-subpackage: models
custom-types: PhoneNumberReservation
required-fields-as-ctor-args: true
directive:
  - rename-model:
      from: PhoneNumberSearch
      to: PhoneNumberReservation
```
