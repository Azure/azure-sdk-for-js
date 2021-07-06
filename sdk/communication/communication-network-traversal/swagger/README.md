# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-communication-network-traversal
override-client-name: NetworkRelayRestClient
description: Communication Network Traversal Client
package-version: package-2021-06-21-preview
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2021-06-21-preview
require:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/86408a8777e623f5f41e260472ed831309b85086/specification/communication/data-plane/Turn/readme.md
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
