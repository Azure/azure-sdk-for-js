# Azure Communication Services Chat Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: "@azure/communication-chat"
title: ChatApiClient
description: Chat Client
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-chat-2025-03-15
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/e5f9d3b1d33ee4e98eef7ec302966f5b0b6efeeb/specification/communication/data-plane/Chat/readme.md
model-date-time-as-string: false
optional-response-headers: true
add-credentials: false
disable-async-iterators: true
package-version: 1.6.0
use-extension:
  "@autorest/typescript": "6.0.34"
tracing-info:
  namespace: "Azure.Communication"
  packagePrefix: "Microsoft.Communication"
typescript:
  generate-metadata: false
  azure-arm: false
module-kind: esm
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

### Set ChatAttachmentType Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.ChatAttachmentType"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```
