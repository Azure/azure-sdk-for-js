// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AppConfigurationManagementClient } from "./appConfigurationManagementClient.js";
export { type SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
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
export { type AppConfigurationManagementClientOptionalParams } from "./api/index.js";
export {
  type ConfigurationStoresListDeletedOptionalParams,
  type ConfigurationStoresPurgeDeletedOptionalParams,
  type ConfigurationStoresGetDeletedOptionalParams,
  type ConfigurationStoresRegenerateKeyOptionalParams,
  type ConfigurationStoresListKeysOptionalParams,
  type ConfigurationStoresListOptionalParams,
  type ConfigurationStoresListByResourceGroupOptionalParams,
  type ConfigurationStoresDeleteOptionalParams,
  type ConfigurationStoresUpdateOptionalParams,
  type ConfigurationStoresCreateOptionalParams,
  type ConfigurationStoresGetOptionalParams,
} from "./api/configurationStores/index.js";
export {
  type KeyValuesDeleteOptionalParams,
  type KeyValuesCreateOrUpdateOptionalParams,
  type KeyValuesGetOptionalParams,
} from "./api/keyValues/index.js";
export {
  type OperationsRegionalCheckNameAvailabilityOptionalParams,
  type OperationsCheckNameAvailabilityOptionalParams,
  type OperationsListOptionalParams,
} from "./api/operations/index.js";
export {
  type PrivateEndpointConnectionsListByConfigurationStoreOptionalParams,
  type PrivateEndpointConnectionsDeleteOptionalParams,
  type PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  type PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export {
  type PrivateLinkResourcesListByConfigurationStoreOptionalParams,
  type PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export {
  type ReplicasListByConfigurationStoreOptionalParams,
  type ReplicasDeleteOptionalParams,
  type ReplicasCreateOptionalParams,
  type ReplicasGetOptionalParams,
} from "./api/replicas/index.js";
export {
  type SnapshotsCreateOptionalParams,
  type SnapshotsGetOptionalParams,
} from "./api/snapshots/index.js";
export {
  type ConfigurationStoresOperations,
  type KeyValuesOperations,
  type OperationsOperations,
  type PrivateEndpointConnectionsOperations,
  type PrivateLinkResourcesOperations,
  type ReplicasOperations,
  type SnapshotsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
