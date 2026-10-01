// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorContext } from "../../api/monitorContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/azureMonitorWorkspaces/operations.js";
import {
  AzureMonitorWorkspacesListBySubscriptionOptionalParams,
  AzureMonitorWorkspacesListByResourceGroupOptionalParams,
  AzureMonitorWorkspacesDeleteOptionalParams,
  AzureMonitorWorkspacesUpdateOptionalParams,
  AzureMonitorWorkspacesCreateOrUpdateOptionalParams,
  AzureMonitorWorkspacesGetOptionalParams,
} from "../../api/azureMonitorWorkspaces/options.js";
import {
  AzureMonitorWorkspaceResource,
  AzureMonitorWorkspaceResourceUpdate,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureMonitorWorkspaces operations. */
export interface AzureMonitorWorkspacesOperations {
  /** Lists all Azure Monitor Workspaces in the specified subscription */
  listBySubscription: (
    options?: AzureMonitorWorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AzureMonitorWorkspaceResource>;
  /** Lists all Azure Monitor Workspaces in the specified resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AzureMonitorWorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AzureMonitorWorkspaceResource>;
  /** Deletes an Azure Monitor Workspace */
  delete: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    options?: AzureMonitorWorkspacesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates part of an Azure Monitor Workspace */
  update: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    properties: AzureMonitorWorkspaceResourceUpdate,
    options?: AzureMonitorWorkspacesUpdateOptionalParams,
  ) => Promise<AzureMonitorWorkspaceResource>;
  /** Creates or updates an Azure Monitor Workspace */
  createOrUpdate: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    resource: AzureMonitorWorkspaceResource,
    options?: AzureMonitorWorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<AzureMonitorWorkspaceResource>;
  /** Returns the specified Azure Monitor Workspace */
  get: (
    resourceGroupName: string,
    azureMonitorWorkspaceName: string,
    options?: AzureMonitorWorkspacesGetOptionalParams,
  ) => Promise<AzureMonitorWorkspaceResource>;
}

function _getAzureMonitorWorkspaces(context: MonitorContext) {
  return {
    listBySubscription: (options?: AzureMonitorWorkspacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AzureMonitorWorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      options?: AzureMonitorWorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, azureMonitorWorkspaceName, options),
    update: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      properties: AzureMonitorWorkspaceResourceUpdate,
      options?: AzureMonitorWorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, azureMonitorWorkspaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      resource: AzureMonitorWorkspaceResource,
      options?: AzureMonitorWorkspacesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, azureMonitorWorkspaceName, resource, options),
    get: (
      resourceGroupName: string,
      azureMonitorWorkspaceName: string,
      options?: AzureMonitorWorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, azureMonitorWorkspaceName, options),
  };
}

export function _getAzureMonitorWorkspacesOperations(
  context: MonitorContext,
): AzureMonitorWorkspacesOperations {
  return {
    ..._getAzureMonitorWorkspaces(context),
  };
}
