// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CostManagementClient } from "./costManagementClient.js";
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
  EstimateContent,
  EstimateResourceInput,
  EstimateNamedValue,
  EstimateValue,
  EstimateValueUnion,
  EstimateValueKind,
  EstimateStringValue,
  EstimateNumberValue,
  EstimateBooleanValue,
  EstimateObjectValue,
  EstimateArrayValue,
  EstimateResult,
  EstimateResourceResult,
  EstimateEffectiveConfiguration,
  EstimateAppliedValue,
  EstimateCostSummary,
  EstimateCostStatus,
  EstimateComponentResult,
  EstimateDiagnostic,
  EstimateTotals,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownEstimateValueKind,
  KnownEstimateCostStatus,
  KnownVersions,
} from "./models/index.js";
export type { CostManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PriceEstimationGetEstimatePricesOperationResultOptionalParams,
  PriceEstimationEstimatePricesOptionalParams,
} from "./api/priceEstimation/index.js";
export type { OperationsOperations, PriceEstimationOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
