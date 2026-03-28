// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  getByBillingProfile,
  getByBillingAccount,
} from "../../api/availableBalances/operations.js";
import type {
  AvailableBalancesGetByBillingProfileOptionalParams,
  AvailableBalancesGetByBillingAccountOptionalParams,
} from "../../api/availableBalances/options.js";
import type { AvailableBalance } from "../../models/models.js";

/** Interface representing a AvailableBalances operations. */
export interface AvailableBalancesOperations {
  /** The Available Credit or Payment on Account Balance for a billing profile. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  getByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: AvailableBalancesGetByBillingProfileOptionalParams,
  ) => Promise<AvailableBalance>;
  /** The Available Credit or Payment on Account Balance for a billing account. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Online Services Program. */
  getByBillingAccount: (
    billingAccountName: string,
    options?: AvailableBalancesGetByBillingAccountOptionalParams,
  ) => Promise<AvailableBalance>;
}

function _getAvailableBalances(context: BillingManagementContext) {
  return {
    getByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: AvailableBalancesGetByBillingProfileOptionalParams,
    ) => getByBillingProfile(context, billingAccountName, billingProfileName, options),
    getByBillingAccount: (
      billingAccountName: string,
      options?: AvailableBalancesGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, options),
  };
}

export function _getAvailableBalancesOperations(
  context: BillingManagementContext,
): AvailableBalancesOperations {
  return {
    ..._getAvailableBalances(context),
  };
}
