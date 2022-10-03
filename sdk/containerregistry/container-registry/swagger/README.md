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
input-file: https://github.com/Azure/azure-rest-api-specs/blob/c8d9a26a2857828e095903efa72512cf3a76c15d/specification/containerregistry/data-plane/Azure.ContainerRegistry/stable/2021-07-01/containerregistry.json
add-credentials: false
override-client-name: GeneratedClient
disable-async-iterators: true
hide-clients: true
api-version-parameter: choice
package-version: 1.1.0-beta.2
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

### Change "parameters.ApiVersionParameter.required" to true

so that the generated client/clientcontext constructors take apiVersion as a parameter.

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ApiVersionParameter
    transform: >
      $.required = true
```

### Take stream as manifest body

```yaml
directive:
  from: swagger-document
  where: $.parameters.ManifestBody
  transform: >
    $.schema = {
        "type": "string",
        "format": "binary"
      }
```

# Add content-type parameter

```yaml
directive:
  from: swagger-document
  where: $.paths["/v2/{name}/manifests/{reference}"].put
  transform: >
    $.parameters.push({
        "name": "Content-Type",
        "in": "header",
        "type": "string",
        "description": "The manifest's Content-Type."
    });
    delete $.responses["201"].schema;
```

# Change NextLink client name to nextLink

```yaml
directive:
  from: swagger-document
  where: $.parameters.NextLink
  transform: >
    $["x-ms-client-name"] = "nextLink"
```

# Updates to OciManifest

```yaml
directive:
  from: swagger-document
  where: $.definitions.OCIManifest
  transform: >
    delete $["allOf"];
    $.properties["schemaVersion"] = {
          "type": "integer",
          "description": "Schema version"
        };
```

# Rename created to createdOn in OciAnnotations

to make our naming consistent

```yaml
directive:
  from: swagger-document
  where: $.definitions.Annotations
  transform: >
    $.properties["org.opencontainers.image.created"] = {
      "description": "Date and time on which the image was built (string, date-time as defined by https://tools.ietf.org/html/rfc3339#section-5.6)",
      "type": "string",
      "format": "date-time",
      "x-ms-client-name": "CreatedOn"
    }
```

# Add escaping to second and third periods of property names

to work around a code generator bug where only the first period is escaped.
This should be removed when the code gen bug is fixed.

```yaml
directive:
  from: swagger-document
  where: $.definitions.Annotations
  transform: >
    $.properties = Object.keys($.properties).reduce((acc, key) => {
      const newKey = key.replace("org.opencontainers.image.", "org.opencontainers\\.image\\.");
      acc[newKey] = $.properties[key];
      return acc;
    }, {});
```

# Changes to getManifest definition

Since:

- We need to expose the Docker-Content-Digest header
- We need the manifest body as text to calculate the digest

```yaml
directive:
  from: swagger-document
  where: $.paths["/v2/{name}/manifests/{reference}"].get.responses["200"]
  transform: >
    $.schema = {
      type: "string",
      format: "file"
    };
    $.headers = {
      "Docker-Content-Digest": {
        "type": "string",
        "description": "Identifies the docker upload uuid for the current request."
      }
    };
```
