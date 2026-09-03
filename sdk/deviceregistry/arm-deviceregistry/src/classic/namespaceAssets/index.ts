// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/namespaceAssets/operations.js";
import type {
  NamespaceAssetsListByResourceGroupOptionalParams,
  NamespaceAssetsDeleteOptionalParams,
  NamespaceAssetsUpdateOptionalParams,
  NamespaceAssetsCreateOrReplaceOptionalParams,
  NamespaceAssetsGetOptionalParams,
} from "../../api/namespaceAssets/options.js";
import type { NamespaceAsset, NamespaceAssetUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NamespaceAssets operations. */
export interface NamespaceAssetsOperations {
  /** List NamespaceAsset resources by Namespace */
  listByResourceGroup: (
    resourceGroupName: string,
    namespaceName: string,
    options?: NamespaceAssetsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NamespaceAsset>;
  /** Delete a NamespaceAsset */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    assetName: string,
    options?: NamespaceAssetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a NamespaceAsset */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    assetName: string,
    properties: NamespaceAssetUpdate,
    options?: NamespaceAssetsUpdateOptionalParams,
  ) => PollerLike<OperationState<NamespaceAsset>, NamespaceAsset>;
  /** Create a NamespaceAsset */
  createOrReplace: (
    resourceGroupName: string,
    namespaceName: string,
    assetName: string,
    resource: NamespaceAsset,
    options?: NamespaceAssetsCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<NamespaceAsset>, NamespaceAsset>;
  /** Get a NamespaceAsset */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    assetName: string,
    options?: NamespaceAssetsGetOptionalParams,
  ) => Promise<NamespaceAsset>;
}

function _getNamespaceAssets(context: DeviceRegistryManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      namespaceName: string,
      options?: NamespaceAssetsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, namespaceName, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      assetName: string,
      options?: NamespaceAssetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, assetName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      assetName: string,
      properties: NamespaceAssetUpdate,
      options?: NamespaceAssetsUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, assetName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      namespaceName: string,
      assetName: string,
      resource: NamespaceAsset,
      options?: NamespaceAssetsCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, namespaceName, assetName, resource, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      assetName: string,
      options?: NamespaceAssetsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, assetName, options),
  };
}

export function _getNamespaceAssetsOperations(
  context: DeviceRegistryManagementContext,
): NamespaceAssetsOperations {
  return {
    ..._getNamespaceAssets(context),
  };
}
