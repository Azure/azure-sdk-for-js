// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { AdvisorManagementClient } from "./advisorManagementClient.js";
export type {
  PredictionRequest,
  PredictionRequestProperties,
  PredictionType,
  PredictionResponse,
  PredictionResponseProperties,
  Category,
  Impact,
  ShortDescription,
  ArmErrorResponse,
  ARMErrorResponseBody,
  OperationEntity,
  OperationDisplayInfo,
  MetadataEntity,
  MetadataEntityProperties,
  Scenario,
  MetadataSupportedValueDetail,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ResourceRecommendationBase,
  RecommendationProperties,
  Control,
  ResourceRecommendationSavings,
  ResourceRecommendationSavingsDetails,
  RecommendationStatus,
  RecommendationDismissReason,
  Risk,
  ResourceMetadata,
  TrackedRecommendationProperties,
  Priority,
  RecommendationPropertiesReview,
  RecommendationPropertiesResourceWorkload,
  ExtensionResource,
  RecommendationPatchPayload,
  RecommendationStatePropertiesPayload,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SuppressionContract,
  SuppressionProperties,
  AdvisorScoreEntity,
  AdvisorScoreEntityProperties,
  ScoreEntity,
  TimeSeriesEntity,
  Aggregated,
  AssessmentResult,
  AssessmentResultProperties,
  ResiliencyReview,
  ResiliencyReviewProperties,
  ReviewStatus,
  ConfigData,
  ConfigDataProperties,
  CpuThreshold,
  Duration,
  DigestConfig,
  DigestConfigState,
  AssessmentTypeResult,
  WorkloadResult,
  RecommendationListMode,
  ConfigurationName,
} from "./models/index.js";
export {
  KnownPredictionType,
  KnownCategory,
  KnownImpact,
  KnownScenario,
  KnownCreatedByType,
  KnownControl,
  KnownRecommendationStatus,
  KnownRecommendationDismissReason,
  KnownRisk,
  KnownPriority,
  KnownAggregated,
  KnownReviewStatus,
  KnownCpuThreshold,
  KnownDuration,
  KnownDigestConfigState,
  KnownRecommendationListMode,
  KnownConfigurationName,
  KnownVersions,
} from "./models/index.js";
export type { AdvisorManagementClientOptionalParams, PredictOptionalParams } from "./api/index.js";
export type {
  AdvisorScoresListOptionalParams,
  AdvisorScoresGetOptionalParams,
} from "./api/advisorScores/index.js";
export type {
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsPutOptionalParams,
  AssessmentsGetOptionalParams,
} from "./api/assessments/index.js";
export type { AssessmentTypesListOptionalParams } from "./api/assessmentTypes/index.js";
export type {
  ConfigurationsCreateInResourceGroupOptionalParams,
  ConfigurationsListByResourceGroupOptionalParams,
  ConfigurationsCreateInSubscriptionOptionalParams,
  ConfigurationsListBySubscriptionOptionalParams,
} from "./api/configurations/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  RecommendationMetadataListOptionalParams,
  RecommendationMetadataGetOptionalParams,
} from "./api/recommendationMetadata/index.js";
export type {
  RecommendationsGetGenerateStatusOptionalParams,
  RecommendationsGenerateOptionalParams,
  RecommendationsUpdateByServiceGroupOptionalParams,
  RecommendationsGetByServiceGroupOptionalParams,
  RecommendationsListByServiceGroupOptionalParams,
  RecommendationsListByTenantOptionalParams,
  RecommendationsListOptionalParams,
  RecommendationsUpdateOptionalParams,
  RecommendationsGetOptionalParams,
} from "./api/recommendations/index.js";
export type {
  ResiliencyReviewsListOptionalParams,
  ResiliencyReviewsGetOptionalParams,
} from "./api/resiliencyReviews/index.js";
export type {
  SuppressionsListOptionalParams,
  SuppressionsDeleteOptionalParams,
  SuppressionsCreateOptionalParams,
  SuppressionsGetOptionalParams,
} from "./api/suppressions/index.js";
export type { WorkloadsListOptionalParams } from "./api/workloads/index.js";
export type {
  AdvisorScoresOperations,
  AssessmentsOperations,
  AssessmentTypesOperations,
  ConfigurationsOperations,
  OperationsOperations,
  RecommendationMetadataOperations,
  RecommendationsOperations,
  ResiliencyReviewsOperations,
  SuppressionsOperations,
  WorkloadsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
