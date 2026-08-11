// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  listForScope,
  $delete,
  create,
  get,
} from "../../api/databaseMigrationsMongoToCosmosDbRUMongo/operations.js";
import type {
  DatabaseMigrationsMongoToCosmosDbRUMongoListForScopeOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
  DatabaseMigrationsMongoToCosmosDbRUMongoGetOptionalParams,
} from "../../api/databaseMigrationsMongoToCosmosDbRUMongo/options.js";
import type { DatabaseMigrationCosmosDbMongo } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseMigrationsMongoToCosmosDbRUMongo operations. */
export interface DatabaseMigrationsMongoToCosmosDbRUMongoOperations {
  /** Get Database Migration resources for the scope. */
  listForScope: (
    resourceGroupName: string,
    targetResourceName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseMigrationCosmosDbMongo>;
  /** Delete Database Migration resource. */
  delete: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or Update Database Migration resource. */
  create: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationCosmosDbMongo>, DatabaseMigrationCosmosDbMongo>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DatabaseMigrationCosmosDbMongo>, DatabaseMigrationCosmosDbMongo>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
  ) => Promise<DatabaseMigrationCosmosDbMongo>;
  /** Get Database Migration resource. */
  get: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetOptionalParams,
  ) => Promise<DatabaseMigrationCosmosDbMongo>;
}

function _getDatabaseMigrationsMongoToCosmosDbRUMongo(context: DataMigrationManagementContext) {
  return {
    listForScope: (
      resourceGroupName: string,
      targetResourceName: string,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoListForScopeOptionalParams,
    ) => listForScope(context, resourceGroupName, targetResourceName, options),
    delete: (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, targetResourceName, migrationName, options),
    beginDelete: async (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        targetResourceName,
        migrationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, targetResourceName, migrationName, options);
    },
    create: (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      parameters: DatabaseMigrationCosmosDbMongo,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
    ) => create(context, resourceGroupName, targetResourceName, migrationName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      parameters: DatabaseMigrationCosmosDbMongo,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        targetResourceName,
        migrationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      parameters: DatabaseMigrationCosmosDbMongo,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        targetResourceName,
        migrationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      options?: DatabaseMigrationsMongoToCosmosDbRUMongoGetOptionalParams,
    ) => get(context, resourceGroupName, targetResourceName, migrationName, options),
  };
}

export function _getDatabaseMigrationsMongoToCosmosDbRUMongoOperations(
  context: DataMigrationManagementContext,
): DatabaseMigrationsMongoToCosmosDbRUMongoOperations {
  return {
    ..._getDatabaseMigrationsMongoToCosmosDbRUMongo(context),
  };
}
