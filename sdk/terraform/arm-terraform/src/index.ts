// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureTerraformClient } from "./azureTerraformClient.js";
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
  BaseExportModel,
  BaseExportModelUnion,
  Type,
  TargetProvider,
  ExportQuery,
  AuthorizationScopeFilter,
  ExportResource,
  ExportResourceGroup,
  TerraformOperationStatus,
  ExportResult,
  ResourceProvisioningState,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownType,
  KnownTargetProvider,
  KnownAuthorizationScopeFilter,
  KnownResourceProvisioningState,
  KnownVersions,
} from "./models/index.js";
export type { AzureTerraformClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { TerraformExportTerraformOptionalParams } from "./api/terraform/index.js";
export type { OperationsOperations, TerraformOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
