# Azure Storage TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-storage-file-share
title: StorageClient
description: Storage Client
enable-xml: true
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/5da3c08b92d05858b728b013b69502dc93485373/specification/storage/data-plane/Microsoft.FileStorage/stable/2024-05-04/file.json
model-date-time-as-string: true
optional-response-headers: true
v3: true
disable-async-iterators: true
add-credentials: false
core-http-compat-mode: true
use-extension:
  "@autorest/typescript": "6.0.2"
package-version: 12.23.0-beta.2
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
          if (property.includes('/{shareName}/{directory}/{fileName}'))
          {
              $[property]["parameters"] = $[property]["parameters"].filter(function(param) { return (typeof param['$ref'] === "undefined") || (false == param['$ref'].endsWith("#/parameters/ShareName") && false == param['$ref'].endsWith("#/parameters/DirectoryPath") && false == param['$ref'].endsWith("#/parameters/FilePath"))});
          } 
          else if (property.includes('/{shareName}/{directory}'))
          {
              $[property]["parameters"] = $[property]["parameters"].filter(function(param) { return (typeof param['$ref'] === "undefined") || (false == param['$ref'].endsWith("#/parameters/ShareName") && false == param['$ref'].endsWith("#/parameters/DirectoryPath"))});
          }
          else if (property.includes('/{shareName}'))
          {
              $[property]["parameters"] = $[property]["parameters"].filter(function(param) { return (typeof param['$ref'] === "undefined") || (false == param['$ref'].endsWith("#/parameters/ShareName"))});
          }
      }
```

### /?restype=service&comp=properties (StorageServiceProperties renamed to FileServiceProperties)

```yaml
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

```yaml
directive:
  - from: swagger-document
    where: $.parameters.MaxResults
    transform: >
      $["x-ms-client-name"] = "maxResults";
```

### Rename sharesnapshot -> shareSnapshot

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ShareSnapshot
    transform: >
      $["x-ms-client-name"] = "shareSnapshot";
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
```

### Rename timeoutParameter -> timeout

```yaml
directive:
  - from: swagger-document
    where: $.parameters.Timeout
    transform: >
      $["x-ms-client-name"] = "timeoutInSeconds";
```

### Rename Headers copyCompletionTime -> copyCompletedOn

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]..responses..headers["x-ms-copy-completion-time"]
    transform: >
      $["x-ms-client-name"] = "copyCompletedOn";
```

### Rename fileCreationTime -> fileCreatedOn

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]..responses..headers["x-ms-file-creation-time"]
    transform: >
      $["x-ms-client-name"] = "fileCreatedOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=properties"]..responses..headers["x-ms-file-creation-time"]
    transform: >
      $["x-ms-client-name"] = "fileCreatedOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory"]..responses..headers["x-ms-file-creation-time"]
    transform: >
      $["x-ms-client-name"] = "fileCreatedOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory&comp=properties"]..responses..headers["x-ms-file-creation-time"]
    transform: >
      $["x-ms-client-name"] = "fileCreatedOn";
  - from: swagger-document
    where: $.parameters.FileCreationTime
    transform: >
      $["x-ms-client-name"] = "fileCreatedOn";
```

### Rename FileLastWriteTime -> FileLastWriteOn

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=properties"]..responses..headers["x-ms-file-last-write-time"]
    transform: >
      $["x-ms-client-name"] = "fileLastWriteOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]..responses..headers["x-ms-file-last-write-time"]
    transform: >
      $["x-ms-client-name"] = "fileLastWriteOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory"]..responses..headers["x-ms-file-last-write-time"]
    transform: >
      $["x-ms-client-name"] = "fileLastWriteOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory&comp=properties"]..responses..headers["x-ms-file-last-write-time"]
    transform: >
      $["x-ms-client-name"] = "fileLastWriteOn";
  - from: swagger-document
    where: $.parameters.FileLastWriteTime
    transform: >
      $["x-ms-client-name"] = "fileLastWriteOn";
```

### Rename FileChangeTime -> FileChangeOn

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]..responses..headers["x-ms-file-change-time"]
    transform: >
      $["x-ms-client-name"] = "fileChangeOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=properties"]..responses..headers["x-ms-file-change-time"]
    transform: >
      $["x-ms-client-name"] = "fileChangeOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory"]..responses..headers["x-ms-file-change-time"]
    transform: >
      $["x-ms-client-name"] = "fileChangeOn";
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory&comp=properties"]..responses..headers["x-ms-file-change-time"]
    transform: >
      $["x-ms-client-name"] = "fileChangeOn";
  - from: swagger-document
    where: $.parameters.FileChangeTime
    transform: >
      $["x-ms-client-name"] = "fileChangeOn";
```

### Rename eTag -> etag

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]..responses..headers["ETag"]
    transform: >
      $["x-ms-client-name"] = "etag";
```

### Rename fileHTTPHeaders -> fileHttpHeaders

```yaml
directive:
  - from: swagger-document
    where: $.parameters.FileContentMD5["x-ms-parameter-grouping"]
    transform: >
      $.name = "fileHttpHeaders";
  - from: swagger-document
    where: $.parameters.FileContentType["x-ms-parameter-grouping"]
    transform: >
      $.name = "fileHttpHeaders";
  - from: swagger-document
    where: $.parameters.FileCacheControl["x-ms-parameter-grouping"]
    transform: >
      $.name = "fileHttpHeaders";
  - from: swagger-document
    where: $.parameters.FileContentDisposition["x-ms-parameter-grouping"]
    transform: >
      $.name = "fileHttpHeaders";
  - from: swagger-document
    where: $.parameters.FileContentEncoding["x-ms-parameter-grouping"]
    transform: >
      $.name = "fileHttpHeaders";
  - from: swagger-document
    where: $.parameters.FileContentLanguage["x-ms-parameter-grouping"]
    transform: >
      $.name = "fileHttpHeaders";
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

### Update date type for "fileCreatedOn" and "fileLastWriteOn" from `DateTimeRfc1123` -> `string`

```yaml
directive:
  - from: swagger-document
    where: $.parameters.FileCreationTime
    transform: >
      delete $.format;
  - from: swagger-document
    where: $.parameters.FileLastWriteTime
    transform: >
      delete $.format;
  - from: swagger-document
    where: $.parameters.FileChangeTime
    transform: >
      delete $.format;
```

### Rename optionalbody -> body

```yaml
directive:
  - from: swagger-document
    where: $.parameters.OptionalBody
    transform: >
      $["x-ms-client-name"] = "body";
```

### Rename leaseTime -> leaseTimeInSeconds

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=lease&break"]..responses..headers["x-ms-lease-time"]
    transform: >
      $["x-ms-client-name"] = "LeaseTimeInSeconds";
```

### Add Code to StorageError properties

```yaml
directive:
  - from: swagger-document
    where: $.definitions.StorageError
    transform: >
      $.properties.Code = { "type": "string" };
```

### Hide x-ms-pageable in Service_ListSharesSegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=list"]["get"]
    transform: >
      delete $["x-ms-pageable"];
```

### Hide x-ms-pageable in Directory_ListFilesAndDirectoriesSegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory&comp=list"]["get"]
    transform: >
      delete $["x-ms-pageable"];
```

### Change AccessPolicy start and expiry to string type

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AccessPolicy.properties
    transform: >
      delete $.Start["format"];
      delete $.Expiry["format"];
```

### Add error code to response header - Service_GetProperties

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

### Add error code to response header - Service_SetProperties

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

### Add error code to response header - Service_ListSharesSegment

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

### Add error code to response header - File_Download

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_Download

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]["get"]["responses"]["206"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_Create

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_GetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_Delete

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory"]["delete"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_Create

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_GetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]["head"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_Delete

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]["delete"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_Create

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_Delete

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share"]["delete"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_GetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_GetStatistics

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=stats"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_GetPermission

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=filepermission"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_CreatePermission

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=filepermission"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_CreateSnapshot

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=snapshot"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_GetAccessPolicy

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=acl"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_SetAccessPolicy

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=acl"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_SetMetadata

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=metadata"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Share_SetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}?restype=share&comp=properties"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_ForceCloseHandles

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?comp=forceclosehandles"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_ListHandles

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?comp=listhandles"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_SetMetadata

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory&comp=metadata"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_SetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory&comp=properties"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_AbortCopy

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=copy&copyid"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_StartCopy

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=copy"]["put"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_ForceCloseHandles

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=forceclosehandles"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_GetRangeList

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=rangelist"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_ListHandles

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=listhandles"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_SetHTTPHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=properties"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_SetMetadata

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=metadata"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_UploadRange

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=range"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - File_UploadRangeFromURL

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}?comp=range&fromURL"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Directory_ListFilesAndDirectoriesSegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}?restype=directory&comp=list"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Change x-ms-type in File_GetProperties to string type

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{shareName}/{directory}/{fileName}"]["head"]["responses"]["200"]["headers"]["x-ms-type"]
    transform: >
      delete $["enum"];
```

### Define ShareAccessTier to enum type

```yaml
directive:
  - from: swagger-document
    where: $["parameters"]["AccessTierOptional"]["x-ms-enum"]
    transform: >
      $["modelAsString"] = false;
```

### Correct parameter location

```yaml
directive:
  - from: swagger-document
    where: $["parameters"]["FileRequestIntent"]
    transform: >
      $["x-ms-parameter-location"] = "method";
```

```yaml
directive:
  - from: swagger-document
    where: $["parameters"]["AllowTrailingDot"]
    transform: >
      $["x-ms-parameter-location"] = "method";
```

```yaml
directive:
  - from: swagger-document
    where: $["parameters"]["SourceAllowTrailingDot"]
    transform: >
      $["x-ms-parameter-location"] = "method";
```

### Update service version from "2024-02-04" to "2024-05-04"

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ApiVersionParameter
    transform: $.enum = [ "2024-05-04" ];
```

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-file-share%2Fswagger%2FREADME.png)
