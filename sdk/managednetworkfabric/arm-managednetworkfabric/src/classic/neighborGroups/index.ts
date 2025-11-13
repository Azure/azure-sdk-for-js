// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext } from "../../api/managedNetworkFabricContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/neighborGroups/operations.js";
import type {
  NeighborGroupsListBySubscriptionOptionalParams,
  NeighborGroupsListByResourceGroupOptionalParams,
  NeighborGroupsDeleteOptionalParams,
  NeighborGroupsUpdateOptionalParams,
  NeighborGroupsCreateOptionalParams,
  NeighborGroupsGetOptionalParams,
} from "../../api/neighborGroups/options.js";
import type { NeighborGroup, NeighborGroupPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NeighborGroups operations. */
export interface NeighborGroupsOperations {
  /** Displays NeighborGroups list by subscription GET method. */
  listBySubscription: (
    options?: NeighborGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NeighborGroup>;
  /** Displays NeighborGroups list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NeighborGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NeighborGroup>;
  /** Implements Neighbor Group DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the Neighbor Group. */
  update: (
    resourceGroupName: string,
    neighborGroupName: string,
    properties: NeighborGroupPatch,
    options?: NeighborGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<NeighborGroup>, NeighborGroup>;
  /** Implements the Neighbor Group PUT method. */
  create: (
    resourceGroupName: string,
    neighborGroupName: string,
    resource: NeighborGroup,
    options?: NeighborGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<NeighborGroup>, NeighborGroup>;
  /** Gets the Neighbor Group. */
  get: (
    resourceGroupName: string,
    neighborGroupName: string,
    options?: NeighborGroupsGetOptionalParams,
  ) => Promise<NeighborGroup>;
}

function _getNeighborGroups(context: ManagedNetworkFabricContext) {
  return {
    listBySubscription: (options?: NeighborGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NeighborGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, neighborGroupName, options),
    update: (
      resourceGroupName: string,
      neighborGroupName: string,
      properties: NeighborGroupPatch,
      options?: NeighborGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, neighborGroupName, properties, options),
    create: (
      resourceGroupName: string,
      neighborGroupName: string,
      resource: NeighborGroup,
      options?: NeighborGroupsCreateOptionalParams,
    ) => create(context, resourceGroupName, neighborGroupName, resource, options),
    get: (
      resourceGroupName: string,
      neighborGroupName: string,
      options?: NeighborGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, neighborGroupName, options),
  };
}

export function _getNeighborGroupsOperations(
  context: ManagedNetworkFabricContext,
): NeighborGroupsOperations {
  return {
    ..._getNeighborGroups(context),
  };
}
