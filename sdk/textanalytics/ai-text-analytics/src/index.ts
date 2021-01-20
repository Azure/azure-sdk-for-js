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
  JobManifestTasks,
  EntitiesTask,
  PiiTask,
  KeyPhrasesTask,
  BeginAnalyzeOptions,
  AnalyzePollerLike,
  BeginAnalyzeHealthcareOptions,
  HealthPollerLike,
  BeginAnalyzeOperationState,
  HealthcareJobOptions,
  PollingOptions,
  AnalyzeJobOptions,
  BeginAnalyzeHealthcareOperationState
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
  PaginatedHealthcareEntities,
  PagedAsyncIterableHealthEntities,
  HealthcareEntitiesArray,
  HealthcareResult,
  HealthcareSuccessResult,
  HealthcareErrorResult
} from "./healthResult";
export {
  PaginatedAnalyzeResults,
  PagedAsyncIterableAnalyzeResults,
  AnalyzeResult
} from "./analyzeResult";
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
  WarningCode,
  LinkedEntity,
  Match,
  SentenceOpinion,
  AspectConfidenceScoreLabel,
  TokenSentimentValue,
  TextAnalyticsWarning,
  PiiTaskParametersDomain,
  HealthcareEntity,
  HealthcareRelation,
  HealthcareEntityLink
} from "./generated/models";
