# Azure Communication Rooms Service client library for JavaScript

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-rooms"
override-client-name: RoomsRestClient
description: Communication Rooms client
package-version: 1.1.0-beta.1
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-rooms-2023-10-30-preview
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/16f827b7e3392f4f5bc407a626b292cab29abdf9/specification/communication/data-plane/Rooms/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
v3: true

use-extension:
  "@autorest/typescript": "latest"
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"

typescript:
  generate-metadata: false
  azure-arm: false
```

### Set Role Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.Role"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```
