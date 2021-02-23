# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/keyvault-keys"
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210111.1"
azure-arm: false
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/612f78afd05911d0e1e82ba72b41781f655dbffb/specification/keyvault/data-plane/Microsoft.KeyVault/preview/7.2-preview/keys.json
output-folder: ../
source-code-folder-path: ./src/generated
disable-async-iterators: true
api-version-parameter: choice
v3: true
hide-clients: true
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
