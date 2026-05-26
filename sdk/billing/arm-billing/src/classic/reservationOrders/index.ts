// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByBillingAccount,
  getByBillingAccount,
} from "../../api/reservationOrders/operations.js";
import {
  ReservationOrdersListByBillingAccountOptionalParams,
  ReservationOrdersGetByBillingAccountOptionalParams,
} from "../../api/reservationOrders/options.js";
import { ReservationOrder } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReservationOrders operations. */
export interface ReservationOrdersOperations {
  /** List all the ReservationOrders in the billing account. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: ReservationOrdersListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationOrder>;
  /** Get the details of the ReservationOrder in the billing account. */
  getByBillingAccount: (
    billingAccountName: string,
    reservationOrderId: string,
    options?: ReservationOrdersGetByBillingAccountOptionalParams,
  ) => Promise<ReservationOrder>;
}

function _getReservationOrders(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: ReservationOrdersListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    getByBillingAccount: (
      billingAccountName: string,
      reservationOrderId: string,
      options?: ReservationOrdersGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, reservationOrderId, options),
  };
}

export function _getReservationOrdersOperations(
  context: BillingManagementContext,
): ReservationOrdersOperations {
  return {
    ..._getReservationOrders(context),
  };
}
