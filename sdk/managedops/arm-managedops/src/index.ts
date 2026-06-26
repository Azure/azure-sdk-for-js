// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ManagedOpsClient } from "./managedOpsClient.js";
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
  ManagedOp,
  ManagedOpsProperties,
  Sku,
  ProvisioningState,
  DesiredConfiguration,
  ChangeTrackingConfiguration,
  AzureMonitorConfiguration,
  DesiredEnablementState,
  ServiceInformation,
  ChangeTrackingInformation,
  EnablementState,
  AzureMonitorInformation,
  UpdateManagerInformation,
  GuestConfigurationInformation,
  DefenderForServersInformation,
  DefenderCspmInformation,
  PolicyAssignmentProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ManagedOpUpdate,
  ManagedOpUpdateProperties,
  DesiredConfigurationUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownDesiredEnablementState,
  KnownEnablementState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { ManagedOpsClientOptionalParams } from "./api/index.js";
export type {
  ManagedOpsDeleteOptionalParams,
  ManagedOpsUpdateOptionalParams,
  ManagedOpsListOptionalParams,
  ManagedOpsCreateOrUpdateOptionalParams,
  ManagedOpsGetOptionalParams,
} from "./api/managedOps/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { ManagedOpsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
