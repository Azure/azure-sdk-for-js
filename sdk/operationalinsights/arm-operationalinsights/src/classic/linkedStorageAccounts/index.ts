// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  listByWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/linkedStorageAccounts/operations.js";
import {
  LinkedStorageAccountsListByWorkspaceOptionalParams,
  LinkedStorageAccountsDeleteOptionalParams,
  LinkedStorageAccountsCreateOrUpdateOptionalParams,
  LinkedStorageAccountsGetOptionalParams,
} from "../../api/linkedStorageAccounts/options.js";
import { LinkedStorageAccountsResource, DataSourceType } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LinkedStorageAccounts operations. */
export interface LinkedStorageAccountsOperations {
  /** Gets all linked storage accounts associated with the specified workspace, storage accounts will be sorted by their data source type. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: LinkedStorageAccountsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<LinkedStorageAccountsResource>;
  /** Deletes all linked storage accounts of a specific data source type associated with the specified workspace. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    dataSourceType: DataSourceType,
    options?: LinkedStorageAccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or Update a link relation between current workspace and a group of storage accounts of a specific data source type. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    dataSourceType: DataSourceType,
    parameters: LinkedStorageAccountsResource,
    options?: LinkedStorageAccountsCreateOrUpdateOptionalParams,
  ) => Promise<LinkedStorageAccountsResource>;
  /** Gets all linked storage account of a specific data source type associated with the specified workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    dataSourceType: DataSourceType,
    options?: LinkedStorageAccountsGetOptionalParams,
  ) => Promise<LinkedStorageAccountsResource>;
}

function _getLinkedStorageAccounts(context: OperationalInsightsManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: LinkedStorageAccountsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      dataSourceType: DataSourceType,
      options?: LinkedStorageAccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, dataSourceType, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      dataSourceType: DataSourceType,
      parameters: LinkedStorageAccountsResource,
      options?: LinkedStorageAccountsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        dataSourceType,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      dataSourceType: DataSourceType,
      options?: LinkedStorageAccountsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, dataSourceType, options),
  };
}

export function _getLinkedStorageAccountsOperations(
  context: OperationalInsightsManagementContext,
): LinkedStorageAccountsOperations {
  return {
    ..._getLinkedStorageAccounts(context),
  };
}
