// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IpCommunitiesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpCommunitiesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpCommunitiesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpCommunitiesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpCommunitiesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpCommunitiesGetOptionalParams extends OperationOptions {}
