# KeyVault Admin Swagger Configuration

> see https://aka.ms/autorest

``` yaml
package-name: "@azure/keyvault-admin"
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200623.2"
azure-arm: false
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/keyvault/data-plane/Microsoft.KeyVault/preview/7.2-preview/rbac.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/keyvault/data-plane/Microsoft.KeyVault/preview/7.2-preview/backuprestore.json
output-folder: ../
source-code-folder-path: ./src/generated
```
