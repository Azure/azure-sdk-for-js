// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AgentPoolsCreateOrUpdate200Response,
  AgentPoolsCreateOrUpdate201Response,
  AgentPoolsCreateOrUpdatedefaultResponse,
  AgentPoolsDelete202Response,
  AgentPoolsDelete204Response,
  AgentPoolsDeletedefaultResponse,
  AgentPoolsGet200Response,
  AgentPoolsGetUpgradeProfile200Response,
  AgentPoolsGetUpgradeProfiledefaultResponse,
  AgentPoolsGetdefaultResponse,
  AgentPoolsList200Response,
  AgentPoolsListdefaultResponse,
  AgentPoolsUpgradeNodeImageVersion200Response,
  AgentPoolsUpgradeNodeImageVersion202Response,
  AgentPoolsUpgradeNodeImageVersiondefaultResponse,
  MaintenanceConfigurationsCreateOrUpdate200Response,
  MaintenanceConfigurationsCreateOrUpdatedefaultResponse,
  MaintenanceConfigurationsDelete200Response,
  MaintenanceConfigurationsDelete204Response,
  MaintenanceConfigurationsDeletedefaultResponse,
  MaintenanceConfigurationsGet200Response,
  MaintenanceConfigurationsGetdefaultResponse,
  MaintenanceConfigurationsListByManagedCluster200Response,
  MaintenanceConfigurationsListByManagedClusterdefaultResponse,
  ManagedClusterSnapshotsCreateOrUpdate200Response,
  ManagedClusterSnapshotsCreateOrUpdate201Response,
  ManagedClusterSnapshotsCreateOrUpdatedefaultResponse,
  ManagedClusterSnapshotsDelete200Response,
  ManagedClusterSnapshotsDelete204Response,
  ManagedClusterSnapshotsDeletedefaultResponse,
  ManagedClusterSnapshotsGet200Response,
  ManagedClusterSnapshotsGetdefaultResponse,
  ManagedClusterSnapshotsList200Response,
  ManagedClusterSnapshotsListByResourceGroup200Response,
  ManagedClusterSnapshotsListByResourceGroupdefaultResponse,
  ManagedClusterSnapshotsListdefaultResponse,
  ManagedClusterSnapshotsUpdateTags200Response,
  ManagedClusterSnapshotsUpdateTagsdefaultResponse,
  ManagedClustersCreateOrUpdate200Response,
  ManagedClustersCreateOrUpdate201Response,
  ManagedClustersCreateOrUpdatedefaultResponse,
  ManagedClustersDelete202Response,
  ManagedClustersDelete204Response,
  ManagedClustersDeletedefaultResponse,
  ManagedClustersGet200Response,
  ManagedClustersGetAccessProfile200Response,
  ManagedClustersGetAccessProfiledefaultResponse,
  ManagedClustersGetCommandResult200Response,
  ManagedClustersGetCommandResult202Response,
  ManagedClustersGetCommandResultdefaultResponse,
  ManagedClustersGetOSOptions200Response,
  ManagedClustersGetOSOptionsdefaultResponse,
  ManagedClustersGetUpgradeProfile200Response,
  ManagedClustersGetUpgradeProfiledefaultResponse,
  ManagedClustersGetdefaultResponse,
  ManagedClustersList200Response,
  ManagedClustersListByResourceGroup200Response,
  ManagedClustersListByResourceGroupdefaultResponse,
  ManagedClustersListClusterAdminCredentials200Response,
  ManagedClustersListClusterAdminCredentialsdefaultResponse,
  ManagedClustersListClusterMonitoringUserCredentials200Response,
  ManagedClustersListClusterMonitoringUserCredentialsdefaultResponse,
  ManagedClustersListClusterUserCredentials200Response,
  ManagedClustersListClusterUserCredentialsdefaultResponse,
  ManagedClustersListOutboundNetworkDependenciesEndpoints200Response,
  ManagedClustersListOutboundNetworkDependenciesEndpointsdefaultResponse,
  ManagedClustersListdefaultResponse,
  ManagedClustersResetAADProfile200Response,
  ManagedClustersResetAADProfile202Response,
  ManagedClustersResetAADProfiledefaultResponse,
  ManagedClustersResetServicePrincipalProfile200Response,
  ManagedClustersResetServicePrincipalProfile202Response,
  ManagedClustersResetServicePrincipalProfiledefaultResponse,
  ManagedClustersRotateClusterCertificates202Response,
  ManagedClustersRotateClusterCertificates204Response,
  ManagedClustersRotateClusterCertificatesdefaultResponse,
  ManagedClustersRotateServiceAccountSigningKeys202Response,
  ManagedClustersRotateServiceAccountSigningKeys204Response,
  ManagedClustersRotateServiceAccountSigningKeysdefaultResponse,
  ManagedClustersRunCommand200Response,
  ManagedClustersRunCommand202Response,
  ManagedClustersRunCommanddefaultResponse,
  ManagedClustersStart202Response,
  ManagedClustersStart204Response,
  ManagedClustersStartdefaultResponse,
  ManagedClustersStop202Response,
  ManagedClustersStop204Response,
  ManagedClustersStopdefaultResponse,
  ManagedClustersUpdateTags200Response,
  ManagedClustersUpdateTagsdefaultResponse,
  OperationsList200Response,
  OperationsListdefaultResponse,
  PrivateEndpointConnectionsDelete200Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeletedefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetdefaultResponse,
  PrivateEndpointConnectionsList200Response,
  PrivateEndpointConnectionsListdefaultResponse,
  PrivateEndpointConnectionsUpdate200Response,
  PrivateEndpointConnectionsUpdatedefaultResponse,
  PrivateLinkResourcesList200Response,
  PrivateLinkResourcesListdefaultResponse,
  ResolvePrivateLinkServiceIdPost200Response,
  ResolvePrivateLinkServiceIdPostdefaultResponse,
  SnapshotsCreateOrUpdate200Response,
  SnapshotsCreateOrUpdate201Response,
  SnapshotsCreateOrUpdatedefaultResponse,
  SnapshotsDelete200Response,
  SnapshotsDelete204Response,
  SnapshotsDeletedefaultResponse,
  SnapshotsGet200Response,
  SnapshotsGetdefaultResponse,
  SnapshotsList200Response,
  SnapshotsListByResourceGroup200Response,
  SnapshotsListByResourceGroupdefaultResponse,
  SnapshotsListdefaultResponse,
  SnapshotsUpdateTags200Response,
  SnapshotsUpdateTagsdefaultResponse,
  TrustedAccessRoleBindingsCreateOrUpdate200Response,
  TrustedAccessRoleBindingsCreateOrUpdatedefaultResponse,
  TrustedAccessRoleBindingsDelete200Response,
  TrustedAccessRoleBindingsDelete204Response,
  TrustedAccessRoleBindingsDeletedefaultResponse,
  TrustedAccessRoleBindingsGet200Response,
  TrustedAccessRoleBindingsGetdefaultResponse,
  TrustedAccessRoleBindingsList200Response,
  TrustedAccessRoleBindingsListdefaultResponse,
  TrustedAccessRolesList200Response,
  TrustedAccessRolesListdefaultResponse,
} from "./responses";

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
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile":
    ["200", "202"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand":
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
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion":
    ["200", "202"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion":
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
  response: OperationsList200Response | OperationsListdefaultResponse,
): response is OperationsListdefaultResponse;
export function isUnexpected(
  response: ManagedClustersGetOSOptions200Response | ManagedClustersGetOSOptionsdefaultResponse,
): response is ManagedClustersGetOSOptionsdefaultResponse;
export function isUnexpected(
  response: ManagedClustersList200Response | ManagedClustersListdefaultResponse,
): response is ManagedClustersListdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListByResourceGroup200Response
    | ManagedClustersListByResourceGroupdefaultResponse,
): response is ManagedClustersListByResourceGroupdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersGetUpgradeProfile200Response
    | ManagedClustersGetUpgradeProfiledefaultResponse,
): response is ManagedClustersGetUpgradeProfiledefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersGetAccessProfile200Response
    | ManagedClustersGetAccessProfiledefaultResponse,
): response is ManagedClustersGetAccessProfiledefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListClusterAdminCredentials200Response
    | ManagedClustersListClusterAdminCredentialsdefaultResponse,
): response is ManagedClustersListClusterAdminCredentialsdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListClusterUserCredentials200Response
    | ManagedClustersListClusterUserCredentialsdefaultResponse,
): response is ManagedClustersListClusterUserCredentialsdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListClusterMonitoringUserCredentials200Response
    | ManagedClustersListClusterMonitoringUserCredentialsdefaultResponse,
): response is ManagedClustersListClusterMonitoringUserCredentialsdefaultResponse;
export function isUnexpected(
  response: ManagedClustersGet200Response | ManagedClustersGetdefaultResponse,
): response is ManagedClustersGetdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersCreateOrUpdate200Response
    | ManagedClustersCreateOrUpdate201Response
    | ManagedClustersCreateOrUpdatedefaultResponse,
): response is ManagedClustersCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: ManagedClustersUpdateTags200Response | ManagedClustersUpdateTagsdefaultResponse,
): response is ManagedClustersUpdateTagsdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersDelete202Response
    | ManagedClustersDelete204Response
    | ManagedClustersDeletedefaultResponse,
): response is ManagedClustersDeletedefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersResetServicePrincipalProfile200Response
    | ManagedClustersResetServicePrincipalProfile202Response
    | ManagedClustersResetServicePrincipalProfiledefaultResponse,
): response is ManagedClustersResetServicePrincipalProfiledefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersResetAADProfile200Response
    | ManagedClustersResetAADProfile202Response
    | ManagedClustersResetAADProfiledefaultResponse,
): response is ManagedClustersResetAADProfiledefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersRotateClusterCertificates202Response
    | ManagedClustersRotateClusterCertificates204Response
    | ManagedClustersRotateClusterCertificatesdefaultResponse,
): response is ManagedClustersRotateClusterCertificatesdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersRotateServiceAccountSigningKeys202Response
    | ManagedClustersRotateServiceAccountSigningKeys204Response
    | ManagedClustersRotateServiceAccountSigningKeysdefaultResponse,
): response is ManagedClustersRotateServiceAccountSigningKeysdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersStop202Response
    | ManagedClustersStop204Response
    | ManagedClustersStopdefaultResponse,
): response is ManagedClustersStopdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersStart202Response
    | ManagedClustersStart204Response
    | ManagedClustersStartdefaultResponse,
): response is ManagedClustersStartdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersRunCommand200Response
    | ManagedClustersRunCommand202Response
    | ManagedClustersRunCommanddefaultResponse,
): response is ManagedClustersRunCommanddefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersGetCommandResult200Response
    | ManagedClustersGetCommandResult202Response
    | ManagedClustersGetCommandResultdefaultResponse,
): response is ManagedClustersGetCommandResultdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClustersListOutboundNetworkDependenciesEndpoints200Response
    | ManagedClustersListOutboundNetworkDependenciesEndpointsdefaultResponse,
): response is ManagedClustersListOutboundNetworkDependenciesEndpointsdefaultResponse;
export function isUnexpected(
  response:
    | MaintenanceConfigurationsListByManagedCluster200Response
    | MaintenanceConfigurationsListByManagedClusterdefaultResponse,
): response is MaintenanceConfigurationsListByManagedClusterdefaultResponse;
export function isUnexpected(
  response: MaintenanceConfigurationsGet200Response | MaintenanceConfigurationsGetdefaultResponse,
): response is MaintenanceConfigurationsGetdefaultResponse;
export function isUnexpected(
  response:
    | MaintenanceConfigurationsCreateOrUpdate200Response
    | MaintenanceConfigurationsCreateOrUpdatedefaultResponse,
): response is MaintenanceConfigurationsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | MaintenanceConfigurationsDelete200Response
    | MaintenanceConfigurationsDelete204Response
    | MaintenanceConfigurationsDeletedefaultResponse,
): response is MaintenanceConfigurationsDeletedefaultResponse;
export function isUnexpected(
  response: AgentPoolsList200Response | AgentPoolsListdefaultResponse,
): response is AgentPoolsListdefaultResponse;
export function isUnexpected(
  response: AgentPoolsGet200Response | AgentPoolsGetdefaultResponse,
): response is AgentPoolsGetdefaultResponse;
export function isUnexpected(
  response:
    | AgentPoolsCreateOrUpdate200Response
    | AgentPoolsCreateOrUpdate201Response
    | AgentPoolsCreateOrUpdatedefaultResponse,
): response is AgentPoolsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | AgentPoolsDelete202Response
    | AgentPoolsDelete204Response
    | AgentPoolsDeletedefaultResponse,
): response is AgentPoolsDeletedefaultResponse;
export function isUnexpected(
  response: AgentPoolsGetUpgradeProfile200Response | AgentPoolsGetUpgradeProfiledefaultResponse,
): response is AgentPoolsGetUpgradeProfiledefaultResponse;
export function isUnexpected(
  response:
    | AgentPoolsUpgradeNodeImageVersion200Response
    | AgentPoolsUpgradeNodeImageVersion202Response
    | AgentPoolsUpgradeNodeImageVersiondefaultResponse,
): response is AgentPoolsUpgradeNodeImageVersiondefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsList200Response
    | PrivateEndpointConnectionsListdefaultResponse,
): response is PrivateEndpointConnectionsListdefaultResponse;
export function isUnexpected(
  response: PrivateEndpointConnectionsGet200Response | PrivateEndpointConnectionsGetdefaultResponse,
): response is PrivateEndpointConnectionsGetdefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsUpdate200Response
    | PrivateEndpointConnectionsUpdatedefaultResponse,
): response is PrivateEndpointConnectionsUpdatedefaultResponse;
export function isUnexpected(
  response:
    | PrivateEndpointConnectionsDelete200Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeletedefaultResponse,
): response is PrivateEndpointConnectionsDeletedefaultResponse;
export function isUnexpected(
  response: PrivateLinkResourcesList200Response | PrivateLinkResourcesListdefaultResponse,
): response is PrivateLinkResourcesListdefaultResponse;
export function isUnexpected(
  response:
    | ResolvePrivateLinkServiceIdPost200Response
    | ResolvePrivateLinkServiceIdPostdefaultResponse,
): response is ResolvePrivateLinkServiceIdPostdefaultResponse;
export function isUnexpected(
  response: SnapshotsList200Response | SnapshotsListdefaultResponse,
): response is SnapshotsListdefaultResponse;
export function isUnexpected(
  response: SnapshotsListByResourceGroup200Response | SnapshotsListByResourceGroupdefaultResponse,
): response is SnapshotsListByResourceGroupdefaultResponse;
export function isUnexpected(
  response: SnapshotsGet200Response | SnapshotsGetdefaultResponse,
): response is SnapshotsGetdefaultResponse;
export function isUnexpected(
  response:
    | SnapshotsCreateOrUpdate200Response
    | SnapshotsCreateOrUpdate201Response
    | SnapshotsCreateOrUpdatedefaultResponse,
): response is SnapshotsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response: SnapshotsUpdateTags200Response | SnapshotsUpdateTagsdefaultResponse,
): response is SnapshotsUpdateTagsdefaultResponse;
export function isUnexpected(
  response:
    | SnapshotsDelete200Response
    | SnapshotsDelete204Response
    | SnapshotsDeletedefaultResponse,
): response is SnapshotsDeletedefaultResponse;
export function isUnexpected(
  response: ManagedClusterSnapshotsList200Response | ManagedClusterSnapshotsListdefaultResponse,
): response is ManagedClusterSnapshotsListdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsListByResourceGroup200Response
    | ManagedClusterSnapshotsListByResourceGroupdefaultResponse,
): response is ManagedClusterSnapshotsListByResourceGroupdefaultResponse;
export function isUnexpected(
  response: ManagedClusterSnapshotsGet200Response | ManagedClusterSnapshotsGetdefaultResponse,
): response is ManagedClusterSnapshotsGetdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsCreateOrUpdate200Response
    | ManagedClusterSnapshotsCreateOrUpdate201Response
    | ManagedClusterSnapshotsCreateOrUpdatedefaultResponse,
): response is ManagedClusterSnapshotsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsUpdateTags200Response
    | ManagedClusterSnapshotsUpdateTagsdefaultResponse,
): response is ManagedClusterSnapshotsUpdateTagsdefaultResponse;
export function isUnexpected(
  response:
    | ManagedClusterSnapshotsDelete200Response
    | ManagedClusterSnapshotsDelete204Response
    | ManagedClusterSnapshotsDeletedefaultResponse,
): response is ManagedClusterSnapshotsDeletedefaultResponse;
export function isUnexpected(
  response: TrustedAccessRolesList200Response | TrustedAccessRolesListdefaultResponse,
): response is TrustedAccessRolesListdefaultResponse;
export function isUnexpected(
  response: TrustedAccessRoleBindingsList200Response | TrustedAccessRoleBindingsListdefaultResponse,
): response is TrustedAccessRoleBindingsListdefaultResponse;
export function isUnexpected(
  response: TrustedAccessRoleBindingsGet200Response | TrustedAccessRoleBindingsGetdefaultResponse,
): response is TrustedAccessRoleBindingsGetdefaultResponse;
export function isUnexpected(
  response:
    | TrustedAccessRoleBindingsCreateOrUpdate200Response
    | TrustedAccessRoleBindingsCreateOrUpdatedefaultResponse,
): response is TrustedAccessRoleBindingsCreateOrUpdatedefaultResponse;
export function isUnexpected(
  response:
    | TrustedAccessRoleBindingsDelete200Response
    | TrustedAccessRoleBindingsDelete204Response
    | TrustedAccessRoleBindingsDeletedefaultResponse,
): response is TrustedAccessRoleBindingsDeletedefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListdefaultResponse
    | ManagedClustersGetOSOptions200Response
    | ManagedClustersGetOSOptionsdefaultResponse
    | ManagedClustersList200Response
    | ManagedClustersListdefaultResponse
    | ManagedClustersListByResourceGroup200Response
    | ManagedClustersListByResourceGroupdefaultResponse
    | ManagedClustersGetUpgradeProfile200Response
    | ManagedClustersGetUpgradeProfiledefaultResponse
    | ManagedClustersGetAccessProfile200Response
    | ManagedClustersGetAccessProfiledefaultResponse
    | ManagedClustersListClusterAdminCredentials200Response
    | ManagedClustersListClusterAdminCredentialsdefaultResponse
    | ManagedClustersListClusterUserCredentials200Response
    | ManagedClustersListClusterUserCredentialsdefaultResponse
    | ManagedClustersListClusterMonitoringUserCredentials200Response
    | ManagedClustersListClusterMonitoringUserCredentialsdefaultResponse
    | ManagedClustersGet200Response
    | ManagedClustersGetdefaultResponse
    | ManagedClustersCreateOrUpdate200Response
    | ManagedClustersCreateOrUpdate201Response
    | ManagedClustersCreateOrUpdatedefaultResponse
    | ManagedClustersUpdateTags200Response
    | ManagedClustersUpdateTagsdefaultResponse
    | ManagedClustersDelete202Response
    | ManagedClustersDelete204Response
    | ManagedClustersDeletedefaultResponse
    | ManagedClustersResetServicePrincipalProfile200Response
    | ManagedClustersResetServicePrincipalProfile202Response
    | ManagedClustersResetServicePrincipalProfiledefaultResponse
    | ManagedClustersResetAADProfile200Response
    | ManagedClustersResetAADProfile202Response
    | ManagedClustersResetAADProfiledefaultResponse
    | ManagedClustersRotateClusterCertificates202Response
    | ManagedClustersRotateClusterCertificates204Response
    | ManagedClustersRotateClusterCertificatesdefaultResponse
    | ManagedClustersRotateServiceAccountSigningKeys202Response
    | ManagedClustersRotateServiceAccountSigningKeys204Response
    | ManagedClustersRotateServiceAccountSigningKeysdefaultResponse
    | ManagedClustersStop202Response
    | ManagedClustersStop204Response
    | ManagedClustersStopdefaultResponse
    | ManagedClustersStart202Response
    | ManagedClustersStart204Response
    | ManagedClustersStartdefaultResponse
    | ManagedClustersRunCommand200Response
    | ManagedClustersRunCommand202Response
    | ManagedClustersRunCommanddefaultResponse
    | ManagedClustersGetCommandResult200Response
    | ManagedClustersGetCommandResult202Response
    | ManagedClustersGetCommandResultdefaultResponse
    | ManagedClustersListOutboundNetworkDependenciesEndpoints200Response
    | ManagedClustersListOutboundNetworkDependenciesEndpointsdefaultResponse
    | MaintenanceConfigurationsListByManagedCluster200Response
    | MaintenanceConfigurationsListByManagedClusterdefaultResponse
    | MaintenanceConfigurationsGet200Response
    | MaintenanceConfigurationsGetdefaultResponse
    | MaintenanceConfigurationsCreateOrUpdate200Response
    | MaintenanceConfigurationsCreateOrUpdatedefaultResponse
    | MaintenanceConfigurationsDelete200Response
    | MaintenanceConfigurationsDelete204Response
    | MaintenanceConfigurationsDeletedefaultResponse
    | AgentPoolsList200Response
    | AgentPoolsListdefaultResponse
    | AgentPoolsGet200Response
    | AgentPoolsGetdefaultResponse
    | AgentPoolsCreateOrUpdate200Response
    | AgentPoolsCreateOrUpdate201Response
    | AgentPoolsCreateOrUpdatedefaultResponse
    | AgentPoolsDelete202Response
    | AgentPoolsDelete204Response
    | AgentPoolsDeletedefaultResponse
    | AgentPoolsGetUpgradeProfile200Response
    | AgentPoolsGetUpgradeProfiledefaultResponse
    | AgentPoolsUpgradeNodeImageVersion200Response
    | AgentPoolsUpgradeNodeImageVersion202Response
    | AgentPoolsUpgradeNodeImageVersiondefaultResponse
    | PrivateEndpointConnectionsList200Response
    | PrivateEndpointConnectionsListdefaultResponse
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetdefaultResponse
    | PrivateEndpointConnectionsUpdate200Response
    | PrivateEndpointConnectionsUpdatedefaultResponse
    | PrivateEndpointConnectionsDelete200Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeletedefaultResponse
    | PrivateLinkResourcesList200Response
    | PrivateLinkResourcesListdefaultResponse
    | ResolvePrivateLinkServiceIdPost200Response
    | ResolvePrivateLinkServiceIdPostdefaultResponse
    | SnapshotsList200Response
    | SnapshotsListdefaultResponse
    | SnapshotsListByResourceGroup200Response
    | SnapshotsListByResourceGroupdefaultResponse
    | SnapshotsGet200Response
    | SnapshotsGetdefaultResponse
    | SnapshotsCreateOrUpdate200Response
    | SnapshotsCreateOrUpdate201Response
    | SnapshotsCreateOrUpdatedefaultResponse
    | SnapshotsUpdateTags200Response
    | SnapshotsUpdateTagsdefaultResponse
    | SnapshotsDelete200Response
    | SnapshotsDelete204Response
    | SnapshotsDeletedefaultResponse
    | ManagedClusterSnapshotsList200Response
    | ManagedClusterSnapshotsListdefaultResponse
    | ManagedClusterSnapshotsListByResourceGroup200Response
    | ManagedClusterSnapshotsListByResourceGroupdefaultResponse
    | ManagedClusterSnapshotsGet200Response
    | ManagedClusterSnapshotsGetdefaultResponse
    | ManagedClusterSnapshotsCreateOrUpdate200Response
    | ManagedClusterSnapshotsCreateOrUpdate201Response
    | ManagedClusterSnapshotsCreateOrUpdatedefaultResponse
    | ManagedClusterSnapshotsUpdateTags200Response
    | ManagedClusterSnapshotsUpdateTagsdefaultResponse
    | ManagedClusterSnapshotsDelete200Response
    | ManagedClusterSnapshotsDelete204Response
    | ManagedClusterSnapshotsDeletedefaultResponse
    | TrustedAccessRolesList200Response
    | TrustedAccessRolesListdefaultResponse
    | TrustedAccessRoleBindingsList200Response
    | TrustedAccessRoleBindingsListdefaultResponse
    | TrustedAccessRoleBindingsGet200Response
    | TrustedAccessRoleBindingsGetdefaultResponse
    | TrustedAccessRoleBindingsCreateOrUpdate200Response
    | TrustedAccessRoleBindingsCreateOrUpdatedefaultResponse
    | TrustedAccessRoleBindingsDelete200Response
    | TrustedAccessRoleBindingsDelete204Response
    | TrustedAccessRoleBindingsDeletedefaultResponse,
): response is
  | OperationsListdefaultResponse
  | ManagedClustersGetOSOptionsdefaultResponse
  | ManagedClustersListdefaultResponse
  | ManagedClustersListByResourceGroupdefaultResponse
  | ManagedClustersGetUpgradeProfiledefaultResponse
  | ManagedClustersGetAccessProfiledefaultResponse
  | ManagedClustersListClusterAdminCredentialsdefaultResponse
  | ManagedClustersListClusterUserCredentialsdefaultResponse
  | ManagedClustersListClusterMonitoringUserCredentialsdefaultResponse
  | ManagedClustersGetdefaultResponse
  | ManagedClustersCreateOrUpdatedefaultResponse
  | ManagedClustersUpdateTagsdefaultResponse
  | ManagedClustersDeletedefaultResponse
  | ManagedClustersResetServicePrincipalProfiledefaultResponse
  | ManagedClustersResetAADProfiledefaultResponse
  | ManagedClustersRotateClusterCertificatesdefaultResponse
  | ManagedClustersRotateServiceAccountSigningKeysdefaultResponse
  | ManagedClustersStopdefaultResponse
  | ManagedClustersStartdefaultResponse
  | ManagedClustersRunCommanddefaultResponse
  | ManagedClustersGetCommandResultdefaultResponse
  | ManagedClustersListOutboundNetworkDependenciesEndpointsdefaultResponse
  | MaintenanceConfigurationsListByManagedClusterdefaultResponse
  | MaintenanceConfigurationsGetdefaultResponse
  | MaintenanceConfigurationsCreateOrUpdatedefaultResponse
  | MaintenanceConfigurationsDeletedefaultResponse
  | AgentPoolsListdefaultResponse
  | AgentPoolsGetdefaultResponse
  | AgentPoolsCreateOrUpdatedefaultResponse
  | AgentPoolsDeletedefaultResponse
  | AgentPoolsGetUpgradeProfiledefaultResponse
  | AgentPoolsUpgradeNodeImageVersiondefaultResponse
  | PrivateEndpointConnectionsListdefaultResponse
  | PrivateEndpointConnectionsGetdefaultResponse
  | PrivateEndpointConnectionsUpdatedefaultResponse
  | PrivateEndpointConnectionsDeletedefaultResponse
  | PrivateLinkResourcesListdefaultResponse
  | ResolvePrivateLinkServiceIdPostdefaultResponse
  | SnapshotsListdefaultResponse
  | SnapshotsListByResourceGroupdefaultResponse
  | SnapshotsGetdefaultResponse
  | SnapshotsCreateOrUpdatedefaultResponse
  | SnapshotsUpdateTagsdefaultResponse
  | SnapshotsDeletedefaultResponse
  | ManagedClusterSnapshotsListdefaultResponse
  | ManagedClusterSnapshotsListByResourceGroupdefaultResponse
  | ManagedClusterSnapshotsGetdefaultResponse
  | ManagedClusterSnapshotsCreateOrUpdatedefaultResponse
  | ManagedClusterSnapshotsUpdateTagsdefaultResponse
  | ManagedClusterSnapshotsDeletedefaultResponse
  | TrustedAccessRolesListdefaultResponse
  | TrustedAccessRoleBindingsListdefaultResponse
  | TrustedAccessRoleBindingsGetdefaultResponse
  | TrustedAccessRoleBindingsCreateOrUpdatedefaultResponse
  | TrustedAccessRoleBindingsDeletedefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i].startsWith("{") && candidateParts[i].endsWith("}")) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
