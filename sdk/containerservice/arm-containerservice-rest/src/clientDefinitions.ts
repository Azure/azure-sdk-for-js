// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  ManagedClustersGetOSOptionsParameters,
  ManagedClustersListParameters,
  ManagedClustersListByResourceGroupParameters,
  ManagedClustersGetUpgradeProfileParameters,
  ManagedClustersGetAccessProfileParameters,
  ManagedClustersListClusterAdminCredentialsParameters,
  ManagedClustersListClusterUserCredentialsParameters,
  ManagedClustersListClusterMonitoringUserCredentialsParameters,
  ManagedClustersGetParameters,
  ManagedClustersCreateOrUpdateParameters,
  ManagedClustersUpdateTagsParameters,
  ManagedClustersDeleteParameters,
  ManagedClustersResetServicePrincipalProfileParameters,
  ManagedClustersResetAADProfileParameters,
  ManagedClustersRotateClusterCertificatesParameters,
  ManagedClustersRotateServiceAccountSigningKeysParameters,
  ManagedClustersStopParameters,
  ManagedClustersStartParameters,
  ManagedClustersRunCommandParameters,
  ManagedClustersGetCommandResultParameters,
  ManagedClustersListOutboundNetworkDependenciesEndpointsParameters,
  MaintenanceConfigurationsListByManagedClusterParameters,
  MaintenanceConfigurationsGetParameters,
  MaintenanceConfigurationsCreateOrUpdateParameters,
  MaintenanceConfigurationsDeleteParameters,
  AgentPoolsListParameters,
  AgentPoolsGetParameters,
  AgentPoolsCreateOrUpdateParameters,
  AgentPoolsDeleteParameters,
  AgentPoolsGetUpgradeProfileParameters,
  AgentPoolsGetAvailableAgentPoolVersionsParameters,
  AgentPoolsUpgradeNodeImageVersionParameters,
  PrivateEndpointConnectionsListParameters,
  PrivateEndpointConnectionsGetParameters,
  PrivateEndpointConnectionsUpdateParameters,
  PrivateEndpointConnectionsDeleteParameters,
  PrivateLinkResourcesListParameters,
  ResolvePrivateLinkServiceIdPostParameters,
  SnapshotsListParameters,
  SnapshotsListByResourceGroupParameters,
  SnapshotsGetParameters,
  SnapshotsCreateOrUpdateParameters,
  SnapshotsUpdateTagsParameters,
  SnapshotsDeleteParameters,
  ManagedClusterSnapshotsListParameters,
  ManagedClusterSnapshotsListByResourceGroupParameters,
  ManagedClusterSnapshotsGetParameters,
  ManagedClusterSnapshotsCreateOrUpdateParameters,
  ManagedClusterSnapshotsUpdateTagsParameters,
  ManagedClusterSnapshotsDeleteParameters,
  TrustedAccessRolesListParameters,
  TrustedAccessRoleBindingsListParameters,
  TrustedAccessRoleBindingsGetParameters,
  TrustedAccessRoleBindingsCreateOrUpdateParameters,
  TrustedAccessRoleBindingsDeleteParameters
} from "./parameters";
import {
  OperationsList200Response,
  OperationsListdefaultResponse,
  ManagedClustersGetOSOptions200Response,
  ManagedClustersGetOSOptionsdefaultResponse,
  ManagedClustersList200Response,
  ManagedClustersListdefaultResponse,
  ManagedClustersListByResourceGroup200Response,
  ManagedClustersListByResourceGroupdefaultResponse,
  ManagedClustersGetUpgradeProfile200Response,
  ManagedClustersGetUpgradeProfiledefaultResponse,
  ManagedClustersGetAccessProfile200Response,
  ManagedClustersGetAccessProfiledefaultResponse,
  ManagedClustersListClusterAdminCredentials200Response,
  ManagedClustersListClusterAdminCredentialsdefaultResponse,
  ManagedClustersListClusterUserCredentials200Response,
  ManagedClustersListClusterUserCredentialsdefaultResponse,
  ManagedClustersListClusterMonitoringUserCredentials200Response,
  ManagedClustersListClusterMonitoringUserCredentialsdefaultResponse,
  ManagedClustersGet200Response,
  ManagedClustersGetdefaultResponse,
  ManagedClustersCreateOrUpdate200Response,
  ManagedClustersCreateOrUpdate201Response,
  ManagedClustersCreateOrUpdatedefaultResponse,
  ManagedClustersUpdateTags200Response,
  ManagedClustersUpdateTagsdefaultResponse,
  ManagedClustersDelete202Response,
  ManagedClustersDelete204Response,
  ManagedClustersDeletedefaultResponse,
  ManagedClustersResetServicePrincipalProfile200Response,
  ManagedClustersResetServicePrincipalProfile202Response,
  ManagedClustersResetServicePrincipalProfiledefaultResponse,
  ManagedClustersResetAADProfile200Response,
  ManagedClustersResetAADProfile202Response,
  ManagedClustersResetAADProfiledefaultResponse,
  ManagedClustersRotateClusterCertificates202Response,
  ManagedClustersRotateClusterCertificates204Response,
  ManagedClustersRotateClusterCertificatesdefaultResponse,
  ManagedClustersRotateServiceAccountSigningKeys202Response,
  ManagedClustersRotateServiceAccountSigningKeys204Response,
  ManagedClustersRotateServiceAccountSigningKeysdefaultResponse,
  ManagedClustersStop202Response,
  ManagedClustersStop204Response,
  ManagedClustersStopdefaultResponse,
  ManagedClustersStart202Response,
  ManagedClustersStart204Response,
  ManagedClustersStartdefaultResponse,
  ManagedClustersRunCommand200Response,
  ManagedClustersRunCommand202Response,
  ManagedClustersRunCommanddefaultResponse,
  ManagedClustersGetCommandResult200Response,
  ManagedClustersGetCommandResult202Response,
  ManagedClustersGetCommandResultdefaultResponse,
  ManagedClustersListOutboundNetworkDependenciesEndpoints200Response,
  ManagedClustersListOutboundNetworkDependenciesEndpointsdefaultResponse,
  MaintenanceConfigurationsListByManagedCluster200Response,
  MaintenanceConfigurationsListByManagedClusterdefaultResponse,
  MaintenanceConfigurationsGet200Response,
  MaintenanceConfigurationsGetdefaultResponse,
  MaintenanceConfigurationsCreateOrUpdate200Response,
  MaintenanceConfigurationsCreateOrUpdatedefaultResponse,
  MaintenanceConfigurationsDelete200Response,
  MaintenanceConfigurationsDelete204Response,
  MaintenanceConfigurationsDeletedefaultResponse,
  AgentPoolsList200Response,
  AgentPoolsListdefaultResponse,
  AgentPoolsGet200Response,
  AgentPoolsGetdefaultResponse,
  AgentPoolsCreateOrUpdate200Response,
  AgentPoolsCreateOrUpdate201Response,
  AgentPoolsCreateOrUpdatedefaultResponse,
  AgentPoolsDelete202Response,
  AgentPoolsDelete204Response,
  AgentPoolsDeletedefaultResponse,
  AgentPoolsGetUpgradeProfile200Response,
  AgentPoolsGetUpgradeProfiledefaultResponse,
  AgentPoolsGetAvailableAgentPoolVersions200Response,
  AgentPoolsUpgradeNodeImageVersion200Response,
  AgentPoolsUpgradeNodeImageVersion202Response,
  AgentPoolsUpgradeNodeImageVersiondefaultResponse,
  PrivateEndpointConnectionsList200Response,
  PrivateEndpointConnectionsListdefaultResponse,
  PrivateEndpointConnectionsGet200Response,
  PrivateEndpointConnectionsGetdefaultResponse,
  PrivateEndpointConnectionsUpdate200Response,
  PrivateEndpointConnectionsUpdatedefaultResponse,
  PrivateEndpointConnectionsDelete200Response,
  PrivateEndpointConnectionsDelete204Response,
  PrivateEndpointConnectionsDeletedefaultResponse,
  PrivateLinkResourcesList200Response,
  PrivateLinkResourcesListdefaultResponse,
  ResolvePrivateLinkServiceIdPost200Response,
  ResolvePrivateLinkServiceIdPostdefaultResponse,
  SnapshotsList200Response,
  SnapshotsListdefaultResponse,
  SnapshotsListByResourceGroup200Response,
  SnapshotsListByResourceGroupdefaultResponse,
  SnapshotsGet200Response,
  SnapshotsGetdefaultResponse,
  SnapshotsCreateOrUpdate200Response,
  SnapshotsCreateOrUpdate201Response,
  SnapshotsCreateOrUpdatedefaultResponse,
  SnapshotsUpdateTags200Response,
  SnapshotsUpdateTagsdefaultResponse,
  SnapshotsDelete200Response,
  SnapshotsDelete204Response,
  SnapshotsDeletedefaultResponse,
  ManagedClusterSnapshotsList200Response,
  ManagedClusterSnapshotsListdefaultResponse,
  ManagedClusterSnapshotsListByResourceGroup200Response,
  ManagedClusterSnapshotsListByResourceGroupdefaultResponse,
  ManagedClusterSnapshotsGet200Response,
  ManagedClusterSnapshotsGetdefaultResponse,
  ManagedClusterSnapshotsCreateOrUpdate200Response,
  ManagedClusterSnapshotsCreateOrUpdate201Response,
  ManagedClusterSnapshotsCreateOrUpdatedefaultResponse,
  ManagedClusterSnapshotsUpdateTags200Response,
  ManagedClusterSnapshotsUpdateTagsdefaultResponse,
  ManagedClusterSnapshotsDelete200Response,
  ManagedClusterSnapshotsDelete204Response,
  ManagedClusterSnapshotsDeletedefaultResponse,
  TrustedAccessRolesList200Response,
  TrustedAccessRolesListdefaultResponse,
  TrustedAccessRoleBindingsList200Response,
  TrustedAccessRoleBindingsListdefaultResponse,
  TrustedAccessRoleBindingsGet200Response,
  TrustedAccessRoleBindingsGetdefaultResponse,
  TrustedAccessRoleBindingsCreateOrUpdate200Response,
  TrustedAccessRoleBindingsCreateOrUpdatedefaultResponse,
  TrustedAccessRoleBindingsDelete200Response,
  TrustedAccessRoleBindingsDelete204Response,
  TrustedAccessRoleBindingsDeletedefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** Gets a list of operations. */
  get(
    options?: OperationsListParameters
  ): StreamableMethod<
    OperationsList200Response | OperationsListdefaultResponse
  >;
}

export interface ManagedClustersGetOSOptions {
  /** Gets supported OS options in the specified subscription. */
  get(
    options?: ManagedClustersGetOSOptionsParameters
  ): StreamableMethod<
    | ManagedClustersGetOSOptions200Response
    | ManagedClustersGetOSOptionsdefaultResponse
  >;
}

export interface ManagedClustersList {
  /** Gets a list of managed clusters in the specified subscription. */
  get(
    options?: ManagedClustersListParameters
  ): StreamableMethod<
    ManagedClustersList200Response | ManagedClustersListdefaultResponse
  >;
}

export interface ManagedClustersListByResourceGroup {
  /** Lists managed clusters in the specified subscription and resource group. */
  get(
    options?: ManagedClustersListByResourceGroupParameters
  ): StreamableMethod<
    | ManagedClustersListByResourceGroup200Response
    | ManagedClustersListByResourceGroupdefaultResponse
  >;
}

export interface ManagedClustersGetUpgradeProfile {
  /** Gets the upgrade profile of a managed cluster. */
  get(
    options?: ManagedClustersGetUpgradeProfileParameters
  ): StreamableMethod<
    | ManagedClustersGetUpgradeProfile200Response
    | ManagedClustersGetUpgradeProfiledefaultResponse
  >;
}

export interface ManagedClustersGetAccessProfile {
  /** **WARNING**: This API will be deprecated. Instead use [ListClusterUserCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusterusercredentials) or [ListClusterAdminCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusteradmincredentials) . */
  post(
    options?: ManagedClustersGetAccessProfileParameters
  ): StreamableMethod<
    | ManagedClustersGetAccessProfile200Response
    | ManagedClustersGetAccessProfiledefaultResponse
  >;
}

export interface ManagedClustersListClusterAdminCredentials {
  /** Lists the admin credentials of a managed cluster. */
  post(
    options?: ManagedClustersListClusterAdminCredentialsParameters
  ): StreamableMethod<
    | ManagedClustersListClusterAdminCredentials200Response
    | ManagedClustersListClusterAdminCredentialsdefaultResponse
  >;
}

export interface ManagedClustersListClusterUserCredentials {
  /** Lists the user credentials of a managed cluster. */
  post(
    options?: ManagedClustersListClusterUserCredentialsParameters
  ): StreamableMethod<
    | ManagedClustersListClusterUserCredentials200Response
    | ManagedClustersListClusterUserCredentialsdefaultResponse
  >;
}

export interface ManagedClustersListClusterMonitoringUserCredentials {
  /** Lists the cluster monitoring user credentials of a managed cluster. */
  post(
    options?: ManagedClustersListClusterMonitoringUserCredentialsParameters
  ): StreamableMethod<
    | ManagedClustersListClusterMonitoringUserCredentials200Response
    | ManagedClustersListClusterMonitoringUserCredentialsdefaultResponse
  >;
}

export interface ManagedClustersGet {
  /** Gets a managed cluster. */
  get(
    options?: ManagedClustersGetParameters
  ): StreamableMethod<
    ManagedClustersGet200Response | ManagedClustersGetdefaultResponse
  >;
  /** Creates or updates a managed cluster. */
  put(
    options: ManagedClustersCreateOrUpdateParameters
  ): StreamableMethod<
    | ManagedClustersCreateOrUpdate200Response
    | ManagedClustersCreateOrUpdate201Response
    | ManagedClustersCreateOrUpdatedefaultResponse
  >;
  /** Updates tags on a managed cluster. */
  patch(
    options: ManagedClustersUpdateTagsParameters
  ): StreamableMethod<
    | ManagedClustersUpdateTags200Response
    | ManagedClustersUpdateTagsdefaultResponse
  >;
  /** Deletes a managed cluster. */
  delete(
    options?: ManagedClustersDeleteParameters
  ): StreamableMethod<
    | ManagedClustersDelete202Response
    | ManagedClustersDelete204Response
    | ManagedClustersDeletedefaultResponse
  >;
}

export interface ManagedClustersResetServicePrincipalProfile {
  /** This action cannot be performed on a cluster that is not using a service principal */
  post(
    options: ManagedClustersResetServicePrincipalProfileParameters
  ): StreamableMethod<
    | ManagedClustersResetServicePrincipalProfile200Response
    | ManagedClustersResetServicePrincipalProfile202Response
    | ManagedClustersResetServicePrincipalProfiledefaultResponse
  >;
}

export interface ManagedClustersResetAADProfile {
  /** Reset the AAD Profile of a managed cluster. */
  post(
    options: ManagedClustersResetAADProfileParameters
  ): StreamableMethod<
    | ManagedClustersResetAADProfile200Response
    | ManagedClustersResetAADProfile202Response
    | ManagedClustersResetAADProfiledefaultResponse
  >;
}

export interface ManagedClustersRotateClusterCertificates {
  /** See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates. */
  post(
    options?: ManagedClustersRotateClusterCertificatesParameters
  ): StreamableMethod<
    | ManagedClustersRotateClusterCertificates202Response
    | ManagedClustersRotateClusterCertificates204Response
    | ManagedClustersRotateClusterCertificatesdefaultResponse
  >;
}

export interface ManagedClustersRotateServiceAccountSigningKeys {
  /** Rotates the service account signing keys of a managed cluster. */
  post(
    options?: ManagedClustersRotateServiceAccountSigningKeysParameters
  ): StreamableMethod<
    | ManagedClustersRotateServiceAccountSigningKeys202Response
    | ManagedClustersRotateServiceAccountSigningKeys204Response
    | ManagedClustersRotateServiceAccountSigningKeysdefaultResponse
  >;
}

export interface ManagedClustersStop {
  /** This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster. */
  post(
    options?: ManagedClustersStopParameters
  ): StreamableMethod<
    | ManagedClustersStop202Response
    | ManagedClustersStop204Response
    | ManagedClustersStopdefaultResponse
  >;
}

export interface ManagedClustersStart {
  /** See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster. */
  post(
    options?: ManagedClustersStartParameters
  ): StreamableMethod<
    | ManagedClustersStart202Response
    | ManagedClustersStart204Response
    | ManagedClustersStartdefaultResponse
  >;
}

export interface ManagedClustersRunCommand {
  /** AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview). */
  post(
    options: ManagedClustersRunCommandParameters
  ): StreamableMethod<
    | ManagedClustersRunCommand200Response
    | ManagedClustersRunCommand202Response
    | ManagedClustersRunCommanddefaultResponse
  >;
}

export interface ManagedClustersGetCommandResult {
  /** Gets the results of a command which has been run on the Managed Cluster. */
  get(
    options?: ManagedClustersGetCommandResultParameters
  ): StreamableMethod<
    | ManagedClustersGetCommandResult200Response
    | ManagedClustersGetCommandResult202Response
    | ManagedClustersGetCommandResultdefaultResponse
  >;
}

export interface ManagedClustersListOutboundNetworkDependenciesEndpoints {
  /** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint. */
  get(
    options?: ManagedClustersListOutboundNetworkDependenciesEndpointsParameters
  ): StreamableMethod<
    | ManagedClustersListOutboundNetworkDependenciesEndpoints200Response
    | ManagedClustersListOutboundNetworkDependenciesEndpointsdefaultResponse
  >;
}

export interface MaintenanceConfigurationsListByManagedCluster {
  /** Gets a list of maintenance configurations in the specified managed cluster. */
  get(
    options?: MaintenanceConfigurationsListByManagedClusterParameters
  ): StreamableMethod<
    | MaintenanceConfigurationsListByManagedCluster200Response
    | MaintenanceConfigurationsListByManagedClusterdefaultResponse
  >;
}

export interface MaintenanceConfigurationsGet {
  /** Gets the specified maintenance configuration of a managed cluster. */
  get(
    options?: MaintenanceConfigurationsGetParameters
  ): StreamableMethod<
    | MaintenanceConfigurationsGet200Response
    | MaintenanceConfigurationsGetdefaultResponse
  >;
  /** Creates or updates a maintenance configuration in the specified managed cluster. */
  put(
    options: MaintenanceConfigurationsCreateOrUpdateParameters
  ): StreamableMethod<
    | MaintenanceConfigurationsCreateOrUpdate200Response
    | MaintenanceConfigurationsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a maintenance configuration. */
  delete(
    options?: MaintenanceConfigurationsDeleteParameters
  ): StreamableMethod<
    | MaintenanceConfigurationsDelete200Response
    | MaintenanceConfigurationsDelete204Response
    | MaintenanceConfigurationsDeletedefaultResponse
  >;
}

export interface AgentPoolsList {
  /** Gets a list of agent pools in the specified managed cluster. */
  get(
    options?: AgentPoolsListParameters
  ): StreamableMethod<
    AgentPoolsList200Response | AgentPoolsListdefaultResponse
  >;
}

export interface AgentPoolsGet {
  /** Gets the specified managed cluster agent pool. */
  get(
    options?: AgentPoolsGetParameters
  ): StreamableMethod<AgentPoolsGet200Response | AgentPoolsGetdefaultResponse>;
  /** Creates or updates an agent pool in the specified managed cluster. */
  put(
    options: AgentPoolsCreateOrUpdateParameters
  ): StreamableMethod<
    | AgentPoolsCreateOrUpdate200Response
    | AgentPoolsCreateOrUpdate201Response
    | AgentPoolsCreateOrUpdatedefaultResponse
  >;
  /** Deletes an agent pool in the specified managed cluster. */
  delete(
    options?: AgentPoolsDeleteParameters
  ): StreamableMethod<
    | AgentPoolsDelete202Response
    | AgentPoolsDelete204Response
    | AgentPoolsDeletedefaultResponse
  >;
}

export interface AgentPoolsGetUpgradeProfile {
  /** Gets the upgrade profile for an agent pool. */
  get(
    options?: AgentPoolsGetUpgradeProfileParameters
  ): StreamableMethod<
    | AgentPoolsGetUpgradeProfile200Response
    | AgentPoolsGetUpgradeProfiledefaultResponse
  >;
}

export interface AgentPoolsGetAvailableAgentPoolVersions {
  /** See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle. */
  get(
    options?: AgentPoolsGetAvailableAgentPoolVersionsParameters
  ): StreamableMethod<AgentPoolsGetAvailableAgentPoolVersions200Response>;
}

export interface AgentPoolsUpgradeNodeImageVersion {
  /** Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade */
  post(
    options?: AgentPoolsUpgradeNodeImageVersionParameters
  ): StreamableMethod<
    | AgentPoolsUpgradeNodeImageVersion200Response
    | AgentPoolsUpgradeNodeImageVersion202Response
    | AgentPoolsUpgradeNodeImageVersiondefaultResponse
  >;
}

export interface PrivateEndpointConnectionsList {
  /** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
  get(
    options?: PrivateEndpointConnectionsListParameters
  ): StreamableMethod<
    | PrivateEndpointConnectionsList200Response
    | PrivateEndpointConnectionsListdefaultResponse
  >;
}

export interface PrivateEndpointConnectionsGet {
  /** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
  get(
    options?: PrivateEndpointConnectionsGetParameters
  ): StreamableMethod<
    | PrivateEndpointConnectionsGet200Response
    | PrivateEndpointConnectionsGetdefaultResponse
  >;
  /** Updates a private endpoint connection. */
  put(
    options: PrivateEndpointConnectionsUpdateParameters
  ): StreamableMethod<
    | PrivateEndpointConnectionsUpdate200Response
    | PrivateEndpointConnectionsUpdatedefaultResponse
  >;
  /** Deletes a private endpoint connection. */
  delete(
    options?: PrivateEndpointConnectionsDeleteParameters
  ): StreamableMethod<
    | PrivateEndpointConnectionsDelete200Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeletedefaultResponse
  >;
}

export interface PrivateLinkResourcesList {
  /** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
  get(
    options?: PrivateLinkResourcesListParameters
  ): StreamableMethod<
    | PrivateLinkResourcesList200Response
    | PrivateLinkResourcesListdefaultResponse
  >;
}

export interface ResolvePrivateLinkServiceIdPost {
  /** Gets the private link service ID for the specified managed cluster. */
  post(
    options: ResolvePrivateLinkServiceIdPostParameters
  ): StreamableMethod<
    | ResolvePrivateLinkServiceIdPost200Response
    | ResolvePrivateLinkServiceIdPostdefaultResponse
  >;
}

export interface SnapshotsList {
  /** Gets a list of snapshots in the specified subscription. */
  get(
    options?: SnapshotsListParameters
  ): StreamableMethod<SnapshotsList200Response | SnapshotsListdefaultResponse>;
}

export interface SnapshotsListByResourceGroup {
  /** Lists snapshots in the specified subscription and resource group. */
  get(
    options?: SnapshotsListByResourceGroupParameters
  ): StreamableMethod<
    | SnapshotsListByResourceGroup200Response
    | SnapshotsListByResourceGroupdefaultResponse
  >;
}

export interface SnapshotsGet {
  /** Gets a snapshot. */
  get(
    options?: SnapshotsGetParameters
  ): StreamableMethod<SnapshotsGet200Response | SnapshotsGetdefaultResponse>;
  /** Creates or updates a snapshot. */
  put(
    options: SnapshotsCreateOrUpdateParameters
  ): StreamableMethod<
    | SnapshotsCreateOrUpdate200Response
    | SnapshotsCreateOrUpdate201Response
    | SnapshotsCreateOrUpdatedefaultResponse
  >;
  /** Updates tags on a snapshot. */
  patch(
    options: SnapshotsUpdateTagsParameters
  ): StreamableMethod<
    SnapshotsUpdateTags200Response | SnapshotsUpdateTagsdefaultResponse
  >;
  /** Deletes a snapshot. */
  delete(
    options?: SnapshotsDeleteParameters
  ): StreamableMethod<
    | SnapshotsDelete200Response
    | SnapshotsDelete204Response
    | SnapshotsDeletedefaultResponse
  >;
}

export interface ManagedClusterSnapshotsList {
  /** Gets a list of managed cluster snapshots in the specified subscription. */
  get(
    options?: ManagedClusterSnapshotsListParameters
  ): StreamableMethod<
    | ManagedClusterSnapshotsList200Response
    | ManagedClusterSnapshotsListdefaultResponse
  >;
}

export interface ManagedClusterSnapshotsListByResourceGroup {
  /** Lists managed cluster snapshots in the specified subscription and resource group. */
  get(
    options?: ManagedClusterSnapshotsListByResourceGroupParameters
  ): StreamableMethod<
    | ManagedClusterSnapshotsListByResourceGroup200Response
    | ManagedClusterSnapshotsListByResourceGroupdefaultResponse
  >;
}

export interface ManagedClusterSnapshotsGet {
  /** Gets a managed cluster snapshot. */
  get(
    options?: ManagedClusterSnapshotsGetParameters
  ): StreamableMethod<
    | ManagedClusterSnapshotsGet200Response
    | ManagedClusterSnapshotsGetdefaultResponse
  >;
  /** Creates or updates a managed cluster snapshot. */
  put(
    options: ManagedClusterSnapshotsCreateOrUpdateParameters
  ): StreamableMethod<
    | ManagedClusterSnapshotsCreateOrUpdate200Response
    | ManagedClusterSnapshotsCreateOrUpdate201Response
    | ManagedClusterSnapshotsCreateOrUpdatedefaultResponse
  >;
  /** Updates tags on a managed cluster snapshot. */
  patch(
    options: ManagedClusterSnapshotsUpdateTagsParameters
  ): StreamableMethod<
    | ManagedClusterSnapshotsUpdateTags200Response
    | ManagedClusterSnapshotsUpdateTagsdefaultResponse
  >;
  /** Deletes a managed cluster snapshot. */
  delete(
    options?: ManagedClusterSnapshotsDeleteParameters
  ): StreamableMethod<
    | ManagedClusterSnapshotsDelete200Response
    | ManagedClusterSnapshotsDelete204Response
    | ManagedClusterSnapshotsDeletedefaultResponse
  >;
}

export interface TrustedAccessRolesList {
  /** List supported trusted access roles. */
  get(
    options?: TrustedAccessRolesListParameters
  ): StreamableMethod<
    TrustedAccessRolesList200Response | TrustedAccessRolesListdefaultResponse
  >;
}

export interface TrustedAccessRoleBindingsList {
  /** List trusted access role bindings. */
  get(
    options?: TrustedAccessRoleBindingsListParameters
  ): StreamableMethod<
    | TrustedAccessRoleBindingsList200Response
    | TrustedAccessRoleBindingsListdefaultResponse
  >;
}

export interface TrustedAccessRoleBindingsGet {
  /** Get a trusted access role binding. */
  get(
    options?: TrustedAccessRoleBindingsGetParameters
  ): StreamableMethod<
    | TrustedAccessRoleBindingsGet200Response
    | TrustedAccessRoleBindingsGetdefaultResponse
  >;
  /** Create or update a trusted access role binding */
  put(
    options: TrustedAccessRoleBindingsCreateOrUpdateParameters
  ): StreamableMethod<
    | TrustedAccessRoleBindingsCreateOrUpdate200Response
    | TrustedAccessRoleBindingsCreateOrUpdatedefaultResponse
  >;
  /** Delete a trusted access role binding. */
  delete(
    options?: TrustedAccessRoleBindingsDeleteParameters
  ): StreamableMethod<
    | TrustedAccessRoleBindingsDelete200Response
    | TrustedAccessRoleBindingsDelete204Response
    | TrustedAccessRoleBindingsDeletedefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.ContainerService/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.ContainerService/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/locations/\{location\}/osOptions/default' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/osOptions/default",
    subscriptionId: string,
    location: string
  ): ManagedClustersGetOSOptions;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/managedClusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters",
    subscriptionId: string
  ): ManagedClustersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters",
    subscriptionId: string,
    resourceGroupName: string
  ): ManagedClustersListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/upgradeProfiles/default' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeProfiles/default",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersGetUpgradeProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/accessProfiles/\{roleName\}/listCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/accessProfiles/{roleName}/listCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    roleName: string
  ): ManagedClustersGetAccessProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/listClusterAdminCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterAdminCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersListClusterAdminCredentials;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/listClusterUserCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterUserCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersListClusterUserCredentials;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/listClusterMonitoringUserCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterMonitoringUserCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersListClusterMonitoringUserCredentials;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/resetServicePrincipalProfile' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersResetServicePrincipalProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/resetAADProfile' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersResetAADProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/rotateClusterCertificates' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersRotateClusterCertificates;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/rotateServiceAccountSigningKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersRotateServiceAccountSigningKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/stop' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersStop;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/start' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersStart;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/runCommand' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersRunCommand;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/commandResults/\{commandId\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/commandResults/{commandId}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    commandId: string
  ): ManagedClustersGetCommandResult;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/outboundNetworkDependenciesEndpoints' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/outboundNetworkDependenciesEndpoints",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClustersListOutboundNetworkDependenciesEndpoints;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/maintenanceConfigurations' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): MaintenanceConfigurationsListByManagedCluster;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/maintenanceConfigurations/\{configName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    configName: string
  ): MaintenanceConfigurationsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): AgentPoolsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools/\{agentPoolName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string
  ): AgentPoolsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools/\{agentPoolName\}/upgradeProfiles/default' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeProfiles/default",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string
  ): AgentPoolsGetUpgradeProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/availableAgentPoolVersions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/availableAgentPoolVersions",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): AgentPoolsGetAvailableAgentPoolVersions;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools/\{agentPoolName\}/upgradeNodeImageVersion' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string
  ): AgentPoolsUpgradeNodeImageVersion;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/privateEndpointConnections' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): PrivateEndpointConnectionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/privateEndpointConnections/\{privateEndpointConnectionName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    privateEndpointConnectionName: string
  ): PrivateEndpointConnectionsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/privateLinkResources' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateLinkResources",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): PrivateLinkResourcesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/resolvePrivateLinkServiceId' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resolvePrivateLinkServiceId",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ResolvePrivateLinkServiceIdPost;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/snapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/snapshots",
    subscriptionId: string
  ): SnapshotsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/snapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots",
    subscriptionId: string,
    resourceGroupName: string
  ): SnapshotsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/snapshots/\{resourceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): SnapshotsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/managedclustersnapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedclustersnapshots",
    subscriptionId: string
  ): ManagedClusterSnapshotsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedclustersnapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots",
    subscriptionId: string,
    resourceGroupName: string
  ): ManagedClusterSnapshotsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedclustersnapshots/\{resourceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots/{resourceName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): ManagedClusterSnapshotsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/locations/\{location\}/trustedAccessRoles' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/trustedAccessRoles",
    subscriptionId: string,
    location: string
  ): TrustedAccessRolesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/trustedAccessRoleBindings' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string
  ): TrustedAccessRoleBindingsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/trustedAccessRoleBindings/\{trustedAccessRoleBindingName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string
  ): TrustedAccessRoleBindingsGet;
}

export type ContainerServiceClient = Client & {
  path: Routes;
};
