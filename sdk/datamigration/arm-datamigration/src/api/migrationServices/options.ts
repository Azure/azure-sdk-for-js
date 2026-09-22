// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MigrationServicesListMigrationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationServicesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationServicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationServicesGetOptionalParams extends OperationOptions {}
