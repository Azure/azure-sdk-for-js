// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { listByBillingProfile, list } from "../../api/reservationTransactions/operations.js";
import type {
  ReservationTransactionsListByBillingProfileOptionalParams,
  ReservationTransactionsListOptionalParams,
} from "../../api/reservationTransactions/options.js";
import type { ReservationTransaction, ModernReservationTransaction } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReservationTransactions operations. */
export interface ReservationTransactionsOperations {
  /** List of transactions for reserved instances on billing profile scope. The refund transactions are posted along with its purchase transaction (i.e. in the purchase billing month). For example, The refund is requested in May 2021. This refund transaction will have event date as May 2021 but the billing month as April 2020 when the reservation purchase was made. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
  listByBillingProfile: (
    billingAccountId: string,
    billingProfileId: string,
    options?: ReservationTransactionsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<ModernReservationTransaction>;
  /** List of transactions for reserved instances on billing account scope. Note: The refund transactions are posted along with its purchase transaction (i.e. in the purchase billing month). For example, The refund is requested in May 2021. This refund transaction will have event date as May 2021 but the billing month as April 2020 when the reservation purchase was made. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
  list: (
    billingAccountId: string,
    options?: ReservationTransactionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationTransaction>;
}

function _getReservationTransactions(context: ConsumptionManagementContext) {
  return {
    listByBillingProfile: (
      billingAccountId: string,
      billingProfileId: string,
      options?: ReservationTransactionsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountId, billingProfileId, options),
    list: (billingAccountId: string, options?: ReservationTransactionsListOptionalParams) =>
      list(context, billingAccountId, options),
  };
}

export function _getReservationTransactionsOperations(
  context: ConsumptionManagementContext,
): ReservationTransactionsOperations {
  return {
    ..._getReservationTransactions(context),
  };
}
