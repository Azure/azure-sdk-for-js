# Release History

## 1.0.0-preview.2 (2020-02-11)

- Overhauled Text Analytics samples packages. #7052
- Added support for rotating API keys via the `TextAnalyticsApiKeyCredential.updateKey` method. #6972
- Added a discriminant type for `TextAnalyticsResult.error` to allow for easy differentiation between success and error types using `if (result.error) { ... }` in both TypeScript and JavaScript. #7046
- [Breaking] Added new return types `CategorizedEntity` and `PiiEntity` for the `recognizeEntities` and `recognizePiiEntities` methods respectively. These types are equivalent to the previous `Entity` type. #7220
- [Breaking] Removed the `detectedLanguages` property from `DetectLanguageResult`, as the service currently only returns one language. #7220
- [Breaking] Renamed `detectLanguages` to `detectLanguage`. #7220
- [Breaking] Renamed `documentScores` and `sentenceScores` on the `DocumentSentiment` and `SentenceSentiment` types both to `sentimentScores`. #7220
- [Breaking] Renamed `type` and `subtype` to `category` and `subcategory` respectively in the `CategorizedEntity` and `PiiEntity` types. #7220
- [Breaking] Renamed `DocumentSentimentValue` and `SentenceSentimentValue` to `DocumentSentimentLabel` and `SentenceSentimentLabel` respectively. #7220
- [Breaking] Renamed `SentimentConfidenceScorePerLabel` to `SentimentScorePerLabel`. #7220
- Migrated to TypeScript 3.7. #7210
- [Breaking] Refactored `TextAnalyticsError` to flatten the error hierarchy and remove `innerError`. The new error model has properties for `code`, `message`, and an optional `target` only. The `code` property of `TextAnalyticsError` can now contain all of the codes from the previous `InnerErrorCodeValue` as well as those from the top-level `ErrorCodeValue`. #7276

## 1.0.0-preview.1 (2020-01-09)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).
- Differences from previous public package `@azure/cognitiveservices-textanalytics`
  - Package name changed from `@azure/cognitiveservices-textanalytics` to `@azure/ai-text-analytics`.
  - Package targets version `3.0` of the service API.
  - Supports authentication via `@azure/identity`.
