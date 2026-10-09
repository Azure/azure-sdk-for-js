// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AuthoritiesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthoritiesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthoritiesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthoritiesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AuthoritiesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AuthoritiesGetOptionalParams extends OperationOptions {}
