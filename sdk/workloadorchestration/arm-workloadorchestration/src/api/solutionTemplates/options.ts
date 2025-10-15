// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SolutionTemplatesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionTemplatesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionTemplatesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionTemplatesRemoveVersionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionTemplatesCreateVersionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionTemplatesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SolutionTemplatesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SolutionTemplatesGetOptionalParams extends OperationOptions {}
