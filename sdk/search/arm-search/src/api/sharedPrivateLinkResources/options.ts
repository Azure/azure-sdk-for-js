// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SharedPrivateLinkResourcesListByServiceOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SharedPrivateLinkResourcesGetOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}
