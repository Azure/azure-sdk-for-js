# Azure Storage TypeScript Protocol Layer

> see https://aka.ms/autorest


## Configuration

```yaml
package-name: azure-storage-blob
title: StorageClient
description: Storage Client
enable-xml: true
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./blob-storage-2019-02-02.json
model-date-time-as-string: true
optional-response-headers: true
```

## Customizations for Track 2 Generator
See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### /?restype=service&comp=properties (StorageServiceProperties renamed to BlobServiceProperties)
``` yaml
directive:
- from: swagger-document
  where: $.definitions
  transform: >
    if (!$.BlobServiceProperties) {
        $.BlobServiceProperties = $.StorageServiceProperties;
        delete $.StorageServiceProperties;
        $.BlobServiceProperties.xml = { "name": "StorageServiceProperties" };
    }
- from: swagger-document
  where: $.parameters
  transform: >
    if (!$.BlobServiceProperties) {
        const props = $.BlobServiceProperties = $.StorageServiceProperties;
        props.name = "BlobServiceProperties";
        props.schema = { "$ref": props.schema.$ref.replace(/[#].*$/, "#/definitions/BlobServiceProperties") };
        delete $.StorageServiceProperties;
    }
- from: swagger-document
  where: $["x-ms-paths"]["/?restype=service&comp=properties"]
  transform: >
    const param = $.put.parameters[0];
    if (param && param["$ref"] && param["$ref"].endsWith("StorageServiceProperties")) {
        const path = param["$ref"].replace(/[#].*$/, "#/parameters/BlobServiceProperties");
        $.put.parameters[0] = { "$ref": path };
    }
    const def = $.get.responses["200"].schema;
    if (def && def["$ref"] && def["$ref"].endsWith("StorageServiceProperties")) {
        const path = def["$ref"].replace(/[#].*$/, "#/definitions/BlobServiceProperties");
        $.get.responses["200"].schema = { "$ref": path };
    }
```

### /?restype=service&comp=stats (StorageServiceStats renamed to BlobServiceStatistics)
``` yaml
directive:
- from: swagger-document
  where: $.definitions
  transform: >
    if (!$.BlobServiceStatistics) {
        $.BlobServiceStatistics = $.StorageServiceStats;
        delete $.StorageServiceStats;
        $.BlobServiceStatistics.xml = { "name": "StorageServiceStats" };
    }
- from: swagger-document
  where: $["x-ms-paths"]["/?restype=service&comp=stats"]
  transform: >
    const def = $.get.responses["200"].schema;
    if (def && def["$ref"] && def["$ref"].endsWith("StorageServiceStats")) {
        const path = def["$ref"].replace(/[#].*$/, "#/definitions/BlobServiceStatistics");
        $.get.responses["200"].schema = { "$ref": path };
    }
```

### UserDelegationKey properties
``` yaml
directive:
- from: swagger-document
  where: $.definitions.UserDelegationKey
  transform: >
    $.properties.SignedTid["x-ms-client-name"] = "signedTenantId";
    $.properties.SignedOid["x-ms-client-name"] = "signedObjectId";
```
