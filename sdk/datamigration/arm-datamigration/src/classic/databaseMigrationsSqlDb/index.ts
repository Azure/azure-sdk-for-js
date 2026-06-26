// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  retry,
  cancel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/databaseMigrationsSqlDb/operations.js";
import {
  DatabaseMigrationsSqlDbRetryOptionalParams,
  DatabaseMigrationsSqlDbCancelOptionalParams,
  DatabaseMigrationsSqlDbDeleteOptionalParams,
  DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
  DatabaseMigrationsSqlDbGetOptionalParams,
} from "../../api/databaseMigrationsSqlDb/options.js";
import { DatabaseMigrationSqlDb, MigrationOperationInput } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseMigrationsSqlDb operations. */
export interface DatabaseMigrationsSqlDbOperations {
  /** Retry on going migration for the database. */
  retry: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    migrationOperationInput: MigrationOperationInput,
    options?: DatabaseMigrationsSqlDbRetryOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb>;
  /** @deprecated use retry instead */
  beginRetry: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    migrationOperationInput: MigrationOperationInput,
    options?: DatabaseMigrationsSqlDbRetryOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb>>;
  /** @deprecated use retry instead */
  beginRetryAndWait: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    migrationOperationInput: MigrationOperationInput,
    options?: DatabaseMigrationsSqlDbRetryOptionalParams,
  ) => Promise<DatabaseMigrationSqlDb>;
  /** Stop on going migration for the database. */
  cancel: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlDbCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlDbCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlDbCancelOptionalParams,
  ) => Promise<void>;
  /** Delete Database Migration resource. */
  delete: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlDbDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlDbDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlDbDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or Update Database Migration resource. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlDb,
    options?: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlDb,
    options?: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseMigrationSqlDb>, DatabaseMigrationSqlDb>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlDb,
    options?: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseMigrationSqlDb>;
  /** Retrieve the Database Migration resource. */
  get: (
    resourceGroupName: string,
    sqlDbInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlDbGetOptionalParams,
  ) => Promise<DatabaseMigrationSqlDb>;
}

function _getDatabaseMigrationsSqlDb(context: DataMigrationManagementContext) {
  return {
    retry: (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      migrationOperationInput: MigrationOperationInput,
      options?: DatabaseMigrationsSqlDbRetryOptionalParams,
    ) =>
      retry(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        migrationOperationInput,
        options,
      ),
    beginRetry: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      migrationOperationInput: MigrationOperationInput,
      options?: DatabaseMigrationsSqlDbRetryOptionalParams,
    ) => {
      const poller = retry(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        migrationOperationInput,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRetryAndWait: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      migrationOperationInput: MigrationOperationInput,
      options?: DatabaseMigrationsSqlDbRetryOptionalParams,
    ) => {
      return await retry(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        migrationOperationInput,
        options,
      );
    },
    cancel: (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlDbCancelOptionalParams,
    ) => cancel(context, resourceGroupName, sqlDbInstanceName, targetDbName, parameters, options),
    beginCancel: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlDbCancelOptionalParams,
    ) => {
      const poller = cancel(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlDbCancelOptionalParams,
    ) => {
      return await cancel(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        parameters,
        options,
      );
    },
    delete: (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlDbDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlDbInstanceName, targetDbName, options),
    beginDelete: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlDbDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, sqlDbInstanceName, targetDbName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlDbDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, sqlDbInstanceName, targetDbName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlDb,
      options?: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlDb,
      options?: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlDb,
      options?: DatabaseMigrationsSqlDbCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        sqlDbInstanceName,
        targetDbName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sqlDbInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlDbGetOptionalParams,
    ) => get(context, resourceGroupName, sqlDbInstanceName, targetDbName, options),
  };
}

export function _getDatabaseMigrationsSqlDbOperations(
  context: DataMigrationManagementContext,
): DatabaseMigrationsSqlDbOperations {
  return {
    ..._getDatabaseMigrationsSqlDb(context),
  };
}
