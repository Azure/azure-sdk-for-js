# KeyVault Certificates Swagger Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/keyvault-certificates"
disable-async-iterators: true
api-version-parameter: choice
use-core-v2: true
v3: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.19"
azure-arm: false
generate-metadata: false
add-credentials: false
core-http-compat-mode: true
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/551275acb80e1f8b39036b79dfc35a8f63b601a7/specification/keyvault/data-plane/Microsoft.KeyVault/stable/7.4/certificates.json
output-folder: ../
source-code-folder-path: ./src/generated
hide-clients: true
package-version: 4.7.1
openapi-type: data-plane
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