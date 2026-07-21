// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  cutover,
  cancel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/databaseMigrationsSqlVm/operations.js";
import type {
  DatabaseMigrationsSqlVmCutoverOptionalParams,
  DatabaseMigrationsSqlVmCancelOptionalParams,
  DatabaseMigrationsSqlVmDeleteOptionalParams,
  DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
  DatabaseMigrationsSqlVmGetOptionalParams,
} from "../../api/databaseMigrationsSqlVm/options.js";
import type { MigrationOperationInput, DatabaseMigrationSqlVm } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseMigrationsSqlVm operations. */
export interface DatabaseMigrationsSqlVmOperations {
  /** Initiate cutover for in-progress online database migration to SQL VM. */
  cutover: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlVmCutoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cutover instead */
  beginCutover: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlVmCutoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cutover instead */
  beginCutoverAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlVmCutoverOptionalParams,
  ) => Promise<void>;
  /** Stop in-progress database migration to SQL VM. */
  cancel: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlVmCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlVmCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: MigrationOperationInput,
    options?: DatabaseMigrationsSqlVmCancelOptionalParams,
  ) => Promise<void>;
  /** Delete Database Migration resource. */
  delete: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlVmDeleteOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlVmDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlVmDeleteOptionalParams,
  ) => Promise<DatabaseMigrationSqlVm>;
  /** Create a new database migration to a given SQL VM. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlVm,
    options?: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlVm,
    options?: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DatabaseMigrationSqlVm>, DatabaseMigrationSqlVm>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    parameters: DatabaseMigrationSqlVm,
    options?: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseMigrationSqlVm>;
  /** Retrieve the specified database migration for a given SQL VM. */
  get: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    targetDbName: string,
    options?: DatabaseMigrationsSqlVmGetOptionalParams,
  ) => Promise<DatabaseMigrationSqlVm>;
}

function _getDatabaseMigrationsSqlVm(context: DataMigrationManagementContext) {
  return {
    cutover: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlVmCutoverOptionalParams,
    ) =>
      cutover(context, resourceGroupName, sqlVirtualMachineName, targetDbName, parameters, options),
    beginCutover: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlVmCutoverOptionalParams,
    ) => {
      const poller = cutover(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCutoverAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlVmCutoverOptionalParams,
    ) => {
      return await cutover(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      );
    },
    cancel: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlVmCancelOptionalParams,
    ) =>
      cancel(context, resourceGroupName, sqlVirtualMachineName, targetDbName, parameters, options),
    beginCancel: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlVmCancelOptionalParams,
    ) => {
      const poller = cancel(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: MigrationOperationInput,
      options?: DatabaseMigrationsSqlVmCancelOptionalParams,
    ) => {
      return await cancel(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      );
    },
    delete: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlVmDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlVirtualMachineName, targetDbName, options),
    beginDelete: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlVmDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlVmDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlVm,
      options?: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlVm,
      options?: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      parameters: DatabaseMigrationSqlVm,
      options?: DatabaseMigrationsSqlVmCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        targetDbName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      targetDbName: string,
      options?: DatabaseMigrationsSqlVmGetOptionalParams,
    ) => get(context, resourceGroupName, sqlVirtualMachineName, targetDbName, options),
  };
}

export function _getDatabaseMigrationsSqlVmOperations(
  context: DataMigrationManagementContext,
): DatabaseMigrationsSqlVmOperations {
  return {
    ..._getDatabaseMigrationsSqlVm(context),
  };
}
