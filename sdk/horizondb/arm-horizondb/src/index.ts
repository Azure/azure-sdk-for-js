// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HorizonDbClient } from "./horizonDbClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
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
  HorizonDbCluster,
  HorizonDbClusterProperties,
  CreateModeCluster,
  Network,
  PublicNetworkAccessState,
  State,
  ProvisioningState,
  ZonePlacementPolicy,
  HorizonDbClusterParameterGroupConnectionProperties,
  HorizonDbClusterAuthConfig,
  AuthenticationState,
  HorizonDbComputeModel,
  HorizonDbComputeModelType,
  HorizonDbClusterMirroring,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  HorizonDbClusterForPatchUpdate,
  HorizonDbClusterPropertiesForPatchUpdate,
  HorizonDbPool,
  HorizonDbPoolProperties,
  CreateModePool,
  ProxyResource,
  HorizonDbReplica,
  HorizonDbReplicaProperties,
  ReplicaRole,
  HorizonDbReplicaForPatchUpdate,
  HorizonDbReplicaPropertiesForPatchUpdate,
  HorizonDbFirewallRule,
  HorizonDbFirewallRuleProperties,
  PrivateEndpointConnectionResource,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  HorizonDbPrivateLinkResource,
  PrivateLinkResourceProperties,
  HorizonDbParameterGroup,
  HorizonDbParameterGroupProperties,
  ParameterProperties,
  HorizonDbParameterGroupForPatchUpdate,
  HorizonDbParameterGroupPropertiesForPatchUpdate,
  HorizonDbParameterGroupConnectionProperties,
  HorizonDbAdministrator,
  HorizonDbAdministratorProperties,
  PrincipalTypes,
  HorizonDbAdministratorAdd,
  HorizonDbAdministratorPropertiesForAdd,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreateModeCluster,
  KnownPublicNetworkAccessState,
  KnownState,
  KnownProvisioningState,
  KnownZonePlacementPolicy,
  KnownAuthenticationState,
  KnownHorizonDbComputeModelType,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownCreateModePool,
  KnownReplicaRole,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownPrincipalTypes,
  KnownVersions,
} from "./models/index.js";
export type { HorizonDbClientOptionalParams } from "./api/index.js";
export type {
  HorizonDbAdministratorsListOptionalParams,
  HorizonDbAdministratorsDeleteOptionalParams,
  HorizonDbAdministratorsCreateOrUpdateOptionalParams,
  HorizonDbAdministratorsGetOptionalParams,
} from "./api/horizonDbAdministrators/index.js";
export type {
  HorizonDbClustersRestartOptionalParams,
  HorizonDbClustersStopOptionalParams,
  HorizonDbClustersStartOptionalParams,
  HorizonDbClustersListBySubscriptionOptionalParams,
  HorizonDbClustersListByResourceGroupOptionalParams,
  HorizonDbClustersDeleteOptionalParams,
  HorizonDbClustersUpdateOptionalParams,
  HorizonDbClustersCreateOrUpdateOptionalParams,
  HorizonDbClustersGetOptionalParams,
} from "./api/horizonDbClusters/index.js";
export type {
  HorizonDbFirewallRulesDeleteOptionalParams,
  HorizonDbFirewallRulesCreateOrUpdateOptionalParams,
  HorizonDbFirewallRulesListOptionalParams,
  HorizonDbFirewallRulesGetOptionalParams,
} from "./api/horizonDbFirewallRules/index.js";
export type {
  HorizonDbParameterGroupsListVersionsOptionalParams,
  HorizonDbParameterGroupsListConnectionsOptionalParams,
  HorizonDbParameterGroupsListBySubscriptionOptionalParams,
  HorizonDbParameterGroupsListByResourceGroupOptionalParams,
  HorizonDbParameterGroupsDeleteOptionalParams,
  HorizonDbParameterGroupsUpdateOptionalParams,
  HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
  HorizonDbParameterGroupsGetOptionalParams,
} from "./api/horizonDbParameterGroups/index.js";
export type {
  HorizonDbPoolsListOptionalParams,
  HorizonDbPoolsGetOptionalParams,
} from "./api/horizonDbPools/index.js";
export type {
  HorizonDbPrivateEndpointConnectionsDeleteOptionalParams,
  HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams,
  HorizonDbPrivateEndpointConnectionsListOptionalParams,
  HorizonDbPrivateEndpointConnectionsGetOptionalParams,
} from "./api/horizonDbPrivateEndpointConnections/index.js";
export type {
  HorizonDbPrivateLinkResourcesListOptionalParams,
  HorizonDbPrivateLinkResourcesGetOptionalParams,
} from "./api/horizonDbPrivateLinkResources/index.js";
export type {
  HorizonDbReplicasDeleteOptionalParams,
  HorizonDbReplicasUpdateOptionalParams,
  HorizonDbReplicasCreateOrUpdateOptionalParams,
  HorizonDbReplicasListOptionalParams,
  HorizonDbReplicasGetOptionalParams,
} from "./api/horizonDbReplicas/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  HorizonDbAdministratorsOperations,
  HorizonDbClustersOperations,
  HorizonDbFirewallRulesOperations,
  HorizonDbParameterGroupsOperations,
  HorizonDbPoolsOperations,
  HorizonDbPrivateEndpointConnectionsOperations,
  HorizonDbPrivateLinkResourcesOperations,
  HorizonDbReplicasOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
