# Azure Schema Registry

> see https://aka.ms/autorest

TODO: swagger link below is still in PR. Replace with proper link once
https://github.com/Azure/azure-rest-api-specs/pull/10220 is merged.

## Configuration

```yaml
v3: true
package-name: "@azure/schema-registry"
package-version: 1.3.0-beta.2
title: GeneratedSchemaRegistryClient
description: Generated Schema Registry Client
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/schemaregistry/data-plane/Microsoft.EventHub/stable/2023-07-01/schemaregistry.json
typescript: true
```

## Swagger workarounds

### Add Content-Type header to GetById operation

``` yaml
directive:
  from: swagger-document
  where: $.paths["/$schemaGroups/{groupName}/schemas/{schemaName}:get-id"].post
  transform: >
    delete $.consumes;
    $.parameters.push({
      "name": "Content-Type",
      "in": "header",
      "description": "Content type of the schema.",
      "required": true,
      "type": "string"});
```

### Add Content-Type header to Register operation

``` yaml
directive:
  from: swagger-document
  where: $.paths["/$schemaGroups/{groupName}/schemas/{schemaName}"].put
  transform: >
    delete $.consumes;
    $.parameters.push({
      "name": "Content-Type",
      "in": "header",
      "description": "Content type of the schema.",
      "required": true,
      "type": "string"});
```

### Delete all validation patterns from parameters

```yaml
directive:
  - from: swagger-document
    where: $["parameters"][*]
    transform: >
      if ($.pattern) {
        delete $.pattern;
      }
```

### Delete list operations

```yaml
directive:
  - from: swagger-document
    where: $["paths"]
    transform: >
      delete $["/$schemaGroups"]["get"];
      delete $["/$schemaGroups/{groupName}/schemas/{schemaName}/versions"]["get"];

  - from: swagger-document
    where: $["definitions"]
    transform: >
      delete $["SchemaGroups"];
      delete $["SchemaVersions"];
```
