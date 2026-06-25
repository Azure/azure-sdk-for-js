// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  getForBillingPeriodByBillingAccount,
  getByBillingAccount,
} from "../../api/balances/operations.js";
import {
  BalancesGetForBillingPeriodByBillingAccountOptionalParams,
  BalancesGetByBillingAccountOptionalParams,
} from "../../api/balances/options.js";
import { Balance } from "../../models/models.js";

/** Interface representing a Balances operations. */
export interface BalancesOperations {
  /** Gets the balances for a scope by billing period and billingAccountId. Balances are available via this API only for May 1, 2014 or later. */
  getForBillingPeriodByBillingAccount: (
    billingAccountId: string,
    billingPeriodName: string,
    options?: BalancesGetForBillingPeriodByBillingAccountOptionalParams,
  ) => Promise<Balance>;
  /** Gets the balances for a scope by billingAccountId. Balances are available via this API only for May 1, 2014 or later. */
  getByBillingAccount: (
    billingAccountId: string,
    options?: BalancesGetByBillingAccountOptionalParams,
  ) => Promise<Balance>;
}

function _getBalances(context: ConsumptionManagementContext) {
  return {
    getForBillingPeriodByBillingAccount: (
      billingAccountId: string,
      billingPeriodName: string,
      options?: BalancesGetForBillingPeriodByBillingAccountOptionalParams,
    ) => getForBillingPeriodByBillingAccount(context, billingAccountId, billingPeriodName, options),
    getByBillingAccount: (
      billingAccountId: string,
      options?: BalancesGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountId, options),
  };
}

export function _getBalancesOperations(context: ConsumptionManagementContext): BalancesOperations {
  return {
    ..._getBalances(context),
  };
}
