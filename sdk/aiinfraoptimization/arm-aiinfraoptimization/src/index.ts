// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AIInfraOptimizationClient } from "./aiInfraOptimizationClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  RecommendVmSkuRequest,
  RecommendVmSkuModel,
  WeightPrecision,
  RecommendVmSkuWorkload,
  RecommendVmSkuTokenBudget,
  RecommendVmSkuDeployment,
  ProcurementOption,
  RecommendVmSkuOptimization,
  RankingPreference,
  RecommendVmSkuHourlyCost,
  RecommendVmSkuSubscriptionOptions,
  RecommendVmSkuResponse,
  RecommendVmSkuOption,
  RecommendVmSkuReadiness,
  ReadinessStatus,
  RecommendVmSkuTopology,
  RecommendVmSkuAccelerator,
  RecommendVmSkuCost,
  CostSource,
  RecommendVmSkuStageError,
  StageErrorCode,
  RecommendVmSkuQuota,
  QuotaStatus,
  RecommendVmSkuQuotaIncrease,
  RecommendVmSkuQuotaLimit,
  RecommendVmSkuPlacement,
  PlacementStatus,
  RecommendVmSkuBenchmark,
  BenchmarkLevel,
  RecommendVmSkuPerformanceEstimate,
  RecommendVmSkuSizing,
  RecommendVmSkuSizingModel,
  RecommendVmSkuSizingWorkload,
  RecommendVmSkuMemory,
  RecommendVmSkuSizingBasis,
  ParameterCountSource,
  ModelWeightsCalculation,
  ContextLengthSource,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownWeightPrecision,
  KnownProcurementOption,
  KnownRankingPreference,
  KnownReadinessStatus,
  KnownCostSource,
  KnownStageErrorCode,
  KnownQuotaStatus,
  KnownPlacementStatus,
  KnownBenchmarkLevel,
  KnownParameterCountSource,
  KnownModelWeightsCalculation,
  KnownContextLengthSource,
  KnownVersions,
} from "./models/index.js";
export type { AIInfraOptimizationClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { RecommendationsRecommendVmSkuOptionalParams } from "./api/recommendations/index.js";
export type { OperationsOperations, RecommendationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
