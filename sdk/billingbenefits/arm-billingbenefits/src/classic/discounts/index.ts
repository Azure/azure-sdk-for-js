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
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    discountName: string,
    options?: DiscountsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Discount>, Discount>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    discountName: string,
    options?: DiscountsCancelOptionalParams,
  ) => Promise<Discount>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    discountName: string,
    options?: DiscountsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    discountName: string,
    options?: DiscountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create discount. */
  create: (
    resourceGroupName: string,
    discountName: string,
    body: Discount,
    options?: DiscountsCreateOptionalParams,
  ) => PollerLike<OperationState<Discount>, Discount>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    discountName: string,
    body: Discount,
    options?: DiscountsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Discount>, Discount>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    discountName: string,
    body: Discount,
    options?: DiscountsCreateOptionalParams,
  ) => Promise<Discount>;
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
    beginCancel: async (
      resourceGroupName: string,
      discountName: string,
      options?: DiscountsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, discountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      discountName: string,
      options?: DiscountsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, discountName, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      discountName: string,
      options?: DiscountsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, discountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      discountName: string,
      options?: DiscountsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, discountName, options);
    },
    create: (
      resourceGroupName: string,
      discountName: string,
      body: Discount,
      options?: DiscountsCreateOptionalParams,
    ) => create(context, resourceGroupName, discountName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      discountName: string,
      body: Discount,
      options?: DiscountsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, discountName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      discountName: string,
      body: Discount,
      options?: DiscountsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, discountName, body, options);
    },
  };
}

export function _getDiscountsOperations(context: BillingBenefitsRPContext): DiscountsOperations {
  return {
    ..._getDiscounts(context),
  };
}
