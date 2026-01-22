// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AppConfigurationManagementClient } from "./appConfigurationManagementClient.js";
export { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  ConfigurationStore,
  ConfigurationStoreProperties,
  KnownProvisioningState,
  ProvisioningState,
  EncryptionProperties,
  KeyVaultProperties,
  PrivateEndpointConnectionReference,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  KnownConnectionStatus,
  ConnectionStatus,
  KnownActionsRequired,
  ActionsRequired,
  KnownPublicNetworkAccess,
  PublicNetworkAccess,
  DataPlaneProxyProperties,
  KnownAuthenticationMode,
  AuthenticationMode,
  KnownPrivateLinkDelegation,
  PrivateLinkDelegation,
  CreateMode,
  TelemetryProperties,
  ManagedOnBehalfOfConfiguration,
  MoboBrokerResource,
  AzureFrontDoorProperties,
  ResourceIdentity,
  KnownIdentityType,
  IdentityType,
  UserIdentity,
  Sku,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
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
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  KeyValue,
  KeyValueProperties,
  Replica,
  ReplicaProperties,
  KnownReplicaProvisioningState,
  ReplicaProvisioningState,
  Snapshot,
  SnapshotProperties,
  KnownSnapshotStatus,
  SnapshotStatus,
  KeyValueFilter,
  KnownCompositionType,
  CompositionType,
  OperationDefinition,
  OperationDefinitionDisplay,
  OperationProperties,
  ServiceSpecification,
  LogSpecification,
  MetricSpecification,
  MetricDimension,
  CheckNameAvailabilityParameters,
  KnownConfigurationResourceType,
  ConfigurationResourceType,
  NameAvailabilityStatus,
  KnownVersions,
} from "./models/index.js";
export { AppConfigurationManagementClientOptionalParams } from "./api/index.js";
export {
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
export {
  KeyValuesDeleteOptionalParams,
  KeyValuesCreateOrUpdateOptionalParams,
  KeyValuesGetOptionalParams,
} from "./api/keyValues/index.js";
export {
  OperationsRegionalCheckNameAvailabilityOptionalParams,
  OperationsCheckNameAvailabilityOptionalParams,
  OperationsListOptionalParams,
} from "./api/operations/index.js";
export {
  PrivateEndpointConnectionsListByConfigurationStoreOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export {
  PrivateLinkResourcesListByConfigurationStoreOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export {
  ReplicasListByConfigurationStoreOptionalParams,
  ReplicasDeleteOptionalParams,
  ReplicasCreateOptionalParams,
  ReplicasGetOptionalParams,
} from "./api/replicas/index.js";
export {
  SnapshotsCreateOptionalParams,
  SnapshotsGetOptionalParams,
} from "./api/snapshots/index.js";
export {
  ConfigurationStoresOperations,
  KeyValuesOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  ReplicasOperations,
  SnapshotsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
