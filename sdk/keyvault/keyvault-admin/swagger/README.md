# KeyVault Admin Swagger Configuration

> see https://aka.ms/autorest

```yaml
package-name: "@azure/keyvault-admin"
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200917.1"
azure-arm: false
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1e2c9f3ec93078da8078389941531359e274f32a/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.2/rbac.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/1e2c9f3ec93078da8078389941531359e274f32a/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.2/backuprestore.json
output-folder: ../
source-code-folder-path: ./src/generated
```

### Hide LROs

```yaml
directive:
  - from: swagger-document
    where: $["paths"]
    transform: >
      for (var path in $) {
          for (var op of Object.values($[path])) {
              if (op["x-ms-long-running-operation"]) {
                  delete op["x-ms-long-running-operation"];
              }
          }
      }
```
