// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  ExtractSummaryAction,
  KnownSummarySentencesSortBy as KnownSummarySentencesOrderBy,
  RecognizeCustomEntitiesAction,
  SingleCategoryClassifyAction,
  MultiCategoryClassifyAction,
} from "./textAnalyticsClient";
export { TextAnalyticsOperationOptions } from "./textAnalyticsOperationOptions";
export {
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult,
} from "./detectLanguageResult";
export { DetectLanguageResultArray } from "./detectLanguageResultArray";
export {
  CategorizedEntity,
  RecognizeCategorizedEntitiesResult,
  RecognizeCategorizedEntitiesErrorResult,
  RecognizeCategorizedEntitiesSuccessResult,
} from "./recognizeCategorizedEntitiesResult";
export {
  PiiEntity,
  RecognizePiiEntitiesResult,
  RecognizePiiEntitiesErrorResult,
  RecognizePiiEntitiesSuccessResult,
} from "./recognizePiiEntitiesResult";
export { RecognizePiiEntitiesResultArray } from "./recognizePiiEntitiesResultArray";
export { RecognizeCategorizedEntitiesResultArray } from "./recognizeCategorizedEntitiesResultArray";
export {
  AnalyzeSentimentResult,
  AnalyzeSentimentErrorResult,
  AnalyzeSentimentSuccessResult,
  SentenceSentiment,
  Opinion,
  TargetSentiment,
  AssessmentSentiment,
} from "./analyzeSentimentResult";
export { AnalyzeSentimentResultArray } from "./analyzeSentimentResultArray";
export {
  ExtractKeyPhrasesResult,
  ExtractKeyPhrasesErrorResult,
  ExtractKeyPhrasesSuccessResult,
} from "./extractKeyPhrasesResult";
export { ExtractKeyPhrasesResultArray } from "./extractKeyPhrasesResultArray";
export {
  ExtractSummaryResult,
  ExtractSummaryErrorResult,
  ExtractSummarySuccessResult,
  SummarySentence,
} from "./extractSummaryResult";
export { ExtractSummaryResultArray } from "./extractSummaryResultArray";
export {
  RecognizeCustomEntitiesErrorResult,
  RecognizeCustomEntitiesResult,
  RecognizeCustomEntitiesSuccessResult,
} from "./recognizeCustomEntitiesResult";
export { RecognizeCustomEntitiesResultArray } from "./recognizeCustomEntitiesResultArray";
export {
  SingleCategoryClassifyErrorResult,
  SingleCategoryClassifyResult,
  SingleCategoryClassifySuccessResult,
  ClassificationCategory,
} from "./singleCategoryClassifyResult";
export { SingleCategoryClassifyResultArray } from "./singleCategoryClassifyResultArray";
export {
  MultiCategoryClassifyErrorResult,
  MultiCategoryClassifyResult,
  MultiCategoryClassifySuccessResult,
} from "./multiCategoryClassifyResult";
export { MultiCategoryClassifyResultArray } from "./multiCategoryClassifyResultArray";
export {
  RecognizeLinkedEntitiesResult,
  RecognizeLinkedEntitiesErrorResult,
  RecognizeLinkedEntitiesSuccessResult,
} from "./recognizeLinkedEntitiesResult";
export { RecognizeLinkedEntitiesResultArray } from "./recognizeLinkedEntitiesResultArray";
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
} from "./analyzeHealthcareEntitiesResult";
export {
  PagedAnalyzeActionsResult,
  PagedAsyncIterableAnalyzeActionsResult,
  AnalyzeActionsResult,
  RecognizeCategorizedEntitiesActionResult,
  RecognizePiiEntitiesActionResult,
  ExtractKeyPhrasesActionResult,
  TextAnalyticsActionState,
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
  ExtractSummaryActionResult,
  ExtractSummaryActionSuccessResult,
  ExtractSummaryActionErrorResult,
  RecognizeCustomEntitiesActionResult,
  RecongizeCustomEntitiesActionErrorResult,
  RecongizeCustomEntitiesActionSuccessResult,
  MultiCategoryClassifyActionErrorResult,
  MultiCategoryClassifyActionResult,
  MultiCategoryClassifyActionSuccessResult,
  SingleCategoryClassifyActionErrorResult,
  SingleCategoryClassifyActionResult,
  SingleCategoryClassifyActionSuccessResult,
} from "./analyzeActionsResult";
export {
  ErrorCode,
  TextAnalyticsError,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult,
} from "./textAnalyticsResult";

export { TextAnalyticsAction, CustomTextAnalyticsAction } from "./textAnalyticsAction";

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
  ClassificationResult,
} from "./generated/models";
