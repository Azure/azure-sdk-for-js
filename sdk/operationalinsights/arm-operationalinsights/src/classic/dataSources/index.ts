// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import { listByWorkspace, $delete, createOrUpdate, get } from "../../api/dataSources/operations.js";
import {
  DataSourcesListByWorkspaceOptionalParams,
  DataSourcesDeleteOptionalParams,
  DataSourcesCreateOrUpdateOptionalParams,
  DataSourcesGetOptionalParams,
} from "../../api/dataSources/options.js";
import { DataSource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DataSources operations. */
export interface DataSourcesOperations {
  /** Gets the first page of data source instances in a workspace with the link to the next page. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    filter: string,
    options?: DataSourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<DataSource>;
  /** Deletes a data source instance. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    dataSourceName: string,
    options?: DataSourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a data source. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    dataSourceName: string,
    parameters: DataSource,
    options?: DataSourcesCreateOrUpdateOptionalParams,
  ) => Promise<DataSource>;
  /** Gets a datasource instance. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    dataSourceName: string,
    options?: DataSourcesGetOptionalParams,
  ) => Promise<DataSource>;
}

function _getDataSources(context: OperationalInsightsManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      filter: string,
      options?: DataSourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, filter, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      dataSourceName: string,
      options?: DataSourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, dataSourceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      dataSourceName: string,
      parameters: DataSource,
      options?: DataSourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dataSourceName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      dataSourceName: string,
      options?: DataSourcesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, dataSourceName, options),
  };
}

export function _getDataSourcesOperations(
  context: OperationalInsightsManagementContext,
): DataSourcesOperations {
  return {
    ..._getDataSources(context),
  };
}
