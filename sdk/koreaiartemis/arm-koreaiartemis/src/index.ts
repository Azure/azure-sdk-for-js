// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AgentPlatformClient } from "./agentPlatformClient.js";
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
  OrganizationPartnerProperties,
  DefaultWorkspaceProperties,
  Product,
  UserDetails,
  CompanyDetails,
  SingleSignOnProperties,
  ResourceProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  OrganizationResourceUpdate,
  OrganizationPropertiesUpdate,
  OrganizationPartnerPropertiesUpdate,
  ListWorkspacesResponse,
  DiscoveredWorkspace,
  WorkspaceLifecycleStatus,
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
  ProxyResource,
  WorkspaceResource,
  WorkspaceProperties,
  WorkspacePartnerProperties,
  WorkspaceSaaSData,
  WorkspaceLinkedSaaSListResponse,
  WorkspaceLinkedSaaSItem,
  WorkspaceDetail,
  WorkspaceDetailPartnerProperties,
  WorkspaceMarketplaceDetails,
  WorkspaceMarketplaceStatus,
  WorkspaceProject,
  WorkspaceProjectStatus,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProduct,
  KnownResourceProvisioningState,
  KnownCreatedByType,
  KnownWorkspaceLifecycleStatus,
  KnownWorkspaceMarketplaceStatus,
  KnownWorkspaceProjectStatus,
  KnownVersions,
} from "./models/index.js";
export type {
  MarketplaceDetails,
  MarketplaceSubscriptionStatus,
  OfferDetails,
  SingleSignOnType,
  SingleSignOnStates,
} from "./models/liftrBase/index.js";
export {
  KnownMarketplaceSubscriptionStatus,
  KnownSingleSignOnType,
  KnownSingleSignOnStates,
} from "./models/liftrBase/index.js";
export type { AgentPlatformClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OrganizationsListWorkspacesOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./api/organizations/index.js";
export type { SaaSOperationGroupActivateResourceOptionalParams } from "./api/saaSOperationGroup/index.js";
export type {
  WorkspacesGetDetailsOptionalParams,
  WorkspacesListLinkedSaaSOptionalParams,
  WorkspacesLinkSaaSOptionalParams,
  WorkspacesListByOrganizationOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export type {
  OperationsOperations,
  OrganizationsOperations,
  SaaSOperationGroupOperations,
  WorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
