# Synapse ArtifactsClient

> see https://aka.ms/autorest

## Configuration

```yaml
tag: package-access-control-2020-12-01
package-name: "@azure-rest/synapse-access-control"
package-version: "1.0.0-beta.1"
title: AccessControl
add-credentials: true
license-header: MICROSOFT_MIT_NO_VERSION
credential-scopes: https://dev.azuresynapse.net/.default
output-folder: ..
clear-output-folder: false
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/synapse/data-plane/readme.md
use-extension:
  "@autorest/typescript": "latest"

typescript:
  generate-metadata: false
  azure-arm: true
  rest-level-client: true

modelerfour:
  lenient-model-deduplication: true
```
