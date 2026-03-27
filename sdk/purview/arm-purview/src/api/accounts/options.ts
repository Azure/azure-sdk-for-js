// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccountsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsAddRootCollectionAdminOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsListBySubscriptionOptionalParams extends OperationOptions {
  /** The skip token. */
  skipToken?: string;
}

/** Optional parameters. */
export interface AccountsListByResourceGroupOptionalParams extends OperationOptions {
  /** The skip token. */
  skipToken?: string;
}

/** Optional parameters. */
export interface AccountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsGetOptionalParams extends OperationOptions {}
