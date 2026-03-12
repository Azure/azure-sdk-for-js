# Azure Communication Rooms Service client library for JavaScript

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-rooms"
override-client-name: RoomsRestClient
description: Communication Rooms client
package-version: 1.2.2
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-rooms-2025-03-13
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1175ddba07ff5e3040bb3b15fe7fe59453f1ef7a/specification/communication/data-plane/Rooms/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
v3: true
use-extension:
  "@autorest/typescript": "6.0.34"
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"
typescript:
  generate-metadata: false
  azure-arm: false
module-kind: esm
```

### Set Role Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.Role"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```
