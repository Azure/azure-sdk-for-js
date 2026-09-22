// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BatchEndpointsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BatchEndpointsListOptionalParams extends OperationOptions {
  /** Number of endpoints to be retrieved in a page of results. */
  count?: number;
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface BatchEndpointsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchEndpointsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchEndpointsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BatchEndpointsGetOptionalParams extends OperationOptions {}
