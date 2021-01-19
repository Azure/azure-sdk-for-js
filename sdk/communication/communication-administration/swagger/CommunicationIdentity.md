# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-communication-administration-identity
override-client-name: IdentityRestClient
description: Communication identity client
package-version: 1.0.0-beta.4
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/communicationIdentity/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/30b5cd90529d3fbba629bbc17c4ccd5446801eaa/specification/communication/data-plane/Microsoft.CommunicationServicesIdentity/stable/2021-03-07/CommunicationIdentity.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200623.2"
add-credentials: false
azure-arm: false
```
