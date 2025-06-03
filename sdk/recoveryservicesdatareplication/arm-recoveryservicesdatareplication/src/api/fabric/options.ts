// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FabricListBySubscriptionOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FabricListOptionalParams extends OperationOptions {
  /** Continuation token from the previous call. */
  continuationToken?: string;
}

/** Optional parameters. */
export interface FabricDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FabricGetOptionalParams extends OperationOptions {}
