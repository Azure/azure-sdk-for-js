# Release History

## 1.1.0-beta.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

- Documented that `locales` is now applied in Enhanced Mode. The service runs in multi-lingual mode by default; when `locales` is specified, the service uses the first locale as a recognition hint to bias language recognition. No API or wire-format changes are required—the existing request already sends `locales` in all modes.

## 1.0.0 (2026-05-15)

### Features Added

This is the first stable (GA) release of the `@azure/ai-speech-transcription` client library. It targets the `2025-10-15` Azure AI Speech Transcription service API version.

### Breaking Changes

- Combined `TranscriptionClient.transcribe`'s `options` and `operationOptions` parameters into a single options bag. `TranscriptionOptions` now extends `OperationOptions`, so callers can pass `abortSignal`, `requestOptions`, `tracingOptions`, and `onResponse` alongside transcription-specific parameters in the same object. `TranscribeOptions` is no longer re-exported from the package root; it remains available from the `@azure/ai-speech-transcription/api` subpath for advanced scenarios that call the underlying operation directly. Callers that previously passed `(source, options, operationOptions)` should merge both objects into a single `options` argument.

## 1.0.0-beta.2 (2026-05-13)

### Breaking Changes

- Renamed `offsetMilliseconds` and `durationMilliseconds` to `offsetInMs` and `durationInMs` on `TranscribedPhrase` and `TranscribedWord` to align with the Azure SDK design guidelines for duration-valued properties.
- Renamed `TranscriptionClientOptionalParams` to `TranscriptionClientOptions` and `TranscribeOptionalParams` to `TranscribeOptions` to follow the `<Name>Options` naming convention.
- Removed `string` from the `FileContents` union type to avoid ambiguity with file paths and URLs. Pass a `NodeJS.ReadableStream`, `ReadableStream<Uint8Array>`, `Uint8Array`, or `Blob` instead.

## 1.0.0-beta.1 (2026-03-13)

### Features Added

This is the first preview version of @azure/ai-speech-transcription
