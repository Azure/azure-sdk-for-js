// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GatesListByFleetOptionalParams extends OperationOptions {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to return. */
  top?: number;
  /** The page-continuation token to use with a paged version of this API. */
  skipToken?: string;
}

/** Optional parameters. */
export interface GatesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface GatesGetOptionalParams extends OperationOptions {}
