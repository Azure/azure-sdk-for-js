// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PostgresClient } from "./postgresClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type OrganizationResource,
  type OrganizationProperties,
  type MarketplaceDetails,
  KnownMarketplaceSubscriptionStatus,
  type MarketplaceSubscriptionStatus,
  type OfferDetails,
  type UserDetails,
  type CompanyDetails,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type PartnerOrganizationProperties,
  type SingleSignOnProperties,
  KnownSingleSignOnStates,
  type SingleSignOnStates,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type Project,
  type ProxyResource,
  type Branch,
  type Compute,
  type NeonDatabase,
  type NeonRole,
  type Endpoint,
  KnownVersions,
} from "./models/index.js";
export {
  type ProjectProperties,
  type Attributes,
  type DefaultEndpointSettings,
  type BranchProperties,
  type NeonRoleProperties,
  type NeonDatabaseProperties,
  type EndpointProperties,
  KnownEndpointType,
  type EndpointType,
  type PgVersion,
  type PgVersionsResult,
  type ConnectionUriProperties,
  type ComputeProperties,
} from "./models/models/index.js";
export type { PostgresClientOptionalParams } from "./api/index.js";
export type {
  BranchesListOptionalParams,
  BranchesDeleteOptionalParams,
  BranchesUpdateOptionalParams,
  BranchesCreateOrUpdateOptionalParams,
  BranchesGetOptionalParams,
} from "./api/branches/index.js";
export type {
  ComputesListOptionalParams,
  ComputesDeleteOptionalParams,
  ComputesUpdateOptionalParams,
  ComputesCreateOrUpdateOptionalParams,
  ComputesGetOptionalParams,
} from "./api/computes/index.js";
export type {
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./api/endpoints/index.js";
export type {
  NeonDatabasesListOptionalParams,
  NeonDatabasesDeleteOptionalParams,
  NeonDatabasesUpdateOptionalParams,
  NeonDatabasesCreateOrUpdateOptionalParams,
  NeonDatabasesGetOptionalParams,
} from "./api/neonDatabases/index.js";
export type {
  NeonRolesListOptionalParams,
  NeonRolesDeleteOptionalParams,
  NeonRolesUpdateOptionalParams,
  NeonRolesCreateOrUpdateOptionalParams,
  NeonRolesGetOptionalParams,
} from "./api/neonRoles/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  OrganizationsGetPostgresVersionsOptionalParams,
  OrganizationsListBySubscriptionOptionalParams,
  OrganizationsListByResourceGroupOptionalParams,
  OrganizationsDeleteOptionalParams,
  OrganizationsUpdateOptionalParams,
  OrganizationsCreateOrUpdateOptionalParams,
  OrganizationsGetOptionalParams,
} from "./api/organizations/index.js";
export type {
  ProjectsGetConnectionUriOptionalParams,
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "./api/projects/index.js";
export type {
  BranchesOperations,
  ComputesOperations,
  EndpointsOperations,
  NeonDatabasesOperations,
  NeonRolesOperations,
  OperationsOperations,
  OrganizationsOperations,
  ProjectsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
