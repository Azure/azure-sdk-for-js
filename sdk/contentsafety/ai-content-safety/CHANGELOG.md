# Release History

## 1.0.0-beta.1 (2026-09-18)

### Features Added

- Initial beta release of the modular `@azure/ai-content-safety` package, generated from API version `2026-09-01-preview`. ([#39966](https://github.com/Azure/azure-sdk-for-js/pull/39966))
- Added `ContentSafetyClient` operations for Unified Moderate, prompt shielding, and protected-material detection.
- Added `ContentProvenanceClient` with long-running content provenance detection and poller restoration.
- Added regex matching support for blocklist items.

### Breaking Changes

- Migrating from `@azure-rest/ai-content-safety` requires installing `@azure/ai-content-safety` and updating package imports.
- Replaced the default REST factory with named `ContentSafetyClient`, `ContentProvenanceClient`, and `BlocklistClient` classes.
- Added dedicated request models for blocklist item and blocklist update payloads so service-generated identifiers are not required as input.
- Changed `ImageData.content` from a base64-encoded string to raw `Uint8Array` bytes.

### Bugs Fixed

- Honor `byPage({ maxPageSize })` for initial, continuation, and resumed blocklist-item pages. The operation-level `maxpagesize` option remains supported but is deprecated.
- Preserve the custom response type in `restorePoller` deserialization callbacks.
