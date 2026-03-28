// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import { update, get } from "../../api/billingProperty/operations.js";
import type {
  BillingPropertyUpdateOptionalParams,
  BillingPropertyGetOptionalParams,
} from "../../api/billingProperty/options.js";
import type { BillingProperty } from "../../models/models.js";

/** Interface representing a BillingProperty operations. */
export interface BillingPropertyOperations {
  /** Updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program. */
  update: (
    parameters: BillingProperty,
    options?: BillingPropertyUpdateOptionalParams,
  ) => Promise<BillingProperty>;
  /** Gets the billing properties for a subscription */
  get: (options?: BillingPropertyGetOptionalParams) => Promise<BillingProperty>;
}

function _getBillingProperty(context: BillingManagementContext) {
  return {
    update: (parameters: BillingProperty, options?: BillingPropertyUpdateOptionalParams) =>
      update(context, parameters, options),
    get: (options?: BillingPropertyGetOptionalParams) => get(context, options),
  };
}

export function _getBillingPropertyOperations(
  context: BillingManagementContext,
): BillingPropertyOperations {
  return {
    ..._getBillingProperty(context),
  };
}
