# Release History

## 1.0.0 (Unreleased)

### Features Added

- GA release of Azure AI Content Understanding client library for JavaScript
- Added `ContentUnderstandingClient` for analyzing documents, audio, and video content
- Each `ContentField` subclass (e.g., `StringField`, `NumberField`, `BooleanField`) now exposes a strongly-typed `value` property
- Added `AnalysisContent` hierarchy (`DocumentContent`, `AudioVisualContent`) for strongly-typed parsing of content on `AnalysisResult`
- Added `AnalysisResultPoller` type that exposes `operationId` on the returned poller for result retrieval
- Added support for `clientRequestId` parameter in analyzer management operations
- Set service API version to `2025-11-01`
