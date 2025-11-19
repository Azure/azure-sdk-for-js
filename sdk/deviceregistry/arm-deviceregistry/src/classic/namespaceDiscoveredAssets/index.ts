// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/namespaceDiscoveredAssets/operations.js";
import type {
  NamespaceDiscoveredAssetsListByResourceGroupOptionalParams,
  NamespaceDiscoveredAssetsDeleteOptionalParams,
  NamespaceDiscoveredAssetsUpdateOptionalParams,
  NamespaceDiscoveredAssetsCreateOrReplaceOptionalParams,
  NamespaceDiscoveredAssetsGetOptionalParams,
} from "../../api/namespaceDiscoveredAssets/options.js";
import type {
  NamespaceDiscoveredAsset,
  NamespaceDiscoveredAssetUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NamespaceDiscoveredAssets operations. */
export interface NamespaceDiscoveredAssetsOperations {
  /** List NamespaceDiscoveredAsset resources by Namespace */
  listByResourceGroup: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespaceDiscoveredAssetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NamespaceDiscoveredAsset>;
  /** Delete a NamespaceDiscoveredAsset */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredAssetName: string,
    options?: NamespaceDiscoveredAssetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a NamespaceDiscoveredAsset */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredAssetName: string,
    properties: NamespaceDiscoveredAssetUpdate,
    options?: NamespaceDiscoveredAssetsUpdateOptionalParams,
  ) => PollerLike<OperationState<NamespaceDiscoveredAsset>, NamespaceDiscoveredAsset>;
  /** Create a NamespaceDiscoveredAsset */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredAssetName: string,
    resource: NamespaceDiscoveredAsset,
    options?: NamespaceDiscoveredAssetsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<NamespaceDiscoveredAsset>, NamespaceDiscoveredAsset>;
  /** Get a NamespaceDiscoveredAsset */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    discoveredAssetName: string,
    options?: NamespaceDiscoveredAssetsGetOptionalParams,
  ) => Promise<NamespaceDiscoveredAsset>;
}

function _getNamespaceDiscoveredAssets(context: DeviceRegistryManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespaceDiscoveredAssetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredAssetName: string,
      options?: NamespaceDiscoveredAssetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, discoveredAssetName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredAssetName: string,
      properties: NamespaceDiscoveredAssetUpdate,
      options?: NamespaceDiscoveredAssetsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, namespaceName, discoveredAssetName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredAssetName: string,
      resource: NamespaceDiscoveredAsset,
      options?: NamespaceDiscoveredAssetsCreateOrReplaceOptionalParams,
    ) =>
      createOrReplace(
        context,
        resourceGroupName,
        namespaceName,
        discoveredAssetName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      discoveredAssetName: string,
      options?: NamespaceDiscoveredAssetsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, discoveredAssetName, options),
  };
}

export function _getNamespaceDiscoveredAssetsOperations(
  context: DeviceRegistryManagementContext,
): NamespaceDiscoveredAssetsOperations {
  return {
    ..._getNamespaceDiscoveredAssets(context),
  };
}
