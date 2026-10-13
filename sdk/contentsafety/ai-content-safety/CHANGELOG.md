# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

- Regenerated the client for `2026-10-15-preview`, including all eight Agent Hooks context variants and native Verdict responses. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))

### Breaking Changes

- `unifiedModerate` now accepts an `AgentContextUnion` and returns an `AgentEvaluationResult` envelope containing the native `verdict` and policy-evaluation `receipt`. Policy and resource selectors move to the operation options and are sent as query parameters. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))
- The default API version is now `2026-10-15-preview`. The September Unified Moderate request and response format requires the earlier SDK contract. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))

### Bugs Fixed

- Preserve blocklist paging customizations when regenerating the client with a new default API version. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))
- Resolve regeneration conflicts in Unified Moderate request serialization and model exports while retaining the existing provenance and blocklist customizations. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))
- Preserve native JSON member names such as `__proto__` as own properties in tool arguments and opaque response metadata. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))
- Include explicit null in Verdict, warning and evidence property types where the Agent Hooks wire contract permits it. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))
- Keep AgentContext, Verdict and receipt discriminated unions closed so known variants cannot omit their required fields. ([#40276](https://github.com/Azure/azure-sdk-for-js/pull/40276))

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
