---
name: search-documents
description: 'Domain knowledge for @azure/search-documents. Covers architecture, type conversions, data flow, and common pitfalls. WHEN: regenerate search-documents; modify search-documents; fix search-documents bug; add search-documents feature; search-documents tsp-client update.'
---

# @azure/search-documents — Package Skill

## Common Pitfalls

- **Generated sub-client ≠ convenience client** — `src/search/searchClient.ts` is the GENERATED sub-client (overwritten on regeneration). `src/searchClient.ts` is the HAND-AUTHORED convenience client. Adding methods to the generated file does nothing for consumers. Always edit the hand-authored file at the `src/` root. See the "Generated vs Hand-Authored Files" table in Architecture.
- **New operations must be wired through the convenience layer** — after regeneration, new operations appearing in generated files are NOT available to consumers until explicitly exposed via the hand-authored convenience clients, model files, and `src/index.ts`. Do not stop at regeneration. See "Exposing New Operations" below.
- **Never hand-edit files in `generated/`** — these are overwritten on every `tsp-client update`. Edit `src/` files directly; the 3-way merge preserves your changes.
- **Never hand-edit generated-mirrored files** — files under `src/search/`, `src/searchIndex/`, `src/searchIndexer/`, `src/knowledgeBaseRetrieval/`, and `src/models/` are mirrored from `generated/`. Edits will be overwritten on next regeneration.
- **Check for merge conflicts FIRST after regeneration** — `dev-tool customization apply` can produce conflict markers in `src/`. Run `grep -r "<<<<<<" src/ --include="*.ts"`.
- **`src/index.ts` is skipped during customization apply** — new exports must be manually added. The `ae-forgotten-export` lint error catches missing exports.
- **`test/snippets.spec.ts` is documentation, not tests** — it contains source code for README and doc-comment snippets. Never delete or replace its contents when updating real tests.
- **Uses `@azure-rest/core-client`** not `@azure/core-client` — this TypeSpec package uses the REST variant for `OperationOptions`, `ClientOptions`, etc.
- **`knownSkills` whitelist** — `convertSkillsToPublic()` in `src/serviceUtils.ts` silently drops unknown skill types. New service skill types require updating this hardcoded record.
- **No reverse conversion for some types** — `vectorSearch` and individual skills are passed through directly without dedicated public-to-generated converters.
- **`search()` uses custom POST pagination** — not standard `nextLink` GET paging. Uses `nextPageParameters` POST body with opaque Base64 continuation tokens.
- **Date deserialization is strict** — only matches UTC ISO strings with 0-3 fractional seconds and `Z` suffix. Non-UTC strings are not auto-converted.
- **`indexDocuments` 207 behavior** — partial success (HTTP 207) is thrown as an exception when `throwOnAnyFailure` is set. This is intentional.
- **Generated client argument order ≠ public client argument order** — when wrapping new operations in `src/searchIndexClient.ts` / `src/searchClient.ts` etc., open the matching generated `searchIndexClient.ts` (under `src/searchIndex/` etc.) and verify the parameter order on the call. Subtle swaps silently target the wrong resource (e.g. `deleteKnowledgeSourceFile(fileId, name)` vs `(name, fileId)`), producing no error and a silently no-op'd request.

## Architecture

Two-directory layout with customization merge:

- `generated/` — auto-generated from TypeSpec. Never hand-edit.
- `src/` — mirrors `generated/` structure plus hand-authored convenience layer. Files with counterparts in `generated/` are merged; files without counterparts are preserved as-is.

Four convenience clients wrap generated sub-clients:

| Client | Constructor | Purpose |
|---|---|---|
| `SearchClient<TModel>` | `(endpoint, indexName, credential, options?)` | Search, suggest, autocomplete, document CRUD |
| `SearchIndexClient` | `(endpoint, credential, options?)` | Index CRUD, synonym maps, aliases, knowledge bases |
| `SearchIndexerClient` | `(endpoint, credential, options?)` | Indexer, data source, skillset CRUD |
| `KnowledgeRetrievalClient` | `(endpoint, knowledgeBaseName, credential, options?)` | Knowledge base retrieval |

Each client: creates generated client → replaces auth with search-specific auth (API key header or bearer token) → adds OData metadata policy → wraps every method in `tracingClient.withSpan()` with type conversion. `SearchClient` uses OData metadata `"none"`; others use `"minimal"`.

### Generated vs Hand-Authored Files — Know the Difference

The file paths look deceptively similar. Confusing them is the single most common mistake:

| File | Type | Edit? |
|---|---|---|
| `src/search/searchClient.ts` | **Generated** sub-client (mirrored from `generated/`) | **NEVER** — overwritten on regeneration |
| `src/searchClient.ts` | **Hand-authored** convenience client (`SearchClient<TModel>`) | ✅ Add operations here |
| `src/searchIndex/searchIndexClient.ts` | **Generated** sub-client | **NEVER** |
| `src/searchIndexClient.ts` | **Hand-authored** convenience client (`SearchIndexClient`) | ✅ Add operations here |
| `src/searchIndexer/searchIndexerClient.ts` | **Generated** sub-client | **NEVER** |
| `src/searchIndexerClient.ts` | **Hand-authored** convenience client (`SearchIndexerClient`) | ✅ Add operations here |
| `src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.ts` | **Generated** sub-client | **NEVER** |
| `src/knowledgeRetrievalClient.ts` | **Hand-authored** convenience client (`KnowledgeRetrievalClient`) | ✅ Add operations here |
| `src/search/api/operations.ts` | **Generated** operations | **NEVER** |
| `src/models/models.ts` | **Generated** models | **NEVER** |

**Rule:** Any file under `src/{subclient}/` (i.e. `src/search/`, `src/searchIndex/`, `src/searchIndexer/`, `src/knowledgeBaseRetrieval/`) or `src/models/` is generated-mirrored code. Never hand-edit these files.

The convenience layer converts between generated and public types via `src/serviceUtils.ts` (200+ conversion functions). Key patterns: `additionalProperties` unwrapping, field visibility inversion (`hidden` ↔ `!retrievable`), encryption key renames (`vaultUrl` ↔ `vaultUri`), and custom serialization for NaN/Infinity/Date/GeographyPoint.

## Regeneration

Generation command (from `package.json`):

```
tsp-client update -d --emitter-options="ignore-nullable-on-optional=true;wrap-non-model-return=false" && npm run format && npx dev-tool customization apply --skip index.ts
```

Run via: `npm run generate:client`. **All changes must be committed first** — the 3-way merge requires committed state.

**Important flags:**

- `ignore-nullable-on-optional=true` — mitigates TypeSpec's `T | null` on optional properties
- `wrap-non-model-return=false` — prevents wrapping non-model return types
- `--skip index.ts` — barrel export is manually maintained

### Error Categorization

| Error Location | Root Cause | Fix In |
|---|---|---|
| `generated/**/*.ts` | TypeSpec spec change | Update `tsp-location.yaml`, re-run `npm run generate:client` |
| `src/<sub-client>/api/*.ts` (merged) | Merge conflict from spec change | Resolve conflict in `src/`, preserving hand-authored intent |
| `src/serviceUtils.ts` | Type conversion mismatch | Update conversion functions to match new generated types |
| `src/serviceModels.ts` or `src/indexModels.ts` | Public type doesn't match generated shape | Update public type definitions and their conversions |
| `src/index.ts` | Missing export after regeneration | Manually add new exports |
| `src/searchClient.ts` | Wire format encoding changed | Update conversion/encoding helpers in searchClient.ts |

### Breaking Change Detection

After spec changes, check for:

- New/removed/renamed properties in generated models → update conversions in `serviceUtils.ts`
- New/removed operations → add/remove convenience wrappers and exports
- New sub-clients → create convenience wrapper, add exports
- Changed discriminator values → update union handling in conversion functions

For 3-way merge details and conflict resolution, see [references/customization.md](references/customization.md).

### Exposing New Operations

New operations appearing after regeneration are **not available to consumers** until explicitly wired through the hand-authored convenience clients. Do not stop at regeneration. Complete ALL of these steps for each new operation:

1. **Add a public method** to the correct hand-authored convenience client (e.g. `src/searchClient.ts`, NOT `src/search/searchClient.ts`). The method must wrap `tracingClient.withSpan()`, convert public types to generated types, call the generated operation, and convert the response back.
2. **Define public model types** in `src/indexModels.ts`, `src/serviceModels.ts`, or `src/knowledgeBaseModels.ts` for any new request/response types.
3. **Add conversion functions** in `src/serviceUtils.ts` to translate between generated and public types (or add inline conversions in the convenience client for simple cases).
4. **Export all new public symbols** from `src/index.ts` — this file is skipped during merge and must always be updated manually.
5. **Run `api-extractor`** and verify new types/methods appear in `review/search-documents-node.api.md`. If they don't appear, they are not part of the public API.

The task is not complete until every new operation is callable from the public convenience client and visible in the API report.

For a detailed example (wrong vs right), see [references/architecture.md](references/architecture.md).

## Where to Make Changes

| Goal | Where to edit |
|---|---|
| Add/modify type conversions (generated ↔ public) | `src/serviceUtils.ts` |
| Add/modify public model types for indexes, indexers, skills, data sources | `src/serviceModels.ts` |
| Add/modify public types for search/suggest/autocomplete operations | `src/indexModels.ts` |
| Add/modify public types for knowledge base operations | `src/knowledgeBaseModels.ts` |
| Change how search/suggest/autocomplete/document operations work | `src/searchClient.ts` |
| Change how index management works | `src/searchIndexClient.ts` |
| Change how indexer/data source/skillset management works | `src/searchIndexerClient.ts` |
| Change how knowledge retrieval works | `src/knowledgeRetrievalClient.ts` |
| Add/modify special serialization (NaN, Infinity, Date, GeographyPoint) | `src/serialization.ts` |
| Export a new public symbol | `src/index.ts` |

**Prefer extension points over editing generated-mirrored code.** Add conversion helpers in `src/serviceUtils.ts` and custom public models in `src/serviceModels.ts`/`src/indexModels.ts`, rather than editing files that have counterparts in `generated/`.

## Testing Notes

- **Stable API tests** in `test/public/node/`, **preview feature tests** in `test/public/node/preview/`.
- **Recorded tests** use `@azure-tools/test-recorder`. The recorder removes sanitizers `AZSDK2021` and `AZSDK3493`.
- **WAIT_TIME pattern:** `isPlaybackMode() ? 0 : 4000` — live/record mode needs 4s delays for index consistency.
- **Test data:** `Hotel` interface in `test/public/utils/interfaces.ts`, mock embeddings in `mockEmbeddings.ts`.
- **`test/snippets.spec.ts`** is NOT a real test — it contains doc snippet source code.
- To run live tests, copy `sample.env` to `.env` and fill in values.
- **Always register non-ENDPOINT env vars in `envSetupForPlayback`** in `test/public/utils/recordedClient.ts`. Any env var the tests read (e.g. `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME`) needs a stable placeholder value there, otherwise the recorder swaps the live value in record mode but exposes it raw in playback, producing body diffs.
- **Recorder env-var sanitizer is value-based, not field-based** — every occurrence of an env var's value in a request body is replaced with the playback placeholder. If two distinct fields (e.g. `deploymentId` and `modelName`) happen to share the same string, both get sanitized to the same placeholder; the test must then either source both from the same env var or use distinct values that don't collide.
- **File knowledge source tests require an MSI-enabled search service** — File KS ingestion calls Azure OpenAI under the search service's managed identity. The service returns HTTP 500 ("File upload processing failed. Please check the file format and try again.") even for valid files when the identity is missing or lacks the "Cognitive Services OpenAI User" role on the embedding account. The error message is misleading; the fix is identity/role, not file format.
- **Test fixtures live under `test/public/node/preview/fixtures/`** — load with `readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", name))` to keep tests reproducible without inlining binary buffers.

### Asset Sync

Recordings are stored under `.assets/<random>/js/sdk/search/search-documents/recordings/...` and tracked via `assets.json` (`AssetsRepo: Azure/azure-sdk-assets`). After recording locally, run `pnpm exec dev-tool test-proxy push` from the package directory to publish the recordings and bump `assets.json.Tag`. Commit the updated `assets.json` alongside the test source change.

## References

| Reference | Contents |
|---|---|
| [references/architecture.md](references/architecture.md) | Source layout, four clients, key hand-authored files |
| [references/data-flow.md](references/data-flow.md) | Search pagination, serialization, data flow patterns, buffered sender, strong typing |
| [references/customization.md](references/customization.md) | 3-way merge algorithm, conflict resolution, post-regeneration scenarios |
| [references/type-mapping.md](references/type-mapping.md) | Property name mappings, wire format encodings, conversion function inventory |
