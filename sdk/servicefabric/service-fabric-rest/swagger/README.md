# Azure Sample Readme for RLC

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/service-fabric"
title: ServiceFabric
description: Azure Service Fabric Rest-Level client library for JavaScript
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
input-file: https://github.com/Azure/azure-rest-api-specs/blob/70626b932d16a97361673e0bcba7570284fe0813/specification/servicefabric/data-plane/Microsoft.ServiceFabric/stable/8.1/servicefabric.json
package-version: 1.0.0-beta.1
rest-level-client: true
add-credentials: true
credential-scopes: "https://servicefabric.azure.net/.default"
use-extension:
  "@autorest/typescript": "6.0.0-beta.16"
rlc-shortcut: true
```

```yaml
directive:
  - rename-model:
      from: SecretResourcePropertiesBase
      to: SecretResourcePropertiesParent
  - rename-model:
      from: NetworkResourcePropertiesBase
      to: NetworkResourcePropertiesParent
  - rename-model:
      from: SecretResourcePropertiesBase
      to: SecretResourcePropertiesParent
  - rename-model:
      from: NetworkResourcePropertiesBase
      to: NetworkResourcePropertiesParent
```
