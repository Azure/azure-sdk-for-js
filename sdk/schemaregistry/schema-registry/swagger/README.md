# Azure Schema Registry

> see https://aka.ms/autorest

TODO: swagger link below is still in PR. Replace with proper link once
https://github.com/Azure/azure-rest-api-specs/pull/10220 is merged.

## Configuration

```yaml
v3: true
package-name: "@azure/schema-registry"
package-version: 1.0.0
title: GeneratedSchemaRegistryClient
description: Generated Schema Registry Client
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/schemaregistry/data-plane/Microsoft.EventHub/stable/2021-10/schemaregistry.json
typescript: true
```

```yaml
directive:
  from: swagger-document
  where: $.paths..["Serialization-Type"]
  transform: $.enum = undefined; $["x-ms-enum"] = undefined; return $;
  reason: https://github.com/Azure/autorest.typescript/issues/736
```
