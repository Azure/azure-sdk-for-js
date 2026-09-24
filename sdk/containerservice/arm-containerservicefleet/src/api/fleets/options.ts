// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FleetsListCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetsListBySubscriptionOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The page-continuation token to use with a paged version of this API. */
  skipToken?: string;
}

/** Optional parameters. */
export interface FleetsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FleetsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface FleetsUpdateAsyncOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface FleetsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface FleetsGetOptionalParams extends OperationOptions {}
