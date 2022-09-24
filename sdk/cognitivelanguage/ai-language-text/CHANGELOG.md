# Release History

## 1.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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
