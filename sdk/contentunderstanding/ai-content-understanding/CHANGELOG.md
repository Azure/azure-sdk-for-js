# Release History

## 1.2.0-beta.3 (Unreleased)

### Features Added

- Added support for service API version `2026-06-01-preview`, which is the default service API version for this beta package.
- Added inline analysis convenience APIs `ContentUnderstandingClient.analyzeInline` and `analyzeBinaryInline`, available only with service API version `2026-06-01-preview`. These return `AnalysisResult` in a single HTTP 200 response (no LRO polling), are capped at 5 pages per request, and surface service failures as `RestError`: HTTP 4xx/5xx responses (for example a 400 `InvalidRequest` with `innererror.code = "InputPageCountExceeded"` when the 5-page limit is exceeded) carry the real HTTP status code and the parsed service error code / body, while an HTTP 200 with a non-`Succeeded` operation state is surfaced as `code: "InlineAnalyzeOperationFailed"` — matching the completed-LRO analyze behavior. Options bags: `AnalyzeInlineOptionalParams`, `AnalyzeBinaryInlineOptionalParams`. See [analyzeInline.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeInline.ts) and [analyzeBinaryInline.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeBinaryInline.ts).
- Added semantic chunking for custom analyzers in `2026-06-01-preview`: configure `ContentAnalyzerConfig.chunkingStrategy` with `SemanticChunkingStrategy` (for example `maxTokens`) when creating an analyzer, then read `DocumentContent.chunks` (`DocumentChunk` spans into markdown) from the analysis result. Supporting types: `ChunkingStrategy`, `ChunkingStrategyKind`, `ChunkingStrategyUnion`. See [analyzeChunking.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeChunking.ts).
- Added analyzer workflow selection via `ContentAnalyzerConfig.workflow` / `ContentAnalyzerWorkflow` for `2026-06-01-preview`. Omit `workflow` (or set `"default"`) for standard field extraction, or set `"agentic"` when an answer must be built from evidence across the document (one input file per request; advanced contextualization rate). See [createAnalyzerWorkflow.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/createAnalyzerWorkflow.ts).
- Added signature detection via `DocumentSignature` / `DocumentContent.signatures` for `2026-06-01-preview` (for example with `prebuilt-layout`). See [detectSignatures.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/detectSignatures.ts) and [analyzeConfigs.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeConfigs.ts).
- Added in-page segmentation opt-in via `ContentAnalyzerConfig.allowInPageSegments` for `2026-06-01-preview`. Used with `enableSegment`, this allows classification segments to split within a page (for example an invoice and a statement on the same page) instead of only at page boundaries. Exposed on results via `DocumentContent.segments: DocumentContentSegment[]` (companion to the existing `AudioVisualContent.segments`). See [classifyInPageSegments.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/classifyInPageSegments.ts).
- Added embedded document metadata via `AnalysisContent.metadata: Record<string, string>` for `2026-06-01-preview` (author, title, contentType, createdAt, and so on, returned by `prebuilt-layout`). See [extractDocumentMetadata.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/extractDocumentMetadata.ts).
- Added analysis diagnostics via `AnalysisResult.infos: ErrorModel[]` for `2026-06-01-preview`. The collection exposes service information as `ErrorModel` values for troubleshooting. See [analyzeDiagnostics.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/analyzeDiagnostics.ts).
- Updated `toLlmInput` (preview) to emit analysis-result metadata (`AnalysisContent.metadata`) under a `metadata:` front-matter block. See [toLlmInput.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/contentunderstanding/ai-content-understanding/samples/v1-beta/typescript/src/toLlmInput.ts).
- Aligned `toLlmInput` YAML front matter output with the current CU service contract: the top-level `contentType:` key is now `mimeType:` and renders `AnalysisContent.mimeType` (for example `application/pdf`, `audio/mpeg`, `video/mp4`) instead of the discriminator (`document` / `audioVisual`); the `rai_warnings:` key is now `warnings:`. Both are preview API changes from `1.2.0-beta.1`; not a stable-breaking change.
- `toLlmInput` (preview) now preserves caller-supplied `null` values and empty collections in `customMetadata`: `null` renders as YAML `null`, empty objects render as `{}`, and empty arrays render as `[]`. Previously nulls and empty containers were silently dropped from the emitted front matter.
- Hardened `toLlmInput` (preview) YAML front-matter emission against untrusted multi-line values. Continuation lines are now indented to match the current mapping depth, so a caller-supplied or service-extracted metadata value whose content contains a `---` line cannot terminate the front matter early.
- Added `AnalysisResult.usage: UsageDetails` to expose analyze usage/metering details on both LRO (`analyze` / `analyzeBinary`) and inline (`analyzeInline` / `analyzeBinaryInline`) results — available on the completed poller's `AnalysisResult` or on the inline response. LRO callers can still access usage via `poller.operationState?.usage`; both accessors now return the same object.
- Re-exported `RestError` and `isRestError` from `@azure/core-rest-pipeline` ([#39007](https://github.com/Azure/azure-sdk-for-js/pull/39007)).

### Other Changes

- `analyzeBinary`: aligned the `contentType` parameter shape with `analyze`. `contentType` now lives on `AnalyzeBinaryOptionalParams` (default `application/octet-stream`), so `analyzeBinary` takes the same `(analyzerId, input, options?)` shape as `analyze`. A `@deprecated` overload accepting `contentType` positionally is retained for source compatibility with the shipped GA surface; passing both a positional value and `options.contentType` with different values throws `TypeError` before any HTTP request is issued. Sample and test call sites migrated to the preferred form.

  Migration:

  ```ts
  // Before (still compiles; the positional overload is now @deprecated):
  const poller = client.analyzeBinary(analyzerId, bytes, "application/pdf", { contentRange: "1-3" });

  // After (preferred):
  const poller = client.analyzeBinary(analyzerId, bytes, {
    contentType: "application/pdf",
    contentRange: "1-3",
  });
  ```
- `toLlmInput` (preview): renamed the optional caller dictionary parameter from `metadata` to `customMetadata`. Caller keys are now emitted under a nested `customMetadata:` YAML front-matter block (instead of flattened to the top level), which removes reserved-key validation and avoids collisions with helper-owned keys (`mimeType`, `fields`, `metadata`, ...). Service `AnalysisContent.metadata` remains under top-level `metadata:`. Caller-supplied string values that look like JSON are emitted as opaque YAML scalars — to nest structured data, pass real objects/arrays instead of JSON text.

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
