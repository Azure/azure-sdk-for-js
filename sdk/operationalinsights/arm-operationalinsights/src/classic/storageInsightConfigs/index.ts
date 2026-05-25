// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext } from "../../api/operationalInsightsManagementContext.js";
import {
  listByWorkspace,
  $delete,
  createOrUpdate,
  get,
} from "../../api/storageInsightConfigs/operations.js";
import {
  StorageInsightConfigsListByWorkspaceOptionalParams,
  StorageInsightConfigsDeleteOptionalParams,
  StorageInsightConfigsCreateOrUpdateOptionalParams,
  StorageInsightConfigsGetOptionalParams,
} from "../../api/storageInsightConfigs/options.js";
import { StorageInsight } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageInsightConfigs operations. */
export interface StorageInsightConfigsOperations {
  /** Lists the storage insight instances within a workspace */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: StorageInsightConfigsListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<StorageInsight>;
  /** Deletes a storageInsightsConfigs resource */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    storageInsightName: string,
    options?: StorageInsightConfigsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a storage insight. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    storageInsightName: string,
    parameters: StorageInsight,
    options?: StorageInsightConfigsCreateOrUpdateOptionalParams,
  ) => Promise<StorageInsight>;
  /** Gets a storage insight instance. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    storageInsightName: string,
    options?: StorageInsightConfigsGetOptionalParams,
  ) => Promise<StorageInsight>;
}

function _getStorageInsightConfigs(context: OperationalInsightsManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: StorageInsightConfigsListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      storageInsightName: string,
      options?: StorageInsightConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, storageInsightName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      storageInsightName: string,
      parameters: StorageInsight,
      options?: StorageInsightConfigsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        storageInsightName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      storageInsightName: string,
      options?: StorageInsightConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, storageInsightName, options),
  };
}

export function _getStorageInsightConfigsOperations(
  context: OperationalInsightsManagementContext,
): StorageInsightConfigsOperations {
  return {
    ..._getStorageInsightConfigs(context),
  };
}
