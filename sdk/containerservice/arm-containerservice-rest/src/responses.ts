// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  OperationListResultOutput,
  CloudErrorOutput,
  OSOptionProfileOutput,
  ManagedClusterListResultOutput,
  ManagedClusterUpgradeProfileOutput,
  ManagedClusterAccessProfileOutput,
  CredentialResultsOutput,
  ManagedClusterOutput,
  RunCommandResultOutput,
  OutboundEnvironmentEndpointCollectionOutput,
  MaintenanceConfigurationListResultOutput,
  MaintenanceConfigurationOutput,
  AgentPoolListResultOutput,
  AgentPoolOutput,
  AgentPoolUpgradeProfileOutput,
  AgentPoolAvailableVersionsOutput,
  PrivateEndpointConnectionListResultOutput,
  PrivateEndpointConnectionOutput,
  PrivateLinkResourcesListResultOutput,
  PrivateLinkResourceOutput,
  SnapshotListResultOutput,
  SnapshotOutput,
  ManagedClusterSnapshotListResultOutput,
  ManagedClusterSnapshotOutput,
  TrustedAccessRoleListResultOutput,
  TrustedAccessRoleBindingListResultOutput,
  TrustedAccessRoleBindingOutput,
} from "./outputModels.js";

/** Gets a list of operations. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

/** Gets a list of operations. */
export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets supported OS options in the specified subscription. */
export interface ManagedClustersGetOSOptions200Response extends HttpResponse {
  status: "200";
  body: OSOptionProfileOutput;
}

/** Gets supported OS options in the specified subscription. */
export interface ManagedClustersGetOSOptionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of managed clusters in the specified subscription. */
export interface ManagedClustersList200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterListResultOutput;
}

/** Gets a list of managed clusters in the specified subscription. */
export interface ManagedClustersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists managed clusters in the specified subscription and resource group. */
export interface ManagedClustersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterListResultOutput;
}

/** Lists managed clusters in the specified subscription and resource group. */
export interface ManagedClustersListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the upgrade profile of a managed cluster. */
export interface ManagedClustersGetUpgradeProfile200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterUpgradeProfileOutput;
}

/** Gets the upgrade profile of a managed cluster. */
export interface ManagedClustersGetUpgradeProfileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** **WARNING**: This API will be deprecated. Instead use [ListClusterUserCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusterusercredentials) or [ListClusterAdminCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusteradmincredentials) . */
export interface ManagedClustersGetAccessProfile200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterAccessProfileOutput;
}

/** **WARNING**: This API will be deprecated. Instead use [ListClusterUserCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusterusercredentials) or [ListClusterAdminCredentials](https://docs.microsoft.com/rest/api/aks/managedclusters/listclusteradmincredentials) . */
export interface ManagedClustersGetAccessProfileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists the admin credentials of a managed cluster. */
export interface ManagedClustersListClusterAdminCredentials200Response extends HttpResponse {
  status: "200";
  body: CredentialResultsOutput;
}

/** Lists the admin credentials of a managed cluster. */
export interface ManagedClustersListClusterAdminCredentialsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists the user credentials of a managed cluster. */
export interface ManagedClustersListClusterUserCredentials200Response extends HttpResponse {
  status: "200";
  body: CredentialResultsOutput;
}

/** Lists the user credentials of a managed cluster. */
export interface ManagedClustersListClusterUserCredentialsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists the cluster monitoring user credentials of a managed cluster. */
export interface ManagedClustersListClusterMonitoringUserCredentials200Response extends HttpResponse {
  status: "200";
  body: CredentialResultsOutput;
}

/** Lists the cluster monitoring user credentials of a managed cluster. */
export interface ManagedClustersListClusterMonitoringUserCredentialsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a managed cluster. */
export interface ManagedClustersGet200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterOutput;
}

/** Gets a managed cluster. */
export interface ManagedClustersGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a managed cluster. */
export interface ManagedClustersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterOutput;
}

/** Creates or updates a managed cluster. */
export interface ManagedClustersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ManagedClusterOutput;
}

/** Creates or updates a managed cluster. */
export interface ManagedClustersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags on a managed cluster. */
export interface ManagedClustersUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterOutput;
}

/** Updates tags on a managed cluster. */
export interface ManagedClustersUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a managed cluster. */
export interface ManagedClustersDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a managed cluster. */
export interface ManagedClustersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a managed cluster. */
export interface ManagedClustersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** This action cannot be performed on a cluster that is not using a service principal */
export interface ManagedClustersResetServicePrincipalProfile200Response extends HttpResponse {
  status: "200";
}

/** This action cannot be performed on a cluster that is not using a service principal */
export interface ManagedClustersResetServicePrincipalProfile202Response extends HttpResponse {
  status: "202";
}

/** This action cannot be performed on a cluster that is not using a service principal */
export interface ManagedClustersResetServicePrincipalProfileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Reset the AAD Profile of a managed cluster. */
export interface ManagedClustersResetAADProfile200Response extends HttpResponse {
  status: "200";
}

/** Reset the AAD Profile of a managed cluster. */
export interface ManagedClustersResetAADProfile202Response extends HttpResponse {
  status: "202";
}

/** Reset the AAD Profile of a managed cluster. */
export interface ManagedClustersResetAADProfileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates. */
export interface ManagedClustersRotateClusterCertificates202Response extends HttpResponse {
  status: "202";
}

/** See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates. */
export interface ManagedClustersRotateClusterCertificates204Response extends HttpResponse {
  status: "204";
}

/** See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates. */
export interface ManagedClustersRotateClusterCertificatesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Rotates the service account signing keys of a managed cluster. */
export interface ManagedClustersRotateServiceAccountSigningKeys202Response extends HttpResponse {
  status: "202";
}

/** Rotates the service account signing keys of a managed cluster. */
export interface ManagedClustersRotateServiceAccountSigningKeys204Response extends HttpResponse {
  status: "204";
}

/** Rotates the service account signing keys of a managed cluster. */
export interface ManagedClustersRotateServiceAccountSigningKeysDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster. */
export interface ManagedClustersStop202Response extends HttpResponse {
  status: "202";
}

/** This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster. */
export interface ManagedClustersStop204Response extends HttpResponse {
  status: "204";
}

/** This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster. */
export interface ManagedClustersStopDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster. */
export interface ManagedClustersStart202Response extends HttpResponse {
  status: "202";
}

/** See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster. */
export interface ManagedClustersStart204Response extends HttpResponse {
  status: "204";
}

/** See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster. */
export interface ManagedClustersStartDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview). */
export interface ManagedClustersRunCommand200Response extends HttpResponse {
  status: "200";
  body: RunCommandResultOutput;
}

/** AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview). */
export interface ManagedClustersRunCommand202Response extends HttpResponse {
  status: "202";
}

/** AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview). */
export interface ManagedClustersRunCommandDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the results of a command which has been run on the Managed Cluster. */
export interface ManagedClustersGetCommandResult200Response extends HttpResponse {
  status: "200";
  body: RunCommandResultOutput;
}

/** Gets the results of a command which has been run on the Managed Cluster. */
export interface ManagedClustersGetCommandResult202Response extends HttpResponse {
  status: "202";
}

/** Gets the results of a command which has been run on the Managed Cluster. */
export interface ManagedClustersGetCommandResultDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint. */
export interface ManagedClustersListOutboundNetworkDependenciesEndpoints200Response extends HttpResponse {
  status: "200";
  body: OutboundEnvironmentEndpointCollectionOutput;
}

/** Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint. */
export interface ManagedClustersListOutboundNetworkDependenciesEndpointsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of maintenance configurations in the specified managed cluster. */
export interface MaintenanceConfigurationsListByManagedCluster200Response extends HttpResponse {
  status: "200";
  body: MaintenanceConfigurationListResultOutput;
}

/** Gets a list of maintenance configurations in the specified managed cluster. */
export interface MaintenanceConfigurationsListByManagedClusterDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified maintenance configuration of a managed cluster. */
export interface MaintenanceConfigurationsGet200Response extends HttpResponse {
  status: "200";
  body: MaintenanceConfigurationOutput;
}

/** Gets the specified maintenance configuration of a managed cluster. */
export interface MaintenanceConfigurationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a maintenance configuration in the specified managed cluster. */
export interface MaintenanceConfigurationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: MaintenanceConfigurationOutput;
}

/** Creates or updates a maintenance configuration in the specified managed cluster. */
export interface MaintenanceConfigurationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a maintenance configuration. */
export interface MaintenanceConfigurationsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a maintenance configuration. */
export interface MaintenanceConfigurationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a maintenance configuration. */
export interface MaintenanceConfigurationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of agent pools in the specified managed cluster. */
export interface AgentPoolsList200Response extends HttpResponse {
  status: "200";
  body: AgentPoolListResultOutput;
}

/** Gets a list of agent pools in the specified managed cluster. */
export interface AgentPoolsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified managed cluster agent pool. */
export interface AgentPoolsGet200Response extends HttpResponse {
  status: "200";
  body: AgentPoolOutput;
}

/** Gets the specified managed cluster agent pool. */
export interface AgentPoolsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an agent pool in the specified managed cluster. */
export interface AgentPoolsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AgentPoolOutput;
}

/** Creates or updates an agent pool in the specified managed cluster. */
export interface AgentPoolsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: AgentPoolOutput;
}

/** Creates or updates an agent pool in the specified managed cluster. */
export interface AgentPoolsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes an agent pool in the specified managed cluster. */
export interface AgentPoolsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes an agent pool in the specified managed cluster. */
export interface AgentPoolsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes an agent pool in the specified managed cluster. */
export interface AgentPoolsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the upgrade profile for an agent pool. */
export interface AgentPoolsGetUpgradeProfile200Response extends HttpResponse {
  status: "200";
  body: AgentPoolUpgradeProfileOutput;
}

/** Gets the upgrade profile for an agent pool. */
export interface AgentPoolsGetUpgradeProfileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle. */
export interface AgentPoolsGetAvailableAgentPoolVersions200Response extends HttpResponse {
  status: "200";
  body: AgentPoolAvailableVersionsOutput;
}

/** Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade */
export interface AgentPoolsUpgradeNodeImageVersion200Response extends HttpResponse {
  status: "200";
}

export interface AgentPoolsUpgradeNodeImageVersion202Headers {
  /** URL to query for status of the operation. */
  "azure-asyncoperation"?: string;
}

/** Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade */
export interface AgentPoolsUpgradeNodeImageVersion202Response extends HttpResponse {
  status: "202";
  body: AgentPoolOutput;
  headers: RawHttpHeaders & AgentPoolsUpgradeNodeImageVersion202Headers;
}

/** Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade */
export interface AgentPoolsUpgradeNodeImageVersionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
export interface PrivateEndpointConnectionsList200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionListResultOutput;
}

/** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
export interface PrivateEndpointConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
export interface PrivateEndpointConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionOutput;
}

/** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
export interface PrivateEndpointConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a private endpoint connection. */
export interface PrivateEndpointConnectionsUpdate200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionOutput;
}

/** Updates a private endpoint connection. */
export interface PrivateEndpointConnectionsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a private endpoint connection. */
export interface PrivateEndpointConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a private endpoint connection. */
export interface PrivateEndpointConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a private endpoint connection. */
export interface PrivateEndpointConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
export interface PrivateLinkResourcesList200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourcesListResultOutput;
}

/** To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters */
export interface PrivateLinkResourcesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the private link service ID for the specified managed cluster. */
export interface ResolvePrivateLinkServiceIdPost200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourceOutput;
}

/** Gets the private link service ID for the specified managed cluster. */
export interface ResolvePrivateLinkServiceIdPostDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of snapshots in the specified subscription. */
export interface SnapshotsList200Response extends HttpResponse {
  status: "200";
  body: SnapshotListResultOutput;
}

/** Gets a list of snapshots in the specified subscription. */
export interface SnapshotsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists snapshots in the specified subscription and resource group. */
export interface SnapshotsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: SnapshotListResultOutput;
}

/** Lists snapshots in the specified subscription and resource group. */
export interface SnapshotsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a snapshot. */
export interface SnapshotsGet200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
}

/** Gets a snapshot. */
export interface SnapshotsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a snapshot. */
export interface SnapshotsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
}

/** Creates or updates a snapshot. */
export interface SnapshotsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SnapshotOutput;
}

/** Creates or updates a snapshot. */
export interface SnapshotsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags on a snapshot. */
export interface SnapshotsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: SnapshotOutput;
}

/** Updates tags on a snapshot. */
export interface SnapshotsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a snapshot. */
export interface SnapshotsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a snapshot. */
export interface SnapshotsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a snapshot. */
export interface SnapshotsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of managed cluster snapshots in the specified subscription. */
export interface ManagedClusterSnapshotsList200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterSnapshotListResultOutput;
}

/** Gets a list of managed cluster snapshots in the specified subscription. */
export interface ManagedClusterSnapshotsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists managed cluster snapshots in the specified subscription and resource group. */
export interface ManagedClusterSnapshotsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterSnapshotListResultOutput;
}

/** Lists managed cluster snapshots in the specified subscription and resource group. */
export interface ManagedClusterSnapshotsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a managed cluster snapshot. */
export interface ManagedClusterSnapshotsGet200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterSnapshotOutput;
}

/** Gets a managed cluster snapshot. */
export interface ManagedClusterSnapshotsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a managed cluster snapshot. */
export interface ManagedClusterSnapshotsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterSnapshotOutput;
}

/** Creates or updates a managed cluster snapshot. */
export interface ManagedClusterSnapshotsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ManagedClusterSnapshotOutput;
}

/** Creates or updates a managed cluster snapshot. */
export interface ManagedClusterSnapshotsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags on a managed cluster snapshot. */
export interface ManagedClusterSnapshotsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ManagedClusterSnapshotOutput;
}

/** Updates tags on a managed cluster snapshot. */
export interface ManagedClusterSnapshotsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a managed cluster snapshot. */
export interface ManagedClusterSnapshotsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a managed cluster snapshot. */
export interface ManagedClusterSnapshotsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a managed cluster snapshot. */
export interface ManagedClusterSnapshotsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List supported trusted access roles. */
export interface TrustedAccessRolesList200Response extends HttpResponse {
  status: "200";
  body: TrustedAccessRoleListResultOutput;
}

/** List supported trusted access roles. */
export interface TrustedAccessRolesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List trusted access role bindings. */
export interface TrustedAccessRoleBindingsList200Response extends HttpResponse {
  status: "200";
  body: TrustedAccessRoleBindingListResultOutput;
}

/** List trusted access role bindings. */
export interface TrustedAccessRoleBindingsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a trusted access role binding. */
export interface TrustedAccessRoleBindingsGet200Response extends HttpResponse {
  status: "200";
  body: TrustedAccessRoleBindingOutput;
}

/** Get a trusted access role binding. */
export interface TrustedAccessRoleBindingsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or update a trusted access role binding */
export interface TrustedAccessRoleBindingsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: TrustedAccessRoleBindingOutput;
}

/** Create or update a trusted access role binding */
export interface TrustedAccessRoleBindingsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete a trusted access role binding. */
export interface TrustedAccessRoleBindingsDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete a trusted access role binding. */
export interface TrustedAccessRoleBindingsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete a trusted access role binding. */
export interface TrustedAccessRoleBindingsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}
