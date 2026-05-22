// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import {
  scopeList,
  cancel,
  subscriptionList,
  resourceGroupList,
  $delete,
  create,
} from "../../api/discounts/operations.js";
import {
  DiscountsScopeListOptionalParams,
  DiscountsCancelOptionalParams,
  DiscountsSubscriptionListOptionalParams,
  DiscountsResourceGroupListOptionalParams,
  DiscountsDeleteOptionalParams,
  DiscountsCreateOptionalParams,
} from "../../api/discounts/options.js";
import { Discount } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Discounts operations. */
export interface DiscountsOperations {
  /** List discounts that are applicable for a given scope. Currently supported scopes: billing accounts */
  scopeList: (
    scope: string,
    options?: DiscountsScopeListOptionalParams,
  ) => PagedAsyncIterableIterator<Discount>;
  /** Cancel discount. Stops applying the benefit. */
  cancel: (
    resourceGroupName: string,
    discountName: string,
    options?: DiscountsCancelOptionalParams,
  ) => PollerLike<OperationState<Discount>, Discount>;
  /** List discounts at subscription level */
  subscriptionList: (
    options?: DiscountsSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<Discount>;
  /** List discounts at resource group level */
  resourceGroupList: (
    resourceGroupName: string,
    options?: DiscountsResourceGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<Discount>;
  /** Delete discount. Clears the metadata from the user's view. */
  delete: (
    resourceGroupName: string,
    discountName: string,
    options?: DiscountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create discount. */
  create: (
    resourceGroupName: string,
    discountName: string,
    body: Discount,
    options?: DiscountsCreateOptionalParams,
  ) => PollerLike<OperationState<Discount>, Discount>;
}

function _getDiscounts(context: BillingBenefitsRPContext) {
  return {
    scopeList: (scope: string, options?: DiscountsScopeListOptionalParams) =>
      scopeList(context, scope, options),
    cancel: (
      resourceGroupName: string,
      discountName: string,
      options?: DiscountsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, discountName, options),
    subscriptionList: (options?: DiscountsSubscriptionListOptionalParams) =>
      subscriptionList(context, options),
    resourceGroupList: (
      resourceGroupName: string,
      options?: DiscountsResourceGroupListOptionalParams,
    ) => resourceGroupList(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      discountName: string,
      options?: DiscountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, discountName, options),
    create: (
      resourceGroupName: string,
      discountName: string,
      body: Discount,
      options?: DiscountsCreateOptionalParams,
    ) => create(context, resourceGroupName, discountName, body, options),
  };
}

export function _getDiscountsOperations(context: BillingBenefitsRPContext): DiscountsOperations {
  return {
    ..._getDiscounts(context),
  };
}
