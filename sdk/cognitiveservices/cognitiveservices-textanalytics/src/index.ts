// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  TextAnalyticsClient,
  TextAnalyticsClientOptions,
  DetectLanguageOptions,
  DetectLanguagesOptions
} from "./textAnalyticsClient";
export { CognitiveServicesCredentials } from "./cognitiveServicesCredentials";
export {
  DetectLanguageResult,
  DetectLanguageErrorResult,
  DetectLanguageSuccessResult
} from "./detectLanguageResult";
export { DetectLanguageResultCollection } from "./detectLanguageResultCollection";
export {
  TextAnalysisResult,
  TextAnalysisErrorResult,
  TextAnalysisSuccessResult
} from "./textAnalysisResult";

// Models
export {
  DetectedLanguage,
  DocumentStatistics,
  LanguageInput,
  TextAnalyticsClientLanguagesOptionalParams
} from "./generated/models";
