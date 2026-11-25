// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfessionalServiceContext } from "../../api/professionalServiceContext.js";
import {
  validatePurchaseBySubscription,
  validatePurchase,
  checkNameAvailability,
  listByAzureSubscription,
} from "../../api/professionalServiceSubscriptionLevelGlobal/operations.js";
import type {
  ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
} from "../../api/professionalServiceSubscriptionLevelGlobal/options.js";
import type {
  ProfessionalServiceResource,
  ResourceValidationResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  ProfessionalServicePurchaseValidationRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProfessionalServiceSubscriptionLevelGlobal operations. */
export interface ProfessionalServiceSubscriptionLevelGlobalOperations {
  /** Validates a proposed Professional Service purchase at subscription scope before a resource group is selected. */
  validatePurchaseBySubscription: (
    body: ProfessionalServicePurchaseValidationRequest,
    options?: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  ) => Promise<ResourceValidationResult>;
  /** Validates a proposed Professional Service purchase within a resource group without creating the resource. */
  validatePurchase: (
    resourceGroupName: string,
    body: ProfessionalServicePurchaseValidationRequest,
    options?: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  ) => Promise<ResourceValidationResult>;
  /** Checks whether a proposed Professional Service resource name is available. */
  checkNameAvailability: (
    body: CheckNameAvailabilityRequest,
    options?: ProfessionalServiceSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Lists all Professional Service resources within an Azure subscription. */
  listByAzureSubscription: (
    options?: ProfessionalServiceSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ProfessionalServiceResource>;
}

function _getProfessionalServiceSubscriptionLevelGlobal(context: ProfessionalServiceContext) {
  return {
    validatePurchaseBySubscription: (
      body: ProfessionalServicePurchaseValidationRequest,
      options?: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
    ) => validatePurchaseBySubscription(context, body, options),
    validatePurchase: (
      resourceGroupName: string,
      body: ProfessionalServicePurchaseValidationRequest,
      options?: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseOptionalParams,
    ) => validatePurchase(context, resourceGroupName, body, options),
    checkNameAvailability: (
      body: CheckNameAvailabilityRequest,
      options?: ProfessionalServiceSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, body, options),
    listByAzureSubscription: (
      options?: ProfessionalServiceSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
    ) => listByAzureSubscription(context, options),
  };
}

export function _getProfessionalServiceSubscriptionLevelGlobalOperations(
  context: ProfessionalServiceContext,
): ProfessionalServiceSubscriptionLevelGlobalOperations {
  return {
    ..._getProfessionalServiceSubscriptionLevelGlobal(context),
  };
}
