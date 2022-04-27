# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
package-name: "@azure/keyvault-keys"
azure-arm: false
generate-metadata: false
add-credentials: false
use-core-v2: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/e2ef44b87405b412403ccb005bfb3975411adf60/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.3/keys.json
output-folder: ../
source-code-folder-path: ./src/generated
disable-async-iterators: true
api-version-parameter: choice
package-version: 4.5.0-beta.1
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
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

### Update swagger enum values for LifetimeActionsType to reflect what the service actually returns

```yaml
directive:
  - from: swagger-document
    where: $.definitions.LifetimeActionsType.properties["type"]["x-ms-enum"]
    transform: >
      $.values[0].value = "Rotate";
      $.values[1].value = "Notify";
```

### Rename KeyReleasePolicy.data to KeyReleasePolicy.encodedPolicy

```yaml
directive:
  - from: swagger-document
    where: $.definitions.KeyReleasePolicy.properties.data
    transform: >
      $["x-ms-client-name"] = "encodedPolicy";
```
