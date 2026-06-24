// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SqlMigrationServicesListMonitoringDataOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlMigrationServicesListMigrationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlMigrationServicesDeleteNodeOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlMigrationServicesRegenerateAuthKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlMigrationServicesListAuthKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlMigrationServicesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlMigrationServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SqlMigrationServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlMigrationServicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlMigrationServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface SqlMigrationServicesGetOptionalParams extends OperationOptions {}
