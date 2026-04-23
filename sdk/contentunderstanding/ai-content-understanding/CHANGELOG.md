# Release History

## 1.1.0 (2026-04-23)

### Features Added

- Added `AnalysisOperationState` interface that extends `OperationState<AnalysisResult>` with `operationId` and `usage` metadata, following the same pattern used by Form Recognizer (`DocumentAnalysisPollOperationState`) and Storage Blob (`BlobBeginCopyFromUrlPollState`).
- Added `AnalysisOperationMetadata` interface with `usage` and `operationId` fields.
- Added `usage` on `AnalysisOperationState` to surface billing and token consumption details (`UsageDetails`) after the operation completes. Access via `poller.operationState?.usage`.

### Breaking Changes

- `operationId` is no longer a direct property on `AnalysisResultPoller`. Use `poller.operationState?.operationId` instead. The deprecated `poller.operationId` getter is retained for backward compatibility.
- `usage` is now accessed via `poller.operationState?.usage` instead of `poller.usage`.

## 1.0.0 (2026-02-28)

### Features Added

- Initial release of the Azure AI Content Understanding client library for JavaScript (`@azure/ai-content-understanding`). This package provides `ContentUnderstandingClient` for analyzing documents, audio, and video content, as well as creating, managing, and configuring analyzers. Service API version `2025-11-01`.
