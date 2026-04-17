// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
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
import type {
  CapacityReservation,
  CapacityReservationUpdate,
} from "../../models/compute/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    options?: CapacityReservationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    options?: CapacityReservationsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to update a capacity reservation. */
  update: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservationUpdate,
    options?: CapacityReservationsUpdateOptionalParams,
  ) => PollerLike<OperationState<CapacityReservation>, CapacityReservation>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservationUpdate,
    options?: CapacityReservationsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CapacityReservation>, CapacityReservation>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservationUpdate,
    options?: CapacityReservationsUpdateOptionalParams,
  ) => Promise<CapacityReservation>;
  /** The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details. */
  createOrUpdate: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservation,
    options?: CapacityReservationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CapacityReservation>, CapacityReservation>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservation,
    options?: CapacityReservationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CapacityReservation>, CapacityReservation>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    parameters: CapacityReservation,
    options?: CapacityReservationsCreateOrUpdateOptionalParams,
  ) => Promise<CapacityReservation>;
  /** The operation that retrieves information about the capacity reservation. */
  get: (
    resourceGroupName: string,
    capacityReservationGroupName: string,
    capacityReservationName: string,
    options?: CapacityReservationsGetOptionalParams,
  ) => Promise<CapacityReservation>;
}

function _getCapacityReservations(context: ComputeContext) {
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
    beginDelete: async (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      options?: CapacityReservationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      options?: CapacityReservationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        options,
      );
    },
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
    beginUpdate: async (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      parameters: CapacityReservationUpdate,
      options?: CapacityReservationsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      parameters: CapacityReservationUpdate,
      options?: CapacityReservationsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        parameters,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      parameters: CapacityReservation,
      options?: CapacityReservationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      capacityReservationGroupName: string,
      capacityReservationName: string,
      parameters: CapacityReservation,
      options?: CapacityReservationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        capacityReservationGroupName,
        capacityReservationName,
        parameters,
        options,
      );
    },
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
  context: ComputeContext,
): CapacityReservationsOperations {
  return {
    ..._getCapacityReservations(context),
  };
}
