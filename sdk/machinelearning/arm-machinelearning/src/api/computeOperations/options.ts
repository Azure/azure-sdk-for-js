// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ComputeOperationsResizeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputeOperationsGetAllowedResizeSizesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputeOperationsUpdateIdleShutdownSettingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputeOperationsRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputeOperationsStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputeOperationsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputeOperationsUpdateDataMountsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputeOperationsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputeOperationsListNodesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputeOperationsUpdateCustomServicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ComputeOperationsListOptionalParams extends OperationOptions {
  /** Continuation token for pagination. */
  skip?: string;
}

/** Optional parameters. */
export interface ComputeOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputeOperationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputeOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ComputeOperationsGetOptionalParams extends OperationOptions {}
