// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CarbonOptimizationManagementClient } from "./carbonOptimizationManagementClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  QueryFilter,
  QueryFilterUnion,
  ReportTypeEnum,
  DateRange,
  EmissionScopeEnum,
  OverallSummaryReportQueryFilter,
  MonthlySummaryReportQueryFilter,
  TopItemsSummaryReportQueryFilter,
  CategoryTypeEnum,
  TopItemsMonthlySummaryReportQueryFilter,
  ItemDetailsQueryFilter,
  OrderByColumnEnum,
  SortDirectionEnum,
  CarbonEmissionDataListResult,
  CarbonEmissionData,
  CarbonEmissionDataUnion,
  ResponseDataTypeEnum,
  CarbonEmissionOverallSummaryData,
  CarbonEmissionMonthlySummaryData,
  CarbonEmissionTopItemsSummaryData,
  ResourceCarbonEmissionTopItemsSummaryData,
  ResourceGroupCarbonEmissionTopItemsSummaryData,
  CarbonEmissionTopItemMonthlySummaryData,
  ResourceCarbonEmissionTopItemMonthlySummaryData,
  ResourceGroupCarbonEmissionTopItemMonthlySummaryData,
  CarbonEmissionItemDetailData,
  ResourceCarbonEmissionItemDetailData,
  ResourceGroupCarbonEmissionItemDetailData,
  SubscriptionAccessDecision,
  AccessDecisionEnum,
  CarbonEmissionDataAvailableDateRange,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownReportTypeEnum,
  KnownEmissionScopeEnum,
  KnownCategoryTypeEnum,
  KnownOrderByColumnEnum,
  KnownSortDirectionEnum,
  KnownResponseDataTypeEnum,
  KnownAccessDecisionEnum,
  KnownVersions,
} from "./models/index.js";
export type { CarbonOptimizationManagementClientOptionalParams } from "./api/index.js";
export type {
  CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  CarbonServiceQueryCarbonEmissionReportsOptionalParams,
} from "./api/carbonService/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { CarbonServiceOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
