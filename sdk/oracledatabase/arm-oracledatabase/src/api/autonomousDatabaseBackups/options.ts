// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AutonomousDatabaseBackupsListByParentOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AutonomousDatabaseBackupsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AutonomousDatabaseBackupsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AutonomousDatabaseBackupsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AutonomousDatabaseBackupsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
