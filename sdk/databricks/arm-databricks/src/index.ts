// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureDatabricksManagementClient } from "./azureDatabricksManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  ErrorResponse,
  ErrorInfo,
  ErrorDetail,
  Workspace,
  WorkspaceProperties,
  ComputeMode,
  WorkspaceCustomParameters,
  WorkspaceCustomStringParameter,
  CustomParameterType,
  WorkspaceNoPublicIPBooleanParameter,
  WorkspaceCustomBooleanParameter,
  WorkspaceEncryptionParameter,
  Encryption,
  KeySource,
  WorkspaceCustomObjectParameter,
  ProvisioningState,
  WorkspaceProviderAuthorization,
  CreatedBy,
  ManagedIdentityConfiguration,
  WorkspacePropertiesEncryption,
  EncryptionEntitiesDefinition,
  EncryptionV2,
  EncryptionKeySource,
  EncryptionV2KeyVaultProperties,
  ManagedDiskEncryption,
  ManagedDiskEncryptionKeyVaultProperties,
  EnhancedSecurityComplianceDefinition,
  AutomaticClusterUpdateDefinition,
  AutomaticClusterUpdateValue,
  ComplianceSecurityProfileDefinition,
  ComplianceSecurityProfileValue,
  EnhancedSecurityMonitoringDefinition,
  EnhancedSecurityMonitoringValue,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateLinkServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  PublicNetworkAccess,
  RequiredNsgRules,
  DefaultCatalogProperties,
  InitialType,
  WorkspacePropertiesAccessConnector,
  IdentityType,
  DefaultStorageFirewall,
  Sku,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  WorkspaceUpdate,
  AccessConnector,
  AccessConnectorProperties,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  AccessConnectorUpdate,
  OutboundEnvironmentEndpoint,
  EndpointDependency,
  EndpointDetail,
  GroupIdInformation,
  GroupIdInformationProperties,
  VirtualNetworkPeering,
  VirtualNetworkPeeringPropertiesFormat,
  VirtualNetworkPeeringPropertiesFormatDatabricksVirtualNetwork,
  AddressSpace,
  VirtualNetworkPeeringPropertiesFormatRemoteVirtualNetwork,
  PeeringState,
  PeeringProvisioningState,
} from "./models/index.js";
export {
  KnownComputeMode,
  KnownCustomParameterType,
  KnownKeySource,
  KnownProvisioningState,
  KnownEncryptionKeySource,
  KnownAutomaticClusterUpdateValue,
  KnownComplianceSecurityProfileValue,
  KnownEnhancedSecurityMonitoringValue,
  KnownPrivateLinkServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownPublicNetworkAccess,
  KnownRequiredNsgRules,
  KnownInitialType,
  KnownIdentityType,
  KnownDefaultStorageFirewall,
  KnownCreatedByType,
  KnownManagedServiceIdentityType,
  KnownPeeringState,
  KnownPeeringProvisioningState,
  KnownVersions,
} from "./models/index.js";
export type { AzureDatabricksManagementClientOptionalParams } from "./api/index.js";
export type {
  AccessConnectorsListBySubscriptionOptionalParams,
  AccessConnectorsListByResourceGroupOptionalParams,
  AccessConnectorsDeleteOptionalParams,
  AccessConnectorsUpdateOptionalParams,
  AccessConnectorsCreateOrUpdateOptionalParams,
  AccessConnectorsGetOptionalParams,
} from "./api/accessConnectors/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { OutboundNetworkDependenciesEndpointsListOptionalParams } from "./api/outboundNetworkDependenciesEndpoints/index.js";
export type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  VNetPeeringListByWorkspaceOptionalParams,
  VNetPeeringDeleteOptionalParams,
  VNetPeeringCreateOrUpdateOptionalParams,
  VNetPeeringGetOptionalParams,
} from "./api/vNetPeering/index.js";
export type {
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export type {
  AccessConnectorsOperations,
  OperationsOperations,
  OutboundNetworkDependenciesEndpointsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  VNetPeeringOperations,
  WorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
