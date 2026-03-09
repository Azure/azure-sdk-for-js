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
  Scheduler,
  SchedulerProperties,
  ProvisioningState,
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
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  SchedulerUpdate,
  SchedulerPropertiesUpdate,
  SchedulerSkuUpdate,
  SchedulerPrivateLinkResource,
  PrivateLinkResourceProperties,
  PrivateEndpointConnectionUpdate,
  OptionalPropertiesUpdateableProperties,
  TaskHub,
  TaskHubProperties,
  ProxyResource,
  RetentionPolicy,
  RetentionPolicyProperties,
  RetentionPolicyDetails,
  PurgeableOrchestrationState,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownSchedulerSkuName,
  KnownRedundancyState,
  KnownPublicNetworkAccess,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownCreatedByType,
  KnownPurgeableOrchestrationState,
  KnownVersions,
} from "./models/index.js";
export type { DurableTaskClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  RetentionPoliciesListBySchedulerOptionalParams,
  RetentionPoliciesDeleteOptionalParams,
  RetentionPoliciesUpdateOptionalParams,
  RetentionPoliciesCreateOrReplaceOptionalParams,
  RetentionPoliciesGetOptionalParams,
} from "./api/retentionPolicies/index.js";
export type {
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
  OperationsOperations,
  RetentionPoliciesOperations,
  SchedulersOperations,
  TaskHubsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
