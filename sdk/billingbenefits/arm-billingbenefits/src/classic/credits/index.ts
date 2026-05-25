// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import {
  listApplicable,
  cancel,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/credits/operations.js";
import {
  CreditsListApplicableOptionalParams,
  CreditsCancelOptionalParams,
  CreditsListBySubscriptionOptionalParams,
  CreditsListByResourceGroupOptionalParams,
  CreditsDeleteOptionalParams,
  CreditsUpdateOptionalParams,
  CreditsCreateOptionalParams,
  CreditsGetOptionalParams,
} from "../../api/credits/options.js";
import { Credit, CreditPatchRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Credits operations. */
export interface CreditsOperations {
  /** List applicable credits for the provided scope. Currently supported scopes: BillingAccountResourceId */
  listApplicable: (
    scope: string,
    options?: CreditsListApplicableOptionalParams,
  ) => PagedAsyncIterableIterator<Credit>;
  /** Cancels a credit. */
  cancel: (
    resourceGroupName: string,
    creditName: string,
    options?: CreditsCancelOptionalParams,
  ) => PollerLike<OperationState<Credit>, Credit>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    creditName: string,
    options?: CreditsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Credit>, Credit>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    creditName: string,
    options?: CreditsCancelOptionalParams,
  ) => Promise<Credit>;
  /** List credits under a subscription from primary service tenant. */
  listBySubscription: (
    options?: CreditsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Credit>;
  /** List Credits under a resource group from primary service admin. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CreditsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Credit>;
  /** Delete a credit. */
  delete: (
    resourceGroupName: string,
    creditName: string,
    options?: CreditsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    creditName: string,
    options?: CreditsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    creditName: string,
    options?: CreditsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a credit. */
  update: (
    resourceGroupName: string,
    creditName: string,
    body: CreditPatchRequest,
    options?: CreditsUpdateOptionalParams,
  ) => PollerLike<OperationState<Credit>, Credit>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    creditName: string,
    body: CreditPatchRequest,
    options?: CreditsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Credit>, Credit>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    creditName: string,
    body: CreditPatchRequest,
    options?: CreditsUpdateOptionalParams,
  ) => Promise<Credit>;
  /** Create a credit. */
  create: (
    resourceGroupName: string,
    creditName: string,
    body: Credit,
    options?: CreditsCreateOptionalParams,
  ) => PollerLike<OperationState<Credit>, Credit>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    creditName: string,
    body: Credit,
    options?: CreditsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Credit>, Credit>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    creditName: string,
    body: Credit,
    options?: CreditsCreateOptionalParams,
  ) => Promise<Credit>;
  /** Get a credit. */
  get: (
    resourceGroupName: string,
    creditName: string,
    options?: CreditsGetOptionalParams,
  ) => Promise<Credit>;
}

function _getCredits(context: BillingBenefitsRPContext) {
  return {
    listApplicable: (scope: string, options?: CreditsListApplicableOptionalParams) =>
      listApplicable(context, scope, options),
    cancel: (
      resourceGroupName: string,
      creditName: string,
      options?: CreditsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, creditName, options),
    beginCancel: async (
      resourceGroupName: string,
      creditName: string,
      options?: CreditsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, creditName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      creditName: string,
      options?: CreditsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, creditName, options);
    },
    listBySubscription: (options?: CreditsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CreditsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      creditName: string,
      options?: CreditsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, creditName, options),
    beginDelete: async (
      resourceGroupName: string,
      creditName: string,
      options?: CreditsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, creditName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      creditName: string,
      options?: CreditsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, creditName, options);
    },
    update: (
      resourceGroupName: string,
      creditName: string,
      body: CreditPatchRequest,
      options?: CreditsUpdateOptionalParams,
    ) => update(context, resourceGroupName, creditName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      creditName: string,
      body: CreditPatchRequest,
      options?: CreditsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, creditName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      creditName: string,
      body: CreditPatchRequest,
      options?: CreditsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, creditName, body, options);
    },
    create: (
      resourceGroupName: string,
      creditName: string,
      body: Credit,
      options?: CreditsCreateOptionalParams,
    ) => create(context, resourceGroupName, creditName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      creditName: string,
      body: Credit,
      options?: CreditsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, creditName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      creditName: string,
      body: Credit,
      options?: CreditsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, creditName, body, options);
    },
    get: (resourceGroupName: string, creditName: string, options?: CreditsGetOptionalParams) =>
      get(context, resourceGroupName, creditName, options),
  };
}

export function _getCreditsOperations(context: BillingBenefitsRPContext): CreditsOperations {
  return {
    ..._getCredits(context),
  };
}
