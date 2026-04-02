// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IpExtendedCommunitiesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpExtendedCommunitiesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpExtendedCommunitiesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpExtendedCommunitiesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpExtendedCommunitiesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpExtendedCommunitiesGetOptionalParams extends OperationOptions {}
