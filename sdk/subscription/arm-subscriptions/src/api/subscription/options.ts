// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SubscriptionAcceptOwnershipStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SubscriptionAcceptOwnershipOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SubscriptionEnableOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SubscriptionRenameOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SubscriptionCancelOptionalParams extends OperationOptions {}
