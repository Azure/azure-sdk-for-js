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
  RecognizeLinkedEntitiesOptions,
  TextAnalyticsOperationOptions
} from "./textAnalyticsClient";
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
  TextAnalyticsWarning
} from "./generated/models";
