# Release History

## 1.0.0-preview.3 (2020-03-10)
- [Breaking] Renamed `id` to `dataSourceEntityId` in the `LinkedEntity` type.
- Added special handling for the string `"none"` as the `countryHint` parameter of the `TextAnalyticsClient.detectLanguage`. `"none"` is now treated the same as the empty string, and indicates that the default language detection model should be used.
- [Breaking] Renamed `offset` to `graphemeOffset` and `length` to `graphemeLength` in fields of response objects as appropriate in order to make it clear that the offsets and lengths are in units of Unicode graphemes.
- [Breaking] Renamed `sentimentScores` on both `DocumentSentiment` and `SentenceSentiment` to `confidenceScores`, and renamed the type `SentimentScorePerLabel` to `SentimentConfidenceScores`.
- [Breaking] Renamed `characterCount` to `graphemeCount` in the `DocumentStatistics` interface, to align with the change to using `grapheme` in the lengths/offsets of response objects.

## 1.0.0-preview.2 (2020-02-11)

- Added support for rotating API keys via the `TextAnalyticsApiKeyCredential.updateKey` method.
- Added a discriminant type for `TextAnalyticsResult.error` to allow for easy differentiation between success and error types using `if (result.error) { ... }` in both TypeScript and JavaScript.
- [Breaking] Removed the `Entity` type and added new return types `CategorizedEntity` and `PiiEntity` for the `recognizeEntities` and `recognizePiiEntities` methods respectively. These types are equivalent to the previous `Entity` type.
- [Breaking] Removed the `detectedLanguages` property from `DetectLanguageResult`, as the service currently only returns one language.
- [Breaking] Renamed the `detectLanguages` method to `detectLanguage`, as the `detectedLanguages` property was removed from the `DetectLanguageResult` return type.
- [Breaking] Renamed `documentScores` and `sentenceScores` on the `DocumentSentiment` and `SentenceSentiment` types both to `sentimentScores`.
- [Breaking] Renamed `type` and `subtype` to `category` and `subcategory` respectively in the `CategorizedEntity` and `PiiEntity` types.
- [Breaking] Renamed `DocumentSentimentValue` and `SentenceSentimentValue` to `DocumentSentimentLabel` and `SentenceSentimentLabel` respectively.
- [Breaking] Renamed `SentimentConfidenceScorePerLabel` to `SentimentScorePerLabel`.
- [Breaking] Refactored `TextAnalyticsError` to flatten the error hierarchy and remove `innerError`. The new error model has properties for `code`, `message`, and an optional `target` only. The `code` property of `TextAnalyticsError` can now contain all of the codes from the previous `InnerErrorCodeValue` as well as those from the top-level `ErrorCodeValue`.

## 1.0.0-preview.1 (2020-01-09)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).
- Differences from previous public package `@azure/cognitiveservices-textanalytics`
  - Package name changed from `@azure/cognitiveservices-textanalytics` to `@azure/ai-text-analytics`.
  - Package targets version `3.0` of the service API.
  - Supports authentication via `@azure/identity`.
