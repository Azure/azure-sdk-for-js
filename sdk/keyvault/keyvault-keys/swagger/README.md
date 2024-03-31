# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
package-name: "@azure/keyvault-keys"
azure-arm: false
generate-metadata: false
add-credentials: false
core-http-compat-mode: true
use-core-v2: true
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/7452e1cc7db72fbc6cd9539b390d8b8e5c2a1864/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.5/keys.json
output-folder: ../
source-code-folder-path: ./src/generated
disable-async-iterators: true
api-version-parameter: choice
package-version: 4.8.1
use-extension:
  "@autorest/typescript": "6.0.0-beta.19"
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

## Rename certain models back to what they were before 7.4

```yaml
directive:
  - from: certificates.json
    where: $.definitions.Action
    transform: $.properties.action_type["x-ms-enum"].name = "ActionType";
  - from: keys.json
    where: $.definitions.LifetimeActionsType
    transform: $.properties.type["x-ms-enum"].name = "ActionType";
```
