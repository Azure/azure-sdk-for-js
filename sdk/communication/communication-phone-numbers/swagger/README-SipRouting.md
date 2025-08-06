# Azure Communication Services SMS Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
description: Azure Communication SIP Configuration Service
package-version: 1.5.0
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
source-code-folder-path: src/siprouting
clear-output-folder: false
tag: package-2023-03
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/communication/data-plane/SipRouting/readme.md
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.34"
add-credentials: false
azure-arm: false
title: Sip Routing Client
v3: true
module-kind: esm
```

### Directive renaming "Trunk" model to "SipTrunk"

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.Trunk"
    transform: >
      $["x-ms-client-name"] = "SipTrunk";
```

### Directive renaming "TrunkRoute" model to "SipTrunkRoute"

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.TrunkRoute"
    transform: >
      $["x-ms-client-name"] = "SipTrunkRoute";
```

### Directive renaming "CommunicationError" model to "SipRoutingError"

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.CommunicationError"
    transform: >
      $["x-ms-client-name"] = "SipRoutingError";
```

### Directive changing "TrunkUpdate" as nullable

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.TrunkUpdate"
    transform: >
      $["x-nullable"] = true;
```

### Directive for resolving default error type as "CommunicationErrorResponse"

```yaml
directive:
  from: swagger-document
  where: '$.paths["/sip"].patch'
  transform: >
    const newResponses = {};
    for (let responseCode in $.responses) {
      let response = $.responses[responseCode];
      if (response["schema"]) {
        newResponses[responseCode] = response;
      }
    }
    $.responses = newResponses;
```
