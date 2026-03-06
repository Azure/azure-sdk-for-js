// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  TextAnalyticsClient,
  type TextAnalyticsClientOptions,
  type DetectLanguageOptions,
  type RecognizeCategorizedEntitiesOptions,
  type AnalyzeSentimentOptions,
  type ExtractKeyPhrasesOptions,
  type RecognizePiiEntitiesOptions,
  type RecognizeLinkedEntitiesOptions,
  PiiEntityDomain,
  type TextAnalyticsActions,
  type RecognizeCategorizedEntitiesAction,
  type RecognizePiiEntitiesAction,
  type ExtractKeyPhrasesAction,
  type BeginAnalyzeActionsOptions,
  type AnalyzeActionsPollerLike,
  type BeginAnalyzeHealthcareEntitiesOptions,
  type AnalyzeHealthcareEntitiesPollerLike,
  type AnalyzeActionsOperationState,
  type AnalyzeHealthcareOperationState,
  type AnalysisPollOperationState,
  type OperationMetadata,
  type AnalyzeActionsOperationMetadata,
  type StringIndexType,
  type RecognizeLinkedEntitiesAction,
  type AnalyzeSentimentAction,
  type PollerLikeWithCancellation,
} from "./textAnalyticsClient.js";
export type { TextAnalyticsOperationOptions } from "./textAnalyticsOperationOptions.js";
export type {
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult,
} from "./detectLanguageResult.js";
export type { DetectLanguageResultArray } from "./detectLanguageResultArray.js";
export type {
  CategorizedEntity,
  RecognizeCategorizedEntitiesResult,
  RecognizeCategorizedEntitiesErrorResult,
  RecognizeCategorizedEntitiesSuccessResult,
} from "./recognizeCategorizedEntitiesResult.js";
export type {
  PiiEntity,
  RecognizePiiEntitiesResult,
  RecognizePiiEntitiesErrorResult,
  RecognizePiiEntitiesSuccessResult,
} from "./recognizePiiEntitiesResult.js";
export type { RecognizePiiEntitiesResultArray } from "./recognizePiiEntitiesResultArray.js";
export type { RecognizeCategorizedEntitiesResultArray } from "./recognizeCategorizedEntitiesResultArray.js";
export type {
  AnalyzeSentimentResult,
  AnalyzeSentimentErrorResult,
  AnalyzeSentimentSuccessResult,
  SentenceSentiment,
  Opinion,
  TargetSentiment,
  AssessmentSentiment,
} from "./analyzeSentimentResult.js";
export type { AnalyzeSentimentResultArray } from "./analyzeSentimentResultArray.js";
export type {
  ExtractKeyPhrasesResult,
  ExtractKeyPhrasesErrorResult,
  ExtractKeyPhrasesSuccessResult,
} from "./extractKeyPhrasesResult.js";
export type { ExtractKeyPhrasesResultArray } from "./extractKeyPhrasesResultArray.js";
export type {
  RecognizeLinkedEntitiesResult,
  RecognizeLinkedEntitiesErrorResult,
  RecognizeLinkedEntitiesSuccessResult,
} from "./recognizeLinkedEntitiesResult.js";
export type { RecognizeLinkedEntitiesResultArray } from "./recognizeLinkedEntitiesResultArray.js";
export type {
  PagedAnalyzeHealthcareEntitiesResult,
  PagedAsyncIterableAnalyzeHealthcareEntitiesResult,
  AnalyzeHealthcareEntitiesResultArray,
  AnalyzeHealthcareEntitiesResult,
  AnalyzeHealthcareEntitiesSuccessResult,
  AnalyzeHealthcareEntitiesErrorResult,
  HealthcareEntity,
  EntityDataSource,
  HealthcareEntityRelation,
  HealthcareEntityRelationRole,
  HealthcareEntityRelationRoleType,
} from "./analyzeHealthcareEntitiesResult.js";
export type {
  PagedAnalyzeActionsResult,
  PagedAsyncIterableAnalyzeActionsResult,
  AnalyzeActionsResult,
  RecognizeCategorizedEntitiesActionResult,
  RecognizePiiEntitiesActionResult,
  ExtractKeyPhrasesActionResult,
  TextAnalyticsActionSuccessState,
  TextAnalyticsActionErrorResult,
  RecognizeCategorizedEntitiesActionErrorResult,
  RecognizeCategorizedEntitiesActionSuccessResult,
  RecognizePiiEntitiesActionErrorResult,
  RecognizePiiEntitiesActionSuccessResult,
  ExtractKeyPhrasesActionErrorResult,
  ExtractKeyPhrasesActionSuccessResult,
  RecognizeLinkedEntitiesActionResult,
  RecognizeLinkedEntitiesActionSuccessResult,
  RecognizeLinkedEntitiesActionErrorResult,
  AnalyzeSentimentActionErrorResult,
  AnalyzeSentimentActionResult,
  AnalyzeSentimentActionSuccessResult,
} from "./analyzeActionsResult.js";
export type {
  ErrorCode,
  TextAnalyticsError,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult,
} from "./textAnalyticsResult.js";

export type { TextAnalyticsAction } from "./textAnalyticsAction.js";

// Models
export {
  type DetectedLanguage,
  type TextDocumentStatistics,
  type SentimentConfidenceScores,
  type TextDocumentInput,
  type DetectLanguageInput,
  type TextDocumentBatchStatistics,
  type Entity,
  type DocumentSentimentLabel,
  type SentenceSentimentLabel,
  type ErrorCodeValue,
  type InnerErrorCodeValue,
  KnownInnerErrorCodeValue,
  type WarningCode,
  KnownWarningCode,
  type LinkedEntity,
  type Match,
  type SentenceAssessment,
  type TargetConfidenceScoreLabel,
  type TokenSentimentValue,
  type TextAnalyticsWarning,
  type State as TextAnalyticsOperationStatus,
  type HealthcareAssertion as EntityAssertion,
  type PiiCategory as PiiEntityCategory,
  type Association as EntityAssociation,
  type Certainty as EntityCertainty,
  type Conditionality as EntityConditionality,
  type RelationType as HealthcareEntityRelationType,
  KnownHealthcareEntityCategory,
  type HealthcareEntityCategory,
} from "./generated/models/index.js";
