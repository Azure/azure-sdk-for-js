# Azure Storage TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-storage-queue
title: StorageClient
description: Storage Client
enable-xml: true
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: ./queue-storage-2019-02-02.json
model-date-time-as-string: true
optional-response-headers: true
```

## Customizations for Track 2 Generator
See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### /?restype=service&comp=properties (StorageServiceProperties renamed to QueueServiceProperties)
``` yaml
directive:
- from: swagger-document
  where: $.definitions
  transform: >
    if (!$.QueueServiceProperties) {
        $.QueueServiceProperties = $.StorageServiceProperties;
        delete $.StorageServiceProperties;
        $.QueueServiceProperties.xml = { "name": "StorageServiceProperties" };
    }
- from: swagger-document
  where: $.parameters
  transform: >
    if (!$.QueueServiceProperties) {
        const props = $.QueueServiceProperties = $.StorageServiceProperties;
        props.name = "QueueServiceProperties";
        props["x-ms-client-name"] = "properties";
        props.schema = { "$ref": props.schema.$ref.replace(/[#].*$/, "#/definitions/QueueServiceProperties") };
        delete $.StorageServiceProperties;
    }
- from: swagger-document
  where: $["x-ms-paths"]["/?restype=service&comp=properties"]
  transform: >
    const param = $.put.parameters[0];
    if (param && param["$ref"] && param["$ref"].endsWith("StorageServiceProperties")) {
        const path = param["$ref"].replace(/[#].*$/, "#/parameters/QueueServiceProperties");
        $.put.parameters[0] = { "$ref": path };
    }
    const def = $.get.responses["200"].schema;
    if (def && def["$ref"] && def["$ref"].endsWith("StorageServiceProperties")) {
        const path = def["$ref"].replace(/[#].*$/, "#/definitions/QueueServiceProperties");
        $.get.responses["200"].schema = { "$ref": path };
    }
```

### /?restype=service&comp=stats (StorageServiceStats renamed to QueueServiceStatistics)
``` yaml
directive:
- from: swagger-document
  where: $.definitions
  transform: >
    if (!$.QueueServiceStatistics) {
        $.QueueServiceStatistics = $.StorageServiceStats;
        delete $.StorageServiceStats;
        $.QueueServiceStatistics.xml = { "name": "StorageServiceStats" };
    }
- from: swagger-document
  where: $["x-ms-paths"]["/?restype=service&comp=stats"]
  transform: >
    const def = $.get.responses["200"].schema;
    if (def && def["$ref"] && def["$ref"].endsWith("StorageServiceStats")) {
        const path = def["$ref"].replace(/[#].*$/, "#/definitions/QueueServiceStatistics");
        $.get.responses["200"].schema = { "$ref": path };
    }
```
