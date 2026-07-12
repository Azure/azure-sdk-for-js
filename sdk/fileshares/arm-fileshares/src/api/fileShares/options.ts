// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FileSharesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileSharesListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileSharesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileSharesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileSharesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileSharesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FileSharesGetOptionalParams extends OperationOptions {}
