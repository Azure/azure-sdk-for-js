// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  validateUpdateByBillingAccount,
  listBySavingsPlanOrder,
  updateByBillingAccount,
  getByBillingAccount,
  listByBillingAccount,
} from "../../api/savingsPlans/operations.js";
import type {
  SavingsPlansValidateUpdateByBillingAccountOptionalParams,
  SavingsPlansListBySavingsPlanOrderOptionalParams,
  SavingsPlansUpdateByBillingAccountOptionalParams,
  SavingsPlansGetByBillingAccountOptionalParams,
  SavingsPlansListByBillingAccountOptionalParams,
} from "../../api/savingsPlans/options.js";
import type {
  SavingsPlanModel,
  SavingsPlanUpdateRequest,
  SavingsPlanUpdateValidateRequest,
  SavingsPlanValidateResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SavingsPlans operations. */
export interface SavingsPlansOperations {
  /** Validate savings plan patch by billing account. */
  validateUpdateByBillingAccount: (
    billingAccountName: string,
    savingsPlanOrderId: string,
    savingsPlanId: string,
    body: SavingsPlanUpdateValidateRequest,
    options?: SavingsPlansValidateUpdateByBillingAccountOptionalParams,
  ) => Promise<SavingsPlanValidateResponse>;
  /** List savings plans in an order by billing account. */
  listBySavingsPlanOrder: (
    billingAccountName: string,
    savingsPlanOrderId: string,
    options?: SavingsPlansListBySavingsPlanOrderOptionalParams,
  ) => PagedAsyncIterableIterator<SavingsPlanModel>;
  /** Update savings plan by billing account. */
  updateByBillingAccount: (
    billingAccountName: string,
    savingsPlanOrderId: string,
    savingsPlanId: string,
    body: SavingsPlanUpdateRequest,
    options?: SavingsPlansUpdateByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<SavingsPlanModel>, SavingsPlanModel>;
  /** @deprecated use updateByBillingAccount instead */
  beginUpdateByBillingAccount: (
    billingAccountName: string,
    savingsPlanOrderId: string,
    savingsPlanId: string,
    body: SavingsPlanUpdateRequest,
    options?: SavingsPlansUpdateByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SavingsPlanModel>, SavingsPlanModel>>;
  /** @deprecated use updateByBillingAccount instead */
  beginUpdateByBillingAccountAndWait: (
    billingAccountName: string,
    savingsPlanOrderId: string,
    savingsPlanId: string,
    body: SavingsPlanUpdateRequest,
    options?: SavingsPlansUpdateByBillingAccountOptionalParams,
  ) => Promise<SavingsPlanModel>;
  /** Get savings plan by billing account. */
  getByBillingAccount: (
    billingAccountName: string,
    savingsPlanOrderId: string,
    savingsPlanId: string,
    options?: SavingsPlansGetByBillingAccountOptionalParams,
  ) => Promise<SavingsPlanModel>;
  /** List savings plans by billing account. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: SavingsPlansListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<SavingsPlanModel>;
}

function _getSavingsPlans(context: BillingManagementContext) {
  return {
    validateUpdateByBillingAccount: (
      billingAccountName: string,
      savingsPlanOrderId: string,
      savingsPlanId: string,
      body: SavingsPlanUpdateValidateRequest,
      options?: SavingsPlansValidateUpdateByBillingAccountOptionalParams,
    ) =>
      validateUpdateByBillingAccount(
        context,
        billingAccountName,
        savingsPlanOrderId,
        savingsPlanId,
        body,
        options,
      ),
    listBySavingsPlanOrder: (
      billingAccountName: string,
      savingsPlanOrderId: string,
      options?: SavingsPlansListBySavingsPlanOrderOptionalParams,
    ) => listBySavingsPlanOrder(context, billingAccountName, savingsPlanOrderId, options),
    updateByBillingAccount: (
      billingAccountName: string,
      savingsPlanOrderId: string,
      savingsPlanId: string,
      body: SavingsPlanUpdateRequest,
      options?: SavingsPlansUpdateByBillingAccountOptionalParams,
    ) =>
      updateByBillingAccount(
        context,
        billingAccountName,
        savingsPlanOrderId,
        savingsPlanId,
        body,
        options,
      ),
    beginUpdateByBillingAccount: async (
      billingAccountName: string,
      savingsPlanOrderId: string,
      savingsPlanId: string,
      body: SavingsPlanUpdateRequest,
      options?: SavingsPlansUpdateByBillingAccountOptionalParams,
    ) => {
      const poller = updateByBillingAccount(
        context,
        billingAccountName,
        savingsPlanOrderId,
        savingsPlanId,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateByBillingAccountAndWait: async (
      billingAccountName: string,
      savingsPlanOrderId: string,
      savingsPlanId: string,
      body: SavingsPlanUpdateRequest,
      options?: SavingsPlansUpdateByBillingAccountOptionalParams,
    ) => {
      return await updateByBillingAccount(
        context,
        billingAccountName,
        savingsPlanOrderId,
        savingsPlanId,
        body,
        options,
      );
    },
    getByBillingAccount: (
      billingAccountName: string,
      savingsPlanOrderId: string,
      savingsPlanId: string,
      options?: SavingsPlansGetByBillingAccountOptionalParams,
    ) =>
      getByBillingAccount(context, billingAccountName, savingsPlanOrderId, savingsPlanId, options),
    listByBillingAccount: (
      billingAccountName: string,
      options?: SavingsPlansListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
  };
}

export function _getSavingsPlansOperations(
  context: BillingManagementContext,
): SavingsPlansOperations {
  return {
    ..._getSavingsPlans(context),
  };
}
