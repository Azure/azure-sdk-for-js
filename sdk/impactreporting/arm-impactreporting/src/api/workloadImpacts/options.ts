// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkloadImpactsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadImpactsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadImpactsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadImpactsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
