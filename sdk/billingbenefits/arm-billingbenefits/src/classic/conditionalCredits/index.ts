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
  /** Update a conditional credit. */
  update: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCreditPatchRequest,
    options?: ConditionalCreditsUpdateOptionalParams,
  ) => PollerLike<OperationState<ConditionalCredit>, ConditionalCredit>;
  /** Create or update a conditional credit. */
  createOrUpdate: (
    resourceGroupName: string,
    conditionalCreditName: string,
    body: ConditionalCredit,
    options?: ConditionalCreditsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ConditionalCredit>, ConditionalCredit>;
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
    update: (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCreditPatchRequest,
      options?: ConditionalCreditsUpdateOptionalParams,
    ) => update(context, resourceGroupName, conditionalCreditName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      conditionalCreditName: string,
      body: ConditionalCredit,
      options?: ConditionalCreditsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, conditionalCreditName, body, options),
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
