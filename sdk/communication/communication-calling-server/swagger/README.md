# Azure Communication Services CallingServer Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

### Generation

```ps
cd <communication-calling-server folder>
rushx build:autorest
```

## Configuration

```yaml
package-name: azure-communication-calling-server
title: CallingServerApiClient
description: CallingServer Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2021-11-15-preview
require: https://raw.githubusercontent.com/navali-msft/azure-rest-api-specs/773f9b008157ff125fa339b23eab534308e61d3f/specification/communication/data-plane/CallingServer/readme.md
model-date-time-as-string: false
optional-response-headers: true
typescript: true
azure-arm: false
add-credentials: false
disable-async-iterators: true
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210217.1"
package-version: 1.0.0-beta.1
```

### Set CallMediaType Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.CallMediaType"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```

### Set CallingEventSubscriptionType Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.CallingEventSubscriptionType"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```
