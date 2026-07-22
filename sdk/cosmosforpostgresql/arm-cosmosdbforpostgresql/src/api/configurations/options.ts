// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConfigurationsUpdateOnCoordinatorOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationsGetCoordinatorOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationsUpdateOnNodeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConfigurationsGetNodeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationsListByServerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationsListByClusterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ConfigurationsGetOptionalParams extends OperationOptions {}
