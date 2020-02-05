// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  TextAnalyticsClient,
  TextAnalyticsClientOptions,
  DetectLanguageOptions,
  RecognizeCategorizedEntitiesOptions,
  AnalyzeSentimentOptions,
  ExtractKeyPhrasesOptions,
  RecognizePiiEntitiesOptions,
  RecognizeLinkedEntitiesOptions,
  TextAnalyticsOperationOptions
} from "./textAnalyticsClient";
export { TextAnalyticsApiKeyCredential } from "./textAnalyticsApiKeyCredential";
export {
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult
} from "./detectLanguageResult";
export { DetectLanguageResultCollection } from "./detectLanguageResultCollection";
export {
  CategorizedEntity,
  RecognizeCategorizedEntitiesResult,
  RecognizeCategorizedEntitiesErrorResult,
  RecognizeCategorizedEntitiesSuccessResult
} from "./recognizeCategorizedEntitiesResult";
export { RecognizeCategorizedEntitiesResultCollection } from "./recognizeCategorizedEntitiesResultCollection";
export {
  PiiEntity,
  RecognizePiiEntitiesResult,
  RecognizePiiEntitiesErrorResult,
  RecognizePiiEntitiesSuccessResult
} from "./recognizePiiEntitiesResult";
export { RecognizePiiEntitiesResultCollection } from "./recognizePiiEntitiesResultCollection";
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
  SentimentScorePerLabel,
  MultiLanguageInput as TextDocumentInput,
  LanguageInput as DetectLanguageInput,
  TextAnalyticsError,
  TextDocumentBatchStatistics,
  InnerErrorCodeValue,
  ErrorCodeValue,
  InnerError,
  Entity,
  SentenceSentiment,
  DocumentSentimentLabel,
  SentenceSentimentLabel,
  LinkedEntity,
  Match
} from "./generated/models";
