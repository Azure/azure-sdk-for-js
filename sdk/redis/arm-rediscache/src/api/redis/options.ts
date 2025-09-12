// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RedisCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisFlushCacheOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisExportDataOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisImportDataOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisForceRebootOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisRegenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisListUpgradeNotificationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisGetOptionalParams extends OperationOptions {}
