# Release History

## 5.0.1 (Unreleased)

- The `text` property of the `SentenceSentiment` interface is no longer marked as optional because the service has always returned it. This interface is used exclusively as an output type so this change does not break existing code.

## 5.0.0 (2020-07-27)

- Updated the package version to be 5.0.0 instead of 1.0.0 in order to reduce confusion with older versions of the Azure Text Analytics SDKs.

## 1.0.0 (2020-06-09)

- This release marks the general availability of the `@azure/ai-text-analytics` package.

## 1.0.0-preview.5 (2020-05-26)
- [Breaking] Renamed all result array types that extend JavaScript's base `Array` class to end with the word `Array` instead of `Collection` (e.g. `AnalyzeSentimentResultCollection` is now `AnalyzeSentimentResultArray`)
- [Breaking] Renamed `score` to `confidenceScore` in the `Match`, `Entity`, and `DetectedLanguage` types.
- [Breaking] Removed the `graphemeOffset` and `graphemeLength` properties of the `Match`, `Entity`, and `SentenceSentiment` types.
- [Breaking] Renamed the `graphemeCount` property of `TextDocumentStatistics` back to `characterCount`
- Added a `text` property to `SentenceSentiment` that contains the sentence text
- [Breaking] Removed the `warnings` property of `SentenceSentiment`.
- Added `warnings` property to every document response object containing a list of `TextAnalyticsWarning` objects relevant to the corresponding document.
- Migrated to using the Text Analytics v3.0 (General Availability) service endpoint.


## 1.0.0-preview.4 (2020-04-07)
- Renamed the first parameter of all operation methods from `inputs` to `documents`
- [Breaking] Removed PII entity detection methods from `TextAnalyticsClient` as well as all associated samples and documentation
- [Breaking] Replaced `TextAnalyticsApiKeyCredential` with `AzureKeyCredential` (re-exported through this package from `@azure/core-auth`).
- `TextAnalyticsClient` methods now throw an error when the `documents` parameter is not an array or empty before sending a request to the Text Analytics service.

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
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).
- Differences from previous public package `@azure/cognitiveservices-textanalytics`
  - Package name changed from `@azure/cognitiveservices-textanalytics` to `@azure/ai-text-analytics`.
  - Package targets version `3.0` of the service API.
  - Supports authentication via `@azure/identity`.
