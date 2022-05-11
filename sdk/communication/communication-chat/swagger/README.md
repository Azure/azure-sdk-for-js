# Azure Communication Services Chat Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: "@azure/communication-chat"
title: ChatApiClient
description: Chat Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-chat-2021-09-07
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/communication/data-plane/Chat/readme.md
model-date-time-as-string: false
optional-response-headers: true
typescript: true
azure-arm: false
add-credentials: false
disable-async-iterators: true
package-version: 1.2.1
```

### Rename CommunicationError to ChatError

```yaml
directive:
  from: swagger-document
  where: "$.definitions.CommunicationError"
  transform: >
    $["x-ms-client-name"] = "ChatError";
```

### Set ChatMessageType Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.ChatMessageType"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```
