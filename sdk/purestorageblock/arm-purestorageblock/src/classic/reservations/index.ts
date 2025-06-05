// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext } from "../../api/blockContext.js";
import {
  Reservation,
  ReservationUpdate,
  LimitDetails,
  ReservationBillingStatus,
  ReservationBillingUsageReport,
} from "../../models/models.js";
import {
  ReservationsGetBillingReportOptionalParams,
  ReservationsGetBillingStatusOptionalParams,
  ReservationsGetResourceLimitsOptionalParams,
  ReservationsListBySubscriptionOptionalParams,
  ReservationsListByResourceGroupOptionalParams,
  ReservationsDeleteOptionalParams,
  ReservationsUpdateOptionalParams,
  ReservationsCreateOptionalParams,
  ReservationsGetOptionalParams,
} from "../../api/reservations/options.js";
import {
  getBillingReport,
  getBillingStatus,
  getResourceLimits,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/reservations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Reservations operations. */
export interface ReservationsOperations {
  /** Provides a summarized report along with actions for resources billed via given reservation */
  getBillingReport: (
    resourceGroupName: string,
    reservationName: string,
    options?: ReservationsGetBillingReportOptionalParams,
  ) => Promise<ReservationBillingUsageReport>;
  /** Provides various statistics about resources billed via given reservation. */
  getBillingStatus: (
    resourceGroupName: string,
    reservationName: string,
    options?: ReservationsGetBillingStatusOptionalParams,
  ) => Promise<ReservationBillingStatus>;
  /** Limits constraining certain resource properties. */
  getResourceLimits: (
    resourceGroupName: string,
    reservationName: string,
    options?: ReservationsGetResourceLimitsOptionalParams,
  ) => Promise<LimitDetails>;
  /** List reservations by Azure subscription ID */
  listBySubscription: (
    options?: ReservationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Reservation>;
  /** List reservations by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ReservationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Reservation>;
  /** Delete a reservation */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    reservationName: string,
    options?: ReservationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a reservation */
  update: (
    resourceGroupName: string,
    reservationName: string,
    properties: ReservationUpdate,
    options?: ReservationsUpdateOptionalParams,
  ) => PollerLike<OperationState<Reservation>, Reservation>;
  /** Create a reservation */
  create: (
    resourceGroupName: string,
    reservationName: string,
    resource: Reservation,
    options?: ReservationsCreateOptionalParams,
  ) => PollerLike<OperationState<Reservation>, Reservation>;
  /** Get a reservation */
  get: (
    resourceGroupName: string,
    reservationName: string,
    options?: ReservationsGetOptionalParams,
  ) => Promise<Reservation>;
}

function _getReservations(context: BlockContext) {
  return {
    getBillingReport: (
      resourceGroupName: string,
      reservationName: string,
      options?: ReservationsGetBillingReportOptionalParams,
    ) => getBillingReport(context, resourceGroupName, reservationName, options),
    getBillingStatus: (
      resourceGroupName: string,
      reservationName: string,
      options?: ReservationsGetBillingStatusOptionalParams,
    ) => getBillingStatus(context, resourceGroupName, reservationName, options),
    getResourceLimits: (
      resourceGroupName: string,
      reservationName: string,
      options?: ReservationsGetResourceLimitsOptionalParams,
    ) => getResourceLimits(context, resourceGroupName, reservationName, options),
    listBySubscription: (options?: ReservationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ReservationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      reservationName: string,
      options?: ReservationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, reservationName, options),
    update: (
      resourceGroupName: string,
      reservationName: string,
      properties: ReservationUpdate,
      options?: ReservationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, reservationName, properties, options),
    create: (
      resourceGroupName: string,
      reservationName: string,
      resource: Reservation,
      options?: ReservationsCreateOptionalParams,
    ) => create(context, resourceGroupName, reservationName, resource, options),
    get: (
      resourceGroupName: string,
      reservationName: string,
      options?: ReservationsGetOptionalParams,
    ) => get(context, resourceGroupName, reservationName, options),
  };
}

export function _getReservationsOperations(context: BlockContext): ReservationsOperations {
  return {
    ..._getReservations(context),
  };
}
