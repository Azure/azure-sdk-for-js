// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  list,
  listByReservationOrderAndReservation,
  listByReservationOrder,
} from "../../api/reservationsSummaries/operations.js";
import {
  ReservationsSummariesListOptionalParams,
  ReservationsSummariesListByReservationOrderAndReservationOptionalParams,
  ReservationsSummariesListByReservationOrderOptionalParams,
} from "../../api/reservationsSummaries/options.js";
import { ReservationSummary, Datagrain } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReservationsSummaries operations. */
export interface ReservationsSummariesOperations {
  /** Lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
  list: (
    resourceScope: string,
    grain: Datagrain,
    options?: ReservationsSummariesListOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationSummary>;
  /** Lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
  listByReservationOrderAndReservation: (
    reservationOrderId: string,
    reservationId: string,
    grain: Datagrain,
    options?: ReservationsSummariesListByReservationOrderAndReservationOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationSummary>;
  /** Lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
  listByReservationOrder: (
    reservationOrderId: string,
    grain: Datagrain,
    options?: ReservationsSummariesListByReservationOrderOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationSummary>;
}

function _getReservationsSummaries(context: ConsumptionManagementContext) {
  return {
    list: (
      resourceScope: string,
      grain: Datagrain,
      options?: ReservationsSummariesListOptionalParams,
    ) => list(context, resourceScope, grain, options),
    listByReservationOrderAndReservation: (
      reservationOrderId: string,
      reservationId: string,
      grain: Datagrain,
      options?: ReservationsSummariesListByReservationOrderAndReservationOptionalParams,
    ) =>
      listByReservationOrderAndReservation(
        context,
        reservationOrderId,
        reservationId,
        grain,
        options,
      ),
    listByReservationOrder: (
      reservationOrderId: string,
      grain: Datagrain,
      options?: ReservationsSummariesListByReservationOrderOptionalParams,
    ) => listByReservationOrder(context, reservationOrderId, grain, options),
  };
}

export function _getReservationsSummariesOperations(
  context: ConsumptionManagementContext,
): ReservationsSummariesOperations {
  return {
    ..._getReservationsSummaries(context),
  };
}
