// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PublicAccessType,
  FilterBlobsIncludeItem,
  ListBlobsIncludeItem,
} from "../../models/azure/storage/blobs/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetAccountInfoOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ListBlobHierarchySegmentOptionalParams extends OperationOptions {
  /** Filters the results to return only containers whose name begins with the specified prefix. */
  prefix?: string;
  /** A string value that identifies the portion of the list of containers to be returned with the next listing operation. The operation returns the NextMarker value within the response body if the listing operation did not return all containers remaining to be listed with the current page. The NextMarker value can be used as the value for the marker parameter in a subsequent call to request the next page of list items. The marker value is opaque to the client. */
  marker?: string;
  /** Specifies the maximum number of containers to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. */
  maxresults?: number;
  /** Include this parameter to specify one or more datasets to include in the response. */
  include?: ListBlobsIncludeItem[];
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the relative path to list paths from. For non-recursive list, only one entity level is supported; For recursive list, multiple entity levels are supported. (Inclusive) */
  startFrom?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ListBlobFlatSegmentOptionalParams extends OperationOptions {
  /** Filters the results to return only containers whose name begins with the specified prefix. */
  prefix?: string;
  /** A string value that identifies the portion of the list of containers to be returned with the next listing operation. The operation returns the NextMarker value within the response body if the listing operation did not return all containers remaining to be listed with the current page. The NextMarker value can be used as the value for the marker parameter in a subsequent call to request the next page of list items. The marker value is opaque to the client. */
  marker?: string;
  /** Specifies the maximum number of containers to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. */
  maxresults?: number;
  /** Include this parameter to specify one or more datasets to include in the response. */
  include?: ListBlobsIncludeItem[];
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the relative path to list paths from. For non-recursive list, only one entity level is supported; For recursive list, multiple entity levels are supported. (Inclusive) */
  startFrom?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ChangeLeaseOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BreakLeaseOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** For a break operation, proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. This break period is only used if it is shorter than the time remaining on the lease. If longer, the time remaining on the lease is used. A new lease will not be available before the break period has expired, but the lease may be held for longer than the break period. If this header does not appear with a break operation, a fixed-duration lease breaks after the remaining lease period elapses, and an infinite lease breaks immediately. */
  breakPeriod?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface RenewLeaseOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ReleaseLeaseOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface AcquireLeaseOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Optional.  The proposed lease ID for the container. */
  proposedLeaseId?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface FindBlobsByTagsOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** A string value that identifies the portion of the list of containers to be returned with the next listing operation. The operation returns the NextMarker value within the response body if the listing operation did not return all containers remaining to be listed with the current page. The NextMarker value can be used as the value for the marker parameter in a subsequent call to request the next page of list items. The marker value is opaque to the client. */
  marker?: string;
  /** Specifies the maximum number of containers to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. */
  maxresults?: number;
  /** Include this parameter to specify one or more datasets to include in the response. */
  include?: FilterBlobsIncludeItem[];
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SubmitBatchOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface RenameOptionalParams extends OperationOptions {
  /** A lease ID for the source path. If specified, the source path must have an active lease and the lease ID must match. */
  sourceLeaseId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface RestoreOptionalParams extends OperationOptions {
  /** Optional.  Version 2019-12-12 and later.  Specifies the name of the deleted container to restore. */
  deletedContainerName?: string;
  /** Optional.  Version 2019-12-12 and later.  Specifies the version of the deleted container to restore. */
  deletedContainerVersion?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SetAccessPolicyOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** The public access setting for the container. */
  access?: PublicAccessType;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetAccessPolicyOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SetMetadataOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** The metadata headers. */
  metadata?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** A date-time value. A request is made under the condition that the resource has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** A date-time value. A request is made under the condition that the resource has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetPropertiesOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: string;
  /** The public access setting for the container. */
  access?: PublicAccessType;
  /** Optional.  Version 2019-07-07 and later.  Specifies the default encryption scope to set on the container and use for all future writes. */
  defaultEncryptionScope?: string;
  /** If a blob has a lease and the lease is of infinite duration then the value of this header is set to true, otherwise it is set to false. */
  preventEncryptionScopeOverride?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
