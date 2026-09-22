// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DscpConfigurationOperationsListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscpConfigurationOperationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DscpConfigurationOperationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DscpConfigurationOperationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface DscpConfigurationOperationsGetOptionalParams extends OperationOptions {}
