// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrationListFilter } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface MigrationsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationsListByTargetServerOptionalParams extends OperationOptions {
  /** Migration list filter. Indicates if the request should retrieve only active migrations or all migrations. Defaults to Active. */
  migrationListFilter?: MigrationListFilter;
}

/** Optional parameters. */
export interface MigrationsCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface MigrationsGetOptionalParams extends OperationOptions {}
