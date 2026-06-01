// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface IpPrefixesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpPrefixesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface IpPrefixesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpPrefixesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpPrefixesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface IpPrefixesGetOptionalParams extends OperationOptions {}
