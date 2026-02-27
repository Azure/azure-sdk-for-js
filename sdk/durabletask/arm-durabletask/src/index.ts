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
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type Scheduler,
  type SchedulerProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type SchedulerSku,
  KnownSchedulerSkuName,
  type SchedulerSkuName,
  KnownRedundancyState,
  type RedundancyState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type SchedulerUpdate,
  type SchedulerPropertiesUpdate,
  type SchedulerSkuUpdate,
  type TaskHub,
  type TaskHubProperties,
  type ProxyResource,
  type RetentionPolicy,
  type RetentionPolicyProperties,
  type RetentionPolicyDetails,
  KnownPurgeableOrchestrationState,
  type PurgeableOrchestrationState,
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
export { AzureClouds, type AzureSupportedClouds };
