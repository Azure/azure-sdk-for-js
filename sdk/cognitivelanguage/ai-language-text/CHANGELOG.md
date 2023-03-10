# Release History

## 1.1.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.0-beta.2 (2023-03-07)

### Features Added

- Add support for logging API warnings that are part of warn-text response headers.
- Add support for `partiallySucceeded` status and parse action error pointers.
- Change `AbstractiveSummarizationAction` property from `maxSentenceCount` to `sentenceCount`.

### Breaking Changes

- Remove `defaultLanguage` from the `BeginAnalyzeBatchOptions` interface.

## 1.1.0-beta.1 (2022-11-17)

### Features Added

- Supports service version 2022-10-01-preview by default instead of 2022-05-01.
- Adds support for extractive summarization and FHIR in `beginAnalyzeBatch`.
- Adds support for abstractive summarization in `beginAnalyzeBatch`.
- Adds support for dynamic classification in `analyze`.
- Adds support for script detection (use model version "2022-04-10-preview")
- Adds automatic language detection in `beginAnalyzeBatch`.
- Adds support for document types in healthcare analysis.
- Adds support for entity resolution in entity recognition (use model version "2022-10-01-preview").
- Adds support for confidence scores in healthcare relations.

## 1.0.0 (2022-09-08)

### Features Added

- Supports service version 2022-05-01 by default instead of 2022-04-01-preview.

### Breaking Changes

- `AnalyzeBatchPoller` has been updated by removing `isStarted`, `isCanceled`, and `isCompleted`.
- `cancelOperation` in `AnalyzeBatchPoller` has been renamed to `sendCancellationRequest`.
- Extractive Summarization action has been removed because it is still in beta. Use @azure/ai-language-text@1.0.0-beta.1 to access this feature.
- FHIR has been removed from healthcare actions because it is still in beta. Use @azure/ai-language-text@1.0.0-beta.1 to access this feature.
- `apiVersion` option in the client class constructor options bag has been renamed to `serviceVersion`.
- `apiVersion` option in the method options bags has been removed.

## 1.0.0-beta.1 (2022-08-11)

- Initial release
