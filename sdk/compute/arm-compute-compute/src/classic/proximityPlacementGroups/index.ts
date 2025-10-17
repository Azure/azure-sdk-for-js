// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/proximityPlacementGroups/operations.js";
import type {
  ProximityPlacementGroupsListBySubscriptionOptionalParams,
  ProximityPlacementGroupsListByResourceGroupOptionalParams,
  ProximityPlacementGroupsDeleteOptionalParams,
  ProximityPlacementGroupsUpdateOptionalParams,
  ProximityPlacementGroupsCreateOrUpdateOptionalParams,
  ProximityPlacementGroupsGetOptionalParams,
} from "../../api/proximityPlacementGroups/options.js";
import type {
  ProximityPlacementGroup,
  ProximityPlacementGroupUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProximityPlacementGroups operations. */
export interface ProximityPlacementGroupsOperations {
  /** Lists all proximity placement groups in a subscription. */
  listBySubscription: (
    options?: ProximityPlacementGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ProximityPlacementGroup>;
  /** Lists all proximity placement groups in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ProximityPlacementGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ProximityPlacementGroup>;
  /** Delete a proximity placement group. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    options?: ProximityPlacementGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a proximity placement group. */
  update: (
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    parameters: ProximityPlacementGroupUpdate,
    options?: ProximityPlacementGroupsUpdateOptionalParams,
  ) => Promise<ProximityPlacementGroup>;
  /** Create or update a proximity placement group. */
  createOrUpdate: (
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    parameters: ProximityPlacementGroup,
    options?: ProximityPlacementGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ProximityPlacementGroup>;
  /** Retrieves information about a proximity placement group . */
  get: (
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    options?: ProximityPlacementGroupsGetOptionalParams,
  ) => Promise<ProximityPlacementGroup>;
}

function _getProximityPlacementGroups(context: ComputeContext) {
  return {
    listBySubscription: (options?: ProximityPlacementGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ProximityPlacementGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      proximityPlacementGroupName: string,
      options?: ProximityPlacementGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, proximityPlacementGroupName, options),
    update: (
      resourceGroupName: string,
      proximityPlacementGroupName: string,
      parameters: ProximityPlacementGroupUpdate,
      options?: ProximityPlacementGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, proximityPlacementGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      proximityPlacementGroupName: string,
      parameters: ProximityPlacementGroup,
      options?: ProximityPlacementGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, proximityPlacementGroupName, parameters, options),
    get: (
      resourceGroupName: string,
      proximityPlacementGroupName: string,
      options?: ProximityPlacementGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, proximityPlacementGroupName, options),
  };
}

export function _getProximityPlacementGroupsOperations(
  context: ComputeContext,
): ProximityPlacementGroupsOperations {
  return {
    ..._getProximityPlacementGroups(context),
  };
}
