// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext } from "../../api/blockContext.js";
import {
  latestLinkedSaaS,
  linkSaaS,
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
import type {
  ReservationsLatestLinkedSaaSOptionalParams,
  ReservationsLinkSaaSOptionalParams,
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
import type {
  Reservation,
  ReservationUpdate,
  LimitDetails,
  ReservationBillingStatus,
  ReservationBillingUsageReport,
  LinkSaaSRequest,
  LatestLinkedSaaSResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Reservations operations. */
export interface ReservationsOperations {
  /** Returns the latest SaaS linked to the reservation. */
  latestLinkedSaaS: (
    resourceGroupName: string,
    reservationName: string,
    options?: ReservationsLatestLinkedSaaSOptionalParams,
  ) => Promise<LatestLinkedSaaSResponse>;
  /** A long-running resource action. */
  linkSaaS: (
    resourceGroupName: string,
    reservationName: string,
    body: LinkSaaSRequest,
    options?: ReservationsLinkSaaSOptionalParams,
  ) => PollerLike<OperationState<Reservation>, Reservation>;
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
    latestLinkedSaaS: (
      resourceGroupName: string,
      reservationName: string,
      options?: ReservationsLatestLinkedSaaSOptionalParams,
    ) => latestLinkedSaaS(context, resourceGroupName, reservationName, options),
    linkSaaS: (
      resourceGroupName: string,
      reservationName: string,
      body: LinkSaaSRequest,
      options?: ReservationsLinkSaaSOptionalParams,
    ) => linkSaaS(context, resourceGroupName, reservationName, body, options),
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
