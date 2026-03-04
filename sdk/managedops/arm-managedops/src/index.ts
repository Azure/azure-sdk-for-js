// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ManagedOpsClient } from "./managedOpsClient.js";
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
  type ManagedOp,
  type ManagedOpsProperties,
  type Sku,
  KnownProvisioningState,
  type ProvisioningState,
  type DesiredConfiguration,
  type ChangeTrackingConfiguration,
  type AzureMonitorConfiguration,
  type ServiceInformation,
  type ChangeTrackingInformation,
  type AzureMonitorInformation,
  type UpdateManagerInformation,
  type GuestConfigurationInformation,
  type DefenderForServersInformation,
  type DefenderCspmInformation,
  type PolicyAssignmentProperties,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ManagedOpUpdate,
  type ManagedOpUpdateProperties,
  type DesiredConfigurationUpdate,
  KnownVersions,
} from "./models/index.js";
export { type ManagedOpsClientOptionalParams } from "./api/index.js";
export {
  type ManagedOpsDeleteOptionalParams,
  type ManagedOpsUpdateOptionalParams,
  type ManagedOpsListOptionalParams,
  type ManagedOpsCreateOrUpdateOptionalParams,
  type ManagedOpsGetOptionalParams,
} from "./api/managedOps/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export { type ManagedOpsOperations, type OperationsOperations } from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
