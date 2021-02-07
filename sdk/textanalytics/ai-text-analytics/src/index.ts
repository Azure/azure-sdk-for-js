// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import "@azure/core-asynciterator-polyfill";

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
  PiiEntityDomainType,
  TextAnalyticsActions,
  RecognizeCategorizedEntitiesAction,
  RecognizePiiEntitiesAction,
  ExtractKeyPhrasesAction,
  BeginAnalyzeBatchActionsOptions,
  AnalyzeBatchActionsPollerLike,
  BeginAnalyzeHealthcareEntitiesOptions,
  AnalyzeHealthcareEntitiesPollerLike,
  AnalyzeBatchActionsOperationState,
  AnalyzeHealthcareOperationState,
  AnalysisPollOperationState,
  OperationMetadata,
  AnalyzeBatchActionsOperationMetadata,
  StringIndexType
} from "./textAnalyticsClient";
export { TextAnalyticsOperationOptions } from "./textAnalyticsOperationOptions";
export {
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult
} from "./detectLanguageResult";
export { DetectLanguageResultArray } from "./detectLanguageResultArray";
export {
  CategorizedEntity,
  RecognizeCategorizedEntitiesResult,
  RecognizeCategorizedEntitiesErrorResult,
  RecognizeCategorizedEntitiesSuccessResult
} from "./recognizeCategorizedEntitiesResult";
export {
  PiiEntity,
  RecognizePiiEntitiesResult,
  RecognizePiiEntitiesErrorResult,
  RecognizePiiEntitiesSuccessResult
} from "./recognizePiiEntitiesResult";
export { RecognizePiiEntitiesResultArray } from "./recognizePiiEntitiesResultArray";
export { RecognizeCategorizedEntitiesResultArray } from "./recognizeCategorizedEntitiesResultArray";
export {
  AnalyzeSentimentResult,
  AnalyzeSentimentErrorResult,
  AnalyzeSentimentSuccessResult,
  SentenceSentiment,
  MinedOpinion,
  AspectSentiment,
  OpinionSentiment
} from "./analyzeSentimentResult";
export { AnalyzeSentimentResultArray } from "./analyzeSentimentResultArray";
export {
  ExtractKeyPhrasesResult,
  ExtractKeyPhrasesErrorResult,
  ExtractKeyPhrasesSuccessResult
} from "./extractKeyPhrasesResult";
export { ExtractKeyPhrasesResultArray } from "./extractKeyPhrasesResultArray";
export {
  RecognizeLinkedEntitiesResult,
  RecognizeLinkedEntitiesErrorResult,
  RecognizeLinkedEntitiesSuccessResult
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
  HealthcareEntityRelationType
} from "./analyzeHealthcareEntitiesResult";
export {
  PagedAnalyzeBatchActionsResult,
  PagedAsyncIterableAnalyzeBatchActionsResult,
  AnalyzeBatchActionsResult,
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
  ExtractKeyPhrasesActionSuccessResult
} from "./analyzeBatchActionsResult";
export {
  TextAnalyticsResult,
  ErrorCode,
  TextAnalyticsError,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult
} from "./textAnalyticsResult";

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
  SentenceOpinion,
  AspectConfidenceScoreLabel,
  TokenSentimentValue,
  TextAnalyticsWarning,
  State as TextAnalyticsOperationStatus
} from "./generated/models";
