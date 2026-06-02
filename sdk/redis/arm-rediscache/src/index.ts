// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { RedisManagementClient } from "./redisManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  RedisLinkedServerWithProperties,
  RedisLinkedServerProperties,
  RedisLinkedServerCreateProperties,
  ReplicationRole,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  RedisLinkedServerCreateParameters,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  RedisResource,
  RedisProperties,
  ProvisioningState,
  RedisAccessKeys,
  RedisLinkedServer,
  RedisInstanceDetails,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  RedisCreateProperties,
  Sku,
  SkuName,
  SkuFamily,
  RedisCommonProperties,
  RedisCommonPropertiesRedisConfiguration,
  TlsVersion,
  PublicNetworkAccess,
  UpdateChannel,
  ZonalAllocationPolicy,
  TrackedResource,
  RedisCreateParameters,
  RedisUpdateParameters,
  RedisUpdateProperties,
  UpgradeNotification,
  RedisRegenerateKeyParameters,
  RedisKeyType,
  RedisRebootParameters,
  RebootType,
  RedisForceRebootResponse,
  ImportRDBParameters,
  ExportRDBParameters,
  OperationStatusResult,
  CheckNameAvailabilityParameters,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  RedisFirewallRule,
  RedisFirewallRuleProperties,
  RedisPatchSchedule,
  ScheduleEntries,
  ScheduleEntry,
  DayOfWeek,
  DefaultName,
  RedisCacheAccessPolicy,
  RedisCacheAccessPolicyProperties,
  AccessPolicyProvisioningState,
  AccessPolicyType,
  RedisCacheAccessPolicyAssignment,
  RedisCacheAccessPolicyAssignmentProperties,
  AccessPolicyAssignmentProvisioningState,
  OperationStatus,
} from "./models/index.js";
export {
  KnownCreatedByType,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownProvisioningState,
  KnownManagedServiceIdentityType,
  KnownSkuName,
  KnownSkuFamily,
  KnownTlsVersion,
  KnownPublicNetworkAccess,
  KnownUpdateChannel,
  KnownZonalAllocationPolicy,
  KnownRebootType,
  KnownDefaultName,
  KnownAccessPolicyProvisioningState,
  KnownAccessPolicyType,
  KnownAccessPolicyAssignmentProvisioningState,
  KnownVersions,
} from "./models/index.js";
export type { RedisManagementClientOptionalParams } from "./api/index.js";
export type {
  AccessPolicyListOptionalParams,
  AccessPolicyDeleteOptionalParams,
  AccessPolicyCreateUpdateOptionalParams,
  AccessPolicyGetOptionalParams,
} from "./api/accessPolicy/index.js";
export type {
  AccessPolicyAssignmentListOptionalParams,
  AccessPolicyAssignmentDeleteOptionalParams,
  AccessPolicyAssignmentCreateUpdateOptionalParams,
  AccessPolicyAssignmentGetOptionalParams,
} from "./api/accessPolicyAssignment/index.js";
export type { AsyncOperationStatusGetOptionalParams } from "./api/asyncOperationStatus/index.js";
export type {
  FirewallRulesListOptionalParams,
  FirewallRulesDeleteOptionalParams,
  FirewallRulesCreateOrUpdateOptionalParams,
  FirewallRulesGetOptionalParams,
} from "./api/firewallRules/index.js";
export type {
  LinkedServerListOptionalParams,
  LinkedServerDeleteOptionalParams,
  LinkedServerCreateOptionalParams,
  LinkedServerGetOptionalParams,
} from "./api/linkedServer/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PatchSchedulesListByRedisResourceOptionalParams,
  PatchSchedulesDeleteOptionalParams,
  PatchSchedulesCreateOrUpdateOptionalParams,
  PatchSchedulesGetOptionalParams,
} from "./api/patchSchedules/index.js";
export type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsPutOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type { PrivateLinkResourcesListByRedisCacheOptionalParams } from "./api/privateLinkResources/index.js";
export type {
  RedisCheckNameAvailabilityOptionalParams,
  RedisFlushCacheOptionalParams,
  RedisExportDataOptionalParams,
  RedisImportDataOptionalParams,
  RedisForceRebootOptionalParams,
  RedisRegenerateKeyOptionalParams,
  RedisListKeysOptionalParams,
  RedisListUpgradeNotificationsOptionalParams,
  RedisListBySubscriptionOptionalParams,
  RedisListByResourceGroupOptionalParams,
  RedisDeleteOptionalParams,
  RedisUpdateOptionalParams,
  RedisCreateOptionalParams,
  RedisGetOptionalParams,
} from "./api/redis/index.js";
export type {
  AccessPolicyOperations,
  AccessPolicyAssignmentOperations,
  AsyncOperationStatusOperations,
  FirewallRulesOperations,
  LinkedServerOperations,
  OperationsOperations,
  PatchSchedulesOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  RedisOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
