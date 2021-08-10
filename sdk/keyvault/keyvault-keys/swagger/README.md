# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
package-name: "@azure/keyvault-keys"
azure-arm: false
generate-metadata: false
add-credentials: false
use-core-v2: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/f4a4badda9e19dca5cab216f3dd8b45362aeb90b/specification/keyvault/data-plane/Microsoft.KeyVault/preview/7.3-preview/keys.json
output-folder: ../
source-code-folder-path: ./src/generated
disable-async-iterators: true
api-version-parameter: choice
package-version: 4.4.0-beta.1
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Rename aad as KeyOperationsParameters

```yaml
directive:
  - from: swagger-document
    where: $.definitions.KeyOperationsParameters.properties.aad
    transform: >
      $["x-ms-client-name"] = "additionalAuthenticatedData";
  - from: swagger-document
    where: $.definitions.KeyOperationsParameters.properties.tag
    transform: >
      $["x-ms-client-name"] = "authenticationTag"
```
