// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AgentPool,
  MaintenanceConfiguration,
  ManagedCluster,
  ManagedClusterAADProfile,
  ManagedClusterServicePrincipalProfile,
  ManagedClusterSnapshot,
  PrivateEndpointConnection,
  PrivateLinkResource,
  RunCommandRequest,
  Snapshot,
  TagsObject,
  TrustedAccessRoleBinding,
} from "./models";

export type OperationsListParameters = RequestParameters;

export interface ManagedClustersGetOSOptionsQueryParamProperties {
  /** The resource type for which the OS options needs to be returned */
  "resource-type"?: string;
}

export interface ManagedClustersGetOSOptionsQueryParam {
  queryParameters?: ManagedClustersGetOSOptionsQueryParamProperties;
}

export type ManagedClustersGetOSOptionsParameters = ManagedClustersGetOSOptionsQueryParam &
  RequestParameters;
export type ManagedClustersListParameters = RequestParameters;
export type ManagedClustersListByResourceGroupParameters = RequestParameters;
export type ManagedClustersGetUpgradeProfileParameters = RequestParameters;
export type ManagedClustersGetAccessProfileParameters = RequestParameters;

export interface ManagedClustersListClusterAdminCredentialsQueryParamProperties {
  /** server fqdn type for credentials to be returned */
  "server-fqdn"?: string;
}

export interface ManagedClustersListClusterAdminCredentialsQueryParam {
  queryParameters?: ManagedClustersListClusterAdminCredentialsQueryParamProperties;
}

export type ManagedClustersListClusterAdminCredentialsParameters =
  ManagedClustersListClusterAdminCredentialsQueryParam & RequestParameters;

export interface ManagedClustersListClusterUserCredentialsQueryParamProperties {
  /** server fqdn type for credentials to be returned */
  "server-fqdn"?: string;
  /** Only apply to AAD clusters, specifies the format of returned kubeconfig. Format 'azure' will return azure auth-provider kubeconfig; format 'exec' will return exec format kubeconfig, which requires kubelogin binary in the path. */
  format?: "azure" | "exec";
}

export interface ManagedClustersListClusterUserCredentialsQueryParam {
  queryParameters?: ManagedClustersListClusterUserCredentialsQueryParamProperties;
}

export type ManagedClustersListClusterUserCredentialsParameters =
  ManagedClustersListClusterUserCredentialsQueryParam & RequestParameters;

export interface ManagedClustersListClusterMonitoringUserCredentialsQueryParamProperties {
  /** server fqdn type for credentials to be returned */
  "server-fqdn"?: string;
}

export interface ManagedClustersListClusterMonitoringUserCredentialsQueryParam {
  queryParameters?: ManagedClustersListClusterMonitoringUserCredentialsQueryParamProperties;
}

export type ManagedClustersListClusterMonitoringUserCredentialsParameters =
  ManagedClustersListClusterMonitoringUserCredentialsQueryParam & RequestParameters;
export type ManagedClustersGetParameters = RequestParameters;

export interface ManagedClustersCreateOrUpdateBodyParam {
  /** The managed cluster to create or update. */
  body: ManagedCluster;
}

export interface ManagedClustersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedClustersCreateOrUpdateParameters = ManagedClustersCreateOrUpdateMediaTypesParam &
  ManagedClustersCreateOrUpdateBodyParam &
  RequestParameters;

export interface ManagedClustersUpdateTagsBodyParam {
  /** Parameters supplied to the Update Managed Cluster Tags operation. */
  body: TagsObject;
}

export interface ManagedClustersUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedClustersUpdateTagsParameters = ManagedClustersUpdateTagsMediaTypesParam &
  ManagedClustersUpdateTagsBodyParam &
  RequestParameters;

export interface ManagedClustersDeleteQueryParamProperties {
  /** ignore-pod-disruption-budget=true to delete those pods on a node without considering Pod Disruption Budget */
  "ignore-pod-disruption-budget"?: boolean;
}

export interface ManagedClustersDeleteQueryParam {
  queryParameters?: ManagedClustersDeleteQueryParamProperties;
}

export type ManagedClustersDeleteParameters = ManagedClustersDeleteQueryParam & RequestParameters;

export interface ManagedClustersResetServicePrincipalProfileBodyParam {
  /** The service principal profile to set on the managed cluster. */
  body: ManagedClusterServicePrincipalProfile;
}

export interface ManagedClustersResetServicePrincipalProfileMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedClustersResetServicePrincipalProfileParameters =
  ManagedClustersResetServicePrincipalProfileMediaTypesParam &
    ManagedClustersResetServicePrincipalProfileBodyParam &
    RequestParameters;

export interface ManagedClustersResetAADProfileBodyParam {
  /** The AAD profile to set on the Managed Cluster */
  body: ManagedClusterAADProfile;
}

export interface ManagedClustersResetAADProfileMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedClustersResetAADProfileParameters =
  ManagedClustersResetAADProfileMediaTypesParam &
    ManagedClustersResetAADProfileBodyParam &
    RequestParameters;
export type ManagedClustersRotateClusterCertificatesParameters = RequestParameters;
export type ManagedClustersRotateServiceAccountSigningKeysParameters = RequestParameters;
export type ManagedClustersStopParameters = RequestParameters;
export type ManagedClustersStartParameters = RequestParameters;

export interface ManagedClustersRunCommandBodyParam {
  /** The run command request */
  body: RunCommandRequest;
}

export interface ManagedClustersRunCommandMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedClustersRunCommandParameters = ManagedClustersRunCommandMediaTypesParam &
  ManagedClustersRunCommandBodyParam &
  RequestParameters;
export type ManagedClustersGetCommandResultParameters = RequestParameters;
export type ManagedClustersListOutboundNetworkDependenciesEndpointsParameters = RequestParameters;
export type MaintenanceConfigurationsListByManagedClusterParameters = RequestParameters;
export type MaintenanceConfigurationsGetParameters = RequestParameters;

export interface MaintenanceConfigurationsCreateOrUpdateBodyParam {
  /** The maintenance configuration to create or update. */
  body: MaintenanceConfiguration;
}

export interface MaintenanceConfigurationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MaintenanceConfigurationsCreateOrUpdateParameters =
  MaintenanceConfigurationsCreateOrUpdateMediaTypesParam &
    MaintenanceConfigurationsCreateOrUpdateBodyParam &
    RequestParameters;
export type MaintenanceConfigurationsDeleteParameters = RequestParameters;
export type AgentPoolsListParameters = RequestParameters;
export type AgentPoolsGetParameters = RequestParameters;

export interface AgentPoolsCreateOrUpdateBodyParam {
  /** The agent pool to create or update. */
  body: AgentPool;
}

export interface AgentPoolsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AgentPoolsCreateOrUpdateParameters = AgentPoolsCreateOrUpdateMediaTypesParam &
  AgentPoolsCreateOrUpdateBodyParam &
  RequestParameters;

export interface AgentPoolsDeleteQueryParamProperties {
  /** ignore-pod-disruption-budget=true to delete those pods on a node without considering Pod Disruption Budget */
  "ignore-pod-disruption-budget"?: boolean;
}

export interface AgentPoolsDeleteQueryParam {
  queryParameters?: AgentPoolsDeleteQueryParamProperties;
}

export type AgentPoolsDeleteParameters = AgentPoolsDeleteQueryParam & RequestParameters;
export type AgentPoolsGetUpgradeProfileParameters = RequestParameters;
export type AgentPoolsGetAvailableAgentPoolVersionsParameters = RequestParameters;
export type AgentPoolsUpgradeNodeImageVersionParameters = RequestParameters;
export type PrivateEndpointConnectionsListParameters = RequestParameters;
export type PrivateEndpointConnectionsGetParameters = RequestParameters;

export interface PrivateEndpointConnectionsUpdateBodyParam {
  /** The updated private endpoint connection. */
  body: PrivateEndpointConnection;
}

export interface PrivateEndpointConnectionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PrivateEndpointConnectionsUpdateParameters =
  PrivateEndpointConnectionsUpdateMediaTypesParam &
    PrivateEndpointConnectionsUpdateBodyParam &
    RequestParameters;
export type PrivateEndpointConnectionsDeleteParameters = RequestParameters;
export type PrivateLinkResourcesListParameters = RequestParameters;

export interface ResolvePrivateLinkServiceIdPostBodyParam {
  /** Parameters required in order to resolve a private link service ID. */
  body: PrivateLinkResource;
}

export interface ResolvePrivateLinkServiceIdPostMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ResolvePrivateLinkServiceIdPostParameters =
  ResolvePrivateLinkServiceIdPostMediaTypesParam &
    ResolvePrivateLinkServiceIdPostBodyParam &
    RequestParameters;
export type SnapshotsListParameters = RequestParameters;
export type SnapshotsListByResourceGroupParameters = RequestParameters;
export type SnapshotsGetParameters = RequestParameters;

export interface SnapshotsCreateOrUpdateBodyParam {
  /** The snapshot to create or update. */
  body: Snapshot;
}

export interface SnapshotsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SnapshotsCreateOrUpdateParameters = SnapshotsCreateOrUpdateMediaTypesParam &
  SnapshotsCreateOrUpdateBodyParam &
  RequestParameters;

export interface SnapshotsUpdateTagsBodyParam {
  /** Parameters supplied to the Update snapshot Tags operation. */
  body: TagsObject;
}

export interface SnapshotsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SnapshotsUpdateTagsParameters = SnapshotsUpdateTagsMediaTypesParam &
  SnapshotsUpdateTagsBodyParam &
  RequestParameters;
export type SnapshotsDeleteParameters = RequestParameters;
export type ManagedClusterSnapshotsListParameters = RequestParameters;
export type ManagedClusterSnapshotsListByResourceGroupParameters = RequestParameters;
export type ManagedClusterSnapshotsGetParameters = RequestParameters;

export interface ManagedClusterSnapshotsCreateOrUpdateBodyParam {
  /** The managed cluster snapshot to create or update. */
  body: ManagedClusterSnapshot;
}

export interface ManagedClusterSnapshotsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedClusterSnapshotsCreateOrUpdateParameters =
  ManagedClusterSnapshotsCreateOrUpdateMediaTypesParam &
    ManagedClusterSnapshotsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ManagedClusterSnapshotsUpdateTagsBodyParam {
  /** Parameters supplied to the Update managed cluster snapshot Tags operation. */
  body: TagsObject;
}

export interface ManagedClusterSnapshotsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedClusterSnapshotsUpdateTagsParameters =
  ManagedClusterSnapshotsUpdateTagsMediaTypesParam &
    ManagedClusterSnapshotsUpdateTagsBodyParam &
    RequestParameters;
export type ManagedClusterSnapshotsDeleteParameters = RequestParameters;
export type TrustedAccessRolesListParameters = RequestParameters;
export type TrustedAccessRoleBindingsListParameters = RequestParameters;
export type TrustedAccessRoleBindingsGetParameters = RequestParameters;

export interface TrustedAccessRoleBindingsCreateOrUpdateBodyParam {
  /** A trusted access role binding */
  body: TrustedAccessRoleBinding;
}

export interface TrustedAccessRoleBindingsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TrustedAccessRoleBindingsCreateOrUpdateParameters =
  TrustedAccessRoleBindingsCreateOrUpdateMediaTypesParam &
    TrustedAccessRoleBindingsCreateOrUpdateBodyParam &
    RequestParameters;
export type TrustedAccessRoleBindingsDeleteParameters = RequestParameters;
