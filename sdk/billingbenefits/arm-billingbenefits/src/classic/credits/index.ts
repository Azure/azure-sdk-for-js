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
  /** Update a credit. */
  update: (
    resourceGroupName: string,
    creditName: string,
    body: CreditPatchRequest,
    options?: CreditsUpdateOptionalParams,
  ) => PollerLike<OperationState<Credit>, Credit>;
  /** Create a credit. */
  create: (
    resourceGroupName: string,
    creditName: string,
    body: Credit,
    options?: CreditsCreateOptionalParams,
  ) => PollerLike<OperationState<Credit>, Credit>;
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
    update: (
      resourceGroupName: string,
      creditName: string,
      body: CreditPatchRequest,
      options?: CreditsUpdateOptionalParams,
    ) => update(context, resourceGroupName, creditName, body, options),
    create: (
      resourceGroupName: string,
      creditName: string,
      body: Credit,
      options?: CreditsCreateOptionalParams,
    ) => create(context, resourceGroupName, creditName, body, options),
    get: (resourceGroupName: string, creditName: string, options?: CreditsGetOptionalParams) =>
      get(context, resourceGroupName, creditName, options),
  };
}

export function _getCreditsOperations(context: BillingBenefitsRPContext): CreditsOperations {
  return {
    ..._getCredits(context),
  };
}
