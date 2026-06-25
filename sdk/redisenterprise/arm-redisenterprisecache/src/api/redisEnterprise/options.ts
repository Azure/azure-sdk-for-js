// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RedisEnterpriseListSkusForScalingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisEnterpriseListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisEnterpriseListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedisEnterpriseDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisEnterpriseUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisEnterpriseCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface RedisEnterpriseGetOptionalParams extends OperationOptions {}
