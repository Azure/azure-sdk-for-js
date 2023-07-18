# Azure AppConfiguration TypeScript Protocol Layer

> see https://aka.ms/autorest

```yaml
package-name: app-configuration
package-version: "1.5.0-beta.2"
title: AppConfiguration
description: App Configuration client
enable-xml: true
add-credentials: false
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/appconfiguration/data-plane/Microsoft.AppConfiguration/preview/2022-11-01-preview/appconfiguration.json
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
core-http-compat-mode: true
typescript: true
disable-async-iterators: true
api-version-parameter: choice
v3: true
hide-clients: true
```

### Patch endpoints for exception handling

```yaml
directive:
  - from: swagger-document
    where: $["paths"]
    transform: >
      ["get", "put", "head", "delete"].forEach(verb => {
          delete $["/kv/{key}"][verb]["responses"]["404"];
          delete $["/kv/{key}"][verb]["responses"]["412"];
      });

      ["put", "delete" ].forEach(verb => {
          delete $["/locks/{key}"][verb]["responses"]["404"]
          delete $["/locks/{key}"][verb]["responses"]["412"]
      });
```

### Make .key a required field

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["KeyValue"]
    transform: >
      $.required = $.required || [];
      $.required.push('key');
```

### Add 304 response to GetKeyValueOperation

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/kv/{key}"]["get"]["responses"]
    transform: >
      $["304"] = {};
      $["304"]["description"] = "Response code 304"; 
      $["304"]["headers"] = {}

      $["304"]["headers"]["Sync-Token"] = {};
      $["304"]["headers"]["Sync-Token"]["description"] = "Enables real-time consistency between requests by providing the returned value in the next request made to the server.";
      $["304"]["headers"]["Sync-Token"]["type"] = "string";

      $["304"]["headers"]["ETag"] = {};
      $["304"]["headers"]["ETag"]["description"] = "An identifier representing the returned state of the resource.";
      $["304"]["headers"]["ETag"]["type"] = "string";

      $["304"]["headers"]["Last-Modified"] = {};
      $["304"]["headers"]["Last-Modified"]["description"] = "A UTC datetime that specifies the last time the resource was modified.";
      $["304"]["headers"]["Last-Modified"]["type"] = "string";
```

### Add 304 response to CheckKeyValueOperation

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/kv/{key}"]["head"]["responses"]
    transform: >
      $["304"] = {};
      $["304"]["description"] = "Response code 304"; 
      $["304"]["headers"] = {}

      $["304"]["headers"]["Sync-Token"] = {};
      $["304"]["headers"]["Sync-Token"]["description"] = "Enables real-time consistency between requests by providing the returned value in the next request made to the server.";
      $["304"]["headers"]["Sync-Token"]["type"] = "string";

      $["304"]["headers"]["ETag"] = {};
      $["304"]["headers"]["ETag"]["description"] = "An identifier representing the returned state of the resource.";
      $["304"]["headers"]["ETag"]["type"] = "string";

      $["304"]["headers"]["Last-Modified"] = {};
      $["304"]["headers"]["Last-Modified"]["description"] = "A UTC datetime that specifies the last time the resource was modified.";
      $["304"]["headers"]["Last-Modified"]["type"] = "string";
```

### Rename Properties created -> createdOn, expires -> expiresOn, items_count -> itemCount

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Snapshot.properties
    transform: >
      $.created["x-ms-client-name"] = "createdOn";
      $.items_count["x-ms-client-name"] = "itemCount";
      $.expires["x-ms-client-name"] = "expiresOn";
```

### Rename KeyValueFilter -> ConfigurationSettingsFilter
```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["KeyValueFilter"]
    transform: >
      $["x-ms-client-name"] = "ConfigurationSettingsFilter";
```
### Make .name a required field

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["Snapshot"]
    transform: >
      $.required = $.required || [];
      $.required.push('name');
```
### Add description for snapshot

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["Snapshot"]
    transform: >
      $["description"] = "Snapshot details include name, filters, retentionPeriod, expiresOn, size, status, itemCount, and more";

```
