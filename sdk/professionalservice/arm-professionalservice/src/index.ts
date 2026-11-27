// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ProfessionalServiceClient } from "./professionalServiceClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ProfessionalServiceResource,
  ProfessionalServiceResourceProperties,
  ProfessionalServiceProvisioningState,
  ProfessionalServiceResourceStatus,
  SubscriptionStatusReason,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ProfessionalServiceResourceUpdate,
  ProfessionalServiceResourceUpdateProperties,
  UnsubscribeOptions,
  DeletionSource,
  ResourceValidationResult,
  ResourceValidationError,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
  ProfessionalServicePurchaseValidationRequest,
  ProfessionalServicePurchaseValidationProperties,
  OperationStatusResult,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProfessionalServiceProvisioningState,
  KnownProfessionalServiceResourceStatus,
  KnownSubscriptionStatusReason,
  KnownCreatedByType,
  KnownDeletionSource,
  KnownCheckNameAvailabilityReason,
  KnownVersions,
} from "./models/index.js";
export type { ProfessionalServiceClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { ProfessionalServiceOperationStatusesGetSubscriptionOperationStatusOptionalParams } from "./api/professionalServiceOperationStatuses/index.js";
export type {
  ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams,
  ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams,
  ProfessionalServiceSubscriptionLevelDeleteOptionalParams,
  ProfessionalServiceSubscriptionLevelUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelGetOptionalParams,
} from "./api/professionalServiceSubscriptionLevel/index.js";
export type {
  ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
} from "./api/professionalServiceSubscriptionLevelGlobal/index.js";
export type {
  OperationsOperations,
  ProfessionalServiceOperationStatusesOperations,
  ProfessionalServiceSubscriptionLevelOperations,
  ProfessionalServiceSubscriptionLevelGlobalOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
