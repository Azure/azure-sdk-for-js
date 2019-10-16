# Azure Storage TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-storage-file
title: StorageClient
description: Storage Client
enable-xml: true
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./file-storage-2019-02-02.json
model-date-time-as-string: true
optional-response-headers: true
```

## Customizations for Track 2 Generator
See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### /?restype=service&comp=properties (StorageServiceProperties renamed to FileServiceProperties)
``` yaml
directive:
- from: swagger-document
  where: $.definitions
  transform: >
    if (!$.FileServiceProperties) {
        $.FileServiceProperties = $.StorageServiceProperties;
        delete $.StorageServiceProperties;
        $.FileServiceProperties.xml = { "name": "StorageServiceProperties" };
    }
- from: swagger-document
  where: $.parameters
  transform: >
    if (!$.FileServiceProperties) {
        const props = $.FileServiceProperties = $.StorageServiceProperties;
        props.name = "FileServiceProperties";
        props["x-ms-client-name"] = "properties";
        props.schema = { "$ref": props.schema.$ref.replace(/[#].*$/, "#/definitions/FileServiceProperties") };
        delete $.StorageServiceProperties;
    }
- from: swagger-document
  where: $["x-ms-paths"]["/?restype=service&comp=properties"]
  transform: >
    const param = $.put.parameters[0];
    if (param && param["$ref"] && param["$ref"].endsWith("StorageServiceProperties")) {
        const path = param["$ref"].replace(/[#].*$/, "#/parameters/FileServiceProperties");
        $.put.parameters[0] = { "$ref": path };
    }
    const def = $.get.responses["200"].schema;
    if (def && def["$ref"] && def["$ref"].endsWith("StorageServiceProperties")) {
        const path = def["$ref"].replace(/[#].*$/, "#/definitions/FileServiceProperties");
        $.get.responses["200"].schema = { "$ref": path };
    }
```

### Rename maxresults -> maxResults
``` yaml
directive:
- from: swagger-document
  where: $.parameters.MaxResults
  transform: >
     $["x-ms-client-name"] = "maxResults";
```

### Rename sharesnapshot -> shareSnapshot
``` yaml
directive:
- from: swagger-document
  where: $.parameters.ShareSnapshot
  transform: >
     $["x-ms-client-name"] = "shareSnapshot";
```
