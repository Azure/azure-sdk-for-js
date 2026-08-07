# Release History

## 2.0.0-beta.1 (Unreleased)

### Features Added

- Added support for the `2026-07-01-preview` API version.
- Added `ContentProvenanceClient` for Content Provenance detection, which determines whether media was generated or modified by an AI system.
- Added `shieldPrompt` and `detectTextProtectedMaterial` to `ContentSafetyClient`.

### Breaking Changes

- This package is now generated as a Modular client library instead of a REST-level client (RLC). Consumers upgrading from 1.x must migrate:
  - Operations are now methods on the clients (`client.analyzeText(...)`) instead of `client.path("/text:analyze").post(...)`.
  - `isUnexpected` has been removed; operations throw on error responses.
  - `paginate` has been removed; list operations return a `PagedAsyncIterableIterator` directly.
  - The `*Output` type suffix has been removed (for example `TextBlocklistItemOutput` is now `TextBlocklistItem`).
  - The default export has been removed; use the named `ContentSafetyClient`, `BlocklistClient` and `ContentProvenanceClient` exports.

## 1.0.2 (2025-08-22)

### Other Changes

  - Other fixes

## 1.0.1 (2025-02-10)

### Features Added
-refresh @azure-rest/ai-content-safety sdk

## 1.0.0 (2023-12-13)

### Features Added

- Support AAD Authentication
- Support 8 severity levels output for Text Analyze

### Breaking Changes

Contract change for AnalyzeText, AnalyzeImage, Blocklist management related parameters

#### AnalyzeText

- AnalyzeTextOptions
  - Renamed `breakByBlocklists` to `haltOnBlocklistHit`
  - Add `outputType`
- AnalyzeTextResultOutput
  - Renamed `blocklistsMatchResults` to `blocklistsMatch`
  - Replaced `TextAnalyzeSeverityResultOutput` by `TextCategoriesAnalysisOutput`

#### AnalyzeImage

- AnalyzeImageOptions
  - Add `outputType`
- AnalyzeImageResultOutput
  - Replaced `ImageAnalyzeSeverityResultOutput` by `ImageCategoriesAnalysisOutput`

#### Blocklist management

- Renamed `"/text/blocklists/{blocklistName}:addBlockItems"` to `"/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems"`
- Renamed `"/text/blocklists/{blocklistName}:removeBlockItems"` to `"/text/blocklists/{blocklistName}:removeBlocklistItems"`
- Renamed `"/text/blocklists/{blocklistName}/blockItems"` to `"/text/blocklists/{blocklistName}/blocklistItems"`
- Renamed `"/text/blocklists/{blocklistName}/blockItems/{blockItemId}"` to `"/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}"`
- Renamed `AddBlockItemsOptions` to `AddOrUpdateTextBlocklistItemsOptions`
  - Renamed `blockItems` to `blocklistItems`
- Renamed `AddBlockItemsResultOutput` to `AddOrUpdateTextBlocklistItemsResultOutput`
    - Renamed `value` to `blocklistItems`
- Renamed `RemoveBlockItemsOptions` to `RemoveTextBlocklistItemsOptions`
  - Renamed `blockItemIds` to `blocklistItemIds`
- Renamed `TextBlockItemInfo` to `TextBlocklistItem`

## 1.0.0-beta.1 (2023-09-28)

- This is the initial beta release for Azure AI Content Safety, see README.md for details.
