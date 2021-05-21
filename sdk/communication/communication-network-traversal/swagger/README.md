# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-communication-network-traversal
override-client-name: NetworkRelayRestClient
description: Communication Network Traversal Client
package-version: 1.0.0-beta.1
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2021-02-22-preview1
require:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/60be518b4fa1a9fb011a0cb69ae7ca3e1cee06b1/specification/communication/data-plane/Microsoft.CommunicationServicesTurn/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200623.2"
add-credentials: false
azure-arm: false
```

### Fix operation id

```yaml
directive:
  from: swagger-document
  where: '$.paths["/turn/{id}/:issueCredentials"].post'
  transform: >
    $["operationId"] = "CommunicationNetworkTraversal_IssueTurnCredentials";
```

### Rename `CommunicationTurnCredentialsResponse` to `CommunicationRelayConfiguration`

```yaml
directive:
  - rename-model:
      from: CommunicationTurnCredentialsResponse
      to: CommunicationRelayConfiguration
```
