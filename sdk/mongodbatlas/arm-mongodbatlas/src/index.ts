// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AtlasClient } from "./atlasClient.js";
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
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  OrganizationResourceUpdate,
  OrganizationResourceUpdateProperties,
  Project,
  ProjectProperties,
  ProxyResource,
  TierLimitReachedResponse,
  ProjectLimitStatus,
  ClusterTier,
  RegionsByTierResponse,
  TierRegions,
  Cluster,
  ClusterProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownMarketplaceSubscriptionStatus,
  KnownResourceProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownClusterTier,
  KnownVersions,
} from "./models/index.js";
export type { AtlasClientOptionalParams } from "./api/index.js";
export type {
  ClustersGetOptionalParams,
  ClustersListOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
} from "./api/clusters/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./api/organizations/index.js";
export type {
  ProjectsListClusterTierRegionsOptionalParams,
  ProjectsTierLimitReachedOptionalParams,
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "./api/projects/index.js";
export type {
  ClustersOperations,
  OperationsOperations,
  OrganizationsOperations,
  ProjectsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
