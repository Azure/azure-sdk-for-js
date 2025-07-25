// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageDiscoveryContext } from "../../api/storageDiscoveryContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/storageDiscoveryWorkspaces/operations.js";
import {
  StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
  StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
  StorageDiscoveryWorkspacesDeleteOptionalParams,
  StorageDiscoveryWorkspacesUpdateOptionalParams,
  StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
  StorageDiscoveryWorkspacesGetOptionalParams,
} from "../../api/storageDiscoveryWorkspaces/options.js";
import { StorageDiscoveryWorkspace, StorageDiscoveryWorkspaceUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageDiscoveryWorkspaces operations. */
export interface StorageDiscoveryWorkspacesOperations {
  /** List StorageDiscoveryWorkspace resources by subscription ID */
  listBySubscription: (
    apiVersion: string,
    options?: StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageDiscoveryWorkspace>;
  /** List StorageDiscoveryWorkspace resources by resource group */
  listByResourceGroup: (
    apiVersion: string,
    resourceGroupName: string,
    options?: StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageDiscoveryWorkspace>;
  /** Delete a StorageDiscoveryWorkspace */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    options?: StorageDiscoveryWorkspacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a StorageDiscoveryWorkspace */
  update: (
    apiVersion: string,
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    properties: StorageDiscoveryWorkspaceUpdate,
    options?: StorageDiscoveryWorkspacesUpdateOptionalParams,
  ) => Promise<StorageDiscoveryWorkspace>;
  /** Create a StorageDiscoveryWorkspace */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    resource: StorageDiscoveryWorkspace,
    options?: StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<StorageDiscoveryWorkspace>;
  /** Get a StorageDiscoveryWorkspace */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    options?: StorageDiscoveryWorkspacesGetOptionalParams,
  ) => Promise<StorageDiscoveryWorkspace>;
}

function _getStorageDiscoveryWorkspaces(context: StorageDiscoveryContext) {
  return {
    listBySubscription: (
      apiVersion: string,
      options?: StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
    ) => listBySubscription(context, apiVersion, options),
    listByResourceGroup: (
      apiVersion: string,
      resourceGroupName: string,
      options?: StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, apiVersion, resourceGroupName, options),
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      options?: StorageDiscoveryWorkspacesDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, storageDiscoveryWorkspaceName, options),
    update: (
      apiVersion: string,
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      properties: StorageDiscoveryWorkspaceUpdate,
      options?: StorageDiscoveryWorkspacesUpdateOptionalParams,
    ) =>
      update(
        context,
        apiVersion,
        resourceGroupName,
        storageDiscoveryWorkspaceName,
        properties,
        options,
      ),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      resource: StorageDiscoveryWorkspace,
      options?: StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        storageDiscoveryWorkspaceName,
        resource,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      options?: StorageDiscoveryWorkspacesGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, storageDiscoveryWorkspaceName, options),
  };
}

export function _getStorageDiscoveryWorkspacesOperations(
  context: StorageDiscoveryContext,
): StorageDiscoveryWorkspacesOperations {
  return {
    ..._getStorageDiscoveryWorkspaces(context),
  };
}
