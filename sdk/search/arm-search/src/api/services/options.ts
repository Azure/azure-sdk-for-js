// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServicesUpgradeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesListBySubscriptionOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ServicesListByResourceGroupOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ServicesDeleteOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ServicesUpdateOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ServicesGetOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ServicesCheckNameAvailabilityOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}
