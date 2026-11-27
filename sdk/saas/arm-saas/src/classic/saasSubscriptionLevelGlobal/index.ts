// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext } from "../../api/saaSContext.js";
import {
  validatePurchaseBySubscription,
  validatePurchase,
  checkNameAvailability,
  listByAzureSubscription,
} from "../../api/saasSubscriptionLevelGlobal/operations.js";
import type {
  SaasSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  SaasSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  SaasSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  SaasSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
} from "../../api/saasSubscriptionLevelGlobal/options.js";
import type {
  SaasResource,
  ResourceValidationResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  SaasPurchaseValidationRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SaasSubscriptionLevelGlobal operations. */
export interface SaasSubscriptionLevelGlobalOperations {
  /** Validates a proposed SaaS purchase at subscription scope before a resource group is selected. */
  validatePurchaseBySubscription: (
    body: SaasPurchaseValidationRequest,
    options?: SaasSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  ) => Promise<ResourceValidationResult>;
  /** Validates a proposed SaaS purchase within a resource group without creating the resource. */
  validatePurchase: (
    resourceGroupName: string,
    body: SaasPurchaseValidationRequest,
    options?: SaasSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  ) => Promise<ResourceValidationResult>;
  /** Checks whether a proposed SaaS resource name is available. */
  checkNameAvailability: (
    body: CheckNameAvailabilityRequest,
    options?: SaasSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Lists all SaaS resources within an Azure subscription. */
  listByAzureSubscription: (
    options?: SaasSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SaasResource>;
}

function _getSaasSubscriptionLevelGlobal(context: SaaSContext) {
  return {
    validatePurchaseBySubscription: (
      body: SaasPurchaseValidationRequest,
      options?: SaasSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
    ) => validatePurchaseBySubscription(context, body, options),
    validatePurchase: (
      resourceGroupName: string,
      body: SaasPurchaseValidationRequest,
      options?: SaasSubscriptionLevelGlobalValidatePurchaseOptionalParams,
    ) => validatePurchase(context, resourceGroupName, body, options),
    checkNameAvailability: (
      body: CheckNameAvailabilityRequest,
      options?: SaasSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, body, options),
    listByAzureSubscription: (
      options?: SaasSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
    ) => listByAzureSubscription(context, options),
  };
}

export function _getSaasSubscriptionLevelGlobalOperations(
  context: SaaSContext,
): SaasSubscriptionLevelGlobalOperations {
  return {
    ..._getSaasSubscriptionLevelGlobal(context),
  };
}
