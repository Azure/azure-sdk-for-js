# Synapse ArtifactsClient

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/synapse-access-control"
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/f953424dd168e71373bc52edb9713d2d86a14ada/specification/synapse/data-plane/readme.md
use-extension:
  "@autorest/typescript": "~/projects/autorest.typescript"

typescript:
  generate-metadata: false
  azure-arm: true

modelerfour:
  lenient-model-deduplication: true

batch:
  - package-access-control: true
    package-name: "@azure-rest/synapse-access-control"
     package-version: "1.0.0-beta.1"
    add-credentials: true
    rest-level-client: true
    license-header: MICROSOFT_MIT_NO_VERSION
    credential-scopes: https://dev.azuresynapse.net/.default
    output-folder: ..
    clear-output-folder: false
    tracing-info:
      namespace: "Azure.Synapse.AccessControl"
      packagePrefix: "Microsoft.Synapse"
```
