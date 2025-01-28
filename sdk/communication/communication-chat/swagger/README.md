# Azure Communication Services Chat Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: "@azure/communication-chat"
title: ChatApiClient
description: Chat Client
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2024-06-05-preview
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/e704ce4d6ed7b5f6225446e373d2eda376fc5580/specification/communication/data-plane/Chat/readme.md
model-date-time-as-string: false
optional-response-headers: true
add-credentials: false
disable-async-iterators: true
package-version: 1.6.0-beta.4
use-extension:
  "@autorest/typescript": "latest"
tracing-info:
  namespace: "Azure.Communication"
  packagePrefix: "Microsoft.Communication"

typescript:
  generate-metadata: false
  azure-arm: false
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

### Set RetentionPolicyKind Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.ChatRetentionPolicy.properties.kind"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```

### Set PolicyViolationMessageState Model as string false

```yaml
directive:
  from: swagger-document
  where: "$.definitions.PolicyViolationMessageState"
  transform: >
    $["x-ms-enum"].modelAsString = false;
```
