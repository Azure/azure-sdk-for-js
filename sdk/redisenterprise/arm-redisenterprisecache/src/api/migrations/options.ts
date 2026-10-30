// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrationUndoRequest } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MigrationsValidateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationsUnlinkMigratedEndpointOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationsUndoOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameters supplied to undo a migration operation. */
  body?: MigrationUndoRequest;
}

/** Optional parameters. */
export interface MigrationsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationsStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface MigrationsGetOptionalParams extends OperationOptions {}
