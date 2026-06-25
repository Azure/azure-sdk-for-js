// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { StorageActionsManagementClient } from "./storageActionsManagementClient.js";
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
  StorageTask,
  StorageTaskProperties,
  StorageTaskAction,
  IfCondition,
  StorageTaskOperation,
  StorageTaskOperationName,
  OnSuccess,
  OnFailure,
  ElseCondition,
  ProvisioningState,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  StorageTaskUpdateParameters,
  StorageTaskUpdateProperties,
  StorageTaskPreviewAction,
  StorageTaskPreviewActionProperties,
  StorageTaskPreviewContainerProperties,
  StorageTaskPreviewKeyValueProperties,
  StorageTaskPreviewBlobProperties,
  MatchedBlockName,
  StorageTaskPreviewActionCondition,
  StorageTaskPreviewActionIfCondition,
  StorageTaskReportInstance,
  StorageTaskReportProperties,
  RunStatusEnum,
  RunResult,
  ProxyResource,
  StorageTaskAssignment,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownStorageTaskOperationName,
  KnownOnSuccess,
  KnownOnFailure,
  KnownProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownMatchedBlockName,
  KnownRunStatusEnum,
  KnownRunResult,
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
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
