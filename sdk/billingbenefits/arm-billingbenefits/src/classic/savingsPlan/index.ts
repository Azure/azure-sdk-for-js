// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { listAll, validateUpdate, list, update, get } from "../../api/savingsPlan/operations.js";
import {
  SavingsPlanListAllOptionalParams,
  SavingsPlanValidateUpdateOptionalParams,
  SavingsPlanListOptionalParams,
  SavingsPlanUpdateOptionalParams,
  SavingsPlanGetOptionalParams,
} from "../../api/savingsPlan/options.js";
import {
  SavingsPlanModel,
  SavingsPlanUpdateRequest,
  SavingsPlanUpdateValidateRequest,
  SavingsPlanValidateResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SavingsPlan operations. */
export interface SavingsPlanOperations {
  /** List savings plans. */
  listAll: (
    options?: SavingsPlanListAllOptionalParams,
  ) => PagedAsyncIterableIterator<SavingsPlanModel>;
  /** Validate savings plan patch. */
  validateUpdate: (
    savingsPlanOrderId: string,
    savingsPlanId: string,
    body: SavingsPlanUpdateValidateRequest,
    options?: SavingsPlanValidateUpdateOptionalParams,
  ) => Promise<SavingsPlanValidateResponse>;
  /** List savings plans in an order. */
  list: (
    savingsPlanOrderId: string,
    options?: SavingsPlanListOptionalParams,
  ) => PagedAsyncIterableIterator<SavingsPlanModel>;
  /** Update savings plan. */
  update: (
    savingsPlanOrderId: string,
    savingsPlanId: string,
    body: SavingsPlanUpdateRequest,
    options?: SavingsPlanUpdateOptionalParams,
  ) => PollerLike<OperationState<SavingsPlanModel>, SavingsPlanModel>;
  /** Get savings plan. */
  get: (
    savingsPlanOrderId: string,
    savingsPlanId: string,
    options?: SavingsPlanGetOptionalParams,
  ) => Promise<SavingsPlanModel>;
}

function _getSavingsPlan(context: BillingBenefitsRPContext) {
  return {
    listAll: (options?: SavingsPlanListAllOptionalParams) => listAll(context, options),
    validateUpdate: (
      savingsPlanOrderId: string,
      savingsPlanId: string,
      body: SavingsPlanUpdateValidateRequest,
      options?: SavingsPlanValidateUpdateOptionalParams,
    ) => validateUpdate(context, savingsPlanOrderId, savingsPlanId, body, options),
    list: (savingsPlanOrderId: string, options?: SavingsPlanListOptionalParams) =>
      list(context, savingsPlanOrderId, options),
    update: (
      savingsPlanOrderId: string,
      savingsPlanId: string,
      body: SavingsPlanUpdateRequest,
      options?: SavingsPlanUpdateOptionalParams,
    ) => update(context, savingsPlanOrderId, savingsPlanId, body, options),
    get: (
      savingsPlanOrderId: string,
      savingsPlanId: string,
      options?: SavingsPlanGetOptionalParams,
    ) => get(context, savingsPlanOrderId, savingsPlanId, options),
  };
}

export function _getSavingsPlanOperations(
  context: BillingBenefitsRPContext,
): SavingsPlanOperations {
  return {
    ..._getSavingsPlan(context),
  };
}
