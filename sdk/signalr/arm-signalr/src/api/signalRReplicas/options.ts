// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SignalRReplicasRestartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRReplicasListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRReplicasDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SignalRReplicasUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRReplicasCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SignalRReplicasGetOptionalParams extends OperationOptions {}
