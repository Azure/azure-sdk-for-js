// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ContainerServiceClient } from "./containerServiceClient.js";
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
  NodeCustomization,
  NodeCustomizationProperties,
  UserAssignedIdentity,
  ProvisioningState,
  NodeCustomizationScript,
  ExecutionPoint,
  ScriptType,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  NodeCustomizationUpdate,
  NodeCustomizationVersion,
  ProxyResource,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownExecutionPoint,
  KnownScriptType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { ContainerServiceClientOptionalParams } from "./api/index.js";
export type {
  NodeCustomizationsListVersionsOptionalParams,
  NodeCustomizationsGetVersionOptionalParams,
  NodeCustomizationsListBySubscriptionOptionalParams,
  NodeCustomizationsListByResourceGroupOptionalParams,
  NodeCustomizationsDeleteVersionOptionalParams,
  NodeCustomizationsDeleteOptionalParams,
  NodeCustomizationsUpdateOptionalParams,
  NodeCustomizationsCreateOrUpdateOptionalParams,
  NodeCustomizationsGetOptionalParams,
} from "./api/nodeCustomizations/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { NodeCustomizationsOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
