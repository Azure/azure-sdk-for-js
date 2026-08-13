// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DeletedVaultsGetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeletedVaultsUndeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeletedVaultsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeletedVaultsListBySubscriptionIdOptionalParams extends OperationOptions {}
