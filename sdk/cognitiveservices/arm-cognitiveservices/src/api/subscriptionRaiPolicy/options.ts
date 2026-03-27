// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SubscriptionRaiPolicyDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SubscriptionRaiPolicyCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SubscriptionRaiPolicyGetOptionalParams extends OperationOptions {}
