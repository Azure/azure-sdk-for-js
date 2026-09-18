# Release History

## 1.0.0-beta.1 (Unreleased)

### Features Added

- Initial beta release of the modular `@azure/ai-content-safety` package, generated from API version `2026-09-01-preview`. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
- Added `ContentSafetyClient` operations for Unified Moderate, prompt shielding, and protected-material detection. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
- Added `ContentProvenanceClient` with long-running content provenance detection and poller restoration. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
- Added regex matching support for blocklist items. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))

### Breaking Changes

- Migrating from `@azure-rest/ai-content-safety` requires installing `@azure/ai-content-safety` and updating package imports. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
- Replaced the default REST factory with named `ContentSafetyClient`, `ContentProvenanceClient`, and `BlocklistClient` classes. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
- Added dedicated request models for blocklist item and blocklist update payloads so service-generated identifiers are not required as input. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
- Changed `ImageData.content` from a base64-encoded string to raw `Uint8Array` bytes. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
