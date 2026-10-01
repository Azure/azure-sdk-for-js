// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import {
  scopeList,
  cancel,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/conditionalCredits/operations.js";
import {
  ConditionalCreditsScopeListOptionalParams,
  ConditionalCreditsCancelOptionalParams,
  ConditionalCreditsListBySubscriptionOptionalParams,
  ConditionalCreditsListByResourceGroupOptionalParams,
  ConditionalCreditsDeleteOptionalParams,
  ConditionalCreditsUpdateOptionalParams,
  ConditionalCreditsCreateOrUpdateOptionalParams,
  ConditionalCreditsGetOptionalParams,
} from "../../api/conditionalCredits/options.js";
import { ConditionalCredit, ConditionalCreditPatchRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ConditionalCredits operations. */
export interface ConditionalCreditsOperations {
  /** List conditional credits that are applicable for a given scope. Currently supported scopes: billing accounts */
  scopeList: (
    scope: string,
    options?: ConditionalCreditsScopeListOptionalParams,
  ) => PagedAsyncIterableIterator<ConditionalCredit>;
  /** Cancel conditional credit. Stops applying the benefit. */
  cancel: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditsCancelOptionalParams,
  ) => PollerLike<OperationState<ConditionalCredit>, ConditionalCredit>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConditionalCredit>, ConditionalCredit>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditsCancelOptionalParams,
  ) => Promise<ConditionalCredit>;
  /** List conditional credits by subscription. */
  listBySubscription: (
    options?: ConditionalCreditsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ConditionalCredit>;
  /** List conditional credits by resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ConditionalCreditsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ConditionalCredit>;
  /** Delete a conditional credit. */
  delete: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a conditional credit. */
  update: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCreditPatchRequest,
    options?: ConditionalCreditsUpdateOptionalParams,
  ) => PollerLike<OperationState<ConditionalCredit>, ConditionalCredit>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCreditPatchRequest,
    options?: ConditionalCreditsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConditionalCredit>, ConditionalCredit>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCreditPatchRequest,
    options?: ConditionalCreditsUpdateOptionalParams,
  ) => Promise<ConditionalCredit>;
  /** Create or update a conditional credit. */
  createOrUpdate: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCredit,
    options?: ConditionalCreditsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConditionalCredit>, ConditionalCredit>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCredit,
    options?: ConditionalCreditsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ConditionalCredit>, ConditionalCredit>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCredit,
    options?: ConditionalCreditsCreateOrUpdateOptionalParams,
  ) => Promise<ConditionalCredit>;
  /** Get a conditional credit. */
  get: (
    resourceGroupName: string,
    conditionalCreditName: string,
    options?: ConditionalCreditsGetOptionalParams,
  ) => Promise<ConditionalCredit>;
}

function _getConditionalCredits(context: BillingBenefitsRPContext) {
  return {
    scopeList: (scope: string, options?: ConditionalCreditsScopeListOptionalParams) =>
      scopeList(context, scope, options),
    cancel: (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, conditionalCreditName, options),
    beginCancel: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, conditionalCreditName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, conditionalCreditName, options);
    },
    listBySubscription: (options?: ConditionalCreditsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ConditionalCreditsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, conditionalCreditName, options),
    beginDelete: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, conditionalCreditName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, conditionalCreditName, options);
    },
    update: (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCreditPatchRequest,
      options?: ConditionalCreditsUpdateOptionalParams,
    ) => update(context, resourceGroupName, conditionalCreditName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCreditPatchRequest,
      options?: ConditionalCreditsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, conditionalCreditName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCreditPatchRequest,
      options?: ConditionalCreditsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, conditionalCreditName, body, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCredit,
      options?: ConditionalCreditsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, conditionalCreditName, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCredit,
      options?: ConditionalCreditsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        conditionalCreditName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCredit,
      options?: ConditionalCreditsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, conditionalCreditName, body, options);
    },
    get: (
      resourceGroupName: string,
      conditionalCreditName: string,
      options?: ConditionalCreditsGetOptionalParams,
    ) => get(context, resourceGroupName, conditionalCreditName, options),
  };
}

export function _getConditionalCreditsOperations(
  context: BillingBenefitsRPContext,
): ConditionalCreditsOperations {
  return {
    ..._getConditionalCredits(context),
  };
}
