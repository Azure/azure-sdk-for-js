// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CodeSigningAccountsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeSigningAccountsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeSigningAccountsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CodeSigningAccountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CodeSigningAccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CodeSigningAccountsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CodeSigningAccountsGetOptionalParams extends OperationOptions {}
