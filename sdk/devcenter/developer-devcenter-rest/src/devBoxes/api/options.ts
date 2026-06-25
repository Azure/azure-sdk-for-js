// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DelayAllActionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DelayActionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SkipActionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDevBoxActionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListDevBoxActionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetRemoteConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RestartDevBoxOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StopDevBoxOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Optional parameter to hibernate the dev box. */
  hibernate?: boolean;
}

/** Optional parameters. */
export interface StartDevBoxOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DeleteDevBoxOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CreateDevBoxOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface GetDevBoxOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListDevBoxesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListAllDevBoxesByUserOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListAllDevBoxesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetScheduleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListSchedulesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetPoolOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListPoolsOptionalParams extends OperationOptions {}
