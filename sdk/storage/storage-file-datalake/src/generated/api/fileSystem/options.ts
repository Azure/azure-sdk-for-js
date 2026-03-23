// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListBlobsIncludeItem,
  ListBlobsShowOnly,
} from "../../models/azure/storage/files/dataLake/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FileSystemListBlobHierarchySegmentOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Filters results to filesystems within the specified prefix. */
  prefix?: string;
  /** When the request includes this parameter, the operation returns a BlobPrefix element in the response body that acts as a placeholder for all blobs whose names begin with the same substring up to the appearance of the delimiter character. The delimiter may be a single character or a string. */
  delimiter?: string;
  /** A string value that identifies the portion of the list of containers to be returned with the next listing operation. The operation returns the NextMarker value within the response body if the listing operation did not return all containers remaining to be listed with the current page. The NextMarker value can be used as the value for the marker parameter in a subsequent call to request the next page of list items. The marker value is opaque to the client. */
  marker?: string;
  /** An optional value that specifies the maximum number of items to return. If omitted or greater than 5,000, the response will include up to 5,000 items. */
  maxResults?: number;
  /** Include this parameter to specify one or more datasets to include in the response. */
  include?: ListBlobsIncludeItem[];
  /** Include this parameter to specify one or more datasets to include in the response. */
  showonly?: ListBlobsShowOnly;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface FileSystemListPathsOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Optional. When deleting a directory, the number of paths that are deleted with each invocation is limited. If the number of paths to be deleted exceeds this limit, a continuation token is returned in this response header. When a continuation token is returned in the response, it must be specified in a subsequent invocation of the delete operation to continue deleting the directory. */
  continuation?: string;
  /** Optional. Filters results to paths within the specified directory. An error occurs if the directory does not exist. */
  path?: string;
  /** An optional value that specifies the maximum number of items to return. If omitted or greater than 5,000, the response will include up to 5,000 items. */
  maxResults?: number;
  /** Optional. Valid only when Hierarchical Namespace is enabled for the account. If "true", the user identity values returned in the x-ms-owner, x-ms-group, and x-ms-acl response headers will be transformed from Azure Active Directory Object IDs to User Principal Names. If "false", the values will be returned as Azure Active Directory Object IDs. The default value is false. Note that group and application Object IDs are not translated because they do not have unique friendly names. */
  upn?: boolean;
  /** Optional. A relative path within the specified directory where the listing will start from. */
  beginFrom?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface FileSystemDeleteOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface FileSystemGetPropertiesOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface FileSystemSetPropertiesOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Optional. User-defined properties to be stored with the filesystem, in the format of a comma-separated list of name and value pairs "n1=v1, n2=v2, ...", where each value is a base64 encoded string. Note that the string may only contain ASCII characters in the ISO-8859-1 character set. If the filesystem exists, any properties not included in the list will be removed. All properties are removed if the header is omitted. To merge new and existing properties, first get all existing properties and the current E-Tag, then make a conditional request with the E-Tag and include values for all properties. */
  properties?: string;
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}

/** Optional parameters. */
export interface FileSystemCreateOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Optional. User-defined properties to be stored with the filesystem, in the format of a comma-separated list of name and value pairs "n1=v1, n2=v2, ...", where each value is a base64 encoded string. Note that the string may only contain ASCII characters in the ISO-8859-1 character set. If the filesystem exists, any properties not included in the list will be removed. All properties are removed if the header is omitted. To merge new and existing properties, first get all existing properties and the current E-Tag, then make a conditional request with the E-Tag and include values for all properties. */
  properties?: string;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}
