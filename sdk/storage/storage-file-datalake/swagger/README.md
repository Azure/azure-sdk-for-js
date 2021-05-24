# Azure Storage TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-storage-datalake
title: StorageClient
description: Storage Client
enable-xml: true
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/e3850d6aa56eecad65262d0fc7815be0773bfb85/specification/storage/data-plane/Microsoft.StorageDataLake/stable/2020-06-12/DataLakeStorage.json
model-date-time-as-string: true
optional-response-headers: true
v3: true
disable-async-iterators: true
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210223.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Update DataLakeStorageClientContext to StorageClientContext

```yaml
directive:
  - from: swagger-document
    where: $.info["x-ms-code-generation-settings"]
    transform: >
      $.name = "StorageClient"
```

### Remove parameter FileSystem

```yaml
directive:
  - from: swagger-document
    where: $.parameters
    transform: >
      $.FileSystem = undefined
```

### Remove parameter Path

```yaml
directive:
  - from: swagger-document
    where: $.parameters
    transform: >
      $.Path = undefined
```

### workaround: adding parameter location for `PathSetAccessControlRecursiveMode`

```yaml
directive:
  - from: swagger-document
    where: $["parameters"].PathSetAccessControlRecursiveMode
    transform: >
      $["x-ms-parameter-location"] = "method";
```

### Rename path-HTTP-headers to path-Http-headers

```yaml
directive:
  - from: swagger-document
    where: $.parameters
    transform: >
      $.CacheControl["x-ms-parameter-grouping"].name = "path-Http-headers";
      $.ContentDisposition["x-ms-parameter-grouping"].name = "path-Http-headers";
      $.ContentEncoding["x-ms-parameter-grouping"].name = "path-Http-headers";
      $.ContentLanguage["x-ms-parameter-grouping"].name = "path-Http-headers";
      $.ContentType["x-ms-parameter-grouping"].name = "path-Http-headers";
      $.TransactionalContentMD5["x-ms-parameter-grouping"].name = "path-Http-headers";
      $.ContentMD5["x-ms-parameter-grouping"].name = "path-Http-headers";
```

### Rename response property ACL to acl for Path_GetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}/{path}"].head.responses["200"].headers["x-ms-acl"]
    transform: >
      $["x-ms-client-name"] = "acl";
```

### Update last modified property from string type to Date for FileSystem and Path models

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      $.FileSystem.properties.lastModified.format = "date-time-rfc1123";
      $.Path.properties.lastModified.format = "date-time-rfc1123";
```

### Rename eTag -> etag

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]..responses..headers["ETag"]
    transform: >
      $["x-ms-client-name"] = "etag";
  - from: swagger-document
    where: $["definitions"]..["eTag"]
    transform: >
      $["x-ms-client-name"] = "etag";
```

### workaround: adding parameter location for `PathSetAccessControlRecursiveMode`

```yaml
directive:
  - from: swagger-document
    where: $["parameters"].PathSetAccessControlRecursiveMode
    transform: >
      $["x-ms-parameter-location"] = "method";
```

### Add Code to StorageError properties

```yaml
directive:
  - from: swagger-document
    where: $.definitions.StorageError
    transform: >
      $.properties.Code = { "type": "string" };
```

### Add ErrorCode to Path_Create response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}/{path}"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ErrorCode to Path_Delete response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}/{path}"]["delete"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ErrorCode to Path_SetExpiry response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}/{path}?comp=expiry"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ErrorCode to FileSystem_ListPaths response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}?resource=filesystem"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ErrorCode to Path_Update response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}/{path}"]["patch"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ErrorCode to Path_Update response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}/{path}"]["patch"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ErrorCode to Path_GetProperties response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}/{path}"]["head"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Define PathExpiryOptions as enum type

```yaml
directive:
  - from: swagger-document
    where: $["parameters"].PathExpiryOptions
    transform: >
      delete $["x-ms-enum"]["modelAsString"];
```

### Add ErrorCode to FileSystem_ListBlobHierarchySegment response headers

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}?restype=container&comp=list&hierarchy"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Hide x-ms-pageable in FileSystem_ListBlobHierarchySegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{filesystem}?restype=container&comp=list&hierarchy"]["get"]
    transform: >
      delete $["x-ms-pageable"];
```

### Update service version from "2020-06-12" to "2020-08-04"

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ApiVersionParameter
    transform: $.enum = [ "2020-08-04" ];
```
