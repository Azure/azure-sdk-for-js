---
name: search-documents
description: '**UTILITY SKILL** — Domain knowledge for the @azure/search-documents SDK package. Covers architecture, pagination, data flow, type mappings, and common pitfalls. WHEN: "regenerate search-documents", "modify search-documents", "fix search client", "add search feature", "search type conversion".'
---

# @azure/search-documents — Package Skill

## Architecture

This package has a **two-directory layout** with a customization merge step:

- `generated/` — Auto-generated from TypeSpec. **Never hand-edit.**
- `src/` — Mirrors `generated/` structure plus hand-authored convenience layer.

During code generation, `npx dev-tool customization apply --skip index.ts` performs a 3-way merge of `generated/` into `src/`. Files that exist only in `src/` (hand-authored) are preserved. `src/index.ts` is skipped entirely — **new exports must be manually added there**.

## Regeneration

To regenerate from a new TypeSpec spec commit:

1. **Commit all changes first** — the 3-way merge requires committed state in both `generated/` and `src/`.
2. Update `tsp-location.yaml` with the new commit SHA.
3. Run `npm run generate:client` — this single command runs all three steps:
   - `tsp-client update -d --emitter-options="ignore-nullable-on-optional=true"` — generates into `generated/`
   - `npm run format` — formats generated code
   - `npx dev-tool customization apply --skip index.ts` — 3-way merges into `src/`
4. Check for merge conflicts: `grep -r "<<<<<<" src/ --include="*.ts"`

**Do not run these steps individually** — use `npm run generate:client` which ensures correct ordering and flags.

For details on the 3-way merge algorithm, conflict resolution, and common post-regeneration scenarios (new operation added, model type changed, new sub-client added), see `references/customization.md`.

### Where to Make Changes

| Goal                                                                      | Where to edit                     |
| ------------------------------------------------------------------------- | --------------------------------- |
| Add/modify type conversions (generated <-> public)                        | `src/serviceUtils.ts`             |
| Add/modify public model types for indexes, indexers, skills, data sources | `src/serviceModels.ts`            |
| Add/modify public types for search/suggest/autocomplete operations        | `src/indexModels.ts`              |
| Add/modify public types for knowledge base operations                     | `src/knowledgeBaseModels.ts`      |
| Change how search/suggest/autocomplete/getDocument/indexDocuments work    | `src/searchClient.ts`             |
| Change how index management (create/get/list/delete indexes) works        | `src/searchIndexClient.ts`        |
| Change how indexer/data source/skillset management works                  | `src/searchIndexerClient.ts`      |
| Change how knowledge retrieval works                                      | `src/knowledgeRetrievalClient.ts` |
| Add/modify special serialization (NaN, Infinity, Date, GeographyPoint)    | `src/serialization.ts`            |
| Export a new public symbol                                                | `src/index.ts`                    |

**Prefer extension points over editing generated-mirrored code.** Many files in `src/` are copies from `generated/` and will be overwritten on regeneration. Instead:

- Add conversion helpers in `serviceUtils.ts`, call them from the convenience client.
- Add custom public models in `serviceModels.ts` or `indexModels.ts`, map to/from generated models in `serviceUtils.ts`.

### Key Hand-Authored Files

| File                                  | Purpose                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/searchClient.ts`                 | `SearchClient<TModel>` convenience wrapper — search, suggest, autocomplete, document operations |
| `src/searchIndexClient.ts`            | `SearchIndexClient` convenience wrapper — index CRUD, synonym maps, aliases                     |
| `src/searchIndexerClient.ts`          | `SearchIndexerClient` convenience wrapper — indexer, data source, skillset CRUD                 |
| `src/knowledgeRetrievalClient.ts`     | `KnowledgeRetrievalClient` convenience wrapper — knowledge base retrieval                       |
| `src/serviceUtils.ts`                 | 200+ type conversion functions between generated and public types                               |
| `src/serviceModels.ts`                | User-facing types for indexes, indexers, skills, data sources                                   |
| `src/indexModels.ts`                  | User-facing types for search, suggest, autocomplete operations                                  |
| `src/serialization.ts`                | NaN/Infinity/Date/GeographyPoint serialization                                                  |
| `src/walk.ts`                         | Recursive immutable tree walker with cycle detection for serialization                          |
| `src/indexDocumentsBatch.ts`          | Batch builder for document upload/merge/delete actions                                          |
| `src/searchIndexingBufferedSender.ts` | Auto-flush buffered sender with retry and adaptive batch sizing                                 |
| `src/odata.ts`                        | `odata` template tag for safe OData filter expressions                                          |
| `src/geographyPoint.ts`               | `GeographyPoint` class with GeoJSON/EPSG:4326 conversion                                        |
| `src/odataMetadataPolicy.ts`          | Pipeline policy setting OData metadata Accept header                                            |
| `src/searchApiKeyCredentialPolicy.ts` | Pipeline policy adding `api-key` header                                                         |
| `src/index.ts`                        | Barrel export — `--skip`'d during merge, must be manually updated                               |

## The Four Clients

| Client                     | Constructor                                           | Wraps                                                        |
| -------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `SearchClient<TModel>`     | `(endpoint, indexName, credential, options?)`         | `src/search/searchClient.ts`                                 |
| `SearchIndexClient`        | `(endpoint, credential, options?)`                    | `src/searchIndex/searchIndexClient.ts`                       |
| `SearchIndexerClient`      | `(endpoint, credential, options?)`                    | `src/searchIndexer/searchIndexerClient.ts`                   |
| `KnowledgeRetrievalClient` | `(endpoint, knowledgeBaseName, credential, options?)` | `src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.ts` |

Each follows the same pattern:

1. Constructor creates a generated client, replaces default auth with search-specific auth (API key header or bearer token), and adds an OData metadata policy.
2. Each public method wraps a `tracingClient.withSpan()` call that converts public types to generated types, calls the generated client, and converts back.

**OData metadata level differs by client:**

- `SearchClient` uses `"none"` — document responses don't need type annotations.
- `SearchIndexClient` and `SearchIndexerClient` use `"minimal"` — management operations need them.

### SearchIndexClient Extras

- `getSearchClient(indexName)` — factory that spawns a `SearchClient` for a specific index, sharing the credential.
- `listIndexesNames()` — uses server-side projection (`select: "name"`) via `listIndexesWithSelectedProperties` to reduce payload, wrapped with `mapPagedAsyncIterable`.

## CRITICAL: Public Surface Gate — Generated Code Is Not the Public API

New operations, parameters, or models appearing after regeneration are **not available to consumers** until they are explicitly wired through the hand-authored convenience clients. Editing or adding code in generated/mirrored files does NOT expose anything to users.

**After any regeneration that introduces new operations, you are responsible for completing the full wiring into the convenience layer. Do not stop at regeneration. Do not tell the user to wire it themselves. Identify every new operation in the generated diff and complete the checklist below for each one before reporting the task as done.**

### Generated vs. Hand-Authored Files — Know the Difference

The file paths look deceptively similar. Confusing them is the single most common mistake:

| File | Type | Edit? |
| --- | --- | --- |
| `src/search/searchClient.ts` | **Generated** sub-client (mirrored from `generated/`) | **NEVER hand-edit** — overwritten on regeneration |
| `src/searchClient.ts` | **Hand-authored** convenience client (`SearchClient<TModel>`) | **This is where you add operations** |
| `src/searchIndex/searchIndexClient.ts` | **Generated** sub-client | **NEVER hand-edit** |
| `src/searchIndexClient.ts` | **Hand-authored** convenience client (`SearchIndexClient`) | **This is where you add operations** |
| `src/searchIndexer/searchIndexerClient.ts` | **Generated** sub-client | **NEVER hand-edit** |
| `src/searchIndexerClient.ts` | **Hand-authored** convenience client (`SearchIndexerClient`) | **This is where you add operations** |
| `src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.ts` | **Generated** sub-client | **NEVER hand-edit** |
| `src/knowledgeRetrievalClient.ts` | **Hand-authored** convenience client (`KnowledgeRetrievalClient`) | **This is where you add operations** |
| `src/search/api/operations.ts` | **Generated** operations | **NEVER hand-edit** |
| `src/searchIndex/api/operations.ts` | **Generated** operations | **NEVER hand-edit** |
| `src/searchIndexer/api/operations.ts` | **Generated** operations | **NEVER hand-edit** |
| `src/models/models.ts` | **Generated** models | **NEVER hand-edit** |

**Rule:** Any file under `src/{subclient}/` (i.e. `src/search/`, `src/searchIndex/`, `src/searchIndexer/`, `src/knowledgeBaseRetrieval/`) or `src/models/` is generated-mirrored code. Never hand-edit these files. They will be overwritten on the next regeneration.

### Checklist: Exposing a New Operation

When a new operation appears after regeneration (e.g. `explainPost` appears in `src/search/api/operations.ts`), complete ALL of these steps before reporting the task as done:

1. **Add a public method** to the correct hand-authored convenience client file (e.g. `src/searchClient.ts`, NOT `src/search/searchClient.ts`). The method must wrap `tracingClient.withSpan()`, convert public types to generated types, call the generated operation, and convert the response back.
2. **Define public model types** in `src/indexModels.ts`, `src/serviceModels.ts`, or `src/knowledgeBaseModels.ts` for any new request/response types the operation uses.
3. **Add conversion functions** in `src/serviceUtils.ts` to translate between generated and public types (or add inline conversions in the convenience client for simple cases).
4. **Export all new public symbols** from `src/index.ts` — this file is skipped during the customization merge and must always be updated manually.
5. **Run `api-extractor`** and verify the new types and methods appear in `review/search-documents-node.api.md`. If they don't appear there, they are not part of the public API.

The task is not complete until every new operation is callable from the public convenience client and visible in the API report. Do not leave this as a follow-up.

### Wrong vs. Right Example

**WRONG** — Adding `explainPost` directly to the generated sub-client:
```
// WRONG: src/search/searchClient.ts is a GENERATED file — this will be overwritten
import { explainPost } from "./api/operations.js";
export class SearchClient {
  explainPost(body, options) {
    return explainPost(this._client, body, options);  // raw generated types, no conversion
  }
}
```
This does nothing for consumers. The generated sub-client is an internal implementation detail, not the public API.

**RIGHT** — Adding `explain` to the hand-authored convenience client:
```
// RIGHT: src/searchClient.ts is the HAND-AUTHORED convenience client
export class SearchClient<TModel extends object> {
  async explain(documentKey: string, searchText: string, options: ExplainOptions = {}) {
    return tracingClient.withSpan("SearchClient.explain", options, async (updatedOptions) => {
      // Convert public types -> generated types
      const { body, operationOptions } = convertExplainOptions(documentKey, searchText, updatedOptions);
      const result = await this.client.explainPost(body, operationOptions);
      // Convert generated types -> public types
      return convertExplainResult(result);
    });
  }
}
```
Then export `ExplainOptions`, `ExplainResult`, etc. from `src/index.ts`.

### Additional Rules

- **Never hand-edit API version strings** in generated files. API versions are controlled by the TypeSpec spec and regeneration.
- **Never modify `test/snippets.spec.ts`** unless you are updating documentation snippets. This file contains source code for README/doc snippets, not real tests. Destroying its contents breaks documentation.
- **Never modify generated model files** (`src/models/models.ts`, `src/models/options.ts`, etc.) — define public models in the hand-authored model files instead.

## Search Pagination

The `search()` method has a **fully custom pagination implementation**. It does NOT use the standard `buildPagedAsyncIterator` from `pagingHelpers.ts`.

### How It Works

1. **`search(searchText, options)`** (public entry point) eagerly fetches the first page by calling the private `searchDocuments()` method, then wraps the result in a `SearchIterator` via `listSearchResults()`.

2. **`searchDocuments()`** transforms public `SearchOptions` into generated types (joining arrays, encoding semantic options), calls `this.client.searchPost()`, converts results back (unwrapping `additionalProperties`), and encodes the continuation token.

3. **The generated `searchPost()`** is a simple one-shot POST — it returns raw `results`, `nextLink`, and `nextPageParameters` with zero pagination logic.

4. **`listSearchResultsPage()`** is an `async *` generator that decodes the continuation token, calls `searchDocuments()` with the decoded `nextPageParameters`, yields the page, and loops while there's a continuation token.

5. **`listSearchResultsAll()`** is an `async *` generator that yields individual items from the first page, then delegates to `listSearchResultsPage()` for subsequent pages.

6. **`listSearchResults()`** assembles the `SearchIterator` with `next()` (item-by-item) and `byPage()` (page-by-page) support.

### Continuation Token Encoding

The service returns two values for pagination:

- `nextLink` — an `@odata.nextLink` URL
- `nextPageParameters` — an `@search.nextPageParameters` JSON object (a full search request body)

The convenience layer **combines these into a single opaque token**:

```
encode(JSON.stringify({ apiVersion, nextLink, nextPageParameters }))
```

- Base64-encoded (via `src/base64.ts` / `src/base64-browser.mts`)
- Includes `apiVersion` as a version guard — tokens from a different API version are rejected with `RangeError`
- Returns `undefined` if either `nextLink` or `nextPageParameters` is missing (no more pages)
- **`nextLink` is stored but never used for fetching** — only `nextPageParameters` drives page fetches (see comment at line ~419 in searchClient.ts)

### Key Types

- `SearchIterator<TModel, TFields>` — `PagedAsyncIterableIterator` alias for the `results` property
- `SearchDocumentsResult<TModel, TFields>` — top-level return type from `search()`, contains first-page metadata (count, facets, answers) plus `results: SearchIterator`
- `SearchDocumentsPageResult<TModel, TFields>` — a single page: `results: SearchResult[]` (plain array) plus `continuationToken?: string`
- `ListSearchResultsPageSettings` — settings for `byPage()`, containing only `continuationToken?: string`

### Why It's Custom

Standard Azure SDK paging follows `nextLink` URLs with GET requests. Search differs:

- Uses POST with `nextPageParameters` body payloads, not GET with nextLink URLs.
- First page is eagerly fetched (metadata like facets/count available immediately without iteration).
- Continuation tokens are opaque Base64 blobs with version pinning.
- Dual result types: top-level `results` is an async iterator, but each page's `results` is a plain array.

## Data Flow Patterns

### additionalProperties Unwrapping

TypeSpec wraps user document fields in `additionalProperties`. The convenience layer unwraps:

```
Generated: { searchScore, additionalProperties: { hotelName, rating, ... } }
     -> generatedSearchResultToPublicSearchResult()
Public:    { score, document: { hotelName, rating, ... } }
```

Affects: `search()`, `suggest()`, `autocomplete()`, `getDocument()`.

### The Reverse: `__actionType` Convention

For `indexDocuments()`, the public API uses `IndexDocumentsAction<TModel>` which spreads the document and adds `__actionType: "upload" | "merge" | "mergeOrUpload" | "delete"`. The double-underscore prefix avoids collision with user document fields.

`convertPublicActionsToGeneratedActions()` transforms each action by extracting `__actionType` into `actionType` and moving remaining properties into `additionalProperties` — the inverse of the response unwrapping.

`IndexDocumentsBatch` provides a builder pattern: `upload()`, `merge()`, `mergeOrUpload()`, `delete()` methods accumulate actions. The `delete()` method has two overloads: delete by documents or delete by `keyName` + `keyValues`.

### The Serialization Sandwich

Every document boundary applies serialize (outbound) and deserialize (inbound) via `walk()`:

**Serialize:** `NaN` -> `"NaN"`, `Infinity` -> `"INF"`, `-Infinity` -> `"-INF"`, `Date` -> ISO 8601, `GeographyPoint` -> GeoJSON Point with CRS  
**Deserialize:** Reverse of above. Date regex matches `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$` (0-3 fractional seconds, UTC only).

`GeographyPoint` serializes to GeoJSON with `[longitude, latitude]` order (not `[lat, lng]`) and requires CRS `EPSG:4326`. The CRS property is required by the search service, not standard GeoJSON.

### Field Visibility Inversion

The public API uses `hidden: boolean` (user-friendly). The wire format uses `retrievable: boolean`. They are **logical inverses**: `hidden = !retrievable`. The `convertFieldsToPublic` and `convertFieldsToGenerated` functions flip this flag.

### SimpleField Default Overrides

When converting fields via `convertFieldsToGenerated`, `searchable`, `filterable`, `facetable`, and `sortable` are explicitly set to `false` if not provided. This overrides the service defaults to minimize storage for simple types.

### Encryption Key Property Renames

The public API uses `vaultUrl`; the wire format uses `vaultUri`. This rename appears everywhere encryption keys are used (indexes, synonym maps, skillsets, data sources, indexers, knowledge bases).

### Optimistic Concurrency

Every update/delete operation checks `options.onlyIfUnchanged` and passes `etag` as `ifMatch` to the generated client. Delete methods accept either a name (string) or an object (with etag) for conditional delete.

## Wire Format Encodings

### Array-to-String Joins (in searchClient.ts)

| User Option              | Wire Format            | Notes                             |
| ------------------------ | ---------------------- | --------------------------------- |
| `searchFields: string[]` | comma-separated string |                                   |
| `select: string[]`       | comma-separated string | Defaults to `"*"` if not provided |
| `orderBy: string[]`      | comma-separated string |                                   |

### Pipe-Delimited Semantic Encoding (in searchClient.ts)

| User Option                                                       | Wire Format Example                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| `queryAnswers: { answerType, count, threshold, maxAnswerLength }` | `"extractive\|count-3,threshold-0.7,maxcharlength-200"` |
| `queryCaptions: { captionType, highlight, maxCaptionLength }`     | `"extractive\|highlight-true,maxcharlength-200"`        |
| `queryRewrites: { rewritesType, count }`                          | `"generative\|count-5"`                                 |

Note: `maxAnswerLength` maps to `maxcharlength` (not `maxanswerlength`). Config items are only appended if present.

### Vector Query Dispatch

`convertVectorQuery()` dispatches on `vectorQuery.kind`: `"text"`, `"vector"`, `"imageUrl"`, `"imageBinary"`. Only the `"text"` kind has `queryRewrites` to convert. For all kinds, `fields` is joined into a comma-separated string. Unknown kinds get a logger warning and are passed through (forward-compat).

### SynonymMap Wire Format

- `format: "solr"` is always injected — the public type doesn't expose a format field.
- The generated type has `synonyms` as a string (newline-delimited); the public type has `synonyms` as `string[]`.
- The generated type uses `eTag`; the public type uses `etag` (lowercase).

### resetDocuments Body Restructuring

`resetDocuments()` restructures flat options (`documentKeys`, `datasourceDocumentIds`) into a nested `keysOrIds` object expected by the wire format.

## Type Mappings

For the full property name change tables, conversion function inventory, null handling patterns, readonly array workarounds, and import source changes, see `references/type-mapping.md`.

### Property Name Changes

| User-Facing Property        | Generated (Wire) Name     | Context          |
| --------------------------- | ------------------------- | ---------------- |
| `analyzerName`              | `analyzerName`            | Search fields    |
| `searchAnalyzerName`        | `searchAnalyzerName`      | Search fields    |
| `indexAnalyzerName`         | `indexAnalyzerName`       | Search fields    |
| `normalizerName`            | `normalizerName`          | Search fields    |
| `synonymMapNames`           | `synonymMapNames`         | Search fields    |
| `tokenizerName`             | `tokenizer`               | CustomAnalyzer   |
| `applicationId`             | `applicationId`           | Encryption keys  |
| `applicationSecret`         | `applicationSecret`       | Encryption keys  |
| `parameters` (CustomWebApi) | `webApiParameters`        | Vector search    |
| `vaultUrl`                  | `vaultUri`                | Encryption keys  |
| `hidden`                    | `!retrievable` (inverted) | Field visibility |
| `etag`                      | `eTag`                    | SynonymMap       |

### Key Conversion Functions (serviceUtils.ts)

**Index:** `publicIndexToGeneratedIndex()`, `generatedIndexToPublicIndex()`, `convertFieldsToGenerated()`, `convertFieldsToPublic()`

**Search Results:** `generatedSearchResultToPublicSearchResult()`, `generatedSuggestDocumentsResultToPublicSuggestDocumentsResult()`, `convertGeneratedFacetsToPublic()`, `convertGeneratedAnswersToPublic()`, `convertGeneratedCaptionsToPublic()`

**Vector Search:** `generatedVectorSearchToPublicVectorSearch()`, `generatedVectorSearchVectorizerToPublicVectorizer()`, `generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration()`. Note: no reverse `publicVectorSearchToGeneratedVectorSearch()` — `publicIndexToGeneratedIndex()` passes `vectorSearch` through directly.

**Skillsets/Indexers:** `generatedSkillsetToPublicSkillset()` / `publicSkillsetToGeneratedSkillset()`, `publicSearchIndexerToGeneratedSearchIndexer()` / `generatedSearchIndexerToPublicSearchIndexer()`, `publicDataSourceToGeneratedDataSource()` / `generatedDataSourceToPublicDataSource()`. Note: no `convertSkillsToGenerated()` — skills are passed through as `SearchIndexerSkillUnion`.

**Synonym Maps:** `generatedSynonymMapToPublicSynonymMap()`, `publicSynonymMapToGeneratedSynonymMap()`

**Knowledge Base:** `convertKnowledgeBaseToPublic()` / `convertKnowledgeBaseToGenerated()`, `convertKnowledgeSourceToPublic()` / `convertKnowledgeSourceToGenerated()`

**SearchClient-Specific (in searchClient.ts, NOT serviceUtils.ts):** `convertSearchFields()`, `convertSelect()`, `convertVectorQuery()`, `convertQueryAnswers()`, `convertQueryCaptions()`, `convertQueryRewrites()`, continuation token Base64 encode/decode

### AML Vectorizer Auth Kind Inference

`generatedAzureMachineLearningVectorizerParametersToPublic...` infers `authKind` via `switch(true)`: `resourceId` non-null -> `"token"`, `authenticationKey` non-null -> `"key"`, `scoringUri` non-null -> `"none"`. Order of checks matters.

### Known Skills Whitelist

`convertSkillsToPublic()` filters through a hardcoded `knownSkills` record. Unknown skill types returned by the service are **silently dropped**. Adding support for new skill types requires updating this record.

## SearchIndexingBufferedSender

The buffered sender (`src/searchIndexingBufferedSender.ts`) has several non-obvious behaviors:

- **Auto-flush timer:** When `autoFlush: true` (default), a `setInterval` fires every `flushWindowInMs` (default 60s). The interval is `unref()`'d so it doesn't keep Node.js alive.
- **Deduplication:** `pruneActions` ensures each batch has at most one action per document key. Duplicate keys are deferred to the next batch.
- **Adaptive batch sizing on 413:** If the service returns 413 (Payload Too Large), the batch is split in half and retried. `initialBatchActionCount` is **permanently reduced** — a one-way ratchet that never grows back.
- **Exponential backoff:** For retryable errors (422, 409, 503): `delay * 2^retryAttempt`, clamped to `maxThrottlingDelayInMs`, jittered by up to 50%. Max retries default to 3.
- **Partial success throws:** If `throwOnAnyFailure` is set and the HTTP status is `207`, the result itself is thrown as an exception.

## OData Template Tag

The `odata` tagged template literal (`src/odata.ts`) handles:

- `null`/`undefined` -> the string `"null"` (OData null literal)
- Strings -> auto-quoted with single quotes, internal single quotes escaped by doubling (`'` -> `''`)
- Smart quoting: if the preceding template fragment already ends with `'`, the string is NOT re-quoted
- Numbers and other types interpolated as-is

## Strong Typing: `TModel`, `TFields`, `NarrowedModel`

`SearchClient` is generic over `TModel extends object`. The `search()`, `suggest()`, `getDocument()` methods accept a second type parameter `TFields extends SelectFields<TModel>` that narrows the return type based on selected fields. `SelectFields<TModel>` recursively generates valid OData `$select` paths (e.g., slash-delimited for nested fields). `NarrowedModel` uses `SearchPick` with `UnionToIntersection` to deeply narrow the return type at compile time.

## Testing Notes

- **Recorder sanitizer removals:** The test recorder removes default sanitizers `AZSDK2021` and `AZSDK3493` because they interfere with search-specific headers.
- **Test data:** `Hotel` interface in `test/public/utils/interfaces.ts`, mock 1536-dim embeddings in `mockEmbeddings.ts`, setup helpers (`createIndex`, `populateIndex` with 10 hotel docs, `createRandomIndexName`) in `setup.ts`.
- **WAIT_TIME pattern:** `isPlaybackMode() ? 0 : 4000` — live/record mode needs 4s delays for index consistency.
- **Stable vs preview:** Stable API tests in `test/public/node/`, preview features (e.g., KnowledgeRetrievalClient) in `test/public/node/preview/`.
- **`test/snippets.spec.ts`** is NOT a real test — it contains doc snippet source code.

## Common Pitfalls

- **Generated sub-client != convenience client** — `src/search/searchClient.ts` is the GENERATED sub-client. `src/searchClient.ts` is the HAND-AUTHORED convenience client. Adding methods to the generated file does nothing for consumers. Always edit the hand-authored file at the `src/` root. See "CRITICAL: Public Surface Gate" above.
- **Never hand-edit generated files** — files under `src/search/`, `src/searchIndex/`, `src/searchIndexer/`, `src/knowledgeBaseRetrieval/`, and `src/models/` are generated-mirrored. Edits will be overwritten. This includes API version strings.
- **`src/index.ts` is `--skip`'d** — after regeneration or adding new types, you must manually add exports there. The `ae-forgotten-export` lint error catches this.
- **`test/snippets.spec.ts` is documentation, not tests** — it contains source code for README and doc-comment snippets. Never delete or replace its contents. Never modify it when updating real tests.
- **`@azure-rest/core-client`** not `@azure/core-client` — TypeSpec packages use the REST variant for `OperationOptions`, `ClientOptions`, etc.
- **`knownSkills` whitelist** — `convertSkillsToPublic()` silently drops unknown skill types. New service skill types require updating this hardcoded record.
- **No reverse conversion for some types** — `vectorSearch` and individual skills are passed through directly without dedicated public-to-generated converters. Don't look for functions that don't exist.
- **`indexDocuments` 207 behavior** — partial success (HTTP 207) is thrown as an exception when `throwOnAnyFailure` is set. This is intentional, not a bug.
- **Date deserialization is strict** — only matches UTC ISO strings with 0-3 fractional seconds and `Z` suffix. Non-UTC strings won't be auto-converted.
