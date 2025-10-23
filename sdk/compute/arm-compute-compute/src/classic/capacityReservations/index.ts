// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import {
  listByCapacityReservationGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/capacityReservations/operations.js";
import type {
  CapacityReservationsListByCapacityReservationGroupOptionalParams,
  CapacityReservationsDeleteOptionalParams,
  CapacityReservationsUpdateOptionalParams,
  CapacityReservationsCreateOrUpdateOptionalParams,
  CapacityReservationsGetOptionalParams,
} from "../../api/capacityReservations/options.js";
import type { CapacityReservation, CapacityReservationUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CapacityReservations operations. */
export interface CapacityReservationsOperations {
  /** Lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations. */
  listByCapacityReservationGroup: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    options?: CapacityReservationsListByCapacityReservationGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CapacityReservation>;
  /** The operation to delete a capacity reservation. This operation is allowed only when all the associated resources are disassociated from the capacity reservation. Please refer to https://aka.ms/CapacityReservation for more details. Note: Block capacity reservations cannot be deleted after it has been successfully allocated until the schedule end time. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    options?: CapacityReservationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update a capacity reservation. */
  update: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservationUpdate,
    options?: CapacityReservationsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details. */
  createOrUpdate: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservation,
    options?: CapacityReservationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation that retrieves information about the capacity reservation. */
  get: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    options?: CapacityReservationsGetOptionalParams,
  ) => Promise<CapacityReservation>;
}

function _getCapacityReservations(context: ComputeManagementContext) {
  return {
    listByCapacityReservationGroup: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      options?: CapacityReservationsListByCapacityReservationGroupOptionalParams,
    ) =>
      listByCapacityReservationGroup(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      options?: CapacityReservationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        options,
      ),
    update: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      parameters: CapacityReservationUpdate,
      options?: CapacityReservationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      parameters: CapacityReservation,
      options?: CapacityReservationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      options?: CapacityReservationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        options,
      ),
  };
}

export function _getCapacityReservationsOperations(
  context: ComputeManagementContext,
): CapacityReservationsOperations {
  return {
    ..._getCapacityReservations(context),
  };
}
