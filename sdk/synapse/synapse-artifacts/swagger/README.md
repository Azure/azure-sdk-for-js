# Synapse ArtifactsClient

> see https://aka.ms/autorest

Run `rushx generate:client` to generate code.

## Configuration

```yaml
package-name: "@azure/synapse-artifacts"
package-version: "1.0.0-beta.13"
add-credentials: true
license-header: MICROSOFT_MIT_NO_VERSION
security-scopes: https://dev.azuresynapse.net/.default
security: AADToken
output-folder: ..
clear-output-folder: false
tracing-info:
  namespace: "Azure.Synapse.Artifacts"
  packagePrefix: "Microsoft.Synapse"
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/61a8b1a62420c393fe5276c47373ea8dce74a985/specification/synapse/data-plane/readme.md
use-extension:
  "@autorest/typescript": "latest"
tag: package-artifacts-composite-v6

typescript:
  generate-metadata: false
  azure-arm: true

modelerfour:
  lenient-model-deduplication: true
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.CompressionLevel
    transform: >
      delete $.type
  - from: swagger-document
    where: $.definitions
    transform: >
      let visited = new Set();
      function makeAnyType(definition) {
        if (definition["type"] === "object") {
          delete definition["type"];
        }
      }

      function makeAny(definitions) {
        const keys = Object.keys(definitions);

        if (!keys.length) {
          return;
        }

        for (const key of keys) {
          if(!visited.has(definitions[key])) {
            visited.add(definitions[key])
            makeAnyType(definitions[key]);
            makeAny(definitions[key]);
          }
        }
      }

      const keys = Object.keys($);
      for(const key of keys) {
        makeAny($[key])
      }
```
