// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CarbonOptimizationManagementClient } from "./carbonOptimizationManagementClient.js";
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
  type QueryFilter,
  type QueryFilterUnion,
  KnownReportTypeEnum,
  type ReportTypeEnum,
  type DateRange,
  KnownEmissionScopeEnum,
  type EmissionScopeEnum,
  type OverallSummaryReportQueryFilter,
  type MonthlySummaryReportQueryFilter,
  type TopItemsSummaryReportQueryFilter,
  KnownCategoryTypeEnum,
  type CategoryTypeEnum,
  type TopItemsMonthlySummaryReportQueryFilter,
  type ItemDetailsQueryFilter,
  KnownOrderByColumnEnum,
  type OrderByColumnEnum,
  KnownSortDirectionEnum,
  type SortDirectionEnum,
  type CarbonEmissionDataListResult,
  type CarbonEmissionData,
  type CarbonEmissionDataUnion,
  KnownResponseDataTypeEnum,
  type ResponseDataTypeEnum,
  type CarbonEmissionOverallSummaryData,
  type CarbonEmissionMonthlySummaryData,
  type CarbonEmissionTopItemsSummaryData,
  type ResourceCarbonEmissionTopItemsSummaryData,
  type ResourceGroupCarbonEmissionTopItemsSummaryData,
  type CarbonEmissionTopItemMonthlySummaryData,
  type ResourceCarbonEmissionTopItemMonthlySummaryData,
  type ResourceGroupCarbonEmissionTopItemMonthlySummaryData,
  type CarbonEmissionItemDetailData,
  type ResourceCarbonEmissionItemDetailData,
  type ResourceGroupCarbonEmissionItemDetailData,
  type SubscriptionAccessDecision,
  KnownAccessDecisionEnum,
  type AccessDecisionEnum,
  type CarbonEmissionDataAvailableDateRange,
  KnownVersions,
} from "./models/index.js";
export { type CarbonOptimizationManagementClientOptionalParams } from "./api/index.js";
export {
  type CarbonServiceQueryCarbonEmissionDataAvailableDateRangeOptionalParams,
  type CarbonServiceQueryCarbonEmissionReportsOptionalParams,
} from "./api/carbonService/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export { type CarbonServiceOperations, type OperationsOperations } from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
