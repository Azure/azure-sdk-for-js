// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SoftDeleteActionKind } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SoftDeletedDatabaseAccountsPurgeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The kind of soft delete action to perform. */
  softDeleteActionKind?: SoftDeleteActionKind;
}

/** Optional parameters. */
export interface SoftDeletedDatabaseAccountsRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The kind of soft delete action to perform. */
  softDeleteActionKind?: SoftDeleteActionKind;
}

/** Optional parameters. */
export interface SoftDeletedDatabaseAccountsListByResourceGroupAndLocationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SoftDeletedDatabaseAccountsListByLocationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SoftDeletedDatabaseAccountsGetOptionalParams extends OperationOptions {}
