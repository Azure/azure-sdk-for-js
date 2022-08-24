# Azure Communication Services SMS Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
description: Azure Communication SIP Configuration Service
package-version: 1.2.0-beta.3
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
source-code-folder-path: src/siprouting
clear-output-folder: false
#typescript: true
#openapi-type: data-plane
tag: package-2022-09-01-preview
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1f7dbc1ae024200d70e85bf055c9c785c456ef24/specification/communication/data-plane/SipRouting/readme.md
# require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/56cf1008f95c0d13eeb746e25d7d7f21ea94d3d5/specification/communication/data-plane/TrunkStatus/readme.md
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
add-credentials: false
azure-arm: false
title: Sip Routing Client
v3: true
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