// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
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
export { type DurableTaskClientOptionalParams } from "./api/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type RetentionPoliciesListBySchedulerOptionalParams,
  type RetentionPoliciesDeleteOptionalParams,
  type RetentionPoliciesUpdateOptionalParams,
  type RetentionPoliciesCreateOrReplaceOptionalParams,
  type RetentionPoliciesGetOptionalParams,
} from "./api/retentionPolicies/index.js";
export {
  type SchedulersListBySubscriptionOptionalParams,
  type SchedulersListByResourceGroupOptionalParams,
  type SchedulersDeleteOptionalParams,
  type SchedulersUpdateOptionalParams,
  type SchedulersCreateOrUpdateOptionalParams,
  type SchedulersGetOptionalParams,
} from "./api/schedulers/index.js";
export {
  type TaskHubsListBySchedulerOptionalParams,
  type TaskHubsDeleteOptionalParams,
  type TaskHubsCreateOrUpdateOptionalParams,
  type TaskHubsGetOptionalParams,
} from "./api/taskHubs/index.js";
export {
  type OperationsOperations,
  type RetentionPoliciesOperations,
  type SchedulersOperations,
  type TaskHubsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
