// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConfigTemplatesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigTemplatesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigTemplatesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigTemplatesRemoveVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigTemplatesCreateVersionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigTemplatesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigTemplatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigTemplatesGetOptionalParams extends OperationOptions {}
