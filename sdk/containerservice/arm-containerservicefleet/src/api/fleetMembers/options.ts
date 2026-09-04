// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FleetMembersListByFleetOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The page-continuation token to use with a paged version of this API. */
  skipToken?: string;
  /** Filter the result list using the given expression. */
  filter?: string;
}

/** Optional parameters. */
export interface FleetMembersDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface FleetMembersUpdateAsyncOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface FleetMembersCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if no entity matches this string. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface FleetMembersGetOptionalParams extends OperationOptions {}
