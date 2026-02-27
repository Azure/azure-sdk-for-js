// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageActionsManagementClient } from "./storageActionsManagementClient.js";
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
  type StorageTask,
  type ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  type ManagedServiceIdentityType,
  type UserAssignedIdentity,
  type StorageTaskProperties,
  type StorageTaskAction,
  type IfCondition,
  type StorageTaskOperation,
  KnownStorageTaskOperationName,
  type StorageTaskOperationName,
  KnownOnSuccess,
  type OnSuccess,
  KnownOnFailure,
  type OnFailure,
  type ElseCondition,
  KnownProvisioningState,
  type ProvisioningState,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type StorageTaskUpdateParameters,
  type StorageTaskUpdateProperties,
  type StorageTaskPreviewAction,
  type StorageTaskPreviewActionProperties,
  type StorageTaskPreviewContainerProperties,
  type StorageTaskPreviewKeyValueProperties,
  type StorageTaskPreviewBlobProperties,
  KnownMatchedBlockName,
  type MatchedBlockName,
  type StorageTaskPreviewActionCondition,
  type StorageTaskPreviewActionIfCondition,
  type StorageTaskReportInstance,
  type StorageTaskReportProperties,
  KnownRunStatusEnum,
  type RunStatusEnum,
  KnownRunResult,
  type RunResult,
  type ProxyResource,
  type StorageTaskAssignment,
  KnownVersions,
} from "./models/index.js";
export type { StorageActionsManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { StorageTaskAssignmentListOptionalParams } from "./api/storageTaskAssignment/index.js";
export type {
  StorageTasksPreviewActionsOptionalParams,
  StorageTasksListBySubscriptionOptionalParams,
  StorageTasksListByResourceGroupOptionalParams,
  StorageTasksDeleteOptionalParams,
  StorageTasksUpdateOptionalParams,
  StorageTasksCreateOptionalParams,
  StorageTasksGetOptionalParams,
} from "./api/storageTasks/index.js";
export type { StorageTasksReportListOptionalParams } from "./api/storageTasksReport/index.js";
export type {
  OperationsOperations,
  StorageTaskAssignmentOperations,
  StorageTasksOperations,
  StorageTasksReportOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
