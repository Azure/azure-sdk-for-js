// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  TextAnalyticsClient,
  TextAnalyticsClientOptions,
  DetectLanguageOptions,
  DetectLanguagesOptions,
  RecognizeEntitiesOptions,
  AnalyzeSentimentOptions,
  ExtractKeyPhrasesOptions,
  RecognizePiiEntitiesOptions,
  RecognizeLinkedEntitiesOptions,
  TextAnalyticsOperationOptions
} from "./textAnalyticsClient";
export { CognitiveServicesCredential } from "./cognitiveServicesCredential";
export {
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult
} from "./detectLanguageResult";
export { DetectLanguageResultCollection } from "./detectLanguageResultCollection";
export {
  RecognizeEntitiesResult,
  RecognizeEntitiesErrorResult,
  RecognizeEntitiesSuccessResult
} from "./recognizeEntitiesResult";
export { RecognizeEntitiesResultCollection } from "./recognizeEntitiesResultCollection";
export {
  AnalyzeSentimentResult,
  AnalyzeSentimentErrorResult,
  AnalyzeSentimentSuccessResult
} from "./analyzeSentimentResult";
export { AnalyzeSentimentResultCollection } from "./analyzeSentimentResultCollection";
export {
  ExtractKeyPhrasesResult,
  ExtractKeyPhrasesErrorResult,
  ExtractKeyPhrasesSuccessResult
} from "./extractKeyPhrasesResult";
export { ExtractKeyPhrasesResultCollection } from "./extractKeyPhrasesResultCollection";
export {
  RecognizeLinkedEntitiesResult,
  RecognizeLinkedEntitiesErrorResult,
  RecognizeLinkedEntitiesSuccessResult
} from "./recognizeLinkedEntitiesResult";
export { RecognizeLinkedEntitiesResultCollection } from "./recognizeLinkedEntitiesResultCollection";
export {
  TextAnalyticsResult,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult
} from "./textAnalyticsResult";

// Models
export {
  DetectedLanguage,
  TextDocumentStatistics,
  SentimentConfidenceScorePerLabel,
  MultiLanguageInput,
  LanguageInput,
  TextAnalyticsError,
  TextDocumentBatchStatistics,
  InnerErrorCode,
  TextAnalyticsErrorCode,
  InnerError,
  Entity,
  SentenceSentiment,
  DocumentSentimentValue,
  SentenceSentimentValue,
  LinkedEntity,
  Match
} from "./generated/models";
