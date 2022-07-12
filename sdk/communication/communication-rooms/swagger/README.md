# Azure Communication Rooms Service client library for Java

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-rooms"
title: RoomsApiClient
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/e30976f6ccb058a36cd2f9d5160e1fd51f6c5d95/specification/communication/data-plane/Rooms/readme.md
description: Communication Rooms Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-rooms-2022-02-01-preview
model-date-time-as-string: false
optional-response-headers: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
azure-arm: false
add-credentials: false
package-version: 1.2.0-beta.1
v3: true
```

### Disable extensible enums

### Set RoomJoinPolicy Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.RoomJoinPolicy"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```

### Set RoleType Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.RoleType"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```
