// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AzureTerraformClient } from "./azureTerraformClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type BaseExportModel,
  type BaseExportModelUnion,
  KnownType,
  type Type,
  KnownTargetProvider,
  type TargetProvider,
  type ExportQuery,
  type ExportResource,
  type ExportResourceGroup,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type TerraformOperationStatus,
  type ExportResult,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  KnownVersions,
} from "./models/index.js";
export type {
  AzureTerraformClientOptionalParams,
  OperationsListOptionalParams,
  TerraformExportTerraformOptionalParams,
} from "./api/index.js";
export type { OperationsOperations, TerraformOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
