// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionListByBatchAccountOptionalParams extends OperationOptions {
  /** The maximum number of items to return in the response. */
  maxresults?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The state (ETag) version of the private endpoint connection to update. This value can be omitted or set to "*" to apply the operation unconditionally. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionGetOptionalParams extends OperationOptions {}
