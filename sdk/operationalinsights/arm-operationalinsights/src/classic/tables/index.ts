// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  cancelSearch,
  migrate,
  listByWorkspace,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/tables/operations.js";
import {
  TablesCancelSearchOptionalParams,
  TablesMigrateOptionalParams,
  TablesListByWorkspaceOptionalParams,
  TablesDeleteOptionalParams,
  TablesUpdateOptionalParams,
  TablesCreateOrUpdateOptionalParams,
  TablesGetOptionalParams,
} from "../../api/tables/options.js";
import { Table } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Tables operations. */
export interface TablesOperations {
  /** Cancel a log analytics workspace search results table query run. */
  cancelSearch: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    options?: TablesCancelSearchOptionalParams,
  ) => Promise<void>;
  /** Migrate a Log Analytics table from support of the Data Collector API and Custom Fields features to support of Data Collection Rule-based Custom Logs. */
  migrate: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    options?: TablesMigrateOptionalParams,
  ) => Promise<void>;
  /** Gets all the tables for the specified Log Analytics workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: TablesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<Table>;
  /** Delete a Log Analytics workspace table. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    options?: TablesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    options?: TablesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    options?: TablesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Log Analytics workspace table. */
  update: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    parameters: Table,
    options?: TablesUpdateOptionalParams,
  ) => PollerLike<OperationState<Table>, Table>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    parameters: Table,
    options?: TablesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Table>, Table>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    parameters: Table,
    options?: TablesUpdateOptionalParams,
  ) => Promise<Table>;
  /** Update or Create a Log Analytics workspace table. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    parameters: Table,
    options?: TablesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Table>, Table>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    parameters: Table,
    options?: TablesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Table>, Table>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    parameters: Table,
    options?: TablesCreateOrUpdateOptionalParams,
  ) => Promise<Table>;
  /** Gets a Log Analytics workspace table. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    tableName: string,
    options?: TablesGetOptionalParams,
  ) => Promise<Table>;
}

function _getTables(context: OperationalInsightsManagementContext) {
  return {
    cancelSearch: (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      options?: TablesCancelSearchOptionalParams,
    ) => cancelSearch(context, resourceGroupName, workspaceName, tableName, options),
    migrate: (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      options?: TablesMigrateOptionalParams,
    ) => migrate(context, resourceGroupName, workspaceName, tableName, options),
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: TablesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      options?: TablesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, tableName, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      options?: TablesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, tableName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      options?: TablesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, tableName, options);
    },
    update: (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      parameters: Table,
      options?: TablesUpdateOptionalParams,
    ) => update(context, resourceGroupName, workspaceName, tableName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      parameters: Table,
      options?: TablesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        workspaceName,
        tableName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      parameters: Table,
      options?: TablesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        workspaceName,
        tableName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      parameters: Table,
      options?: TablesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, tableName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      parameters: Table,
      options?: TablesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        tableName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      parameters: Table,
      options?: TablesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        tableName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      workspaceName: string,
      tableName: string,
      options?: TablesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, tableName, options),
  };
}

export function _getTablesOperations(
  context: OperationalInsightsManagementContext,
): TablesOperations {
  return {
    ..._getTables(context),
  };
}
