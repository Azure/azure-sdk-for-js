# Azure Container Registry TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/container-registry"
title: GeneratedClient
description: Container Registry Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
#input-file: ./containerregistry.json
input-file: https://github.com/Azure/azure-rest-api-specs/blob/9b489ff217acd3bd6d62b2932e42d3c08ed4d08c/specification/containerregistry/data-plane/Azure.ContainerRegistry/stable/2021-07-01/containerregistry.json
add-credentials: false
override-client-name: GeneratedClient
disable-async-iterators: true
hide-clients: true
package-version: 1.0.0-beta.6
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Remove response for "ContainerRegistry_DeleteRepository" operation

so that the generate code doesn't return a response for the delete repository operation.

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/acr/v1/{name}"]
    transform: >
      delete $.delete["responses"]["202"].schema
```

### Remove "Authentication_GetAcrAccessTokenFromLogin" operation

as the service team discourage using username/password to authenticate.

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/oauth2/token"]
    transform: >
      delete $.get
```

### Remove "definitions.TagAttributesBase.properties.signed"

as we don't have a SDK client customer scenario using it.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TagAttributesBase
    transform: >
      delete $.properties.signed
```

### Remove "definitions.ManifestAttributesBase.properties.configMediaType"

as we don't have a SDK client customer scenario using it.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ManifestAttributesBase
    transform: >
      delete $.properties.configMediaType
```
