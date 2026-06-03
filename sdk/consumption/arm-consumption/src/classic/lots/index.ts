// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  listByCustomer,
  listByBillingAccount,
  listByBillingProfile,
} from "../../api/lots/operations.js";
import type {
  LotsListByCustomerOptionalParams,
  LotsListByBillingAccountOptionalParams,
  LotsListByBillingProfileOptionalParams,
} from "../../api/lots/options.js";
import type { LotSummary } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Lots operations. */
export interface LotsOperations {
  /** Lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts. */
  listByCustomer: (
    billingAccountId: string,
    customerId: string,
    options?: LotsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<LotSummary>;
  /** Lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts. */
  listByBillingAccount: (
    billingAccountId: string,
    options?: LotsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<LotSummary>;
  /** Lists all Azure credits for a billing account or a billing profile. The API is only supported for Microsoft Customer Agreements (MCA) billing accounts. */
  listByBillingProfile: (
    billingAccountId: string,
    billingProfileId: string,
    options?: LotsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<LotSummary>;
}

function _getLots(context: ConsumptionManagementContext) {
  return {
    listByCustomer: (
      billingAccountId: string,
      customerId: string,
      options?: LotsListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountId, customerId, options),
    listByBillingAccount: (
      billingAccountId: string,
      options?: LotsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountId, options),
    listByBillingProfile: (
      billingAccountId: string,
      billingProfileId: string,
      options?: LotsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountId, billingProfileId, options),
  };
}

export function _getLotsOperations(context: ConsumptionManagementContext): LotsOperations {
  return {
    ..._getLots(context),
  };
}
