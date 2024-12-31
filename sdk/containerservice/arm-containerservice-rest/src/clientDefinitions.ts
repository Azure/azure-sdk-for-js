// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
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
  TrustedAccessRoleBindingsDeleteParameters,
} from "./parameters.js";
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
  AgentPoolsGetAvailableAgentPoolVersions200Response,
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
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** Gets a list of operations. */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<OperationsList200Response | OperationsListDefaultResponse>;
}

export interface ManagedClustersGetOSOptions {
  /** Gets supported OS options in the specified subscription. */
  get(
    options?: ManagedClustersGetOSOptionsParameters,
  ): StreamableMethod<
    ManagedClustersGetOSOptions200Response | ManagedClustersGetOSOptionsDefaultResponse
  >;
}

export interface ManagedClustersList {
  /** Gets a list of managed clusters in the specified subscription. */
  get(
    options?: ManagedClustersListParameters,
  ): StreamableMethod<ManagedClustersList200Response | ManagedClustersListDefaultResponse>;
}

export interface ManagedClustersListByResourceGroup {
  /** Lists managed clusters in the specified subscription and resource group. */
  get(
    options?: ManagedClustersListByResourceGroupParameters,
  ): StreamableMethod<
    | ManagedClustersListByResourceGroup200Response
    | ManagedClustersListByResourceGroupDefaultResponse
  >;
}

export interface ManagedClustersGetUpgradeProfile {
  /** Gets the upgrade profile of a managed cluster. */
  get(
    options?: ManagedClustersGetUpgradeProfileParameters,
  ): StreamableMethod<
    ManagedClustersGetUpgradeProfile200Response | ManagedClustersGetUpgradeProfileDefaultResponse
  >;
}

export interface ManagedClustersGetAccessProfile {
  /** **WARNING**: This API will be deprecated. Instead use [ListClusterUserCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusterusercredentials) or [ListClusterAdminCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusteradmincredentials) . */
  post(
    options?: ManagedClustersGetAccessProfileParameters,
  ): StreamableMethod<
    ManagedClustersGetAccessProfile200Response | ManagedClustersGetAccessProfileDefaultResponse
  >;
}

export interface ManagedClustersListClusterAdminCredentials {
  /** Lists the admin credentials of a managed cluster. */
  post(
    options?: ManagedClustersListClusterAdminCredentialsParameters,
  ): StreamableMethod<
    | ManagedClustersListClusterAdminCredentials200Response
    | ManagedClustersListClusterAdminCredentialsDefaultResponse
  >;
}

export interface ManagedClustersListClusterUserCredentials {
  /** Lists the user credentials of a managed cluster. */
  post(
    options?: ManagedClustersListClusterUserCredentialsParameters,
  ): StreamableMethod<
    | ManagedClustersListClusterUserCredentials200Response
    | ManagedClustersListClusterUserCredentialsDefaultResponse
  >;
}

export interface ManagedClustersListClusterMonitoringUserCredentials {
  /** Lists the cluster monitoring user credentials of a managed cluster. */
  post(
    options?: ManagedClustersListClusterMonitoringUserCredentialsParameters,
  ): StreamableMethod<
    | ManagedClustersListClusterMonitoringUserCredentials200Response
    | ManagedClustersListClusterMonitoringUserCredentialsDefaultResponse
  >;
}

export interface ManagedClustersGet {
  /** Gets a managed cluster. */
  get(
    options?: ManagedClustersGetParameters,
  ): StreamableMethod<ManagedClustersGet200Response | ManagedClustersGetDefaultResponse>;
  /** Creates or updates a managed cluster. */
  put(
    options: ManagedClustersCreateOrUpdateParameters,
  ): StreamableMethod<
    | ManagedClustersCreateOrUpdate200Response
    | ManagedClustersCreateOrUpdate201Response
    | ManagedClustersCreateOrUpdateDefaultResponse
  >;
  /** Updates tags on a managed cluster. */
  patch(
    options: ManagedClustersUpdateTagsParameters,
  ): StreamableMethod<
    ManagedClustersUpdateTags200Response | ManagedClustersUpdateTagsDefaultResponse
  >;
  /** Deletes a managed cluster. */
  delete(
    options?: ManagedClustersDeleteParameters,
  ): StreamableMethod<
    | ManagedClustersDelete202Response
    | ManagedClustersDelete204Response
    | ManagedClustersDeleteDefaultResponse
  >;
}

export interface ManagedClustersResetServicePrincipalProfile {
  /** This action cannot be performed on a cluster that is not using a service principal */
  post(
    options: ManagedClustersResetServicePrincipalProfileParameters,
  ): StreamableMethod<
    | ManagedClustersResetServicePrincipalProfile200Response
    | ManagedClustersResetServicePrincipalProfile202Response
    | ManagedClustersResetServicePrincipalProfileDefaultResponse
  >;
}

export interface ManagedClustersResetAADProfile {
  /** Reset the AAD Profile of a managed cluster. */
  post(
    options: ManagedClustersResetAADProfileParameters,
  ): StreamableMethod<
    | ManagedClustersResetAADProfile200Response
    | ManagedClustersResetAADProfile202Response
    | ManagedClustersResetAADProfileDefaultResponse
  >;
}

export interface ManagedClustersRotateClusterCertificates {
  /** See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates. */
  post(
    options?: ManagedClustersRotateClusterCertificatesParameters,
  ): StreamableMethod<
    | ManagedClustersRotateClusterCertificates202Response
    | ManagedClustersRotateClusterCertificates204Response
    | ManagedClustersRotateClusterCertificatesDefaultResponse
  >;
}

export interface ManagedClustersRotateServiceAccountSigningKeys {
  /** Rotates the service account signing keys of a managed cluster. */
  post(
    options?: ManagedClustersRotateServiceAccountSigningKeysParameters,
  ): StreamableMethod<
    | ManagedClustersRotateServiceAccountSigningKeys202Response
    | ManagedClustersRotateServiceAccountSigningKeys204Response
    | ManagedClustersRotateServiceAccountSigningKeysDefaultResponse
  >;
}

export interface ManagedClustersStop {
  /** This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster. */
  post(
    options?: ManagedClustersStopParameters,
  ): StreamableMethod<
    | ManagedClustersStop202Response
    | ManagedClustersStop204Response
    | ManagedClustersStopDefaultResponse
  >;
}

export interface ManagedClustersStart {
  /** See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster. */
  post(
    options?: ManagedClustersStartParameters,
  ): StreamableMethod<
    | ManagedClustersStart202Response
    | ManagedClustersStart204Response
    | ManagedClustersStartDefaultResponse
  >;
}

export interface ManagedClustersRunCommand {
  /** AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview). */
  post(
    options: ManagedClustersRunCommandParameters,
  ): StreamableMethod<
    | ManagedClustersRunCommand200Response
    | ManagedClustersRunCommand202Response
    | ManagedClustersRunCommandDefaultResponse
  >;
}

export interface ManagedClustersGetCommandResult {
  /** Gets the results of a command which has been run on the Managed Cluster. */
  get(
    options?: ManagedClustersGetCommandResultParameters,
  ): StreamableMethod<
    | ManagedClustersGetCommandResult200Response
    | ManagedClustersGetCommandResult202Response
    | ManagedClustersGetCommandResultDefaultResponse
  >;
}

export interface ManagedClustersListOutboundNetworkDependenciesEndpoints {
  /** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint. */
  get(
    options?: ManagedClustersListOutboundNetworkDependenciesEndpointsParameters,
  ): StreamableMethod<
    | ManagedClustersListOutboundNetworkDependenciesEndpoints200Response
    | ManagedClustersListOutboundNetworkDependenciesEndpointsDefaultResponse
  >;
}

export interface MaintenanceConfigurationsListByManagedCluster {
  /** Gets a list of maintenance configurations in the specified managed cluster. */
  get(
    options?: MaintenanceConfigurationsListByManagedClusterParameters,
  ): StreamableMethod<
    | MaintenanceConfigurationsListByManagedCluster200Response
    | MaintenanceConfigurationsListByManagedClusterDefaultResponse
  >;
}

export interface MaintenanceConfigurationsGet {
  /** Gets the specified maintenance configuration of a managed cluster. */
  get(
    options?: MaintenanceConfigurationsGetParameters,
  ): StreamableMethod<
    MaintenanceConfigurationsGet200Response | MaintenanceConfigurationsGetDefaultResponse
  >;
  /** Creates or updates a maintenance configuration in the specified managed cluster. */
  put(
    options: MaintenanceConfigurationsCreateOrUpdateParameters,
  ): StreamableMethod<
    | MaintenanceConfigurationsCreateOrUpdate200Response
    | MaintenanceConfigurationsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a maintenance configuration. */
  delete(
    options?: MaintenanceConfigurationsDeleteParameters,
  ): StreamableMethod<
    | MaintenanceConfigurationsDelete200Response
    | MaintenanceConfigurationsDelete204Response
    | MaintenanceConfigurationsDeleteDefaultResponse
  >;
}

export interface AgentPoolsList {
  /** Gets a list of agent pools in the specified managed cluster. */
  get(
    options?: AgentPoolsListParameters,
  ): StreamableMethod<AgentPoolsList200Response | AgentPoolsListDefaultResponse>;
}

export interface AgentPoolsGet {
  /** Gets the specified managed cluster agent pool. */
  get(
    options?: AgentPoolsGetParameters,
  ): StreamableMethod<AgentPoolsGet200Response | AgentPoolsGetDefaultResponse>;
  /** Creates or updates an agent pool in the specified managed cluster. */
  put(
    options: AgentPoolsCreateOrUpdateParameters,
  ): StreamableMethod<
    | AgentPoolsCreateOrUpdate200Response
    | AgentPoolsCreateOrUpdate201Response
    | AgentPoolsCreateOrUpdateDefaultResponse
  >;
  /** Deletes an agent pool in the specified managed cluster. */
  delete(
    options?: AgentPoolsDeleteParameters,
  ): StreamableMethod<
    AgentPoolsDelete202Response | AgentPoolsDelete204Response | AgentPoolsDeleteDefaultResponse
  >;
}

export interface AgentPoolsGetUpgradeProfile {
  /** Gets the upgrade profile for an agent pool. */
  get(
    options?: AgentPoolsGetUpgradeProfileParameters,
  ): StreamableMethod<
    AgentPoolsGetUpgradeProfile200Response | AgentPoolsGetUpgradeProfileDefaultResponse
  >;
}

export interface AgentPoolsGetAvailableAgentPoolVersions {
  /** See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle. */
  get(
    options?: AgentPoolsGetAvailableAgentPoolVersionsParameters,
  ): StreamableMethod<AgentPoolsGetAvailableAgentPoolVersions200Response>;
}

export interface AgentPoolsUpgradeNodeImageVersion {
  /** Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade */
  post(
    options?: AgentPoolsUpgradeNodeImageVersionParameters,
  ): StreamableMethod<
    | AgentPoolsUpgradeNodeImageVersion200Response
    | AgentPoolsUpgradeNodeImageVersion202Response
    | AgentPoolsUpgradeNodeImageVersionDefaultResponse
  >;
}

export interface PrivateEndpointConnectionsList {
  /** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
  get(
    options?: PrivateEndpointConnectionsListParameters,
  ): StreamableMethod<
    PrivateEndpointConnectionsList200Response | PrivateEndpointConnectionsListDefaultResponse
  >;
}

export interface PrivateEndpointConnectionsGet {
  /** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
  get(
    options?: PrivateEndpointConnectionsGetParameters,
  ): StreamableMethod<
    PrivateEndpointConnectionsGet200Response | PrivateEndpointConnectionsGetDefaultResponse
  >;
  /** Updates a private endpoint connection. */
  put(
    options: PrivateEndpointConnectionsUpdateParameters,
  ): StreamableMethod<
    PrivateEndpointConnectionsUpdate200Response | PrivateEndpointConnectionsUpdateDefaultResponse
  >;
  /** Deletes a private endpoint connection. */
  delete(
    options?: PrivateEndpointConnectionsDeleteParameters,
  ): StreamableMethod<
    | PrivateEndpointConnectionsDelete200Response
    | PrivateEndpointConnectionsDelete204Response
    | PrivateEndpointConnectionsDeleteDefaultResponse
  >;
}

export interface PrivateLinkResourcesList {
  /** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
  get(
    options?: PrivateLinkResourcesListParameters,
  ): StreamableMethod<
    PrivateLinkResourcesList200Response | PrivateLinkResourcesListDefaultResponse
  >;
}

export interface ResolvePrivateLinkServiceIdPost {
  /** Gets the private link service ID for the specified managed cluster. */
  post(
    options: ResolvePrivateLinkServiceIdPostParameters,
  ): StreamableMethod<
    ResolvePrivateLinkServiceIdPost200Response | ResolvePrivateLinkServiceIdPostDefaultResponse
  >;
}

export interface SnapshotsList {
  /** Gets a list of snapshots in the specified subscription. */
  get(
    options?: SnapshotsListParameters,
  ): StreamableMethod<SnapshotsList200Response | SnapshotsListDefaultResponse>;
}

export interface SnapshotsListByResourceGroup {
  /** Lists snapshots in the specified subscription and resource group. */
  get(
    options?: SnapshotsListByResourceGroupParameters,
  ): StreamableMethod<
    SnapshotsListByResourceGroup200Response | SnapshotsListByResourceGroupDefaultResponse
  >;
}

export interface SnapshotsGet {
  /** Gets a snapshot. */
  get(
    options?: SnapshotsGetParameters,
  ): StreamableMethod<SnapshotsGet200Response | SnapshotsGetDefaultResponse>;
  /** Creates or updates a snapshot. */
  put(
    options: SnapshotsCreateOrUpdateParameters,
  ): StreamableMethod<
    | SnapshotsCreateOrUpdate200Response
    | SnapshotsCreateOrUpdate201Response
    | SnapshotsCreateOrUpdateDefaultResponse
  >;
  /** Updates tags on a snapshot. */
  patch(
    options: SnapshotsUpdateTagsParameters,
  ): StreamableMethod<SnapshotsUpdateTags200Response | SnapshotsUpdateTagsDefaultResponse>;
  /** Deletes a snapshot. */
  delete(
    options?: SnapshotsDeleteParameters,
  ): StreamableMethod<
    SnapshotsDelete200Response | SnapshotsDelete204Response | SnapshotsDeleteDefaultResponse
  >;
}

export interface ManagedClusterSnapshotsList {
  /** Gets a list of managed cluster snapshots in the specified subscription. */
  get(
    options?: ManagedClusterSnapshotsListParameters,
  ): StreamableMethod<
    ManagedClusterSnapshotsList200Response | ManagedClusterSnapshotsListDefaultResponse
  >;
}

export interface ManagedClusterSnapshotsListByResourceGroup {
  /** Lists managed cluster snapshots in the specified subscription and resource group. */
  get(
    options?: ManagedClusterSnapshotsListByResourceGroupParameters,
  ): StreamableMethod<
    | ManagedClusterSnapshotsListByResourceGroup200Response
    | ManagedClusterSnapshotsListByResourceGroupDefaultResponse
  >;
}

export interface ManagedClusterSnapshotsGet {
  /** Gets a managed cluster snapshot. */
  get(
    options?: ManagedClusterSnapshotsGetParameters,
  ): StreamableMethod<
    ManagedClusterSnapshotsGet200Response | ManagedClusterSnapshotsGetDefaultResponse
  >;
  /** Creates or updates a managed cluster snapshot. */
  put(
    options: ManagedClusterSnapshotsCreateOrUpdateParameters,
  ): StreamableMethod<
    | ManagedClusterSnapshotsCreateOrUpdate200Response
    | ManagedClusterSnapshotsCreateOrUpdate201Response
    | ManagedClusterSnapshotsCreateOrUpdateDefaultResponse
  >;
  /** Updates tags on a managed cluster snapshot. */
  patch(
    options: ManagedClusterSnapshotsUpdateTagsParameters,
  ): StreamableMethod<
    ManagedClusterSnapshotsUpdateTags200Response | ManagedClusterSnapshotsUpdateTagsDefaultResponse
  >;
  /** Deletes a managed cluster snapshot. */
  delete(
    options?: ManagedClusterSnapshotsDeleteParameters,
  ): StreamableMethod<
    | ManagedClusterSnapshotsDelete200Response
    | ManagedClusterSnapshotsDelete204Response
    | ManagedClusterSnapshotsDeleteDefaultResponse
  >;
}

export interface TrustedAccessRolesList {
  /** List supported trusted access roles. */
  get(
    options?: TrustedAccessRolesListParameters,
  ): StreamableMethod<TrustedAccessRolesList200Response | TrustedAccessRolesListDefaultResponse>;
}

export interface TrustedAccessRoleBindingsList {
  /** List trusted access role bindings. */
  get(
    options?: TrustedAccessRoleBindingsListParameters,
  ): StreamableMethod<
    TrustedAccessRoleBindingsList200Response | TrustedAccessRoleBindingsListDefaultResponse
  >;
}

export interface TrustedAccessRoleBindingsGet {
  /** Get a trusted access role binding. */
  get(
    options?: TrustedAccessRoleBindingsGetParameters,
  ): StreamableMethod<
    TrustedAccessRoleBindingsGet200Response | TrustedAccessRoleBindingsGetDefaultResponse
  >;
  /** Create or update a trusted access role binding */
  put(
    options: TrustedAccessRoleBindingsCreateOrUpdateParameters,
  ): StreamableMethod<
    | TrustedAccessRoleBindingsCreateOrUpdate200Response
    | TrustedAccessRoleBindingsCreateOrUpdateDefaultResponse
  >;
  /** Delete a trusted access role binding. */
  delete(
    options?: TrustedAccessRoleBindingsDeleteParameters,
  ): StreamableMethod<
    | TrustedAccessRoleBindingsDelete200Response
    | TrustedAccessRoleBindingsDelete204Response
    | TrustedAccessRoleBindingsDeleteDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.ContainerService/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.ContainerService/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/locations/\{location\}/osOptions/default' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/osOptions/default",
    subscriptionId: string,
    location: string,
  ): ManagedClustersGetOSOptions;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/managedClusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters",
    subscriptionId: string,
  ): ManagedClustersList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters",
    subscriptionId: string,
    resourceGroupName: string,
  ): ManagedClustersListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/upgradeProfiles/default' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeProfiles/default",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersGetUpgradeProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/accessProfiles/\{roleName\}/listCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/accessProfiles/{roleName}/listCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    roleName: string,
  ): ManagedClustersGetAccessProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/listClusterAdminCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterAdminCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersListClusterAdminCredentials;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/listClusterUserCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterUserCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersListClusterUserCredentials;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/listClusterMonitoringUserCredential' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterMonitoringUserCredential",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersListClusterMonitoringUserCredentials;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/resetServicePrincipalProfile' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersResetServicePrincipalProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/resetAADProfile' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetAADProfile",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersResetAADProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/rotateClusterCertificates' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersRotateClusterCertificates;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/rotateServiceAccountSigningKeys' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersRotateServiceAccountSigningKeys;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/stop' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersStop;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/start' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersStart;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/runCommand' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersRunCommand;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/commandResults/\{commandId\}' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/commandResults/{commandId}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    commandId: string,
  ): ManagedClustersGetCommandResult;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/outboundNetworkDependenciesEndpoints' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/outboundNetworkDependenciesEndpoints",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClustersListOutboundNetworkDependenciesEndpoints;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/maintenanceConfigurations' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): MaintenanceConfigurationsListByManagedCluster;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/maintenanceConfigurations/\{configName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    configName: string,
  ): MaintenanceConfigurationsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): AgentPoolsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools/\{agentPoolName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
  ): AgentPoolsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools/\{agentPoolName\}/upgradeProfiles/default' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeProfiles/default",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
  ): AgentPoolsGetUpgradeProfile;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/availableAgentPoolVersions' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/availableAgentPoolVersions",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): AgentPoolsGetAvailableAgentPoolVersions;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/agentPools/\{agentPoolName\}/upgradeNodeImageVersion' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
  ): AgentPoolsUpgradeNodeImageVersion;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/privateEndpointConnections' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): PrivateEndpointConnectionsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/privateEndpointConnections/\{privateEndpointConnectionName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    privateEndpointConnectionName: string,
  ): PrivateEndpointConnectionsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/privateLinkResources' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateLinkResources",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): PrivateLinkResourcesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/resolvePrivateLinkServiceId' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resolvePrivateLinkServiceId",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ResolvePrivateLinkServiceIdPost;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/snapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/snapshots",
    subscriptionId: string,
  ): SnapshotsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/snapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots",
    subscriptionId: string,
    resourceGroupName: string,
  ): SnapshotsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/snapshots/\{resourceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): SnapshotsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/managedclustersnapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedclustersnapshots",
    subscriptionId: string,
  ): ManagedClusterSnapshotsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedclustersnapshots' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots",
    subscriptionId: string,
    resourceGroupName: string,
  ): ManagedClusterSnapshotsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedclustersnapshots/\{resourceName\}' has methods for the following verbs: get, put, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedclustersnapshots/{resourceName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): ManagedClusterSnapshotsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.ContainerService/locations/\{location\}/trustedAccessRoles' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/trustedAccessRoles",
    subscriptionId: string,
    location: string,
  ): TrustedAccessRolesList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/trustedAccessRoleBindings' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
  ): TrustedAccessRoleBindingsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.ContainerService/managedClusters/\{resourceName\}/trustedAccessRoleBindings/\{trustedAccessRoleBindingName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}",
    subscriptionId: string,
    resourceGroupName: string,
    resourceName: string,
    trustedAccessRoleBindingName: string,
  ): TrustedAccessRoleBindingsGet;
}

export type ContainerServiceClient = Client & {
  path: Routes;
};
