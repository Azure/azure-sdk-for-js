// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { VectorDbClient } from "./vectorDbClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type OrganizationResource,
  type OrganizationProperties,
  type MarketplaceDetails,
  KnownMarketplaceSubscriptionStatus,
  type MarketplaceSubscriptionStatus,
  type OfferDetails,
  type UserDetails,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type PartnerProperties,
  type SingleSignOnPropertiesV2,
  KnownSingleSignOnType,
  type SingleSignOnType,
  KnownSingleSignOnStates,
  type SingleSignOnStates,
  type ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  type ManagedServiceIdentityType,
  type UserAssignedIdentity,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type OrganizationResourceUpdate,
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  KnownVersions,
} from "./models/index.js";
export type { VectorDbClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./api/organizations/index.js";
export type { OperationsOperations, OrganizationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
