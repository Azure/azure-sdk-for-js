// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DevOpsConfigurationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DevOpsConfigurationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevOpsConfigurationsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevOpsConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DevOpsConfigurationsGetOptionalParams extends OperationOptions {}
