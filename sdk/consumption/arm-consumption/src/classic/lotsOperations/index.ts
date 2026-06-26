// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import {
  listByCustomer,
  listByBillingAccount,
  listByBillingProfile,
} from "../../api/lotsOperations/operations.js";
import {
  LotsOperationsListByCustomerOptionalParams,
  LotsOperationsListByBillingAccountOptionalParams,
  LotsOperationsListByBillingProfileOptionalParams,
} from "../../api/lotsOperations/options.js";
import { LotSummary } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LotsOperations operations. */
export interface LotsOperationsOperations {
  /** Lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts. */
  listByCustomer: (
    billingAccountId: string,
    customerId: string,
    options?: LotsOperationsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<LotSummary>;
  /** Lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts. */
  listByBillingAccount: (
    billingAccountId: string,
    options?: LotsOperationsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<LotSummary>;
  /** Lists all Azure credits for a billing account or a billing profile. The API is only supported for Microsoft Customer Agreements (MCA) billing accounts. */
  listByBillingProfile: (
    billingAccountId: string,
    billingProfileId: string,
    options?: LotsOperationsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<LotSummary>;
}

function _getLotsOperations(context: ConsumptionManagementContext) {
  return {
    listByCustomer: (
      billingAccountId: string,
      customerId: string,
      options?: LotsOperationsListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountId, customerId, options),
    listByBillingAccount: (
      billingAccountId: string,
      options?: LotsOperationsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountId, options),
    listByBillingProfile: (
      billingAccountId: string,
      billingProfileId: string,
      options?: LotsOperationsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountId, billingProfileId, options),
  };
}

export function _getLotsOperationsOperations(
  context: ConsumptionManagementContext,
): LotsOperationsOperations {
  return {
    ..._getLotsOperations(context),
  };
}
