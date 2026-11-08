// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DurableTaskClient } from "./durableTaskClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Detector,
  DetectorProperties,
  ProvisioningState,
  DetectorMetadata,
  DetectorType,
  DetectorDataset,
  DetectorTable,
  DetectorTableColumn,
  DetectorRenderingProperties,
  DetectorRenderingType,
  DetectorStatus,
  DetectorStatusId,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  Scheduler,
  SchedulerProperties,
  SchedulerSku,
  SchedulerSkuName,
  RedundancyState,
  PublicNetworkAccess,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  SchedulerUpdate,
  SchedulerPropertiesUpdate,
  SchedulerSkuUpdate,
  SchedulerPrivateLinkResource,
  PrivateLinkResourceProperties,
  PrivateEndpointConnectionUpdate,
  TaskHub,
  TaskHubProperties,
  TaskQueue,
  TaskQueueProperties,
  TaskQueueThroughput,
  TaskQueueUpdate,
  RetentionPolicy,
  RetentionPolicyProperties,
  RetentionPolicyDetails,
  PurgeableOrchestrationState,
  TransparentDataEncryption,
  TransparentDataEncryptionProperties,
  TransparentDataEncryptionKeySource,
  FailoverInstance,
  FailoverInstanceProperties,
  ReplicationRole,
  FailoverState,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownDetectorType,
  KnownDetectorRenderingType,
  KnownDetectorStatusId,
  KnownCreatedByType,
  KnownSchedulerSkuName,
  KnownRedundancyState,
  KnownPublicNetworkAccess,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownManagedServiceIdentityType,
  KnownPurgeableOrchestrationState,
  KnownTransparentDataEncryptionKeySource,
  KnownReplicationRole,
  KnownFailoverState,
  KnownVersions,
} from "./models/index.js";
export type { OptionalPropertiesUpdateableProperties } from "./models/typeSpec/index.js";
export type { DurableTaskClientOptionalParams } from "./api/index.js";
export type {
  DetectorsListBySchedulerOptionalParams,
  DetectorsGetOptionalParams,
} from "./api/detectors/index.js";
export type {
  FailoverInstancesForceFailoverAllowDataLossOptionalParams,
  FailoverInstancesFailoverOptionalParams,
  FailoverInstancesListBySchedulerOptionalParams,
  FailoverInstancesDeleteOptionalParams,
  FailoverInstancesCreateOrReplaceOptionalParams,
  FailoverInstancesGetOptionalParams,
} from "./api/failoverInstances/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  RetentionPoliciesListBySchedulerOptionalParams,
  RetentionPoliciesDeleteOptionalParams,
  RetentionPoliciesUpdateOptionalParams,
  RetentionPoliciesCreateOrReplaceOptionalParams,
  RetentionPoliciesGetOptionalParams,
} from "./api/retentionPolicies/index.js";
export type {
  SchedulersRestartOptionalParams,
  SchedulersListPrivateEndpointConnectionsOptionalParams,
  SchedulersDeletePrivateEndpointConnectionOptionalParams,
  SchedulersUpdatePrivateEndpointConnectionOptionalParams,
  SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  SchedulersGetPrivateEndpointConnectionOptionalParams,
  SchedulersListPrivateLinksOptionalParams,
  SchedulersGetPrivateLinkOptionalParams,
  SchedulersListBySubscriptionOptionalParams,
  SchedulersListByResourceGroupOptionalParams,
  SchedulersDeleteOptionalParams,
  SchedulersUpdateOptionalParams,
  SchedulersCreateOrUpdateOptionalParams,
  SchedulersGetOptionalParams,
} from "./api/schedulers/index.js";
export type {
  TaskHubsListBySchedulerOptionalParams,
  TaskHubsDeleteOptionalParams,
  TaskHubsCreateOrUpdateOptionalParams,
  TaskHubsGetOptionalParams,
} from "./api/taskHubs/index.js";
export type {
  TaskQueuesListByTaskHubOptionalParams,
  TaskQueuesDeleteOptionalParams,
  TaskQueuesUpdateOptionalParams,
  TaskQueuesCreateOrUpdateOptionalParams,
  TaskQueuesGetOptionalParams,
} from "./api/taskQueues/index.js";
export type {
  TransparentDataEncryptionsListBySchedulerOptionalParams,
  TransparentDataEncryptionsDeleteOptionalParams,
  TransparentDataEncryptionsCreateOrReplaceOptionalParams,
  TransparentDataEncryptionsGetOptionalParams,
} from "./api/transparentDataEncryptions/index.js";
export type {
  DetectorsOperations,
  FailoverInstancesOperations,
  OperationsOperations,
  RetentionPoliciesOperations,
  SchedulersOperations,
  TaskHubsOperations,
  TaskQueuesOperations,
  TransparentDataEncryptionsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
