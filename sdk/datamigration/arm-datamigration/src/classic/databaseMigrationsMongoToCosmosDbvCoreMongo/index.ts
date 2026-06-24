// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  listForScope,
  $delete,
  create,
  get,
} from "../../api/databaseMigrationsMongoToCosmosDbvCoreMongo/operations.js";
import {
  DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams,
  DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
  DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
  DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOptionalParams,
} from "../../api/databaseMigrationsMongoToCosmosDbvCoreMongo/options.js";
import { DatabaseMigrationCosmosDbMongo } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseMigrationsMongoToCosmosDbvCoreMongo operations. */
export interface DatabaseMigrationsMongoToCosmosDbvCoreMongoOperations {
  /** Get Database Migration resources for the scope. */
  listForScope: (
    resourceGroupName: string,
    targetResourceName: string,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseMigrationCosmosDbMongo>;
  /** Delete Database Migration resource. */
  delete: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or Update Database Migration resource. */
  create: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationCosmosDbMongo>, DatabaseMigrationCosmosDbMongo>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DatabaseMigrationCosmosDbMongo>, DatabaseMigrationCosmosDbMongo>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    parameters: DatabaseMigrationCosmosDbMongo,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
  ) => Promise<DatabaseMigrationCosmosDbMongo>;
  /** Get Database Migration resource. */
  get: (
    resourceGroupName: string,
    targetResourceName: string,
    migrationName: string,
    options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOptionalParams,
  ) => Promise<DatabaseMigrationCosmosDbMongo>;
}

function _getDatabaseMigrationsMongoToCosmosDbvCoreMongo(context: DataMigrationManagementContext) {
  return {
    listForScope: (
      resourceGroupName: string,
      targetResourceName: string,
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoListForScopeOptionalParams,
    ) => listForScope(context, resourceGroupName, targetResourceName, options),
    delete: (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, targetResourceName, migrationName, options),
    beginDelete: async (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
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
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, targetResourceName, migrationName, options);
    },
    create: (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      parameters: DatabaseMigrationCosmosDbMongo,
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
    ) => create(context, resourceGroupName, targetResourceName, migrationName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      targetResourceName: string,
      migrationName: string,
      parameters: DatabaseMigrationCosmosDbMongo,
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
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
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoCreateOptionalParams,
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
      options?: DatabaseMigrationsMongoToCosmosDbvCoreMongoGetOptionalParams,
    ) => get(context, resourceGroupName, targetResourceName, migrationName, options),
  };
}

export function _getDatabaseMigrationsMongoToCosmosDbvCoreMongoOperations(
  context: DataMigrationManagementContext,
): DatabaseMigrationsMongoToCosmosDbvCoreMongoOperations {
  return {
    ..._getDatabaseMigrationsMongoToCosmosDbvCoreMongo(context),
  };
}
