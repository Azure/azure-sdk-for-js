// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByBillingAccount,
  getByBillingAccount,
} from "../../api/savingsPlanOrders/operations.js";
import type {
  SavingsPlanOrdersListByBillingAccountOptionalParams,
  SavingsPlanOrdersGetByBillingAccountOptionalParams,
} from "../../api/savingsPlanOrders/options.js";
import type { SavingsPlanOrderModel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SavingsPlanOrders operations. */
export interface SavingsPlanOrdersOperations {
  /** List all Savings plan orders by billing account. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: SavingsPlanOrdersListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<SavingsPlanOrderModel>;
  /** Get a savings plan order by billing account. */
  getByBillingAccount: (
    billingAccountName: string,
    savingsPlanOrderId: string,
    options?: SavingsPlanOrdersGetByBillingAccountOptionalParams,
  ) => Promise<SavingsPlanOrderModel>;
}

function _getSavingsPlanOrders(context: BillingManagementContext) {
  return {
    listByBillingAccount: (
      billingAccountName: string,
      options?: SavingsPlanOrdersListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    getByBillingAccount: (
      billingAccountName: string,
      savingsPlanOrderId: string,
      options?: SavingsPlanOrdersGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, savingsPlanOrderId, options),
  };
}

export function _getSavingsPlanOrdersOperations(
  context: BillingManagementContext,
): SavingsPlanOrdersOperations {
  return {
    ..._getSavingsPlanOrders(context),
  };
}
