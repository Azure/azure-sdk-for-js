// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { elevate, list, get } from "../../api/savingsPlanOrder/operations.js";
import {
  SavingsPlanOrderElevateOptionalParams,
  SavingsPlanOrderListOptionalParams,
  SavingsPlanOrderGetOptionalParams,
} from "../../api/savingsPlanOrder/options.js";
import { SavingsPlanOrderModel, RoleAssignmentEntity } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SavingsPlanOrder operations. */
export interface SavingsPlanOrderOperations {
  /** Elevate as owner on savings plan order based on billing permissions. */
  elevate: (
    savingsPlanOrderId: string,
    options?: SavingsPlanOrderElevateOptionalParams,
  ) => Promise<RoleAssignmentEntity>;
  /** List all Savings plan orders. */
  list: (
    options?: SavingsPlanOrderListOptionalParams,
  ) => PagedAsyncIterableIterator<SavingsPlanOrderModel>;
  /** Get a savings plan order. */
  get: (
    savingsPlanOrderId: string,
    options?: SavingsPlanOrderGetOptionalParams,
  ) => Promise<SavingsPlanOrderModel>;
}

function _getSavingsPlanOrder(context: BillingBenefitsRPContext) {
  return {
    elevate: (savingsPlanOrderId: string, options?: SavingsPlanOrderElevateOptionalParams) =>
      elevate(context, savingsPlanOrderId, options),
    list: (options?: SavingsPlanOrderListOptionalParams) => list(context, options),
    get: (savingsPlanOrderId: string, options?: SavingsPlanOrderGetOptionalParams) =>
      get(context, savingsPlanOrderId, options),
  };
}

export function _getSavingsPlanOrderOperations(
  context: BillingBenefitsRPContext,
): SavingsPlanOrderOperations {
  return {
    ..._getSavingsPlanOrder(context),
  };
}
