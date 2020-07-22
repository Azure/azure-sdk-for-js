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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/storage-dataplane-preview/specification/storage/data-plane/Microsoft.StorageDataLake/stable/2019-12-12/DataLakeStorage.json
model-date-time-as-string: true
optional-response-headers: true
enum-types: true
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

### Update service version

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ApiVersionParameter
    transform: $.enum = [ "2019-12-12" ];
```

### Rename eTag -> etag
``` yaml
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

``` yaml
directive:
- from: swagger-document
  where: $["parameters"].PathSetAccessControlRecursiveMode
  transform: >
    $["x-ms-parameter-location"] = "method";
```
