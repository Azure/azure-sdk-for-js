# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
require: "https://github.com/Azure/azure-rest-api-specs/blob/bd75cbc7ae9c997f39362ac9d19d557219720bbd/specification/eventgrid/data-plane/readme.md"
package-name: "@azure/eventgrid"
package-version: "3.0.0-beta.4"
title: GeneratedClient
description: EventGrid Client
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210121.2"
hide-clients: true
```

## Customizations

### Use the "EventData" suffix on the Azure Resource Manager Event types, instead of just "Data"

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      ["Write", "Delete", "Action"].forEach(action => {
        ["Success", "Failure", "Cancel"].forEach(status => {
          if ($[`Resource${action}${status}Data`]) {
            $[`Resource${action}${status}Data`]["x-ms-client-name"] = `Resource${action}${status}EventData`;
          }
        });
      });
```

### Remove the "Properties" suffix from some Azure Communication Services types

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      ["ACSChatThreadEventBase", "ACSChatMessageEventBase", "ACSChatEventBase", "ACSChatThreadMember",  "AcsSmsEventBase", "AcsSmsDeliveryAttempt"].forEach(cleanName => {
        if ($[`${cleanName}Properties`]) {
          $[`${cleanName}Properties`]["x-ms-client-name"] = cleanName;
        }
      });
```
