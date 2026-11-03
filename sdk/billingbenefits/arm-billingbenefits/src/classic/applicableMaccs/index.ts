// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { list } from "../../api/applicableMaccs/operations.js";
import { ApplicableMaccsListOptionalParams } from "../../api/applicableMaccs/options.js";
import { ApplicableMacc } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApplicableMaccs operations. */
export interface ApplicableMaccsOperations {
  /** List maccs that are applicable for a given billing account. */
  list: (
    billingAccountId: string,
    options?: ApplicableMaccsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicableMacc>;
}

function _getApplicableMaccs(context: BillingBenefitsRPContext) {
  return {
    list: (billingAccountId: string, options?: ApplicableMaccsListOptionalParams) =>
      list(context, billingAccountId, options),
  };
}

export function _getApplicableMaccsOperations(
  context: BillingBenefitsRPContext,
): ApplicableMaccsOperations {
  return {
    ..._getApplicableMaccs(context),
  };
}
