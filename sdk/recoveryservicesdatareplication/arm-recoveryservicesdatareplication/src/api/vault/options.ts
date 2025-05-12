// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VaultListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface VaultListOptionalParams extends OperationOptions {
  /** Continuation token from the previous call. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface VaultDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VaultUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VaultCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VaultGetOptionalParams extends OperationOptions {}
