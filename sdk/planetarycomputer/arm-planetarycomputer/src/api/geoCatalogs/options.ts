// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GeoCatalogsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GeoCatalogsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GeoCatalogsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GeoCatalogsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GeoCatalogsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GeoCatalogsGetOptionalParams extends OperationOptions {}
