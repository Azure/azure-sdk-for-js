// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  list,
  listByReservationOrderAndReservation,
  listByReservationOrder,
} from "../../api/reservationsDetails/operations.js";
import {
  ReservationsDetailsListOptionalParams,
  ReservationsDetailsListByReservationOrderAndReservationOptionalParams,
  ReservationsDetailsListByReservationOrderOptionalParams,
} from "../../api/reservationsDetails/options.js";
import { ReservationDetail } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReservationsDetails operations. */
export interface ReservationsDetailsOperations {
  /** Lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs. */
  list: (
    resourceScope: string,
    options?: ReservationsDetailsListOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationDetail>;
  /** Lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs. */
  listByReservationOrderAndReservation: (
    reservationOrderId: string,
    reservationId: string,
    filter: string,
    options?: ReservationsDetailsListByReservationOrderAndReservationOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationDetail>;
  /** Lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs. */
  listByReservationOrder: (
    reservationOrderId: string,
    filter: string,
    options?: ReservationsDetailsListByReservationOrderOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationDetail>;
}

function _getReservationsDetails(context: ConsumptionManagementContext) {
  return {
    list: (resourceScope: string, options?: ReservationsDetailsListOptionalParams) =>
      list(context, resourceScope, options),
    listByReservationOrderAndReservation: (
      reservationOrderId: string,
      reservationId: string,
      filter: string,
      options?: ReservationsDetailsListByReservationOrderAndReservationOptionalParams,
    ) =>
      listByReservationOrderAndReservation(
        context,
        reservationOrderId,
        reservationId,
        filter,
        options,
      ),
    listByReservationOrder: (
      reservationOrderId: string,
      filter: string,
      options?: ReservationsDetailsListByReservationOrderOptionalParams,
    ) => listByReservationOrder(context, reservationOrderId, filter, options),
  };
}

export function _getReservationsDetailsOperations(
  context: ConsumptionManagementContext,
): ReservationsDetailsOperations {
  return {
    ..._getReservationsDetails(context),
  };
}
