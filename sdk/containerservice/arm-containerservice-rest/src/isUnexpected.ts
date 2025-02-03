// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OperationsList200Response,
  OperationsListDefaultResponse,
  ManagedClustersGetOSOptions200Response,
  ManagedClustersGetOSOptionsDefaultResponse,
  ManagedClustersList200Response,
  ManagedClustersListDefaultResponse,
  ManagedClustersListByResourceGroup200Response,
  ManagedClustersListByResourceGroupDefaultResponse,
  ManagedClustersGetUpgradeProfile200Response,
  ManagedClustersGetUpgradeProfileDefaultResponse,
  ManagedClustersGetAccessProfile200Response,
  ManagedClustersGetAccessProfileDefaultResponse,
  ManagedClustersListClusterAdminCredentials200Response,
  ManagedClustersListClusterAdminCredentialsDefaultResponse,
  ManagedClustersListClusterUserCredentials200Response,
  ManagedClustersListClusterUserCredentialsDefaultResponse,
  ManagedClustersListClusterMonitoringUserCredentials200Response,
  ManagedClustersListClusterMonitoringUserCredentialsDefaultResponse,
  ManagedClustersGet200Response,
  ManagedClustersGetDefaultResponse,
  ManagedClustersCreateOrUpdate200Response,
  ManagedClustersCreateOrUpdate201Response,
  ManagedClustersCreateOrUpdateDefaultResponse,
  ManagedClustersUpdateTags200Response,
  ManagedClustersUpdateTagsDefaultResponse,
  ManagedClustersDelete202Response,
  ManagedClustersDelete204Response,
  ManagedClustersDeleteDefaultResponse,
  ManagedClustersResetServicePrincipalProfile200Response,
  ManagedClustersResetServicePrincipalProfile202Response,
  ManagedClustersResetServicePrincipalProfileDefaultResponse,
  ManagedClustersResetAADProfile200Response,
  ManagedClustersResetAADProfile202Response,
  ManagedClustersResetAADProfileDefaultResponse,
  ManagedClustersRotateClusterCertificates202Response,
  ManagedClustersRotateClusterCertificates204Response,
  ManagedClustersRotateClusterCertificatesDefaultResponse,
  ManagedClustersRotateServiceAccountSigningKeys202Response,
  ManagedClustersRotateServiceAccountSigningKeys204Response,
  ManagedClustersRotateServiceAccountSigningKeysDefaultResponse,
  ManagedClustersStop202Response,
  ManagedClustersStop204Response,
  ManagedClustersStopDefaultResponse,
  ManagedClustersStart202Response,
  ManagedClustersStart204Response,
  ManagedClustersStartDefaultResponse,
  ManagedClustersRunCommand200Response,
  ManagedClustersRunCommand202Response,
  ManagedClustersRunCommandDefaultResponse,
  ManagedClustersGetCommandResult200Response,
  ManagedClustersGetCommandResult202Response,
  ManagedClustersGetCommandResultDefaultResponse,
  ManagedClustersListOutboundNetworkDependenciesEndpoints200Response,
  ManagedClustersListOutboundNetworkDependenciesEndpointsDefaultResponse,
  MaintenanceConfigurationsListByManagedCluster200Response,
  MaintenanceConfigurationsListByManagedClusterDefaultResponse,
  MaintenanceConfigurationsGet200Response,
  MaintenanceConfigurationsGetDefaultResponse,
  MaintenanceConfigurationsCreateOrUpdate200Response,
  MaintenanceConfigurationsCreateOrUpdateDefaultResponse,
  MaintenanceConfigurationsDelete200Response,
  MaintenanceConfigurationsDelete204Response,
  MaintenanceConfigurationsDeleteDefaultResponse,
  AgentPoolsList200Response,
  AgentPoolsListDefaultResponse,
  AgentPoolsGet200Response,
  AgentPoolsGetDefaultResponse,
  AgentPoolsCreateOrUpdate200Response,
  AgentPoolsCreateOrUpdate201Response,
  AgentPoolsCreateOrUpdateDefaultResponse,
  AgentPoolsDelete202Response,
  AgentPoolsDelete204Response,
  AgentPoolsDeleteDefaultResponse,
  AgentPoolsGetUpgradeProfile200Response,
  AgentPoolsGetUpgradeProfileDefaultResponse,
  AgentPoolsUpgradeNodeImageVersion200Response,
  AgentPoolsUpgradeNodeImageVersion202Response,
  AgentPoolsUpgradeNodeImageVersionDefaultResponse,
  PrivateEndpointConnectionsList200Response,
  PrivateEndpointConnectionsListDefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetDefaultResponse,
  PrivateEndpointConnectionsUpdate200Response,
  PrivateEndpointConnectionsUpdateDefaultResponse,
  PrivateEndpointConnectionsDelete200Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeleteDefaultResponse,
  PrivateLinkResourcesList200Response,
  PrivateLinkResourcesListDefaultResponse,
  ResolvePrivateLinkServiceIdPost200Response,
  ResolvePrivateLinkServiceIdPostDefaultResponse,
  SnapshotsList200Response,
  SnapshotsListDefaultResponse,
  SnapshotsListByResourceGroup200Response,
  SnapshotsListByResourceGroupDefaultResponse,
  SnapshotsGet200Response,
  SnapshotsGetDefaultResponse,
  SnapshotsCreateOrUpdate200Response,
  SnapshotsCreateOrUpdate201Response,
  SnapshotsCreateOrUpdateDefaultResponse,
  SnapshotsUpdateTags200Response,
  SnapshotsUpdateTagsDefaultResponse,
  SnapshotsDelete200Response,
  SnapshotsDelete204Response,
  SnapshotsDeleteDefaultResponse,
  ManagedClusterSnapshotsList200Response,
  ManagedClusterSnapshotsListDefaultResponse,
  ManagedClusterSnapshotsListByResourceGroup200Response,
  ManagedClusterSnapshotsListByResourceGroupDefaultResponse,
  ManagedClusterSnapshotsGet200Response,
  ManagedClusterSnapshotsGetDefaultResponse,
  ManagedClusterSnapshotsCreateOrUpdate200Response,
  ManagedClusterSnapshotsCreateOrUpdate201Response,
  ManagedClusterSnapshotsCreateOrUpdateDefaultResponse,
  ManagedClusterSnapshotsUpdateTags200Response,
  ManagedClusterSnapshotsUpdateTagsDefaultResponse,
  ManagedClusterSnapshotsDelete200Response,
  ManagedClusterSnapshotsDelete204Response,
  ManagedClusterSnapshotsDeleteDefaultResponse,
  TrustedAccessRolesList200Response,
  TrustedAccessRolesListDefaultResponse,
  TrustedAccessRoleBindingsList200Response,
  TrustedAccessRoleBindingsListDefaultResponse,
  TrustedAccessRoleBindingsGet200Response,
  TrustedAccessRoleBindingsGetDefaultResponse,
  TrustedAccessRoleBindingsCreateOrUpdate200Response,
  TrustedAccessRoleBindingsCreateOrUpdateDefaultResponse,
  TrustedAccessRoleBindingsDelete200Response,
  TrustedAccessRoleBindingsDelete204Response,
  TrustedAccessRoleBindingsDeleteDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.ContainerService/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/osOptions/default":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters": [
    "200",
  ],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeProfiles/default":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/accessProfiles/{roleName}/listCredential":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterAdminCredential":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterUserCredential":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterMonitoringUserCredential":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/commandResults/{commandId}":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/outboundNetworkDependenciesEndpoints":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}":
    ["200", "201"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeProfiles/default":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/availableAgentPoolVersions":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateLinkResources":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resolvePrivateLinkServiceId":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/snapshots": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedclustersnapshots":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots/{resourceName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots/{resourceName}":
    ["200", "201"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots/{resourceName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots/{resourceName}":
    ["200", "204"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/trustedAccessRoles":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}":
    ["200"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}":
    ["200", "204"],
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response: ManagedClustersGetOSOptions200Response | ManagedClustersGetOSOptionsDefaultResponse,
): response is ManagedClustersGetOSOptionsDefaultResponse;
export function isUnexpected(
  response: ManagedClustersList200Response | ManagedClustersListDefaultResponse,
): response is ManagedClustersListDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListByResourceGroup200Response
    | ManagedClustersListByResourceGroupDefaultResponse,
): response is ManagedClustersListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersGetUpgradeProfile200Response
    | ManagedClustersGetUpgradeProfileDefaultResponse,
): response is ManagedClustersGetUpgradeProfileDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersGetAccessProfile200Response
    | ManagedClustersGetAccessProfileDefaultResponse,
): response is ManagedClustersGetAccessProfileDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListClusterAdminCredentials200Response
    | ManagedClustersListClusterAdminCredentialsDefaultResponse,
): response is ManagedClustersListClusterAdminCredentialsDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListClusterUserCredentials200Response
    | ManagedClustersListClusterUserCredentialsDefaultResponse,
): response is ManagedClustersListClusterUserCredentialsDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListClusterMonitoringUserCredentials200Response
    | ManagedClustersListClusterMonitoringUserCredentialsDefaultResponse,
): response is ManagedClustersListClusterMonitoringUserCredentialsDefaultResponse;
export function isUnexpected(
  response: ManagedClustersGet200Response | ManagedClustersGetDefaultResponse,
): response is ManagedClustersGetDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersCreateOrUpdate200Response
    | ManagedClustersCreateOrUpdate201Response
    | ManagedClustersCreateOrUpdateDefaultResponse,
): response is ManagedClustersCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ManagedClustersUpdateTags200Response | ManagedClustersUpdateTagsDefaultResponse,
): response is ManagedClustersUpdateTagsDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersDelete202Response
    | ManagedClustersDelete204Response
    | ManagedClustersDeleteDefaultResponse,
): response is ManagedClustersDeleteDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersResetServicePrincipalProfile200Response
    | ManagedClustersResetServicePrincipalProfile202Response
    | ManagedClustersResetServicePrincipalProfileDefaultResponse,
): response is ManagedClustersResetServicePrincipalProfileDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersResetAADProfile200Response
    | ManagedClustersResetAADProfile202Response
    | ManagedClustersResetAADProfileDefaultResponse,
): response is ManagedClustersResetAADProfileDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersRotateClusterCertificates202Response
    | ManagedClustersRotateClusterCertificates204Response
    | ManagedClustersRotateClusterCertificatesDefaultResponse,
): response is ManagedClustersRotateClusterCertificatesDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersRotateServiceAccountSigningKeys202Response
    | ManagedClustersRotateServiceAccountSigningKeys204Response
    | ManagedClustersRotateServiceAccountSigningKeysDefaultResponse,
): response is ManagedClustersRotateServiceAccountSigningKeysDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersStop202Response
    | ManagedClustersStop204Response
    | ManagedClustersStopDefaultResponse,
): response is ManagedClustersStopDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersStart202Response
    | ManagedClustersStart204Response
    | ManagedClustersStartDefaultResponse,
): response is ManagedClustersStartDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersRunCommand200Response
    | ManagedClustersRunCommand202Response
    | ManagedClustersRunCommandDefaultResponse,
): response is ManagedClustersRunCommandDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersGetCommandResult200Response
    | ManagedClustersGetCommandResult202Response
    | ManagedClustersGetCommandResultDefaultResponse,
): response is ManagedClustersGetCommandResultDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListOutboundNetworkDependenciesEndpoints200Response
    | ManagedClustersListOutboundNetworkDependenciesEndpointsDefaultResponse,
): response is ManagedClustersListOutboundNetworkDependenciesEndpointsDefaultResponse;
export function isUnexpected(
  response:
    | MaintenanceConfigurationsListByManagedCluster200Response
    | MaintenanceConfigurationsListByManagedClusterDefaultResponse,
): response is MaintenanceConfigurationsListByManagedClusterDefaultResponse;
export function isUnexpected(
  response: MaintenanceConfigurationsGet200Response | MaintenanceConfigurationsGetDefaultResponse,
): response is MaintenanceConfigurationsGetDefaultResponse;
export function isUnexpected(
  response:
    | MaintenanceConfigurationsCreateOrUpdate200Response
    | MaintenanceConfigurationsCreateOrUpdateDefaultResponse,
): response is MaintenanceConfigurationsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | MaintenanceConfigurationsDelete200Response
    | MaintenanceConfigurationsDelete204Response
    | MaintenanceConfigurationsDeleteDefaultResponse,
): response is MaintenanceConfigurationsDeleteDefaultResponse;
export function isUnexpected(
  response: AgentPoolsList200Response | AgentPoolsListDefaultResponse,
): response is AgentPoolsListDefaultResponse;
export function isUnexpected(
  response: AgentPoolsGet200Response | AgentPoolsGetDefaultResponse,
): response is AgentPoolsGetDefaultResponse;
export function isUnexpected(
  response:
    | AgentPoolsCreateOrUpdate200Response
    | AgentPoolsCreateOrUpdate201Response
    | AgentPoolsCreateOrUpdateDefaultResponse,
): response is AgentPoolsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | AgentPoolsDelete202Response
    | AgentPoolsDelete204Response
    | AgentPoolsDeleteDefaultResponse,
): response is AgentPoolsDeleteDefaultResponse;
export function isUnexpected(
  response: AgentPoolsGetUpgradeProfile200Response | AgentPoolsGetUpgradeProfileDefaultResponse,
): response is AgentPoolsGetUpgradeProfileDefaultResponse;
export function isUnexpected(
  response:
    | AgentPoolsUpgradeNodeImageVersion200Response
    | AgentPoolsUpgradeNodeImageVersion202Response
    | AgentPoolsUpgradeNodeImageVersionDefaultResponse,
): response is AgentPoolsUpgradeNodeImageVersionDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsList200Response
    | PrivateEndpointConnectionsListDefaultResponse,
): response is PrivateEndpointConnectionsListDefaultResponse;
export function isUnexpected(
  response: PrivateEndpointConnectionsGet200Response | PrivateEndpointConnectionsGetDefaultResponse,
): response is PrivateEndpointConnectionsGetDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsUpdate200Response
    | PrivateEndpointConnectionsUpdateDefaultResponse,
): response is PrivateEndpointConnectionsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsDelete200Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteDefaultResponse,
): response is PrivateEndpointConnectionsDeleteDefaultResponse;
export function isUnexpected(
  response: PrivateLinkResourcesList200Response | PrivateLinkResourcesListDefaultResponse,
): response is PrivateLinkResourcesListDefaultResponse;
export function isUnexpected(
  response:
    | ResolvePrivateLinkServiceIdPost200Response
    | ResolvePrivateLinkServiceIdPostDefaultResponse,
): response is ResolvePrivateLinkServiceIdPostDefaultResponse;
export function isUnexpected(
  response: SnapshotsList200Response | SnapshotsListDefaultResponse,
): response is SnapshotsListDefaultResponse;
export function isUnexpected(
  response: SnapshotsListByResourceGroup200Response | SnapshotsListByResourceGroupDefaultResponse,
): response is SnapshotsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: SnapshotsGet200Response | SnapshotsGetDefaultResponse,
): response is SnapshotsGetDefaultResponse;
export function isUnexpected(
  response:
    | SnapshotsCreateOrUpdate200Response
    | SnapshotsCreateOrUpdate201Response
    | SnapshotsCreateOrUpdateDefaultResponse,
): response is SnapshotsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: SnapshotsUpdateTags200Response | SnapshotsUpdateTagsDefaultResponse,
): response is SnapshotsUpdateTagsDefaultResponse;
export function isUnexpected(
  response:
    | SnapshotsDelete200Response
    | SnapshotsDelete204Response
    | SnapshotsDeleteDefaultResponse,
): response is SnapshotsDeleteDefaultResponse;
export function isUnexpected(
  response: ManagedClusterSnapshotsList200Response | ManagedClusterSnapshotsListDefaultResponse,
): response is ManagedClusterSnapshotsListDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsListByResourceGroup200Response
    | ManagedClusterSnapshotsListByResourceGroupDefaultResponse,
): response is ManagedClusterSnapshotsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response: ManagedClusterSnapshotsGet200Response | ManagedClusterSnapshotsGetDefaultResponse,
): response is ManagedClusterSnapshotsGetDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsCreateOrUpdate200Response
    | ManagedClusterSnapshotsCreateOrUpdate201Response
    | ManagedClusterSnapshotsCreateOrUpdateDefaultResponse,
): response is ManagedClusterSnapshotsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsUpdateTags200Response
    | ManagedClusterSnapshotsUpdateTagsDefaultResponse,
): response is ManagedClusterSnapshotsUpdateTagsDefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsDelete200Response
    | ManagedClusterSnapshotsDelete204Response
    | ManagedClusterSnapshotsDeleteDefaultResponse,
): response is ManagedClusterSnapshotsDeleteDefaultResponse;
export function isUnexpected(
  response: TrustedAccessRolesList200Response | TrustedAccessRolesListDefaultResponse,
): response is TrustedAccessRolesListDefaultResponse;
export function isUnexpected(
  response: TrustedAccessRoleBindingsList200Response | TrustedAccessRoleBindingsListDefaultResponse,
): response is TrustedAccessRoleBindingsListDefaultResponse;
export function isUnexpected(
  response: TrustedAccessRoleBindingsGet200Response | TrustedAccessRoleBindingsGetDefaultResponse,
): response is TrustedAccessRoleBindingsGetDefaultResponse;
export function isUnexpected(
  response:
    | TrustedAccessRoleBindingsCreateOrUpdate200Response
    | TrustedAccessRoleBindingsCreateOrUpdateDefaultResponse,
): response is TrustedAccessRoleBindingsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | TrustedAccessRoleBindingsDelete200Response
    | TrustedAccessRoleBindingsDelete204Response
    | TrustedAccessRoleBindingsDeleteDefaultResponse,
): response is TrustedAccessRoleBindingsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListDefaultResponse
    | ManagedClustersGetOSOptions200Response
    | ManagedClustersGetOSOptionsDefaultResponse
    | ManagedClustersList200Response
    | ManagedClustersListDefaultResponse
    | ManagedClustersListByResourceGroup200Response
    | ManagedClustersListByResourceGroupDefaultResponse
    | ManagedClustersGetUpgradeProfile200Response
    | ManagedClustersGetUpgradeProfileDefaultResponse
    | ManagedClustersGetAccessProfile200Response
    | ManagedClustersGetAccessProfileDefaultResponse
    | ManagedClustersListClusterAdminCredentials200Response
    | ManagedClustersListClusterAdminCredentialsDefaultResponse
    | ManagedClustersListClusterUserCredentials200Response
    | ManagedClustersListClusterUserCredentialsDefaultResponse
    | ManagedClustersListClusterMonitoringUserCredentials200Response
    | ManagedClustersListClusterMonitoringUserCredentialsDefaultResponse
    | ManagedClustersGet200Response
    | ManagedClustersGetDefaultResponse
    | ManagedClustersCreateOrUpdate200Response
    | ManagedClustersCreateOrUpdate201Response
    | ManagedClustersCreateOrUpdateDefaultResponse
    | ManagedClustersUpdateTags200Response
    | ManagedClustersUpdateTagsDefaultResponse
    | ManagedClustersDelete202Response
    | ManagedClustersDelete204Response
    | ManagedClustersDeleteDefaultResponse
    | ManagedClustersResetServicePrincipalProfile200Response
    | ManagedClustersResetServicePrincipalProfile202Response
    | ManagedClustersResetServicePrincipalProfileDefaultResponse
    | ManagedClustersResetAADProfile200Response
    | ManagedClustersResetAADProfile202Response
    | ManagedClustersResetAADProfileDefaultResponse
    | ManagedClustersRotateClusterCertificates202Response
    | ManagedClustersRotateClusterCertificates204Response
    | ManagedClustersRotateClusterCertificatesDefaultResponse
    | ManagedClustersRotateServiceAccountSigningKeys202Response
    | ManagedClustersRotateServiceAccountSigningKeys204Response
    | ManagedClustersRotateServiceAccountSigningKeysDefaultResponse
    | ManagedClustersStop202Response
    | ManagedClustersStop204Response
    | ManagedClustersStopDefaultResponse
    | ManagedClustersStart202Response
    | ManagedClustersStart204Response
    | ManagedClustersStartDefaultResponse
    | ManagedClustersRunCommand200Response
    | ManagedClustersRunCommand202Response
    | ManagedClustersRunCommandDefaultResponse
    | ManagedClustersGetCommandResult200Response
    | ManagedClustersGetCommandResult202Response
    | ManagedClustersGetCommandResultDefaultResponse
    | ManagedClustersListOutboundNetworkDependenciesEndpoints200Response
    | ManagedClustersListOutboundNetworkDependenciesEndpointsDefaultResponse
    | MaintenanceConfigurationsListByManagedCluster200Response
    | MaintenanceConfigurationsListByManagedClusterDefaultResponse
    | MaintenanceConfigurationsGet200Response
    | MaintenanceConfigurationsGetDefaultResponse
    | MaintenanceConfigurationsCreateOrUpdate200Response
    | MaintenanceConfigurationsCreateOrUpdateDefaultResponse
    | MaintenanceConfigurationsDelete200Response
    | MaintenanceConfigurationsDelete204Response
    | MaintenanceConfigurationsDeleteDefaultResponse
    | AgentPoolsList200Response
    | AgentPoolsListDefaultResponse
    | AgentPoolsGet200Response
    | AgentPoolsGetDefaultResponse
    | AgentPoolsCreateOrUpdate200Response
    | AgentPoolsCreateOrUpdate201Response
    | AgentPoolsCreateOrUpdateDefaultResponse
    | AgentPoolsDelete202Response
    | AgentPoolsDelete204Response
    | AgentPoolsDeleteDefaultResponse
    | AgentPoolsGetUpgradeProfile200Response
    | AgentPoolsGetUpgradeProfileDefaultResponse
    | AgentPoolsUpgradeNodeImageVersion200Response
    | AgentPoolsUpgradeNodeImageVersion202Response
    | AgentPoolsUpgradeNodeImageVersionDefaultResponse
    | PrivateEndpointConnectionsList200Response
    | PrivateEndpointConnectionsListDefaultResponse
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetDefaultResponse
    | PrivateEndpointConnectionsUpdate200Response
    | PrivateEndpointConnectionsUpdateDefaultResponse
    | PrivateEndpointConnectionsDelete200Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteDefaultResponse
    | PrivateLinkResourcesList200Response
    | PrivateLinkResourcesListDefaultResponse
    | ResolvePrivateLinkServiceIdPost200Response
    | ResolvePrivateLinkServiceIdPostDefaultResponse
    | SnapshotsList200Response
    | SnapshotsListDefaultResponse
    | SnapshotsListByResourceGroup200Response
    | SnapshotsListByResourceGroupDefaultResponse
    | SnapshotsGet200Response
    | SnapshotsGetDefaultResponse
    | SnapshotsCreateOrUpdate200Response
    | SnapshotsCreateOrUpdate201Response
    | SnapshotsCreateOrUpdateDefaultResponse
    | SnapshotsUpdateTags200Response
    | SnapshotsUpdateTagsDefaultResponse
    | SnapshotsDelete200Response
    | SnapshotsDelete204Response
    | SnapshotsDeleteDefaultResponse
    | ManagedClusterSnapshotsList200Response
    | ManagedClusterSnapshotsListDefaultResponse
    | ManagedClusterSnapshotsListByResourceGroup200Response
    | ManagedClusterSnapshotsListByResourceGroupDefaultResponse
    | ManagedClusterSnapshotsGet200Response
    | ManagedClusterSnapshotsGetDefaultResponse
    | ManagedClusterSnapshotsCreateOrUpdate200Response
    | ManagedClusterSnapshotsCreateOrUpdate201Response
    | ManagedClusterSnapshotsCreateOrUpdateDefaultResponse
    | ManagedClusterSnapshotsUpdateTags200Response
    | ManagedClusterSnapshotsUpdateTagsDefaultResponse
    | ManagedClusterSnapshotsDelete200Response
    | ManagedClusterSnapshotsDelete204Response
    | ManagedClusterSnapshotsDeleteDefaultResponse
    | TrustedAccessRolesList200Response
    | TrustedAccessRolesListDefaultResponse
    | TrustedAccessRoleBindingsList200Response
    | TrustedAccessRoleBindingsListDefaultResponse
    | TrustedAccessRoleBindingsGet200Response
    | TrustedAccessRoleBindingsGetDefaultResponse
    | TrustedAccessRoleBindingsCreateOrUpdate200Response
    | TrustedAccessRoleBindingsCreateOrUpdateDefaultResponse
    | TrustedAccessRoleBindingsDelete200Response
    | TrustedAccessRoleBindingsDelete204Response
    | TrustedAccessRoleBindingsDeleteDefaultResponse,
): response is
  | OperationsListDefaultResponse
  | ManagedClustersGetOSOptionsDefaultResponse
  | ManagedClustersListDefaultResponse
  | ManagedClustersListByResourceGroupDefaultResponse
  | ManagedClustersGetUpgradeProfileDefaultResponse
  | ManagedClustersGetAccessProfileDefaultResponse
  | ManagedClustersListClusterAdminCredentialsDefaultResponse
  | ManagedClustersListClusterUserCredentialsDefaultResponse
  | ManagedClustersListClusterMonitoringUserCredentialsDefaultResponse
  | ManagedClustersGetDefaultResponse
  | ManagedClustersCreateOrUpdateDefaultResponse
  | ManagedClustersUpdateTagsDefaultResponse
  | ManagedClustersDeleteDefaultResponse
  | ManagedClustersResetServicePrincipalProfileDefaultResponse
  | ManagedClustersResetAADProfileDefaultResponse
  | ManagedClustersRotateClusterCertificatesDefaultResponse
  | ManagedClustersRotateServiceAccountSigningKeysDefaultResponse
  | ManagedClustersStopDefaultResponse
  | ManagedClustersStartDefaultResponse
  | ManagedClustersRunCommandDefaultResponse
  | ManagedClustersGetCommandResultDefaultResponse
  | ManagedClustersListOutboundNetworkDependenciesEndpointsDefaultResponse
  | MaintenanceConfigurationsListByManagedClusterDefaultResponse
  | MaintenanceConfigurationsGetDefaultResponse
  | MaintenanceConfigurationsCreateOrUpdateDefaultResponse
  | MaintenanceConfigurationsDeleteDefaultResponse
  | AgentPoolsListDefaultResponse
  | AgentPoolsGetDefaultResponse
  | AgentPoolsCreateOrUpdateDefaultResponse
  | AgentPoolsDeleteDefaultResponse
  | AgentPoolsGetUpgradeProfileDefaultResponse
  | AgentPoolsUpgradeNodeImageVersionDefaultResponse
  | PrivateEndpointConnectionsListDefaultResponse
  | PrivateEndpointConnectionsGetDefaultResponse
  | PrivateEndpointConnectionsUpdateDefaultResponse
  | PrivateEndpointConnectionsDeleteDefaultResponse
  | PrivateLinkResourcesListDefaultResponse
  | ResolvePrivateLinkServiceIdPostDefaultResponse
  | SnapshotsListDefaultResponse
  | SnapshotsListByResourceGroupDefaultResponse
  | SnapshotsGetDefaultResponse
  | SnapshotsCreateOrUpdateDefaultResponse
  | SnapshotsUpdateTagsDefaultResponse
  | SnapshotsDeleteDefaultResponse
  | ManagedClusterSnapshotsListDefaultResponse
  | ManagedClusterSnapshotsListByResourceGroupDefaultResponse
  | ManagedClusterSnapshotsGetDefaultResponse
  | ManagedClusterSnapshotsCreateOrUpdateDefaultResponse
  | ManagedClusterSnapshotsUpdateTagsDefaultResponse
  | ManagedClusterSnapshotsDeleteDefaultResponse
  | TrustedAccessRolesListDefaultResponse
  | TrustedAccessRoleBindingsListDefaultResponse
  | TrustedAccessRoleBindingsGetDefaultResponse
  | TrustedAccessRoleBindingsCreateOrUpdateDefaultResponse
  | TrustedAccessRoleBindingsDeleteDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
