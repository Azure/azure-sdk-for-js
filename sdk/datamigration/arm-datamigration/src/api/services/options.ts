// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServicesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesCheckChildrenNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesListSkusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesCheckStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Delete the resource even if it contains running tasks */
  deleteRunningTasks?: boolean;
}

/** Optional parameters. */
export interface ServicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ServicesGetOptionalParams extends OperationOptions {}
