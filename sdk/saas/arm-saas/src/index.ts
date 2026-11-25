// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SaaSClient } from "./saaSClient.js";
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
  SaasResource,
  SaasResourceProperties,
  SaasProvisioningState,
  SaasResourceStatus,
  SubscriptionStatusReason,
  PatchIntent,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  SaasResourceUpdate,
  SaasResourceUpdateProperties,
  AccessTokenResult,
  UnsubscribeOptions,
  DeletionSource,
  ResourceValidationResult,
  ResourceValidationError,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
  SaasPurchaseValidationRequest,
  SaasPurchaseValidationProperties,
  SaasTenantResource,
  ProxyResource,
  SaasTenantResourceUpdate,
  SaasTenantResourceUpdateProperties,
  OperationStatusResult,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownSaasProvisioningState,
  KnownSaasResourceStatus,
  KnownSubscriptionStatusReason,
  KnownPatchIntent,
  KnownCreatedByType,
  KnownDeletionSource,
  KnownCheckNameAvailabilityReason,
  KnownVersions,
} from "./models/index.js";
export type { SaaSClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SaasOperationStatusesGetSubscriptionOperationStatusOptionalParams,
  SaasOperationStatusesGetTenantOperationStatusOptionalParams,
} from "./api/saasOperationStatuses/index.js";
export type {
  SaasSubscriptionLevelValidateUpdateOptionalParams,
  SaasSubscriptionLevelUnsubscribeOptionalParams,
  SaasSubscriptionLevelListAccessTokenOptionalParams,
  SaasSubscriptionLevelListByResourceGroupOptionalParams,
  SaasSubscriptionLevelDeleteOptionalParams,
  SaasSubscriptionLevelUpdateOptionalParams,
  SaasSubscriptionLevelCreateOrUpdateOptionalParams,
  SaasSubscriptionLevelGetOptionalParams,
} from "./api/saasSubscriptionLevel/index.js";
export type {
  SaasSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  SaasSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  SaasSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  SaasSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
} from "./api/saasSubscriptionLevelGlobal/index.js";
export type {
  SaasTenantLevelListAccessTokenOptionalParams,
  SaasTenantLevelListOptionalParams,
  SaasTenantLevelDeleteResourceOptionalParams,
  SaasTenantLevelUpdateResourceOptionalParams,
  SaasTenantLevelGetResourceOptionalParams,
} from "./api/saasTenantLevel/index.js";
export type {
  OperationsOperations,
  SaasOperationStatusesOperations,
  SaasSubscriptionLevelOperations,
  SaasSubscriptionLevelGlobalOperations,
  SaasTenantLevelOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
