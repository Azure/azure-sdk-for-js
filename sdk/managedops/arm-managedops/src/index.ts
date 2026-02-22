// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ManagedOpsClient } from "./managedOpsClient.js";
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
  ManagedOp,
  ManagedOpsProperties,
  Sku,
  KnownProvisioningState,
  ProvisioningState,
  DesiredConfiguration,
  ChangeTrackingConfiguration,
  AzureMonitorConfiguration,
  ServiceInformation,
  ChangeTrackingInformation,
  AzureMonitorInformation,
  UpdateManagerInformation,
  GuestConfigurationInformation,
  DefenderForServersInformation,
  DefenderCspmInformation,
  PolicyAssignmentProperties,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ManagedOpUpdate,
  ManagedOpUpdateProperties,
  DesiredConfigurationUpdate,
  KnownVersions,
} from "./models/index.js";
export { ManagedOpsClientOptionalParams } from "./api/index.js";
export {
  ManagedOpsDeleteOptionalParams,
  ManagedOpsUpdateOptionalParams,
  ManagedOpsListOptionalParams,
  ManagedOpsCreateOrUpdateOptionalParams,
  ManagedOpsGetOptionalParams,
} from "./api/managedOps/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export { ManagedOpsOperations, OperationsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
