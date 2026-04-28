# Release History

## 1.2.0-beta.1 (Unreleased)

### Features Added

- Added `toLlmInput`, a static helper that converts an `AnalysisResult` into LLM-friendly text (YAML front matter + markdown). Renders documents (with `<!-- page N -->` markers), audio/video (with `timeRange` for multi-segment results), and document-classification hierarchies (parent expanded into per-segment blocks separated by `*****`). Supports `includeFields`, `includeMarkdown`, and user `metadata` options. Mirrors the Python `to_llm_input` and .NET `LlmInputHelper.ToLlmInput` helpers.

## 1.1.0 (2026-04-24)

### Features Added

- Billing and token consumption details are now available after analysis operations complete. Access via `poller.operationState?.usage`.
- The operation ID is now available on the operation state via `poller.operationState?.operationId`.

### Deprecations

- `poller.operationId` is deprecated. Use `poller.operationState?.operationId` instead.

## 1.0.0 (2026-02-28)

### Features Added

- Initial release of the Azure AI Content Understanding client library for JavaScript (`@azure/ai-content-understanding`). This package provides `ContentUnderstandingClient` for analyzing documents, audio, and video content, as well as creating, managing, and configuring analyzers. Service API version `2025-11-01`.
