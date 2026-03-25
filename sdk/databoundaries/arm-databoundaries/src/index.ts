// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DataboundariesManegementClient } from "./databoundariesManegementClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  DataBoundaryDefinition,
  DataBoundaryProperties,
  DataBoundary,
  ProvisioningState,
  DefaultName,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownDataBoundary,
  KnownProvisioningState,
  KnownDefaultName,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { DataboundariesManegementClientOptionalParams } from "./api/index.js";
export type {
  DataBoundariesPutOptionalParams,
  DataBoundariesGetTenantOptionalParams,
  DataBoundariesGetScopeOptionalParams,
} from "./api/dataBoundaries/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { DataBoundariesOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
