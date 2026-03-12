// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface HealthModelsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HealthModelsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface HealthModelsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HealthModelsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HealthModelsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface HealthModelsGetOptionalParams extends OperationOptions {}
