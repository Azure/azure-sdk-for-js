// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NetworkClient } from "./networkClient.js";
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
  Endpoint,
  EndpointProperties,
  AdministrativeStatus,
  EndpointsKind,
  AlwaysServe,
  ProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  EndpointUpdate,
  EndpointUpdateProperties,
  HealthPolicy,
  HealthPolicyUnion,
  HealthPolicyProperties,
  ProbeConfig,
  Protocol,
  CustomHeader,
  ExpectedStatusCodeRange,
  HealthPolicyKind,
  ProbeHealthPolicy,
  PrivateTrafficManagerProfile,
  ProfileProperties,
  CustomTopologyMapMode,
  DnsConfig,
  RecordType,
  ProfileStatus,
  TrafficRoutingMethod,
  ProfileEndpoint,
  TrackedResource,
  PrivateTrafficManagerProfileUpdate,
  PrivateTrafficManagerProfileUpdateProperties,
  ProfileProbingGateway,
  ProfileProbingGatewayProperties,
  ProfileProbingGatewayUpdate,
  ProfileProbingGatewayUpdateProperties,
  Site,
  SiteProperties,
  SiteUpdate,
  SiteUpdateProperties,
  TopologyMap,
  TopologyMapProperties,
  TopologyMapInlineSite,
  TopologyMapPatch,
  TopologyMapPatchProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownAdministrativeStatus,
  KnownEndpointsKind,
  KnownAlwaysServe,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownProtocol,
  KnownHealthPolicyKind,
  KnownCustomTopologyMapMode,
  KnownRecordType,
  KnownProfileStatus,
  KnownTrafficRoutingMethod,
  KnownVersions,
} from "./models/index.js";
export type { NetworkClientOptionalParams } from "./api/index.js";
export type {
  EndpointsListByParentOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "./api/endpoints/index.js";
export type {
  HealthPoliciesListByParentOptionalParams,
  HealthPoliciesDeleteOptionalParams,
  HealthPoliciesCreateOrUpdateOptionalParams,
  HealthPoliciesGetOptionalParams,
} from "./api/healthPolicies/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ProfileProbingGatewaysListByParentOptionalParams,
  ProfileProbingGatewaysDeleteOptionalParams,
  ProfileProbingGatewaysUpdateOptionalParams,
  ProfileProbingGatewaysCreateOrUpdateOptionalParams,
  ProfileProbingGatewaysGetOptionalParams,
} from "./api/profileProbingGateways/index.js";
export type {
  ProfilesListBySubscriptionOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "./api/profiles/index.js";
export type {
  SitesListByParentOptionalParams,
  SitesDeleteOptionalParams,
  SitesUpdateOptionalParams,
  SitesCreateOrUpdateOptionalParams,
  SitesGetOptionalParams,
} from "./api/sites/index.js";
export type {
  TopologyMapsListBySubscriptionOptionalParams,
  TopologyMapsListByResourceGroupOptionalParams,
  TopologyMapsDeleteOptionalParams,
  TopologyMapsUpdateOptionalParams,
  TopologyMapsCreateOrUpdateOptionalParams,
  TopologyMapsGetOptionalParams,
} from "./api/topologyMaps/index.js";
export type {
  EndpointsOperations,
  HealthPoliciesOperations,
  OperationsOperations,
  ProfileProbingGatewaysOperations,
  ProfilesOperations,
  SitesOperations,
  TopologyMapsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
