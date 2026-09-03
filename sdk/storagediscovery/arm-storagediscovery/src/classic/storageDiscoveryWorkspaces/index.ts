// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageDiscoveryContext } from "../../api/storageDiscoveryContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/storageDiscoveryWorkspaces/operations.js";
import type {
  StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
  StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
  StorageDiscoveryWorkspacesDeleteOptionalParams,
  StorageDiscoveryWorkspacesUpdateOptionalParams,
  StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
  StorageDiscoveryWorkspacesGetOptionalParams,
} from "../../api/storageDiscoveryWorkspaces/options.js";
import type {
  StorageDiscoveryWorkspace,
  StorageDiscoveryWorkspaceUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StorageDiscoveryWorkspaces operations. */
export interface StorageDiscoveryWorkspacesOperations {
  /** List StorageDiscoveryWorkspace resources by subscription ID */
  listBySubscription: (
    options?: StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageDiscoveryWorkspace>;
  /** List StorageDiscoveryWorkspace resources by resource group */
  listByResourceGroup: (
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
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    options?: StorageDiscoveryWorkspacesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a StorageDiscoveryWorkspace */
  update: (
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    properties: StorageDiscoveryWorkspaceUpdate,
    options?: StorageDiscoveryWorkspacesUpdateOptionalParams,
  ) => Promise<StorageDiscoveryWorkspace>;
  /** Create a StorageDiscoveryWorkspace */
  createOrUpdate: (
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    resource: StorageDiscoveryWorkspace,
    options?: StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
  ) => Promise<StorageDiscoveryWorkspace>;
  /** Get a StorageDiscoveryWorkspace */
  get: (
    resourceGroupName: string,
    storageDiscoveryWorkspaceName: string,
    options?: StorageDiscoveryWorkspacesGetOptionalParams,
  ) => Promise<StorageDiscoveryWorkspace>;
}

function _getStorageDiscoveryWorkspaces(context: StorageDiscoveryContext) {
  return {
    listBySubscription: (options?: StorageDiscoveryWorkspacesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      options?: StorageDiscoveryWorkspacesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageDiscoveryWorkspaceName, options),
    update: (
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      properties: StorageDiscoveryWorkspaceUpdate,
      options?: StorageDiscoveryWorkspacesUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageDiscoveryWorkspaceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      resource: StorageDiscoveryWorkspace,
      options?: StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, storageDiscoveryWorkspaceName, resource, options),
    get: (
      resourceGroupName: string,
      storageDiscoveryWorkspaceName: string,
      options?: StorageDiscoveryWorkspacesGetOptionalParams,
    ) => get(context, resourceGroupName, storageDiscoveryWorkspaceName, options),
  };
}

export function _getStorageDiscoveryWorkspacesOperations(
  context: StorageDiscoveryContext,
): StorageDiscoveryWorkspacesOperations {
  return {
    ..._getStorageDiscoveryWorkspaces(context),
  };
}
