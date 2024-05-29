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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/a32d0b2423d19835246bb2ef92941503bfd5e734/specification/storage/data-plane/Microsoft.BlobStorage/preview/2021-12-02/blob.json
model-date-time-as-string: true
optional-response-headers: true
v3: true
disable-async-iterators: true
add-credentials: false
core-http-compat-mode: true
use-extension:
  "@autorest/typescript": "latest"
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
          if (property.includes('/{containerName}/{blob}'))
          {
              $[property]["parameters"] = $[property]["parameters"].filter(function(param) { return (typeof param['$ref'] === "undefined") || (false == param['$ref'].endsWith("#/parameters/ContainerName") && false == param['$ref'].endsWith("#/parameters/Blob"))});
          } 
          else if (property.includes('/{containerName}'))
          {
              $[property]["parameters"] = $[property]["parameters"].filter(function(param) { return (typeof param['$ref'] === "undefined") || (false == param['$ref'].endsWith("#/parameters/ContainerName"))});
          }
      }
```

### /?restype=service&comp=properties (StorageServiceProperties renamed to BlobServiceProperties)

```yaml
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

```yaml
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

### Rename maxresults -> maxResults

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

### Rename timeoutParameter -> timeoutInSeconds

```yaml
directive:
  - from: swagger-document
    where: $.parameters.Timeout
    transform: >
      $["x-ms-client-name"] = "timeoutInSeconds";
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

### Rename LastSyncTime -> LastSyncOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.LastSyncTime
    transform: >
      $["x-ms-client-name"] = "lastSyncOn"
```

### Rename permission -> permissions

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AccessPolicy.properties.Permission
    transform: >
      $["x-ms-client-name"] = "permissions";
```

### Rename Headers copyCompletionTime -> copyCompletedTime

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]..responses..headers["x-ms-copy-completion-time"]
    transform: >
      $["x-ms-client-name"] = "copyCompletedOn";
```

### Rename Properties copyCompletionTime -> copyCompletedTime

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.CopyCompletionTime
    transform: >
      $["x-ms-client-name"] = "copyCompletedOn";
```

### Rename Headers CreationTime -> CreatedOn

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]..responses..headers["x-ms-creation-time"]
    transform: >
      $["x-ms-client-name"] = "createdOn";
```

### Rename Properties CreationTime -> CreatedOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties["Creation-Time"]
    transform: >
      $["x-ms-client-name"] = "createdOn";
```

### Rename Headers AccessTierChangeTime -> AccessTierChangedOn

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]..responses..headers["x-ms-access-tier-change-time"]
    transform: >
      $["x-ms-client-name"] = "accessTierChangedOn";
```

### Rename Properties AccessTierChangeTime -> AccessTierChangedOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.AccessTierChangeTime
    transform: >
      $["x-ms-client-name"] = "accessTierChangedOn";
```

### Rename Properties DeletedTime -> DeletedOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.DeletedTime
    transform: >
      $["x-ms-client-name"] = "deletedOn";
```

### Remove Encrypted property from BlobMetadata

```yaml
directive:
  - from: swagger-document
    where: $.definitions.BlobMetadata.properties
    transform: >
      if ($.Encrypted) {
        delete $.Encrypted;
      }
```

### UserDelegationKey properties

```yaml
directive:
  - from: swagger-document
    where: $.definitions.UserDelegationKey
    transform: >
      $.properties.SignedTid["x-ms-client-name"] = "signedTenantId";
      $.properties.SignedOid["x-ms-client-name"] = "signedObjectId";
      $.properties.SignedStart["x-ms-client-name"] = "signedStartsOn";
      $.properties.SignedExpiry["x-ms-client-name"] = "signedExpiresOn";
```

### UserDelegationKey properties SignedStart and SignedExpiry to string type

```yaml
directive:
  - from: swagger-document
    where: $.definitions.UserDelegationKey.properties
    transform: >
      delete $.SignedStart["format"];
      delete $.SignedExpiry["format"];
```

### Add missing x-ms-parameter-location for PathRenameMode

```yaml
directive:
  - from: swagger-document
    where: $.parameters.PathRenameMode
    transform: >
      $["x-ms-parameter-location"] = "method";
```

### Rename logging -> blobAnalyticsLogging

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.Logging
    transform: >
      $["x-ms-client-name"] = "blobAnalyticsLogging"
```

### Rename eTag -> etag

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]..responses..headers["ETag"]
    transform: >
      $["x-ms-client-name"] = "etag";
```

### Fix comment for BlobGetPropertiesHeaders Content-Length

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"].head.responses["200"].headers["Content-Length"]
    transform: >
      $.description = "The size of the blob in bytes. For a page blob, this header returns the value of the x-ms-blob-content-length header that is stored with the blob.";
```

### Batch returns a 202

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=batch"].post.responses
    transform: >
      const response = $["200"];
      if (response) {
        delete $["200"];
        $["202"] = response;
        $["202"]["x-az-public"] = false;
        $["202"]["x-az-response-name"] = "BlobBatchResult";
        $["202"]["x-az-response-schema-name"] = "Content";
      }
```

### Rename sourceContentcrc64 -> sourceContentCrc64

```yaml
directive:
  - from: swagger-document
    where: $.parameters.SourceContentCRC64
    transform: >
      $["x-ms-client-name"] = "sourceContentCrc64";
```

### Change tier type - PremiumPageBlobAccessTierOptional -> AccessTierOptional

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?PageBlob"]
    transform: >
      const param = $.put.parameters[2];
      if (param && param["$ref"] && param["$ref"].endsWith("PremiumPageBlobAccessTierOptional")) {
          const path = param["$ref"].replace(/[#].*$/, "#/parameters/AccessTierOptional");
          $.put.parameters[2] = { "$ref": path };
      }
```

### Remove PremiumPageBlobAccessTierOptional

```yaml
directive:
  - from: swagger-document
    where: $.parameters
    transform: >
      const response = $["PremiumPageBlobAccessTierOptional"];
      if (response) {
        delete $["PremiumPageBlobAccessTierOptional"];
      }
```

### Add ClientRequestId attribute to the `BlobBatchSubmitBatchResponse` (missing in the unified swagger)

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=batch"]["post"]["responses"]["202"]["headers"]
    transform: >
      if (!$["x-ms-client-request-id"]) {
        $["x-ms-client-request-id"] = {};
        $["x-ms-client-request-id"]["x-ms-client-name"] = "ClientRequestId";
        $["x-ms-client-request-id"].type = "string";
        $["x-ms-client-request-id"].description = "If a client request id header is sent in the request, this header will be present in the response with the same value.";
      }
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Hide x-ms-pageable in ListContainersSegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=list"]["get"]
    transform: >
      delete $["x-ms-pageable"];
```

### Hide x-ms-pageable in Container_ListBlobFlatSegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=list&flat"]["get"]
    transform: >
      delete $["x-ms-pageable"];
```

### Hide x-ms-pageable in Container_ListBlobHierarchySegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=list&hierarchy"]["get"]
    transform: >
      delete $["x-ms-pageable"];
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

### Add error code to response header - Service_GetAccountInfo

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?restype=account&comp=properties"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Service_GetStatistics

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

### Add error code to response header - Service_ListContainersSegment

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

### Add error code to response header - Service_FilterBlobs

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=blobs"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Service_SubmitBatch

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=batch"]["post"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
      $["x-ms-client-request-id"] = {};
      $["x-ms-client-request-id"]["x-ms-client-name"] = "ClientRequestId";
      $["x-ms-client-request-id"]["type"] = "string";
      $["x-ms-client-request-id"]["description"] = "If a client request id header is sent in the request, this header will be present in the response with the same value.";
```

### Add ErrorCode to response header - Blob_Download

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]["get"]["responses"]["206"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_SetHTTPHeaders

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=properties&SetHTTPHeaders"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_AbortCopyFromURL

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=copy&copyid"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ContentCrc64 to response header - Blob_Download

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-content-crc64"] = {};
      $["x-ms-content-crc64"]["x-ms-client-name"] = "ContentCrc64";
      $["x-ms-content-crc64"]["type"] = "string";
      $["x-ms-content-crc64"]["format"] = "byte";
      $["x-ms-content-crc64"]["description"] = "If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to true, then the request returns a crc64 for the range, as long as the range size is less than or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is specified in the same request, it will fail with 400(Bad Request).";
```

### Add ErrorCode to response header - Blob_Query

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=query"]["post"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=query"]["post"]["responses"]["206"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add ContentCrc64 to response header - Blob_Query

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=query"]["post"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-content-crc64"] = {};
      $["x-ms-content-crc64"]["x-ms-client-name"] = "ContentCrc64";
      $["x-ms-content-crc64"]["type"] = "string";
      $["x-ms-content-crc64"]["format"] = "byte";
      $["x-ms-content-crc64"]["description"] = "If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to true, then the request returns a crc64 for the range, as long as the range size is less than or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is specified in the same request, it will fail with 400(Bad Request).";
```

### Add ErrorCode to response header - Service_GetUserDelegationKey

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?restype=service&comp=userdelegationkey"]["post"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_GetAccessPolicy

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=acl"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_SetAccessPolicy

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=acl"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - AppendBlob_Create

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?AppendBlob"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - AppendBlob_AppendBlock

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=appendblock"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - AppendBlob_AppendBlockFromUrl

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=appendblock&fromUrl"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_GetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]["head"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_Delete

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]["delete"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_Undelete

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=undelete"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_GetTags

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=tags"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_SetTags

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=tags"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_SetTier

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=tier"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_SetMetadata

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=metadata"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_CreateSnapshot

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=snapshot"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_CopyFromURL

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=copy&sync"]["put"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_StartCopyFromURL

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=copy"]["put"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Blob_AbortCopyFromURL

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=copy&copyid={CopyId}"]["put"]["responses"]["204"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - BlockBlob_CommitBlockList

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=blocklist"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - BlockBlob_GetBlockList

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=blocklist"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - BlockBlob_PutBlobFromUrl

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?BlockBlob&fromUrl"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - BlockBlob_StageBlockFromURL

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=block&fromURL"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - BlockBlob_StageBlock

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=block"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - BlockBlob_Upload

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?BlockBlob"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_Create

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_Create

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container"]["delete"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_Rename

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=rename"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_Restore

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=undelete"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_GetProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_SetMetadata

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=metadata"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_ListBlobFlatSegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=list&flat"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - Container_ListBlobHierarchySegment

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=list&hierarchy"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_Create

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?PageBlob"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_ClearPages

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=page&clear"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Hide x-ms-pageable in PageBlob_GetPageRanges

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=pagelist"]["get"]
    transform: >
      delete $["x-ms-pageable"];
```

### Hide x-ms-pageable in PageBlob_GetPageRangesDiff

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=pagelist&diff"]["get"]
    transform: >
      delete $["x-ms-pageable"];
```

### Add error code to response header - PageBlob_CopyIncremental

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=incrementalcopy"]["put"]["responses"]["202"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_GetPageRangesDiff

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=pagelist&diff"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_GetPageRanges

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=pagelist"]["get"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_Resize

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=properties&Resize"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_UpdateSequenceNumber

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=properties&UpdateSequenceNumber"]["put"]["responses"]["200"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_UploadPagesFromURL

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=page&update&fromUrl"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add error code to response header - PageBlob_UploadPages

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}?comp=page&update"]["put"]["responses"]["201"]["headers"]
    transform: >
      $["x-ms-error-code"] = {};
      $["x-ms-error-code"]["x-ms-client-name"] = "ErrorCode";
      $["x-ms-error-code"]["type"] = "string";
      $["x-ms-error-code"]["description"] = "Error Code";
```

### Add client name for delete properties in Logging definition

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Logging.properties
    transform: >
      $["Delete"]["x-ms-client-name"] = "deleteProperty";
```

### Rename AccessPolicy start -> startsOn and expiry to expiresOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AccessPolicy.properties
    transform: >
      $.Start["x-ms-client-name"] = "startsOn";
      $.Expiry["x-ms-client-name"] = "expiresOn";
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

### Change BlobDeleteType definition to string

```yaml
directive:
  - from: swagger-document
    where: $.parameters.BlobDeleteType
    transform: >
      delete $["enum"];
      delete $["x-ms-enum"];
```

### Change QueryType in QueryRequest to string type

```yaml
directive:
  - from: swagger-document
    where: $.definitions.QueryRequest.properties
    transform: >
      delete $.QueryType["enum"];
```

### Rename KeyInfo start -> startsOn

```yaml
directive:
  - from: swagger-document
    where: $.definitions.KeyInfo.properties
    transform: >
      $.Start["x-ms-client-name"] = "startsOn";
      $.Expiry["x-ms-client-name"] = "expiresOn";
```

### Un-group encryptionScope

```yaml
directive:
  - from: swagger-document
    where: $.parameters.EncryptionScope
    transform: >
      const grouping = $["x-ms-parameter-grouping"];
      if (grouping) {
        delete $["x-ms-parameter-grouping"];
      }
```

### Rename ContainerCpkScopeInfo -> ContainerEncryptionScope

```yaml
directive:
  - from: swagger-document
    where: $.parameters.DefaultEncryptionScope
    transform: >
      $["x-ms-parameter-grouping"]["name"] = "container-encryption-scope";
  - from: swagger-document
    where: $.parameters.DenyEncryptionScopeOverride
    transform: >
      $["x-ms-parameter-grouping"]["name"] = "container-encryption-scope";
```

### Use string union instead of string for RehydratePriority in getProperties

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}/{blob}"]["head"]["responses"]["200"]["headers"]["x-ms-rehydrate-priority"]
    transform: >
      $["description"] = "If an object is in rehydrate pending state then this header is returned with priority of rehydrate.";
      $["enum"] =  ["High", "Standard"];
      $["x-ms-enum"] =  {};
      $["x-ms-enum"]["name"] = "RehydratePriority";
      $["x-ms-enum"]["modelAsString"] = true;
```

### Add Code to StorageError properties

```yaml
directive:
  - from: swagger-document
    where: $.definitions.StorageError
    transform: >
      $.properties.Code = { "type": "string" };
```

### Define AccessTier as enum type

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["AccessTier"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"]
```

### Define ArchiveStatus as enum type

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["ArchiveStatus"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"]
```

### Define GeoReplicationStatusType as enum type

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["GeoReplication"]["properties"]["Status"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"]
```

### Define BlobPublicAccess as enum type

```yaml
directive:
  - from: swagger-document
    where: $["parameters"]["BlobPublicAccess"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"]
```

### Define PublicAccessType as enum type

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["PublicAccessType"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"]
```

### Define RehydratePriority as enum type

```yaml
directive:
  - from: swagger-document
    where: $["parameters"]["RehydratePriority"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"]
  - from: swagger-document
    where: $["definitions"]["RehydratePriority"]["x-ms-enum"]
    transform: >
      delete $["modelAsString"]
```

### Hide AllowPermanentDelete

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RetentionPolicy
    transform: >
      delete $.properties["AllowPermanentDelete"];
```

### Add description for properties

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["BlobPropertiesInternal"]["properties"]
    transform: >
      $["LegalHold"]["description"] = "Indicates if a legal hold is present on the blob.";
      $["ImmutabilityPolicyUntilDate"]["description"] = "UTC date/time value generated by the service that indicates the time at which the blob immutability policy will expire.";
      $["ImmutabilityPolicyMode"]["description"] = "Indicates immutability policy mode.";
```

### Add description for blob item property

```yaml
directive:
  - from: swagger-document
    where: $["definitions"]["BlobItemInternal"]["properties"]
    transform: >
      $["HasVersionsOnly"]["description"] = "Inactive root blobs which have any versions would have such tag with value true.";
```

### Use string union instead of string for EncryptionAlgorithm

```yaml
directive:
  - from: swagger-document
    where: $.parameters.EncryptionAlgorithm
    transform: >
      $["x-ms-enum"]["modelAsString"] = true;
```

### Hide Premium in AccessTier until it's supported in service.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AccessTier
    transform: >
      $["enum"] = [
        "P4",
        "P6",
        "P10",
        "P15",
        "P20",
        "P30",
        "P40",
        "P50",
        "P60",
        "P70",
        "P80",
        "Hot",
        "Cool",
        "Archive",
        "Cold"
      ];
```

### Hide version releated properties in FilterBlobItem until it's supported in service.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.FilterBlobItem
    transform: >
      delete $["properties"]["VersionId"];
      delete $["properties"]["IsCurrentVersion"];
```

### Hide FilterBlobsInclude until it's supported in service.

```yaml
directive:
  - from: swagger-document
    where: $.parameters
    transform: >
      delete $["FilterBlobsInclude"];
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/?comp=blobs"]["get"]
    transform: >
      $["parameters"] = [
          {
            "$ref": "#/parameters/Timeout"
          },
          {
            "$ref": "#/parameters/ApiVersionParameter"
          },
          {
            "$ref": "#/parameters/ClientRequestId"
          },
          {
            "$ref": "#/parameters/FilterBlobsWhere"
          },
          {
            "$ref": "#/parameters/Marker"
          },
          {
            "$ref": "#/parameters/MaxResults"
          }
        ];
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]["/{containerName}?restype=container&comp=blobs"]["get"]
    transform: >
      $["parameters"] = [
          {
            "$ref": "#/parameters/Timeout"
          },
          {
            "$ref": "#/parameters/ApiVersionParameter"
          },
          {
            "$ref": "#/parameters/ClientRequestId"
          },
          {
            "$ref": "#/parameters/FilterBlobsWhere"
          },
          {
            "$ref": "#/parameters/Marker"
          },
          {
            "$ref": "#/parameters/MaxResults"
          }
        ];
```

### Update service version from "2021-12-02" to "2024-05-04"

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ApiVersionParameter
    transform: $.enum = [ "2024-05-04" ];
```

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-blob%2Fswagger%2FREADME.png)
