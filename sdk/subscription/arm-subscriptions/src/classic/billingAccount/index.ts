// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionContext } from "../../api/subscriptionContext.js";
import { getPolicy } from "../../api/billingAccount/operations.js";
import { BillingAccountGetPolicyOptionalParams } from "../../api/billingAccount/options.js";
import { BillingAccountPoliciesResponse } from "../../models/models.js";

/** Interface representing a BillingAccount operations. */
export interface BillingAccountOperations {
  /** Get Billing Account Policy. */
  getPolicy: (
    billingAccountId: string,
    options?: BillingAccountGetPolicyOptionalParams,
  ) => Promise<BillingAccountPoliciesResponse>;
}

function _getBillingAccount(context: SubscriptionContext) {
  return {
    getPolicy: (billingAccountId: string, options?: BillingAccountGetPolicyOptionalParams) =>
      getPolicy(context, billingAccountId, options),
  };
}

export function _getBillingAccountOperations(
  context: SubscriptionContext,
): BillingAccountOperations {
  return {
    ..._getBillingAccount(context),
  };
}
