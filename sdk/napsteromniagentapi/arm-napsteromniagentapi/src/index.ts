// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CompanionAPIClient } from "./companionAPIClient.js";
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
  OrganizationResource,
  OrganizationProperties,
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  OfferDetails,
  UserDetails,
  ResourceProvisioningState,
  PartnerProperties,
  SingleSignOnPropertiesV2,
  SingleSignOnType,
  SingleSignOnStates,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  OrganizationResourceUpdate,
  SaaSData,
  LatestLinkedSaaSResponse,
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
  ProxyResource,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownMarketplaceSubscriptionStatus,
  KnownResourceProvisioningState,
  KnownSingleSignOnType,
  KnownSingleSignOnStates,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { CompanionAPIClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OrganizationsLatestLinkedSaaSOptionalParams,
  OrganizationsLinkSaaSOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./api/organizations/index.js";
export type { SaaSOperationGroupActivateResourceOptionalParams } from "./api/saaSOperationGroup/index.js";
export type {
  OperationsOperations,
  OrganizationsOperations,
  SaaSOperationGroupOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
