# Synapse ArtifactsClient

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/synapse-managed-private-endpoints"
package-version: "1.0.0-beta.6"
title: ManagedPrivateEndpointsClient
add-credentials: true
license-header: MICROSOFT_MIT_NO_VERSION
security-scopes: https://dev.azuresynapse.net/.default
security: AADToken
output-folder: ..
clear-output-folder: false
tracing-info:
  namespace: "Azure.Synapse.ManagedPrivateEndpoints"
  packagePrefix: "Microsoft.Synapse"
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/b9d36b704e582a2bd5677fedc813607e73963469/specification/synapse/data-plane/readme.md
tag: package-vnet-2020-12-01
use-extension:
  "@autorest/typescript": "6.0.34"
typescript:
  generate-metadata: false
  azure-arm: true
modelerfour:
  lenient-model-deduplication: true
module-kind: esm
```
