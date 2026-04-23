# Release History

## 1.1.0 (2026-04-23)

### Features Added

- Added `AnalysisOperationState` interface that extends `OperationState<AnalysisResult>` with `operationId` and `usage` metadata, following the same pattern used by Form Recognizer (`DocumentAnalysisPollOperationState`) and Storage Blob (`BlobBeginCopyFromUrlPollState`).
- Added `AnalysisOperationMetadata` interface with `usage` and `operationId` fields.
- Added `usage` on `AnalysisOperationState` to surface billing and token consumption details (`UsageDetails`) after the operation completes. Access via `poller.operationState?.usage`.

### Deprecations

- `poller.operationId` is deprecated. Use `poller.operationState?.operationId` instead.

## 1.0.0 (2026-02-28)

### Features Added

- Initial release of the Azure AI Content Understanding client library for JavaScript (`@azure/ai-content-understanding`). This package provides `ContentUnderstandingClient` for analyzing documents, audio, and video content, as well as creating, managing, and configuring analyzers. Service API version `2025-11-01`.
