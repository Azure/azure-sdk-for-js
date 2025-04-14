// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  TextAnalyticsClient,
  TextAnalyticsClientOptions,
  DetectLanguageOptions,
  RecognizeCategorizedEntitiesOptions,
  AnalyzeSentimentOptions,
  ExtractKeyPhrasesOptions,
  RecognizePiiEntitiesOptions,
  RecognizeLinkedEntitiesOptions,
  PiiEntityDomain,
  TextAnalyticsActions,
  RecognizeCategorizedEntitiesAction,
  RecognizePiiEntitiesAction,
  ExtractKeyPhrasesAction,
  BeginAnalyzeActionsOptions,
  AnalyzeActionsPollerLike,
  BeginAnalyzeHealthcareEntitiesOptions,
  AnalyzeHealthcareEntitiesPollerLike,
  AnalyzeActionsOperationState,
  AnalyzeHealthcareOperationState,
  AnalysisPollOperationState,
  OperationMetadata,
  AnalyzeActionsOperationMetadata,
  StringIndexType,
  RecognizeLinkedEntitiesAction,
  AnalyzeSentimentAction,
  PollerLikeWithCancellation,
} from "./textAnalyticsClient.js";
export { TextAnalyticsOperationOptions } from "./textAnalyticsOperationOptions.js";
export {
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult,
} from "./detectLanguageResult.js";
export { DetectLanguageResultArray } from "./detectLanguageResultArray.js";
export {
  CategorizedEntity,
  RecognizeCategorizedEntitiesResult,
  RecognizeCategorizedEntitiesErrorResult,
  RecognizeCategorizedEntitiesSuccessResult,
} from "./recognizeCategorizedEntitiesResult.js";
export {
  PiiEntity,
  RecognizePiiEntitiesResult,
  RecognizePiiEntitiesErrorResult,
  RecognizePiiEntitiesSuccessResult,
} from "./recognizePiiEntitiesResult.js";
export { RecognizePiiEntitiesResultArray } from "./recognizePiiEntitiesResultArray.js";
export { RecognizeCategorizedEntitiesResultArray } from "./recognizeCategorizedEntitiesResultArray.js";
export {
  AnalyzeSentimentResult,
  AnalyzeSentimentErrorResult,
  AnalyzeSentimentSuccessResult,
  SentenceSentiment,
  Opinion,
  TargetSentiment,
  AssessmentSentiment,
} from "./analyzeSentimentResult.js";
export { AnalyzeSentimentResultArray } from "./analyzeSentimentResultArray.js";
export {
  ExtractKeyPhrasesResult,
  ExtractKeyPhrasesErrorResult,
  ExtractKeyPhrasesSuccessResult,
} from "./extractKeyPhrasesResult.js";
export { ExtractKeyPhrasesResultArray } from "./extractKeyPhrasesResultArray.js";
export {
  RecognizeLinkedEntitiesResult,
  RecognizeLinkedEntitiesErrorResult,
  RecognizeLinkedEntitiesSuccessResult,
} from "./recognizeLinkedEntitiesResult.js";
export { RecognizeLinkedEntitiesResultArray } from "./recognizeLinkedEntitiesResultArray.js";
export {
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
export {
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
export {
  ErrorCode,
  TextAnalyticsError,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult,
} from "./textAnalyticsResult.js";

export { TextAnalyticsAction } from "./textAnalyticsAction.js";

// Models
export {
  DetectedLanguage,
  TextDocumentStatistics,
  SentimentConfidenceScores,
  TextDocumentInput,
  DetectLanguageInput,
  TextDocumentBatchStatistics,
  Entity,
  DocumentSentimentLabel,
  SentenceSentimentLabel,
  ErrorCodeValue,
  InnerErrorCodeValue,
  KnownInnerErrorCodeValue,
  WarningCode,
  KnownWarningCode,
  LinkedEntity,
  Match,
  SentenceAssessment,
  TargetConfidenceScoreLabel,
  TokenSentimentValue,
  TextAnalyticsWarning,
  State as TextAnalyticsOperationStatus,
  HealthcareAssertion as EntityAssertion,
  PiiCategory as PiiEntityCategory,
  Association as EntityAssociation,
  Certainty as EntityCertainty,
  Conditionality as EntityConditionality,
  RelationType as HealthcareEntityRelationType,
  KnownHealthcareEntityCategory,
  HealthcareEntityCategory,
} from "./generated/models/index.js";
