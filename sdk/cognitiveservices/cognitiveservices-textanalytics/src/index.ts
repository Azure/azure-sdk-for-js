// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  TextAnalyticsClient,
  TextAnalyticsClientOptions,
  DetectLanguageOptions,
  DetectLanguagesOptions,
  RecognizeEntitiesOptions,
  AnalyzeSentimentOptions,
  ExtractKeyPhrasesOptions
} from "./textAnalyticsClient";
export { CognitiveServicesCredentials } from "./cognitiveServicesCredentials";
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
  TextAnalysisResult,
  TextAnalysisErrorResult,
  TextAnalysisSuccessResult
} from "./textAnalysisResult";

// Models
export {
  DetectedLanguage,
  DocumentStatistics,
  MultiLanguageInput,
  LanguageInput,
  TextAnalyticsClientLanguagesOptionalParams,
  TextAnalyticsClientEntitiesRecognitionGeneralOptionalParams,
  TextAnalyticsClientSentimentOptionalParams,
  TextAnalyticsClientKeyPhrasesOptionalParams,
  ErrorModel,
  RequestStatistics,
  Code1 as ErrorModelCode,
  Code as ErrorCode,
  InnerError,
  Entity,
  SentenceSentiment,
  Sentiment1 as TextSentiment,
  Sentiment
} from "./generated/models";
