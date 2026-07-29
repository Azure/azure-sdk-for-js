// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PublicAccessType,
  SignedIdentifiers,
  FilterBlobsIncludeItem,
  ListBlobsIncludeItem,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerGetAccountInfoOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface ContainerListBlobHierarchySegmentOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Filters the results to return only resources whose name begins with the specified prefix. */
  prefix?: string;
  /** An opaque string value that identifies the portion of the result set to return with this operation. */
  marker?: string;
  /** Specifies the maximum number of resources to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. */
  maxPageSize?: number;
  /** Specify to include additional, optional information. */
  include?: ListBlobsIncludeItem[];
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the relative path to list paths from. For non-recursive list, only one entity level is supported; for recursive list, multiple entity levels are supported. (Inclusive) */
  startFrom?: string;
}

/** Optional parameters. */
export interface ContainerListBlobsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Filters the results to return only resources whose name begins with the specified prefix. */
  prefix?: string;
  /** An opaque string value that identifies the portion of the result set to return with this operation. */
  marker?: string;
  /** Specifies the maximum number of resources to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. */
  maxPageSize?: number;
  /** Specify to include additional, optional information. */
  include?: ListBlobsIncludeItem[];
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specifies the relative path to list paths from. For non-recursive list, only one entity level is supported; for recursive list, multiple entity levels are supported. (Inclusive) */
  startFrom?: string;
}

/** Optional parameters. */
export interface ContainerChangeLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface ContainerBreakLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
  /** Proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. This break period is only used if it is shorter than the time remaining on the lease. If longer, the time remaining on the lease is used. */
  breakPeriod?: number;
}

/** Optional parameters. */
export interface ContainerRenewLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface ContainerReleaseLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface ContainerAcquireLeaseOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The proposed lease ID for the lease. */
  proposedLeaseId?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface ContainerFindBlobsByTagsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** An opaque string value that identifies the portion of the result set to return with this operation. */
  marker?: string;
  /** Specifies the maximum number of resources to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. */
  maxPageSize?: number;
  /** Specify to include additional, optional information. */
  include?: FilterBlobsIncludeItem[];
}

/** Optional parameters. */
export interface ContainerSubmitBatchOptionalParams extends OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ContainerRenameOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** A lease ID for the source path. If specified, the source path must have an active lease and the lease ID must match. */
  sourceLeaseId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface ContainerRestoreOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Specifies the name of the deleted container to restore. */
  deletedContainerName?: string;
  /** Specifies the version of the deleted container to restore. */
  deletedContainerVersion?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface ContainerSetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The content type of the request. */
  contentType?: "application/xml";
  /** The access control list for the container. */
  containerAcl?: SignedIdentifiers;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** The public access setting for the container. */
  access?: PublicAccessType;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface ContainerGetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
}

/** Optional parameters. */
export interface ContainerSetMetadataOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
}

/** Optional parameters. */
export interface ContainerDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
  /** Specify this value to operate only on a blob if it has been modified since the specified date-time. */
  ifModifiedSince?: Date;
  /** Specify this value to operate only on a blob if it has not been modified since the specified date-time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface ContainerGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
}

/** Optional parameters. */
export interface ContainerCreateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href=\"https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations\">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
  /** The metadata headers. */
  metadata?: Record<string, string>;
  /** The public access setting for the container. */
  access?: PublicAccessType;
  /** Specifies the default encryption scope to set on the container and use for all future requests. */
  defaultEncryptionScope?: string;
  /** Whether to prevent encryption scope override. */
  preventEncryptionScopeOverride?: boolean;
}
