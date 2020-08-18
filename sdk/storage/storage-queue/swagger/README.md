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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/storage-dataplane-preview/specification/storage/data-plane/Microsoft.QueueStorage/preview/2018-03-28/queue.json
model-date-time-as-string: true
optional-response-headers: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### /?restype=service&comp=properties (StorageServiceProperties renamed to QueueServiceProperties)

```yaml
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

```yaml
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

### Rename maxresults -> maxPageSize

```yaml
directive:
  - from: swagger-document
    where: $.parameters.MaxResults
    transform: >
      $["x-ms-client-name"] = "maxPageSize";
  - from: swagger-document
    where: $.definitions..properties.MaxResults
    transform: >
      $["x-ms-client-name"] = "maxPageSize";
```

### Rename visibilitytimeout -> visibilityTimeout

```yaml
directive:
  - from: swagger-document
    where: $.parameters.VisibilityTimeout
    transform: >
      $["x-ms-client-name"] = "visibilityTimeout";
  - from: swagger-document
    where: $.parameters.VisibilityTimeoutRequired
    transform: >
      $["x-ms-client-name"] = "visibilityTimeout";
```

### Rename permission -> permissions

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AccessPolicy.properties.Permission
    transform: >
      $["x-ms-client-name"] = "permissions";
```

### Rename NextMarker -> ContinuationToken

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.NextMarker
    transform: >
      $["x-ms-client-name"] = "continuationToken";
  - from: swagger-document
    where: $.parameters..description
    transform: return $.replace(/(?:NextMarker)+/, "ContinuationToken")
```

### Rename timeoutParameter -> timeout

```yaml
directive:
  - from: swagger-document
    where: $.parameters.Timeout
    transform: >
      $["x-ms-client-name"] = "timeoutInSeconds";
```

### Rename insertionTime -> insertedOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.InsertionTime
    transform: >
      $["x-ms-client-name"] = "insertedOn";
```

### Rename expirationTime -> expiresOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.ExpirationTime
    transform: >
      $["x-ms-client-name"] = "expiresOn";
```

### Rename LastSyncTime -> LastSyncOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.LastSyncTime
    transform: >
      $["x-ms-client-name"] = "lastSyncOn"
```

### Rename timeNextVisible -> nextVisibleOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.TimeNextVisible
    transform: >
      $["x-ms-client-name"] = "nextVisibleOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}/messages/{messageid}?popreceipt={popReceipt}&visibilitytimeout={visibilityTimeout}"]..responses..headers["x-ms-time-next-visible"]
    transform: >
      $["x-ms-client-name"] = "nextVisibleOn";
```

### Rename logging -> queueAnalyticsLogging

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.Logging
    transform: >
      $["x-ms-client-name"] = "queueAnalyticsLogging"
```

### Update service version from "2018-03-28" to "2019-12-12"

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ApiVersionParameter
    transform: $.enum = [ "2019-12-12" ];
```

### Rename AccessPolicy start -> startsOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AccessPolicy.properties
    transform: >
      $.Start["x-ms-client-name"] = "startsOn";
      $.Expiry["x-ms-client-name"] = "expiresOn";
```

### Add ClientRequestId from "2019-02-02"

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"][*]..responses..headers
    transform: >
      if (!$["x-ms-client-request-id"]) {
        $["x-ms-client-request-id"] = {};
        $["x-ms-client-request-id"]["x-ms-client-name"] = "ClientRequestId";
        $["x-ms-client-request-id"].type = "string";
        $["x-ms-client-request-id"].description = "If a client request id header is sent in the request, this header will be present in the response with the same value.";
      }
```


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-queue%2Fswagger%2FREADME.png)
