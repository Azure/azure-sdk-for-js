# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-network-traversal"
override-client-name: NetworkRelayRestClient
description: Communication Network Traversal Client
package-version: 1.1.0-beta.3
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2022-03-01-preview
require:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/6282e522ef78366170de518e76b8adb0e27563a2/specification/communication/data-plane/NetworkTraversal/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
v3: true
use-extension:
  "@autorest/typescript": "latest"
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"

typescript:
  generate-metadata: false
  azure-arm: false
```
