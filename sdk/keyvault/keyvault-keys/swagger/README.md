# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/keyvault-keys"
use-extension:
  "@autorest/typescript": "6.0.0-dev.20201210.1"
azure-arm: false
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/f9caf92527ccff06c5b66380e6f2b4f50f5e82b3/specification/keyvault/data-plane/Microsoft.KeyVault/preview/7.2-preview/keys.json
output-folder: ../
source-code-folder-path: ./src/generated
disable-async-iterators: true
api-version-parameter: choice
v3: true
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
```
