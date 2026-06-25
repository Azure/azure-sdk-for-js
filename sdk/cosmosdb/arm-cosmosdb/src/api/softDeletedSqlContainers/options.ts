// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SoftDeleteActionKind } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SoftDeletedSqlContainersPurgeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The kind of soft delete action to perform. */
  softDeleteActionKind?: SoftDeleteActionKind;
}

/** Optional parameters. */
export interface SoftDeletedSqlContainersRestoreOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The kind of soft delete action to perform. */
  softDeleteActionKind?: SoftDeleteActionKind;
}

/** Optional parameters. */
export interface SoftDeletedSqlContainersListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SoftDeletedSqlContainersGetOptionalParams extends OperationOptions {}
