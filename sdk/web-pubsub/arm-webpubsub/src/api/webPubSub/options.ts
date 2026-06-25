// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WebPubSubCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubListReplicaSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubRegenerateKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WebPubSubDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WebPubSubGetOptionalParams extends OperationOptions {}
