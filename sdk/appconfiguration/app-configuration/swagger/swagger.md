# Azure AppConfiguration TypeScript Protocol Layer

> see https://aka.ms/autorest

```yaml
package-name: app-configuration
package-version: "1.11.1"
title: AppConfiguration
description: App Configuration client
enable-xml: true
add-credentials: false
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/c1af3ab8e803da2f40fc90217a6d023bc13b677f/specification/appconfiguration/data-plane/Microsoft.AppConfiguration/stable/2023-11-01/appconfiguration.json
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
core-http-compat-mode: true
typescript: true
disable-async-iterators: true
api-version-parameter: choice
v3: true
hide-clients: true
module-kind: esm
use-extension:
  "@autorest/typescript": "6.0.34"
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

### Rename Properties created -> createdOn, expires -> expiresOn, items_count -> itemCount, retention_period -> retentionPeriodInSeconds, size -> sizeInBytes. Rename type CompositionType -> SnapshotComposition, Status -> ConfigurationSnapshotStatus

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Snapshot.properties
    transform: >
      $.created["x-ms-client-name"] = "createdOn";
      $.items_count["x-ms-client-name"] = "itemCount";
      $.expires["x-ms-client-name"] = "expiresOn";
      $.retention_period["x-ms-client-name"] = "retentionPeriodInSeconds";
      $.size["x-ms-client-name"] = "sizeInBytes";
      $.composition_type["x-ms-enum"].name = "SnapshotComposition";
      $.status["x-ms-enum"].name = "ConfigurationSnapshotStatus";
```
### Rename Properties key -> keyFilter, label -> labelFilter for KeyValueFilter

```yaml
directive:
  - from: swagger-document
    where: $.definitions.KeyValueFilter.properties
    transform: >
      $.key["x-ms-client-name"] = "keyFilter";
      $.label["x-ms-client-name"] = "labelFilter";
      $.tags["x-ms-client-name"] = "tagsFilter";
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
      $["description"] = "Snapshot details include name, filters, expiresOn, sizeInBytes, status, itemCount, and more";

```

### Rename Snapshot -> ConfigurationSnapshot
```yaml
directive:
  - rename-model:
      from: Snapshot
      to: ConfigurationSnapshot
```

### Add description for Label
```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["Label"]
    transform: >
      $["description"] = "Label details, with name property that can only be populated by the server";

```

### Rename Label -> SettingLabel
```yaml
directive:
  - rename-model:
      from: Label
      to: SettingLabel
```
