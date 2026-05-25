// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { update, get } from "../../api/discount/operations.js";
import {
  DiscountUpdateOptionalParams,
  DiscountGetOptionalParams,
} from "../../api/discount/options.js";
import { Discount, DiscountPatchRequest } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Discount operations. */
export interface DiscountOperations {
  /** Update discounts */
  update: (
    resourceGroupName: string,
    discountName: string,
    body: DiscountPatchRequest,
    options?: DiscountUpdateOptionalParams,
  ) => PollerLike<OperationState<Discount>, Discount>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    discountName: string,
    body: DiscountPatchRequest,
    options?: DiscountUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Discount>, Discount>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    discountName: string,
    body: DiscountPatchRequest,
    options?: DiscountUpdateOptionalParams,
  ) => Promise<Discount>;
  /** Get discount at resource group level */
  get: (
    resourceGroupName: string,
    discountName: string,
    options?: DiscountGetOptionalParams,
  ) => Promise<Discount>;
}

function _getDiscount(context: BillingBenefitsRPContext) {
  return {
    update: (
      resourceGroupName: string,
      discountName: string,
      body: DiscountPatchRequest,
      options?: DiscountUpdateOptionalParams,
    ) => update(context, resourceGroupName, discountName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      discountName: string,
      body: DiscountPatchRequest,
      options?: DiscountUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, discountName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      discountName: string,
      body: DiscountPatchRequest,
      options?: DiscountUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, discountName, body, options);
    },
    get: (resourceGroupName: string, discountName: string, options?: DiscountGetOptionalParams) =>
      get(context, resourceGroupName, discountName, options),
  };
}

export function _getDiscountOperations(context: BillingBenefitsRPContext): DiscountOperations {
  return {
    ..._getDiscount(context),
  };
}
