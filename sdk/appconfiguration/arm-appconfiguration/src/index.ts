// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AppConfigurationManagementClient } from "./appConfigurationManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  ConfigurationStore,
  ConfigurationStoreProperties,
  ProvisioningState,
  EncryptionProperties,
  KeyVaultProperties,
  PrivateEndpointConnectionReference,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  ConnectionStatus,
  ActionsRequired,
  PublicNetworkAccess,
  DataPlaneProxyProperties,
  AuthenticationMode,
  PrivateLinkDelegation,
  CreateMode,
  TelemetryProperties,
  ManagedOnBehalfOfConfiguration,
  MoboBrokerResource,
  AzureFrontDoorProperties,
  ResourceIdentity,
  IdentityType,
  UserIdentity,
  Sku,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ConfigurationStoreUpdateParameters,
  ConfigurationStorePropertiesUpdateParameters,
  ApiKey,
  RegenerateKeyParameters,
  DeletedConfigurationStore,
  DeletedConfigurationStoreProperties,
  ProxyResource,
  PrivateEndpointConnection,
  NetworkSecurityPerimeterConfiguration,
  NetworkSecurityPerimeterConfigurationProperties,
  NetworkSecurityPerimeterConfigurationProvisioningState,
  ProvisioningIssue,
  ProvisioningIssueProperties,
  IssueType,
  Severity,
  AccessRule,
  AccessRuleProperties,
  AccessRuleDirection,
  NetworkSecurityPerimeter,
  ResourceAssociation,
  ResourceAssociationAccessMode,
  NetworkSecurityProfile,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  KeyValue,
  KeyValueProperties,
  Replica,
  ReplicaProperties,
  ReplicaProvisioningState,
  Snapshot,
  SnapshotProperties,
  SnapshotStatus,
  KeyValueFilter,
  CompositionType,
  OperationDefinition,
  OperationDefinitionDisplay,
  OperationProperties,
  ServiceSpecification,
  LogSpecification,
  MetricSpecification,
  MetricDimension,
  CheckNameAvailabilityParameters,
  ConfigurationResourceType,
  NameAvailabilityStatus,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownConnectionStatus,
  KnownActionsRequired,
  KnownPublicNetworkAccess,
  KnownAuthenticationMode,
  KnownPrivateLinkDelegation,
  KnownIdentityType,
  KnownCreatedByType,
  KnownNetworkSecurityPerimeterConfigurationProvisioningState,
  KnownIssueType,
  KnownSeverity,
  KnownAccessRuleDirection,
  KnownResourceAssociationAccessMode,
  KnownReplicaProvisioningState,
  KnownSnapshotStatus,
  KnownCompositionType,
  KnownConfigurationResourceType,
  KnownVersions,
} from "./models/index.js";
export type { AppConfigurationManagementClientOptionalParams } from "./api/index.js";
export type {
  ConfigurationStoresListDeletedOptionalParams,
  ConfigurationStoresPurgeDeletedOptionalParams,
  ConfigurationStoresGetDeletedOptionalParams,
  ConfigurationStoresRegenerateKeyOptionalParams,
  ConfigurationStoresListKeysOptionalParams,
  ConfigurationStoresListOptionalParams,
  ConfigurationStoresListByResourceGroupOptionalParams,
  ConfigurationStoresDeleteOptionalParams,
  ConfigurationStoresUpdateOptionalParams,
  ConfigurationStoresCreateOptionalParams,
  ConfigurationStoresGetOptionalParams,
} from "./api/configurationStores/index.js";
export type {
  KeyValuesDeleteOptionalParams,
  KeyValuesCreateOrUpdateOptionalParams,
  KeyValuesGetOptionalParams,
} from "./api/keyValues/index.js";
export type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByConfigurationStoreOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "./api/networkSecurityPerimeterConfigurations/index.js";
export type {
  OperationsRegionalCheckNameAvailabilityOptionalParams,
  OperationsCheckNameAvailabilityOptionalParams,
  OperationsListOptionalParams,
} from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByConfigurationStoreOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListByConfigurationStoreOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  ReplicasListByConfigurationStoreOptionalParams,
  ReplicasDeleteOptionalParams,
  ReplicasCreateOptionalParams,
  ReplicasGetOptionalParams,
} from "./api/replicas/index.js";
export type {
  SnapshotsCreateOptionalParams,
  SnapshotsGetOptionalParams,
} from "./api/snapshots/index.js";
export type {
  ConfigurationStoresOperations,
  KeyValuesOperations,
  NetworkSecurityPerimeterConfigurationsOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  ReplicasOperations,
  SnapshotsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
