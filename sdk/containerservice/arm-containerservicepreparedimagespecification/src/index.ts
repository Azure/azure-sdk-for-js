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
  PreparedImageSpecification,
  PreparedImageSpecificationProperties,
  PreparedImageSpecificationManagedIdentityProfile,
  ProvisioningState,
  PreparedImageSpecificationScript,
  ExecutionPoint,
  ScriptType,
  PostScriptAction,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  PreparedImageSpecificationPatch,
  PreparedImageSpecificationVersion,
  ProxyResource,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownExecutionPoint,
  KnownScriptType,
  KnownPostScriptAction,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { ContainerServiceClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PreparedImageSpecificationsListVersionsOptionalParams,
  PreparedImageSpecificationsGetVersionOptionalParams,
  PreparedImageSpecificationsListBySubscriptionOptionalParams,
  PreparedImageSpecificationsListByResourceGroupOptionalParams,
  PreparedImageSpecificationsDeleteVersionOptionalParams,
  PreparedImageSpecificationsDeleteOptionalParams,
  PreparedImageSpecificationsUpdateOptionalParams,
  PreparedImageSpecificationsCreateOrUpdateOptionalParams,
  PreparedImageSpecificationsGetOptionalParams,
} from "./api/preparedImageSpecifications/index.js";
export type {
  OperationsOperations,
  PreparedImageSpecificationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
