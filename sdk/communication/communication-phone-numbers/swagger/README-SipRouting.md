# Azure Communication Services SMS Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-phone-numbers"
description: Azure Communication SIP Configuration Service
package-version: 1.3.0-alpha.20230626.1
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
source-code-folder-path: src/siprouting
clear-output-folder: false
tag: package-2023-04-01-preview
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/communication/data-plane/SipRouting/preview/2023-04-01-preview/communicationservicessiprouting.json
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
skip-enum-validation: true
title: Sip Routing Client
v3: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
typescript:
  generate-metadata: false
  azure-arm: false
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions[*].properties[*]["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }
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

### Directive changing "TrunkUpdate" as nullable

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.TrunkUpdate"
    transform: >
      $["x-nullable"] = true;
```

```yaml
directive:
  - from: swagger-document
    where: "$.definitions.DomainPatch"
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

### Directive renaming Health to SipTrunkHealth
```yaml
directive:
    - from: swagger-document
      where: "$.definitions.Health"
      transform: >
          $.properties.overall["x-ms-client-name"] = "activity";
          $["x-ms-client-name"] = "SipTrunkHealth";
```

### Directive renaming Tls to SipTrunkTls
```yaml
directive:
    - from: swagger-document
      where: "$.definitions.Tls"
      transform: >
          $["x-ms-client-name"] = "SipTrunkTls";
```

### Directive renaming Ping to SipTrunkPing
```yaml
directive:
    - from: swagger-document
      where: "$.definitions.Ping"
      transform: >
          $["x-ms-client-name"] = "SipTrunkPing";
```

### Directive renaming OverallHealth to SipTrunkActivity together with status and reason properties
```yaml
directive:
    - from: swagger-document
      where: "$.definitions.OverallHealth"
      transform: >
          $.properties.status["x-ms-enum"].name = "activityStatus";
          $.properties.status.description = "The activity status of Trunk.";
          $.properties.reason["x-ms-enum"].name = "inactiveReason";
          $.properties.reason.description = "The reason activity status of Trunk is inactive.";
          $.properties.reason["x-ms-client-name"] = "inactiveReason";
          $["x-ms-client-name"] = "SipTrunkActivity";
          $.description = "The activity status of Trunk.";
```
