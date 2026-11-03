# Data Flow Reference

## Search Pagination

`search()` uses a **fully custom pagination implementation** — it does NOT use `buildPagedAsyncIterator` from `pagingHelpers.ts`.

### Flow

1. **`search(searchText, options)`** — eagerly fetches first page via `searchDocuments()`, wraps in `SearchIterator` via `listSearchResults()`.
2. **`searchDocuments()`** — converts public `SearchOptions` to generated types (joins arrays, encodes semantic options), calls `this.client.searchPost()`, converts results back (unwraps `additionalProperties`), encodes continuation token.
3. **`listSearchResultsPage()`** — `async *` generator: decodes token, calls `searchDocuments()` with decoded `nextPageParameters`, yields page, loops while token exists.
4. **`listSearchResultsAll()`** — `async *` generator: yields items from first page, then delegates to `listSearchResultsPage()`.
5. **`listSearchResults()`** — assembles `SearchIterator` with `next()` (item-by-item) and `byPage()` (page-by-page).

### Continuation Token

Service returns `nextLink` (URL) and `nextPageParameters` (full POST body). Combined into one opaque Base64 token:

```
encode(JSON.stringify({ apiVersion, nextLink, nextPageParameters }))
```

- `apiVersion` guards against mixing tokens from different API versions (rejected with `RangeError`)
- `nextLink` is stored but **never used for fetching** — only `nextPageParameters` drives page fetches
- Returns `undefined` if either value is missing (no more pages)

### Why Custom

- Uses POST with `nextPageParameters` body, not GET with `nextLink` URLs
- First page is eagerly fetched (metadata like facets/count available immediately)
- Continuation tokens are opaque Base64 blobs with version pinning
- Dual result types: top-level `results` is an async iterator, each page's `results` is a plain array

### Key Types

- `SearchIterator<TModel, TFields>` — `PagedAsyncIterableIterator` alias for the `results` property
- `SearchDocumentsResult<TModel, TFields>` — top-level return from `search()`, contains first-page metadata (count, facets, answers) plus `results: SearchIterator`
- `SearchDocumentsPageResult<TModel, TFields>` — single page: `results: SearchResult[]` (plain array) plus `continuationToken?: string`
- `ListSearchResultsPageSettings` — settings for `byPage()`, containing only `continuationToken?: string`

## additionalProperties Unwrapping

TypeSpec wraps user document fields in `additionalProperties`. The convenience layer unwraps:

```
Generated: { searchScore, additionalProperties: { hotelName, rating } }
     → generatedSearchResultToPublicSearchResult()
Public:    { score, document: { hotelName, rating } }
```

Affects: `search()`, `suggest()`, `autocomplete()`, `getDocument()`.

## The Reverse: `__actionType` Convention

For `indexDocuments()`, `IndexDocumentsAction<TModel>` spreads the document and adds `__actionType: "upload" | "merge" | "mergeOrUpload" | "delete"`. The double-underscore prefix avoids collision with user document fields.

`IndexDocumentsBatch` provides builder methods: `upload()`, `merge()`, `mergeOrUpload()`, `delete()`. The `delete()` method has two overloads: by documents or by `keyName` + `keyValues`.

## The Serialization Sandwich

Every document boundary applies serialize (outbound) and deserialize (inbound) via `walk()`:

**Serialize:** `NaN` → `"NaN"`, `Infinity` → `"INF"`, `-Infinity` → `"-INF"`, `Date` → ISO 8601, `GeographyPoint` → GeoJSON Point with CRS EPSG:4326

**Deserialize:** Reverse of above. Date regex: `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$` (0-3 fractional seconds, UTC only).

`GeographyPoint` serializes with `[longitude, latitude]` order (not `[lat, lng]`). CRS `EPSG:4326` is required by the search service (not standard GeoJSON).

## Field Visibility Inversion

Public API: `hidden: boolean`. Wire format: `retrievable: boolean`. Logical inverses — `convertFieldsToPublic` and `convertFieldsToGenerated` flip this flag.

## SimpleField Default Overrides

`convertFieldsToGenerated` sets `searchable`, `filterable`, `facetable`, and `sortable` to `false` when not provided. This overrides service defaults to minimize storage for simple types.

## Encryption Key Property Renames

Public: `vaultUrl`. Wire: `vaultUri`. Applies everywhere encryption keys are used (indexes, synonym maps, skillsets, data sources, indexers, knowledge bases).

## Optimistic Concurrency

Every update/delete operation checks `options.onlyIfUnchanged` and passes `etag` as `ifMatch`. Delete methods accept either a name (string) or object (with etag) for conditional delete.

## SearchIndexingBufferedSender

Non-obvious behaviors of `src/searchIndexingBufferedSender.ts`:

- **Auto-flush timer:** `autoFlush: true` (default) fires `setInterval` every `flushWindowInMs` (default 60s). Interval is `unref()`'d to not keep Node.js alive.
- **Deduplication:** `pruneActions` ensures at most one action per document key per batch. Duplicates deferred to next batch.
- **Adaptive batch sizing on 413:** Payload Too Large → batch split in half, `initialBatchActionCount` permanently reduced (one-way ratchet).
- **Exponential backoff:** For 422/409/503: `delay * 2^retryAttempt`, clamped to `maxThrottlingDelayInMs`, jittered ±50%. Max retries default to 3.
- **Partial success throws:** HTTP 207 + `throwOnAnyFailure` → result thrown as exception.

## OData Template Tag

`odata` tagged template (`src/odata.ts`):

- `null`/`undefined` → string `"null"` (OData null literal)
- Strings → auto-quoted with single quotes, internal `'` escaped by doubling
- Smart quoting: if preceding fragment ends with `'`, string is NOT re-quoted
- Numbers/other types interpolated as-is

## Strong Typing

`SearchClient<TModel extends object>`. The `search()`, `suggest()`, `getDocument()` methods accept `TFields extends SelectFields<TModel>` to narrow the return type. `SelectFields<TModel>` recursively generates valid OData `$select` paths (slash-delimited for nested). `NarrowedModel` uses `SearchPick` with `UnionToIntersection` for deep compile-time narrowing.
