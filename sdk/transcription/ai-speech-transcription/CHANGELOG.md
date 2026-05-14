# Release History

## 1.0.0 (2026-05-14)

### Features Added

This is the first stable (GA) release of the `@azure/ai-speech-transcription` client library. It targets the `2025-10-15` Azure AI Speech Transcription service API version.

## 1.0.0-beta.2 (2026-05-13)

### Breaking Changes

- Renamed `offsetMilliseconds` and `durationMilliseconds` to `offsetInMs` and `durationInMs` on `TranscribedPhrase` and `TranscribedWord` to align with the Azure SDK design guidelines for duration-valued properties.
- Renamed `TranscriptionClientOptionalParams` to `TranscriptionClientOptions` and `TranscribeOptionalParams` to `TranscribeOptions` to follow the `<Name>Options` naming convention.
- Removed `string` from the `FileContents` union type to avoid ambiguity with file paths and URLs. Pass a `NodeJS.ReadableStream`, `ReadableStream<Uint8Array>`, `Uint8Array`, or `Blob` instead.

## 1.0.0-beta.1 (2026-03-13)

### Features Added

This is the first preview version of @azure/ai-speech-transcription
