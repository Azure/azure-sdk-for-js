// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  cutover,
  cancel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/databaseMigrationsSqlMi/operations.js";
import type {
  DatabaseMigrationsSqlMiCutoverOptionalParams,
  DatabaseMigrationsSqlMiCancelOptionalParams,
  DatabaseMigrationsSqlMiDeleteOptionalParams,
  DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
  DatabaseMigrationsSqlMiGetOptionalParams,
} from "../../api/databaseMigrationsSqlMi/options.js";
import type { MigrationOperationInput, DatabaseMigrationSqlMi } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseMigrationsSqlMi operations. */
export interface DatabaseMigrationsSqlMiOperations {
  /** Initiate cutover for in-progress online database migration to SQL Managed Instance. */
  cutover: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCutoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cutover instead */
  beginCutover: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCutoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cutover instead */
  beginCutoverAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCutoverOptionalParams,
  ) => Promise<void>;
  /** Stop in-progress database migration to SQL Managed Instance. */
  cancel: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlMiCancelOptionalParams,
  ) => Promise<void>;
  /** Delete Database Migration resource. */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlMiDeleteOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationSqlMi>, DatabaseMigrationSqlMi>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlMiDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseMigrationSqlMi>, DatabaseMigrationSqlMi>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlMiDeleteOptionalParams,
  ) => Promise<DatabaseMigrationSqlMi>;
  /** Create a new database migration to a given SQL Managed Instance. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlMi,
    options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationSqlMi>, DatabaseMigrationSqlMi>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlMi,
    options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseMigrationSqlMi>, DatabaseMigrationSqlMi>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlMi,
    options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseMigrationSqlMi>;
  /** Retrieve the specified database migration for a given SQL Managed Instance. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlMiGetOptionalParams,
  ) => Promise<DatabaseMigrationSqlMi>;
}

function _getDatabaseMigrationsSqlMi(context: DataMigrationManagementContext) {
  return {
    cutover: (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlMiCutoverOptionalParams,
    ) =>
      cutover(context, resourceGroupName, managedInstanceName, targetDbName, parameters, options),
    beginCutover: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlMiCutoverOptionalParams,
    ) => {
      const poller = cutover(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCutoverAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlMiCutoverOptionalParams,
    ) => {
      return await cutover(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        parameters,
        options,
      );
    },
    cancel: (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlMiCancelOptionalParams,
    ) => cancel(context, resourceGroupName, managedInstanceName, targetDbName, parameters, options),
    beginCancel: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlMiCancelOptionalParams,
    ) => {
      const poller = cancel(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlMiCancelOptionalParams,
    ) => {
      return await cancel(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        parameters,
        options,
      );
    },
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlMiDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, targetDbName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlMiDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlMiDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, managedInstanceName, targetDbName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlMi,
      options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlMi,
      options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlMi,
      options?: DatabaseMigrationsSqlMiCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        targetDbName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlMiGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, targetDbName, options),
  };
}

export function _getDatabaseMigrationsSqlMiOperations(
  context: DataMigrationManagementContext,
): DatabaseMigrationsSqlMiOperations {
  return {
    ..._getDatabaseMigrationsSqlMi(context),
  };
}
