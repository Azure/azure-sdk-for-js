// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageActionsManagementClient } from "./storageActionsManagementClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  StorageTask,
  ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  StorageTaskProperties,
  StorageTaskAction,
  IfCondition,
  StorageTaskOperation,
  KnownStorageTaskOperationName,
  StorageTaskOperationName,
  KnownOnSuccess,
  OnSuccess,
  KnownOnFailure,
  OnFailure,
  ElseCondition,
  KnownProvisioningState,
  ProvisioningState,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  StorageTaskUpdateParameters,
  StorageTaskUpdateProperties,
  StorageTaskPreviewAction,
  StorageTaskPreviewActionProperties,
  StorageTaskPreviewContainerProperties,
  StorageTaskPreviewKeyValueProperties,
  StorageTaskPreviewBlobProperties,
  KnownMatchedBlockName,
  MatchedBlockName,
  StorageTaskPreviewActionCondition,
  StorageTaskPreviewActionIfCondition,
  StorageTaskReportInstance,
  StorageTaskReportProperties,
  KnownRunStatusEnum,
  RunStatusEnum,
  KnownRunResult,
  RunResult,
  ProxyResource,
  StorageTaskAssignment,
  KnownVersions,
} from "./models/index.js";
export { StorageActionsManagementClientOptionalParams } from "./api/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export { StorageTaskAssignmentListOptionalParams } from "./api/storageTaskAssignment/index.js";
export {
  StorageTasksPreviewActionsOptionalParams,
  StorageTasksListBySubscriptionOptionalParams,
  StorageTasksListByResourceGroupOptionalParams,
  StorageTasksDeleteOptionalParams,
  StorageTasksUpdateOptionalParams,
  StorageTasksCreateOptionalParams,
  StorageTasksGetOptionalParams,
} from "./api/storageTasks/index.js";
export { StorageTasksReportListOptionalParams } from "./api/storageTasksReport/index.js";
export {
  OperationsOperations,
  StorageTaskAssignmentOperations,
  StorageTasksOperations,
  StorageTasksReportOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
