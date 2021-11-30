# Synapse ArtifactsClient

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/synapse-monitoring"
package-version: "1.0.0-beta.3"
add-credentials: true
license-header: MICROSOFT_MIT_NO_VERSION
credential-scopes: https://dev.azuresynapse.net/.default
output-folder: ..
clear-output-folder: false
tracing-info:
  namespace: "Azure.Synapse.Monitoring"
  packagePrefix: "Microsoft.Synapse"
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/synapse/data-plane/readme.md
use-extension:
  "@autorest/typescript": "latest"

typescript:
  generate-metadata: false
  azure-arm: true

modelerfour:
  lenient-model-deduplication: true
```
