# Azure Communication Services Chat Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: azure-communication-chat
title: ChatApiClient
description: Chat Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-chat-2021-04-05-preview6
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/communication/data-plane/Microsoft.CommunicationServicesChat/readme.md
model-date-time-as-string: false
optional-response-headers: true
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210114.1"
  "@autorest/modelerfour": "4.15.442"
azure-arm: false
add-credentials: false
disable-async-iterators: true
```

### Rename CommunicationError to ChatError

```yaml
directive:
  from: swagger-document
  where: "$.definitions.CommunicationError"
  transform: >
    $["x-ms-client-name"] = "ChatError";
```
