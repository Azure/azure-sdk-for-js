// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BackupVaultsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupVaultsListInResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupVaultsListInSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BackupVaultsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BackupVaultsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface BackupVaultsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  xMsAuthorizationAuxiliary?: string;
}

/** Optional parameters. */
export interface BackupVaultsGetOptionalParams extends OperationOptions {}
