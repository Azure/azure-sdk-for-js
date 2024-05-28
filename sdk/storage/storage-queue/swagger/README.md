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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/4a93ab078fba7f087116283c8ed169f9b8e30397/specification/storage/data-plane/Microsoft.QueueStorage/preview/2018-03-28/queue.json
model-date-time-as-string: true
optional-response-headers: true
v3: true
disable-async-iterators: true
add-credentials: false
core-http-compat-mode: true
use-extension:
  "@autorest/typescript": "6.0.3"
package-version: 12.22.0-beta.2
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Don't include container or blob in path - we have direct URIs.

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      for (const property in $)
      {
          if (property.includes('/{queueName}/messages/{messageid}'))
          {
              $[property]["parameters"] = $[property]["parameters"].filter(function(param) { return (typeof param['$ref'] === "undefined") || (false == param['$ref'].endsWith("#/parameters/QueueName") && false == param['$ref'].endsWith("#/parameters/MessageId"))});
          } 
          else if (property.includes('/{queueName}'))
          {
              $[property]["parameters"] = $[property]["parameters"].filter(function(param) { return (typeof param['$ref'] === "undefined") || (false == param['$ref'].endsWith("#/parameters/QueueName"))});
          }
      }
```

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
  - from: swagger-document
    where: $.parameters.VisibilityTimeoutForEnqueue
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
    where: $["x-ms-paths"]["/{queueName}/messages/{messageid}"]..responses..headers["x-ms-time-next-visible"]
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

### Update service version from "2018-03-28" to "2023-11-03"

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ApiVersionParameter
    transform: $.enum = [ "2023-11-03" ];
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

### Add Code to StorageError properties

```yaml
directive:
  - from: swagger-document
    where: $.definitions.StorageError
    transform: >
      $.properties.Code = { "type": "string" };
```

### Remove x-ms-pageable

Currently breaking the latest version of autorest.typescript

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]..get
    transform: >
      if ($["x-ms-pageable"]) { delete $["x-ms-pageable"]; }
```

### Change format of Start and Expiry to string in AccessPolicy

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AccessPolicy.properties
    transform: >
      $.Start["format"] = "string";
      $.Expiry["format"] = "string";
```

### Change delete property to deleteProperty

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Logging.properties
    transform: >
      $.Delete["x-ms-client-name"] = "deleteProperty";
```

### Add error code to response header - ServiceSetPropertiesHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?restype=service&comp=properties"]["put"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - ServiceGetPropertiesHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?restype=service&comp=properties"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - ServiceGetStatisticsHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?restype=service&comp=stats"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - ServiceListQueuesSegmentHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=list"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - QueueCreateHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - QueueDeleteHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}"]["delete"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - QueueGetPropertiesHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}?comp=metadata"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - QueueSetMetadataHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}?comp=metadata"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - QueueGetAccessPolicyHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}?comp=acl"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - QueueSetAccessPolicyHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}?comp=acl"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - MessagesDequeueHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}/messages"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - MessagesClearHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}/messages"]["delete"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - MessagesEnqueueHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}/messages"]["post"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - MessagesPeekHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}/messages?peekonly=true"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - MessageIdUpdateHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}/messages/{messageid}"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - MessageIdDeleteHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{queueName}/messages/{messageid}"]["delete"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add description for GeoReplication

```yaml
directive:
  - from: swagger-document
    where: $.definitions.GeoReplication
    transform: >
      $.description = "Geo-Replication information for the Secondary Storage Service";
```

### Define GeoReplicationStatusType as enum

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["GeoReplication"]["properties"]["Status"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"];
```

### Add description for Metrics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Metrics
    transform: >
      $.description = "An interface representing Metrics.";
```

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-queue%2Fswagger%2FREADME.png)
