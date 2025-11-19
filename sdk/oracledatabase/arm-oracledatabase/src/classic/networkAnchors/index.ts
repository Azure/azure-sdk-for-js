// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/networkAnchors/operations.js";
import type {
  NetworkAnchorsListByResourceGroupOptionalParams,
  NetworkAnchorsDeleteOptionalParams,
  NetworkAnchorsUpdateOptionalParams,
  NetworkAnchorsGetOptionalParams,
  NetworkAnchorsCreateOrUpdateOptionalParams,
  NetworkAnchorsListBySubscriptionOptionalParams,
} from "../../api/networkAnchors/options.js";
import type { NetworkAnchor, NetworkAnchorUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkAnchors operations. */
export interface NetworkAnchorsOperations {
  /** List NetworkAnchor resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NetworkAnchorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkAnchor>;
  /** Delete a NetworkAnchor */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    networkAnchorName: string,
    options?: NetworkAnchorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a NetworkAnchor */
  update: (
    resourceGroupName: string,
    networkAnchorName: string,
    properties: NetworkAnchorUpdate,
    options?: NetworkAnchorsUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkAnchor>, NetworkAnchor>;
  /** Get a NetworkAnchor */
  get: (
    resourceGroupName: string,
    networkAnchorName: string,
    options?: NetworkAnchorsGetOptionalParams,
  ) => Promise<NetworkAnchor>;
  /** Create a NetworkAnchor */
  createOrUpdate: (
    resourceGroupName: string,
    networkAnchorName: string,
    resource: NetworkAnchor,
    options?: NetworkAnchorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NetworkAnchor>, NetworkAnchor>;
  /** List NetworkAnchor resources by subscription ID */
  listBySubscription: (
    options?: NetworkAnchorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NetworkAnchor>;
}

function _getNetworkAnchors(context: OracleDatabaseManagementContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NetworkAnchorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      networkAnchorName: string,
      options?: NetworkAnchorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, networkAnchorName, options),
    update: (
      resourceGroupName: string,
      networkAnchorName: string,
      properties: NetworkAnchorUpdate,
      options?: NetworkAnchorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, networkAnchorName, properties, options),
    get: (
      resourceGroupName: string,
      networkAnchorName: string,
      options?: NetworkAnchorsGetOptionalParams,
    ) => get(context, resourceGroupName, networkAnchorName, options),
    createOrUpdate: (
      resourceGroupName: string,
      networkAnchorName: string,
      resource: NetworkAnchor,
      options?: NetworkAnchorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, networkAnchorName, resource, options),
    listBySubscription: (options?: NetworkAnchorsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getNetworkAnchorsOperations(
  context: OracleDatabaseManagementContext,
): NetworkAnchorsOperations {
  return {
    ..._getNetworkAnchors(context),
  };
}
