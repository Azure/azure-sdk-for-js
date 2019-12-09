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
  ExtractEntityLinkingOptions
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
  ExtractLinkedEntitiesResult,
  ExtractLinkedEntitiesErrorResult,
  ExtractLinkedEntitiesSuccessResult
} from "./extractLinkedEntitiesResult";
export { ExtractLinkedEntitiesResultCollection } from "./extractLinkedEntitiesResultCollection";
export {
  TextAnalyticsResult,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult
} from "./textAnalyticsResult";

// Models
export {
  DetectedLanguage,
  DocumentStatistics,
  SentimentConfidenceScorePerLabel,
  MultiLanguageInput,
  LanguageInput,
  TextAnalyticsClientLanguagesOptionalParams,
  TextAnalyticsClientEntitiesRecognitionGeneralOptionalParams,
  TextAnalyticsClientSentimentOptionalParams,
  TextAnalyticsClientKeyPhrasesOptionalParams,
  TextAnalyticsClientEntitiesRecognitionPiiOptionalParams,
  TextAnalyticsClientEntitiesLinkingOptionalParams,
  TextAnalyticsError,
  RequestStatistics,
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
