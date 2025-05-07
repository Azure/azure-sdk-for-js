# Synapse ArtifactsClient

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/synapse-access-control"
package-version: "1.0.0-beta.5"
add-credentials: true
license-header: MICROSOFT_MIT_NO_VERSION
security-scopes: https://dev.azuresynapse.net/.default
security: AADToken
output-folder: ..
clear-output-folder: false
tracing-info:
  namespace: "Azure.Synapse.AccessControl"
  packagePrefix: "Microsoft.Synapse"
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1a0701d25874ac7a43620a2dad2f893562ac1340/specification/synapse/data-plane/readme.md
tag: package-access-control-2020-12-01
use-extension:
  "@autorest/typescript": "6.0.34"
typescript:
  generate-metadata: false
  azure-arm: true
modelerfour:
  lenient-model-deduplication: true
module-kind: esm
```
