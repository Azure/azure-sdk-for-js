// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DBforPostgreSQLClient } from "./dBforPostgreSQLClient.js";
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
  Cluster,
  ClusterProperties,
  AadEnabledEnum,
  DataEncryption,
  DataEncryptionType,
  MaintenanceWindow,
  ServerNameItem,
  PasswordEnabledEnum,
  SimplePrivateEndpointConnection,
  PrivateEndpointConnectionSimpleProperties,
  PrivateEndpointProperty,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  AuthConfig,
  ActiveDirectoryAuth,
  PasswordAuth,
  IdentityProperties,
  IdentityType,
  UserAssignedIdentity,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  ClusterForUpdate,
  ClusterPropertiesForUpdate,
  PromoteRequest,
  NameAvailabilityRequest,
  CheckNameAvailabilityResourceType,
  NameAvailability,
  Configuration,
  ConfigurationProperties,
  ConfigurationDataType,
  ServerRoleGroupConfiguration,
  ServerRole,
  ProvisioningState,
  ServerConfiguration,
  ServerConfigurationProperties,
  FirewallRule,
  FirewallRuleProperties,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateEndpointConnectionProvisioningState,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  Role,
  RoleProperties,
  RoleType,
  RolePropertiesExternalIdentity,
  PrincipalType,
  ClusterServer,
  ClusterServerProperties,
  ServerProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownAadEnabledEnum,
  KnownDataEncryptionType,
  KnownPasswordEnabledEnum,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownActiveDirectoryAuth,
  KnownPasswordAuth,
  KnownIdentityType,
  KnownCreatedByType,
  KnownConfigurationDataType,
  KnownServerRole,
  KnownProvisioningState,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownRoleType,
  KnownPrincipalType,
  KnownVersions,
} from "./models/index.js";
export type { DBforPostgreSQLClientOptionalParams } from "./api/index.js";
export type {
  ClustersCheckNameAvailabilityOptionalParams,
  ClustersStopOptionalParams,
  ClustersStartOptionalParams,
  ClustersRestartOptionalParams,
  ClustersPromoteReadReplicaOptionalParams,
  ClustersListOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOptionalParams,
  ClustersGetOptionalParams,
} from "./api/clusters/index.js";
export type {
  ConfigurationsUpdateOnCoordinatorOptionalParams,
  ConfigurationsGetCoordinatorOptionalParams,
  ConfigurationsUpdateOnNodeOptionalParams,
  ConfigurationsGetNodeOptionalParams,
  ConfigurationsListByServerOptionalParams,
  ConfigurationsListByClusterOptionalParams,
  ConfigurationsGetOptionalParams,
} from "./api/configurations/index.js";
export type {
  FirewallRulesListByClusterOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "./api/firewallRules/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByClusterOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListByClusterOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  RolesListByClusterOptionalParams,
  RolesDeleteOptionalParams,
  RolesCreateOptionalParams,
  RolesGetOptionalParams,
} from "./api/roles/index.js";
export type {
  ServersListByClusterOptionalParams,
  ServersGetOptionalParams,
} from "./api/servers/index.js";
export type {
  ClustersOperations,
  ConfigurationsOperations,
  FirewallRulesOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  RolesOperations,
  ServersOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
