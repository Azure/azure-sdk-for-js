// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import {
  listBySavingsPlanId,
  listBySavingsPlanOrder,
  listByBillingProfileId,
  listByBillingAccountId,
} from "../../api/benefitUtilizationSummaries/operations.js";
import {
  BenefitUtilizationSummariesListBySavingsPlanIdOptionalParams,
  BenefitUtilizationSummariesListBySavingsPlanOrderOptionalParams,
  BenefitUtilizationSummariesListByBillingProfileIdOptionalParams,
  BenefitUtilizationSummariesListByBillingAccountIdOptionalParams,
} from "../../api/benefitUtilizationSummaries/options.js";
import { BenefitUtilizationSummaryUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BenefitUtilizationSummaries operations. */
export interface BenefitUtilizationSummariesOperations {
  /** Lists the savings plan utilization summaries for daily or monthly grain. */
  listBySavingsPlanId: (
    savingsPlanOrderId: string,
    savingsPlanId: string,
    options?: BenefitUtilizationSummariesListBySavingsPlanIdOptionalParams,
  ) => PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion>;
  /** Lists the savings plan utilization summaries for daily or monthly grain. */
  listBySavingsPlanOrder: (
    savingsPlanOrderId: string,
    options?: BenefitUtilizationSummariesListBySavingsPlanOrderOptionalParams,
  ) => PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion>;
  /** Lists savings plan utilization summaries for billing profile. Supported at grain values: 'Daily' and 'Monthly'. */
  listByBillingProfileId: (
    billingAccountId: string,
    billingProfileId: string,
    options?: BenefitUtilizationSummariesListByBillingProfileIdOptionalParams,
  ) => PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion>;
  /** Lists savings plan utilization summaries for the enterprise agreement scope. Supported at grain values: 'Daily' and 'Monthly'. */
  listByBillingAccountId: (
    billingAccountId: string,
    options?: BenefitUtilizationSummariesListByBillingAccountIdOptionalParams,
  ) => PagedAsyncIterableIterator<BenefitUtilizationSummaryUnion>;
}

function _getBenefitUtilizationSummaries(context: CostManagementContext) {
  return {
    listBySavingsPlanId: (
      savingsPlanOrderId: string,
      savingsPlanId: string,
      options?: BenefitUtilizationSummariesListBySavingsPlanIdOptionalParams,
    ) => listBySavingsPlanId(context, savingsPlanOrderId, savingsPlanId, options),
    listBySavingsPlanOrder: (
      savingsPlanOrderId: string,
      options?: BenefitUtilizationSummariesListBySavingsPlanOrderOptionalParams,
    ) => listBySavingsPlanOrder(context, savingsPlanOrderId, options),
    listByBillingProfileId: (
      billingAccountId: string,
      billingProfileId: string,
      options?: BenefitUtilizationSummariesListByBillingProfileIdOptionalParams,
    ) => listByBillingProfileId(context, billingAccountId, billingProfileId, options),
    listByBillingAccountId: (
      billingAccountId: string,
      options?: BenefitUtilizationSummariesListByBillingAccountIdOptionalParams,
    ) => listByBillingAccountId(context, billingAccountId, options),
  };
}

export function _getBenefitUtilizationSummariesOperations(
  context: CostManagementContext,
): BenefitUtilizationSummariesOperations {
  return {
    ..._getBenefitUtilizationSummaries(context),
  };
}
