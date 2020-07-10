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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/storage-dataplane-preview/specification/storage/data-plane/Microsoft.BlobStorage/preview/2019-12-12/blob.json
model-date-time-as-string: true
optional-response-headers: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-blob%2Fswagger%2FREADME.png)
