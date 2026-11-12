// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkloadSpacesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadSpacesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkloadSpacesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkloadSpacesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkloadSpacesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface WorkloadSpacesGetOptionalParams extends OperationOptions {}
