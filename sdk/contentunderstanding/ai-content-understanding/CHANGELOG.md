# Release History

## 1.2.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

- Added GitHub Copilot skills under `.github/skills/` to help users
  iteratively author custom analyzers in VS Code with Copilot:
  - **`cu-sdk-author-analyzer`** — author and refine a custom analyzer
    for a single document type (layout extraction → schema drafting →
    validation → batch test → agent review → refine cycle). Document
    modality only today; audio/video/image are planned.
  - **`cu-sdk-author-analyzer-classify-route`** — author and refine a
    classify-and-route pipeline for mixed-document packets (e.g.
    invoice + bank statement + loan application in one PDF), with
    per-category agent review.

  Both skills delegate to a small `cu-skill` TypeScript tool under
  `.github/skills/_shared/` that exposes three subcommands —
  `extract-layout`, `create-and-test`, and `create-and-test-router` —
  and a pure-TypeScript `SchemaValidator` (Node `fs` only, no
  `@azure/*` deps) that catches structural mistakes (unknown
  `baseAnalyzerId`, missing `fieldSchema`, malformed
  `contentCategories` routes) before a service round-trip.

## 1.2.0-beta.2 (2026-06-11)

### Bugs Fixed

- Filtered service-emitted `LLMStats:` telemetry entries from the rendered `rai_warnings` front matter. [#38851](https://github.com/Azure/azure-sdk-for-js/pull/38851)

### Other Changes

- Updated `toLlmInput` page markers from `<!-- page N -->` to `<!-- InputPageNumber: N -->` and avoided duplicate marker injection when the service markdown already includes `InputPageNumber` markers. [#38851](https://github.com/Azure/azure-sdk-for-js/pull/38851)

## 1.2.0-beta.1 (2026-04-30)

### Features Added

- Added `toLlmInput` helper that converts `AnalysisResult` into LLM-friendly text with YAML front matter and markdown content. Supports documents, audio/video, and classification hierarchies.

## 1.1.0 (2026-04-24)

### Features Added

- Billing and token consumption details are now available after analysis operations complete. Access via `poller.operationState?.usage`.
- The operation ID is now available on the operation state via `poller.operationState?.operationId`.

### Deprecations

- `poller.operationId` is deprecated. Use `poller.operationState?.operationId` instead.

## 1.0.0 (2026-02-28)

### Features Added

- Initial release of the Azure AI Content Understanding client library for JavaScript (`@azure/ai-content-understanding`). This package provides `ContentUnderstandingClient` for analyzing documents, audio, and video content, as well as creating, managing, and configuring analyzers. Service API version `2025-11-01`.
