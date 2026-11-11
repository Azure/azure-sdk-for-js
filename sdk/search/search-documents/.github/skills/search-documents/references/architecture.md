# Architecture Reference

## Source Layout

```
sdk/search/search-documents/
├── generated/                    # Auto-generated from TypeSpec. Never hand-edit.
│   ├── search/                   # SearchClient sub-client
│   ├── searchIndex/              # SearchIndexClient sub-client
│   ├── searchIndexer/            # SearchIndexerClient sub-client
│   ├── knowledgeBaseRetrieval/   # KnowledgeBaseRetrievalClient sub-client
│   ├── models/                   # Generated model types (namespaced)
│   ├── static-helpers/           # Serialization helpers, URL template, paging
│   ├── index.ts                  # Generated barrel export
│   └── logger.ts                 # Generated logger
├── src/                          # Hand-authored + merged from generated/
│   ├── search/                   # Merged: generated search sub-client
│   ├── searchIndex/              # Merged: generated searchIndex sub-client
│   ├── searchIndexer/            # Merged: generated searchIndexer sub-client
│   ├── knowledgeBaseRetrieval/   # Merged: generated knowledgeBaseRetrieval sub-client
│   ├── models/                   # Merged: generated model types
│   ├── static-helpers/           # Merged: serialization helpers
│   ├── (hand-authored files)     # See "Key Hand-Authored Files" below
│   └── index.ts                  # Hand-authored: barrel export (--skip'd during merge)
├── test/
│   ├── public/node/              # Stable API integration tests
│   ├── public/node/preview/      # Preview feature tests
│   ├── internal/                 # Internal unit tests
│   └── snippets.spec.ts          # NOT a test — doc snippet source
├── tsp-location.yaml             # TypeSpec spec location
└── package.json
```

## The Four Clients

Each convenience client follows the same construction pattern:

1. Constructor accepts `(endpoint, [resourceName,] credential, options?)` where credential is `KeyCredential | TokenCredential`.
2. Creates the generated sub-client with `{ endpoint, credentials: { apiKeyHeaderName: "api-key" } }`.
3. Replaces the default auth policy — if `TokenCredential`, adds `bearerTokenAuthenticationPolicy` with the search-specific scope; if `KeyCredential`, adds `searchApiKeyCredentialPolicy` (sets `api-key` header).
4. Adds `odataMetadataPolicy` to control OData metadata level.
5. Each public method wraps `tracingClient.withSpan()` which converts public→generated types, calls the generated client, and converts generated→public types on return.

**OData metadata level:**

- `SearchClient` uses `"none"` — document responses don't need type annotations.
- `SearchIndexClient`, `SearchIndexerClient`, `KnowledgeRetrievalClient` use `"minimal"` — management operations need discriminator annotations.

**SearchIndexClient extras:**

- `getSearchClient(indexName)` — factory that spawns a `SearchClient` sharing the credential.
- `getKnowledgeRetrievalClient(knowledgeBaseName)` — factory for `KnowledgeRetrievalClient`.
- `listIndexNames()` — server-side projection (`select: "name"`) via `listIndexesWithSelectedProperties`, wrapped with `mapPagedAsyncIterable`.

## Key Hand-Authored Files

| File | Purpose |
|---|---|
| `src/searchClient.ts` | `SearchClient<TModel>` convenience wrapper — search, suggest, autocomplete, document operations |
| `src/searchIndexClient.ts` | `SearchIndexClient` convenience wrapper — index CRUD, synonym maps, aliases, knowledge bases |
| `src/searchIndexerClient.ts` | `SearchIndexerClient` convenience wrapper — indexer, data source, skillset CRUD |
| `src/knowledgeRetrievalClient.ts` | `KnowledgeRetrievalClient` convenience wrapper — knowledge base retrieval |
| `src/serviceUtils.ts` | 200+ type conversion functions between generated and public types |
| `src/serviceModels.ts` | User-facing types for indexes, indexers, skills, data sources |
| `src/indexModels.ts` | User-facing types for search, suggest, autocomplete operations |
| `src/knowledgeBaseModels.ts` | User-facing types for knowledge base operations |
| `src/inputModels.ts` | Additive preview request types; released aliases and response types remain in their existing model files |
| `src/models/azure/search/documents/indexes/inputModels.ts` | Hand-authored protocol input types and random scoring conversion, with no counterpart under `generated/` |
| `src/serialization.ts` | NaN/Infinity/Date/GeographyPoint serialization via `walk()` |
| `src/walk.ts` | Recursive immutable tree walker with cycle detection |
| `src/indexDocumentsBatch.ts` | Batch builder for document upload/merge/delete actions |
| `src/searchIndexingBufferedSender.ts` | Auto-flush buffered sender with retry and adaptive batch sizing |
| `src/odata.ts` | `odata` template tag for safe OData filter expressions |
| `src/geographyPoint.ts` | `GeographyPoint` class with GeoJSON/EPSG:4326 conversion |
| `src/odataMetadataPolicy.ts` | Pipeline policy setting OData metadata Accept header |
| `src/searchApiKeyCredentialPolicy.ts` | Pipeline policy adding `api-key` header |
| `src/synonymMapHelper.ts` | `createSynonymMapFromFile()` — Node.js only file helper |
| `src/errorModels.ts` | Error response types (ErrorResponse, ErrorDetail, ErrorAdditionalInfo) |
| `src/base64.ts` | Base64 encode/decode for continuation tokens |
| `src/tracing.ts` | Tracing client setup (namespace: `Microsoft.Search`) |
| `src/searchAudience.ts` | `KnownSearchAudience` enum (Azure Public, China, Government) |
| `src/logger.ts` | Merged logger (overrides generated version) |

## Exposing New Operations — Wrong vs Right

**WRONG** — Adding a method to the generated sub-client:

```typescript
// WRONG: src/search/searchClient.ts is a GENERATED file — this will be overwritten
import { explainPost } from "./api/operations.js";
export class SearchClient {
  explainPost(body, options) {
    return explainPost(this._client, body, options); // raw generated types, no conversion
  }
}
```

This does nothing for consumers. The generated sub-client is an internal implementation detail.

**RIGHT** — Adding a method to the hand-authored convenience client:

```typescript
// RIGHT: src/searchClient.ts is the HAND-AUTHORED convenience client
export class SearchClient<TModel extends object> {
  async explain(documentKey: string, searchText: string, options: ExplainOptions = {}) {
    return tracingClient.withSpan("SearchClient.explain", options, async (updatedOptions) => {
      // Convert public types -> generated types
      const { body, operationOptions } = convertExplainOptions(
        documentKey,
        searchText,
        updatedOptions,
      );
      const result = await this.client.explainPost(body, operationOptions);
      // Convert generated types -> public types
      return convertExplainResult(result);
    });
  }
}
```

Then define `ExplainOptions` and `ExplainResult` in `src/indexModels.ts`, add conversion functions in `src/serviceUtils.ts`, and export all new symbols from `src/index.ts`.
