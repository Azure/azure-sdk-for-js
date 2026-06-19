// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext } from "../../api/consumptionManagementContext.js";
import { get } from "../../api/credits/operations.js";
import type { CreditsGetOptionalParams } from "../../api/credits/options.js";
import type { CreditSummary } from "../../models/models.js";

/** Interface representing a Credits operations. */
export interface CreditsOperations {
  /** The credit summary by billingAccountId and billingProfileId. */
  get: (
    billingAccountId: string,
    billingProfileId: string,
    options?: CreditsGetOptionalParams,
  ) => Promise<CreditSummary | undefined>;
}

function _getCredits(context: ConsumptionManagementContext) {
  return {
    get: (billingAccountId: string, billingProfileId: string, options?: CreditsGetOptionalParams) =>
      get(context, billingAccountId, billingProfileId, options),
  };
}

export function _getCreditsOperations(context: ConsumptionManagementContext): CreditsOperations {
  return {
    ..._getCredits(context),
  };
}
