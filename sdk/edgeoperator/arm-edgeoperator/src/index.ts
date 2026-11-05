// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeOperatorClient } from "./edgeOperatorClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SystemReadiness,
  SystemReadinessProperties,
  SystemReadinessCategory,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
} from "./models/index.js";
export { KnownOrigin, KnownActionType, KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { EdgeOperatorClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { SystemReadinessOperationsGetOptionalParams } from "./api/systemReadinessOperations/index.js";
export type { OperationsOperations, SystemReadinessOperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
