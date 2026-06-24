// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AttachedDatabaseConfigurationsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttachedDatabaseConfigurationsListByClusterOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AttachedDatabaseConfigurationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AttachedDatabaseConfigurationsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AttachedDatabaseConfigurationsGetOptionalParams extends OperationOptions {}
