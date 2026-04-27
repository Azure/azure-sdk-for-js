// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PurviewManagementClient } from "./purviewManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  OperationProperties,
  OperationMetaServiceSpecification,
  OperationMetaLogSpecification,
  OperationMetaMetricSpecification,
  DimensionProperties,
  ErrorResponseModel,
  ErrorResponseModelError,
  ErrorModel,
  Account,
  AccountProperties,
  AccountPropertiesAccountStatus,
  CloudConnectors,
  AccountPropertiesEndpoints,
  IngestionStorage,
  PublicNetworkAccess,
  ManagedEventHubState,
  AccountPropertiesManagedResources,
  AccountMergeInfo,
  MergeStatus,
  MergeAccountType,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointConnectionStatus,
  ProvisioningState,
  TenantEndpointState,
  Identity,
  ManagedIdentityType,
  UserAssignedIdentity,
  AccountSku,
  AccountSkuName,
  AccountStatus,
  AccountProvisioningState,
  AccountStatusErrorDetails,
  AccountEndpoints,
  ManagedResources,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  AccountUpdateParameters,
  CollectionAdminUpdate,
  AccessKeys,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
  Reason,
  KafkaConfiguration,
  KafkaConfigurationProperties,
  Credentials,
  KafkaConfigurationIdentityType,
  EventHubType,
  EventStreamingState,
  EventStreamingType,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  BatchFeatureRequest,
  BatchFeatureStatus,
  PrivateEndpointConnectionStatusUpdateRequest,
  PrivateEndpointConnectionStatusUpdateResponse,
  DefaultAccountPayload,
  ScopeType,
  UsageList,
  Usage,
  UsageName,
  QuotaName,
} from "./models/index.js";
export {
  KnownPublicNetworkAccess,
  KnownManagedEventHubState,
  KnownMergeStatus,
  KnownMergeAccountType,
  KnownPrivateEndpointConnectionStatus,
  KnownProvisioningState,
  KnownTenantEndpointState,
  KnownManagedIdentityType,
  KnownAccountSkuName,
  KnownAccountProvisioningState,
  KnownCreatedByType,
  KnownReason,
  KnownKafkaConfigurationIdentityType,
  KnownEventHubType,
  KnownEventStreamingState,
  KnownEventStreamingType,
  KnownScopeType,
  KnownVersions,
} from "./models/index.js";
export type { PurviewManagementClientOptionalParams } from "./api/index.js";
export type {
  AccountsCheckNameAvailabilityOptionalParams,
  AccountsListKeysOptionalParams,
  AccountsAddRootCollectionAdminOptionalParams,
  AccountsListBySubscriptionOptionalParams,
  AccountsListByResourceGroupOptionalParams,
  AccountsDeleteOptionalParams,
  AccountsUpdateOptionalParams,
  AccountsCreateOrUpdateOptionalParams,
  AccountsGetOptionalParams,
} from "./api/accounts/index.js";
export type {
  DefaultAccountsSetOptionalParams,
  DefaultAccountsRemoveOptionalParams,
  DefaultAccountsGetOptionalParams,
} from "./api/defaultAccounts/index.js";
export type {
  FeaturesSubscriptionGetOptionalParams,
  FeaturesAccountGetOptionalParams,
} from "./api/features/index.js";
export type {
  IngestionPrivateEndpointConnectionsUpdateStatusOptionalParams,
  IngestionPrivateEndpointConnectionsListOptionalParams,
} from "./api/ingestionPrivateEndpointConnections/index.js";
export type {
  KafkaConfigurationsListByAccountOptionalParams,
  KafkaConfigurationsDeleteOptionalParams,
  KafkaConfigurationsCreateOrUpdateOptionalParams,
  KafkaConfigurationsGetOptionalParams,
} from "./api/kafkaConfigurations/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByAccountOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListByAccountOptionalParams,
  PrivateLinkResourcesGetByGroupIdOptionalParams,
} from "./api/privateLinkResources/index.js";
export type { UsagesGetOptionalParams } from "./api/usages/index.js";
export type {
  AccountsOperations,
  DefaultAccountsOperations,
  FeaturesOperations,
  IngestionPrivateEndpointConnectionsOperations,
  KafkaConfigurationsOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  UsagesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
