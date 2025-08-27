// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiagnosticsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiagnosticsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DiagnosticsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiagnosticsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiagnosticsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DiagnosticsGetOptionalParams extends OperationOptions {}
