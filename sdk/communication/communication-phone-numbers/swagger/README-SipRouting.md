# Azure Communication Services SMS Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
description: Azure Communication SIP Configuration Service
package-version: 1.2.0-beta.5
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
source-code-folder-path: src/siprouting
clear-output-folder: false
tag: package-phonenumber-siprouting-2021-05-01-preview
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/communication/data-plane/SipRouting/preview/2022-09-01-preview/communicationservicessiprouting.json
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
add-credentials: false
azure-arm: false
title: Sip Routing Client
v3: true
```

### Directive renaming "Domain" model to "SipDomain"

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.Domain"
    transform: >
      $["x-ms-client-name"] = "SipDomain";
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

### Directive changing "TrunkPatch" as nullable

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.TrunkPatch"
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
