// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceListFileSystemsOptionalParams extends OperationOptions {
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  clientRequestId?: string;
  /** Filters results to filesystems within the specified prefix. */
  prefix?: string;
  /** Optional. When deleting a directory, the number of paths that are deleted with each invocation is limited. If the number of paths to be deleted exceeds this limit, a continuation token is returned in this response header. When a continuation token is returned in the response, it must be specified in a subsequent invocation of the delete operation to continue deleting the directory. */
  continuation?: string;
  /** An optional value that specifies the maximum number of items to return. If omitted or greater than 5,000, the response will include up to 5,000 items. */
  maxResults?: number;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://learn.microsoft.com/rest/api/storageservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeout?: number;
}
