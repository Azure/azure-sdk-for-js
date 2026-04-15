# Release History

## 1.0.1 (Unreleased)

### Bugs Fixed

- Exposed `usage` property on `AnalysisResultPoller` so that billing/metering details (`UsageDetails`) from the analyze operation status envelope are accessible after the operation completes. Previously, the `usage` field from the REST API response was deserialized but not surfaced on the poller.

## 1.0.0 (2026-02-28)

### Features Added

- Initial release of the Azure AI Content Understanding client library for JavaScript (`@azure/ai-content-understanding`). This package provides `ContentUnderstandingClient` for analyzing documents, audio, and video content, as well as creating, managing, and configuring analyzers. Service API version `2025-11-01`.
