// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignalRCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRListReplicaSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRRegenerateKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRGetOptionalParams extends OperationOptions {}
