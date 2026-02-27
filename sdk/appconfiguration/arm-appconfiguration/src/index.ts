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
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type ConfigurationStore,
  type ConfigurationStoreProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type EncryptionProperties,
  type KeyVaultProperties,
  type PrivateEndpointConnectionReference,
  type PrivateEndpointConnectionProperties,
  type PrivateEndpoint,
  type PrivateLinkServiceConnectionState,
  KnownConnectionStatus,
  type ConnectionStatus,
  KnownActionsRequired,
  type ActionsRequired,
  KnownPublicNetworkAccess,
  type PublicNetworkAccess,
  type DataPlaneProxyProperties,
  KnownAuthenticationMode,
  type AuthenticationMode,
  KnownPrivateLinkDelegation,
  type PrivateLinkDelegation,
  type CreateMode,
  type TelemetryProperties,
  type ManagedOnBehalfOfConfiguration,
  type MoboBrokerResource,
  type AzureFrontDoorProperties,
  type ResourceIdentity,
  KnownIdentityType,
  type IdentityType,
  type UserIdentity,
  type Sku,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type ConfigurationStoreUpdateParameters,
  type ConfigurationStorePropertiesUpdateParameters,
  type ApiKey,
  type RegenerateKeyParameters,
  type DeletedConfigurationStore,
  type DeletedConfigurationStoreProperties,
  type ProxyResource,
  type PrivateEndpointConnection,
  type PrivateLinkResource,
  type PrivateLinkResourceProperties,
  type KeyValue,
  type KeyValueProperties,
  type Replica,
  type ReplicaProperties,
  KnownReplicaProvisioningState,
  type ReplicaProvisioningState,
  type Snapshot,
  type SnapshotProperties,
  KnownSnapshotStatus,
  type SnapshotStatus,
  type KeyValueFilter,
  KnownCompositionType,
  type CompositionType,
  type OperationDefinition,
  type OperationDefinitionDisplay,
  type OperationProperties,
  type ServiceSpecification,
  type LogSpecification,
  type MetricSpecification,
  type MetricDimension,
  type CheckNameAvailabilityParameters,
  KnownConfigurationResourceType,
  type ConfigurationResourceType,
  type NameAvailabilityStatus,
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
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  ReplicasOperations,
  SnapshotsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
