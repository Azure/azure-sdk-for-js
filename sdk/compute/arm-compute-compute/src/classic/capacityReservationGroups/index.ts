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
} from "../../api/capacityReservationGroups/operations.js";
import type {
  CapacityReservationGroupsListBySubscriptionOptionalParams,
  CapacityReservationGroupsListByResourceGroupOptionalParams,
  CapacityReservationGroupsDeleteOptionalParams,
  CapacityReservationGroupsUpdateOptionalParams,
  CapacityReservationGroupsCreateOrUpdateOptionalParams,
  CapacityReservationGroupsGetOptionalParams,
} from "../../api/capacityReservationGroups/options.js";
import type {
  CapacityReservationGroup,
  CapacityReservationGroupUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CapacityReservationGroups operations. */
export interface CapacityReservationGroupsOperations {
  /** Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups. */
  listBySubscription: (
    options?: CapacityReservationGroupsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CapacityReservationGroup>;
  /** Lists all of the capacity reservation groups in the specified resource group. Use the nextLink property in the response to get the next page of capacity reservation groups. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CapacityReservationGroupsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CapacityReservationGroup>;
  /** The operation to delete a capacity reservation group. This operation is allowed only if all the associated resources are disassociated from the reservation group and all capacity reservations under the reservation group have also been deleted. Please refer to https://aka.ms/CapacityReservation for more details. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    options?: CapacityReservationGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. */
  update: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    parameters: CapacityReservationGroupUpdate,
    options?: CapacityReservationGroupsUpdateOptionalParams,
  ) => Promise<CapacityReservationGroup>;
  /** The operation to create or update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified. Please refer to https://aka.ms/CapacityReservation for more details. */
  createOrUpdate: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    parameters: CapacityReservationGroup,
    options?: CapacityReservationGroupsCreateOrUpdateOptionalParams,
  ) => Promise<CapacityReservationGroup>;
  /** The operation that retrieves information about a capacity reservation group. */
  get: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    options?: CapacityReservationGroupsGetOptionalParams,
  ) => Promise<CapacityReservationGroup>;
}

function _getCapacityReservationGroups(context: ComputeContext) {
  return {
    listBySubscription: (options?: CapacityReservationGroupsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CapacityReservationGroupsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      options?: CapacityReservationGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, capacityReservationGroupName, options),
    update: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      parameters: CapacityReservationGroupUpdate,
      options?: CapacityReservationGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, capacityReservationGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      parameters: CapacityReservationGroup,
      options?: CapacityReservationGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, capacityReservationGroupName, parameters, options),
    get: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      options?: CapacityReservationGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, capacityReservationGroupName, options),
  };
}

export function _getCapacityReservationGroupsOperations(
  context: ComputeContext,
): CapacityReservationGroupsOperations {
  return {
    ..._getCapacityReservationGroups(context),
  };
}
