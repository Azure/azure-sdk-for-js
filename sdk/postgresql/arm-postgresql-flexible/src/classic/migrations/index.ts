// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import {
  checkNameAvailability,
  listByTargetServer,
  cancel,
  update,
  create,
  get,
} from "../../api/migrations/operations.js";
import type {
  MigrationsCheckNameAvailabilityOptionalParams,
  MigrationsListByTargetServerOptionalParams,
  MigrationsCancelOptionalParams,
  MigrationsUpdateOptionalParams,
  MigrationsCreateOptionalParams,
  MigrationsGetOptionalParams,
} from "../../api/migrations/options.js";
import type {
  Migration,
  MigrationResourceForPatch,
  MigrationNameAvailability,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Migrations operations. */
export interface MigrationsOperations {
  /** Checks if a proposed migration name is valid and available. */
  checkNameAvailability: (
    resourceGroupName: string,
    serverName: string,
    parameters: MigrationNameAvailability,
    options?: MigrationsCheckNameAvailabilityOptionalParams,
  ) => Promise<MigrationNameAvailability>;
  /** Lists all migrations of a target flexible server. */
  listByTargetServer: (
    resourceGroupName: string,
    serverName: string,
    options?: MigrationsListByTargetServerOptionalParams,
  ) => PagedAsyncIterableIterator<Migration>;
  /** Cancels an active migration. */
  cancel: (
    resourceGroupName: string,
    serverName: string,
    migrationName: string,
    options?: MigrationsCancelOptionalParams,
  ) => Promise<Migration>;
  /** Updates an existing migration. The request body can contain one to many of the mutable properties present in the migration definition. Certain property updates initiate migration state transitions. */
  update: (
    resourceGroupName: string,
    serverName: string,
    migrationName: string,
    parameters: MigrationResourceForPatch,
    options?: MigrationsUpdateOptionalParams,
  ) => Promise<Migration>;
  /** Creates a new migration. */
  create: (
    resourceGroupName: string,
    serverName: string,
    migrationName: string,
    parameters: Migration,
    options?: MigrationsCreateOptionalParams,
  ) => Promise<Migration>;
  /** Gets information about a migration. */
  get: (
    resourceGroupName: string,
    serverName: string,
    migrationName: string,
    options?: MigrationsGetOptionalParams,
  ) => Promise<Migration>;
}

function _getMigrations(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      serverName: string,
      parameters: MigrationNameAvailability,
      options?: MigrationsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, serverName, parameters, options),
    listByTargetServer: (
      resourceGroupName: string,
      serverName: string,
      options?: MigrationsListByTargetServerOptionalParams,
    ) => listByTargetServer(context, resourceGroupName, serverName, options),
    cancel: (
      resourceGroupName: string,
      serverName: string,
      migrationName: string,
      options?: MigrationsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, serverName, migrationName, options),
    update: (
      resourceGroupName: string,
      serverName: string,
      migrationName: string,
      parameters: MigrationResourceForPatch,
      options?: MigrationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, migrationName, parameters, options),
    create: (
      resourceGroupName: string,
      serverName: string,
      migrationName: string,
      parameters: Migration,
      options?: MigrationsCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, migrationName, parameters, options),
    get: (
      resourceGroupName: string,
      serverName: string,
      migrationName: string,
      options?: MigrationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, migrationName, options),
  };
}

export function _getMigrationsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): MigrationsOperations {
  return {
    ..._getMigrations(context),
  };
}
