# Architecture Reference

## Directory Structure

The package has two key directories:
- `generated/` — Auto-generated code from TypeSpec (NEVER hand-edit)
- `src/` — The compilation source containing merged generated code + hand-authored convenience layer

### generated/ (Auto-Generated)

```
generated/
├── index.ts                        # Barrel export of all generated types/clients
├── logger.ts                       # Logger instance
├── models/                         # Generated model types
│   ├── index.ts
│   ├── models.ts
│   └── azure/search/documents/
│       ├── index.ts
│       ├── models.ts              # Search/document models
│       ├── indexes/
│       │   ├── index.ts
│       │   └── models.ts         # Index/indexer/skill models (~12K lines)
│       └── knowledgeBases/
│           ├── index.ts
│           └── models.ts         # Knowledge base models
├── search/                        # Generated Search sub-client
│   ├── searchClient.ts
│   ├── index.ts
│   └── api/
│       ├── operations.ts         # searchPost, autocomplete, suggest, etc.
│       ├── options.ts
│       ├── searchContext.ts      # Client context factory
│       └── index.ts
├── searchIndex/                   # Generated SearchIndex sub-client
│   ├── searchIndexClient.ts
│   ├── index.ts
│   └── api/
│       ├── operations.ts         # createIndex, getIndex, listIndexes, etc.
│       ├── options.ts
│       ├── searchIndexContext.ts
│       └── index.ts
├── searchIndexer/                 # Generated SearchIndexer sub-client
│   ├── searchIndexerClient.ts
│   ├── index.ts
│   └── api/
│       ├── operations.ts
│       ├── options.ts
│       ├── searchIndexerContext.ts
│       └── index.ts
├── knowledgeBaseRetrieval/        # Generated KnowledgeBaseRetrieval sub-client
│   ├── knowledgeBaseRetrievalClient.ts
│   ├── index.ts
│   └── api/
│       ├── operations.ts
│       ├── options.ts
│       ├── knowledgeBaseRetrievalContext.ts
│       └── index.ts
└── static-helpers/                # Generated utility functions
    ├── pagingHelpers.ts
    ├── urlTemplate.ts
    └── serialization/
        ├── build-csv-collection.ts
        ├── build-pipe-collection.ts
        ├── build-newline-collection.ts
        ├── parse-csv-collection.ts
        ├── parse-pipe-collection.ts
        ├── parse-newline-collection.ts
        ├── check-prop-undefined.ts
        └── serialize-record.ts
```

### src/ (Customized + Hand-Authored)

The `src/` directory mirrors the `generated/` structure PLUS contains hand-authored files:

**Merged from generated/ (via customization apply):**
- `src/models/`, `src/search/`, `src/searchIndex/`, `src/searchIndexer/`, `src/knowledgeBaseRetrieval/`, `src/static-helpers/`

**Hand-authored files (preserved across regeneration):**

| File | Purpose |
|------|---------|
| `src/index.ts` | Main barrel export — `--skip`'d during merge, must be manually updated |
| `src/searchClient.ts` | SearchClient convenience wrapper — wraps `src/search/searchClient.ts` |
| `src/searchIndexClient.ts` | SearchIndexClient convenience wrapper — wraps `src/searchIndex/searchIndexClient.ts` |
| `src/searchIndexerClient.ts` | SearchIndexerClient convenience wrapper — wraps `src/searchIndexer/searchIndexerClient.ts` |
| `src/knowledgeRetrievalClient.ts` | KnowledgeRetrievalClient convenience wrapper — wraps `src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.ts` |
| `src/serviceUtils.ts` | 200+ type conversion functions between generated and public types |
| `src/serialization.ts` | Special serialization: NaN↔"NaN", Infinity↔"INF", Date↔ISO, GeographyPoint↔GeoJSON |
| `src/serviceModels.ts` | User-facing types for indexes, indexers, skills, data sources |
| `src/indexModels.ts` | User-facing types for search, suggest, autocomplete operations |
| `src/knowledgeBaseModels.ts` | User-facing types for knowledge base operations |
| `src/backcompatTypes.ts` | Deprecated enum types (KnownEntityCategory, etc.) for backward compat |
| `src/errorModels.ts` | Error response interfaces |
| `src/indexDocumentsBatch.ts` | Batch builder for document operations (upload, merge, delete) |
| `src/searchIndexingBufferedSender.ts` | Auto-flush buffered sender with retry, payload splitting, exponential backoff |
| `src/odata.ts` | OData template tag for filter expressions |
| `src/odataMetadataPolicy.ts` | Pipeline policy setting OData metadata Accept header |
| `src/searchApiKeyCredentialPolicy.ts` | Pipeline policy adding api-key header |
| `src/searchAudience.ts` | KnownSearchAudience enum (Public, China, Government cloud URLs) |
| `src/geographyPoint.ts` | GeographyPoint class with GeoJSON conversion |
| `src/synonymMapHelper.ts` | Synonym map file reader (Node) |
| `src/synonymMapHelper-browser.mts` | Synonym map stub (Browser — throws "Not implemented") |
| `src/base64.ts` | Base64 encode/decode (Node — uses Buffer) |
| `src/base64-browser.mts` | Base64 encode/decode (Browser — uses btoa/atob) |
| `src/walk.ts` | Recursive tree walker with memoization for serialization |
| `src/tracing.ts` | OpenTelemetry tracing setup (createTracingClient) |
| `src/logger.ts` | Azure logger instance |

### Test Structure

```
test/
├── internal/                     # Unit tests (no recorder)
│   ├── base64.spec.ts
│   ├── geographyPoint.spec.ts
│   ├── serialization.spec.ts
│   ├── serviceUtils.spec.ts
│   ├── node/synonymMap.node.spec.ts
│   └── browser/synonymMap.browser.spec.ts
├── public/                       # Integration tests (recorder)
│   ├── odata.spec.ts
│   ├── typeDefinitions.ts        # Compile-time type checks
│   ├── node/
│   │   ├── searchClient.spec.ts
│   │   ├── searchIndexClient.spec.ts
│   │   └── preview/
│   │       ├── searchClient.spec.ts
│   │       ├── searchIndexClient.spec.ts
│   │       └── knowledgeRetrievalClient.spec.ts
│   └── utils/
│       ├── recordedClient.ts     # Recorder setup & client factory
│       ├── setup.ts             # Index creation & data population
│       ├── interfaces.ts        # Hotel test model
│       └── mockEmbeddings.ts    # Vector embeddings
└── snippets.spec.ts             # NOT a test — doc snippet source (DO NOT MODIFY)
```

## Data Flow

### Request Path
```
User Code → Convenience Client → tracingClient.withSpan() → Convert to generated types → Generated Client → HTTP
```

### Response Path
```
HTTP → Generated deserializer → Convert to public types (unwrap additionalProperties) → deserialize() → User
```

### The Serialization Sandwich
```
User input → serialize() → convert → API call → response → convert → deserialize() → User output
```
serialize/deserialize handles: NaN↔"NaN", Infinity↔"INF", -Infinity↔"-INF", Date↔ISO8601, GeographyPoint↔GeoJSON

## Dependencies

| Package | Purpose |
|---------|---------|
| `@azure-rest/core-client` | Base client, ClientOptions, OperationOptions |
| `@azure/core-auth` | TokenCredential, KeyCredential |
| `@azure/core-rest-pipeline` | HTTP pipeline, policies |
| `@azure/core-tracing` | Distributed tracing |
| `@azure/core-util` | Utilities (delay, etc.) |
| `@azure/logger` | Structured logging |
| `tslib` | TypeScript helpers |

## Package Exports

The package.json defines 9 subpath exports: `.`, `./search`, `./search/api`, `./searchIndex`, `./searchIndex/api`, `./searchIndexer`, `./searchIndexer/api`, `./knowledgeBaseRetrieval`, `./knowledgeBaseRetrieval/api`, `./models`, plus deep model paths.

## Version Injection

The `//metadata.constantPaths` in package.json lists files where the SDK version string is auto-injected:
- `src/knowledgeBaseRetrieval/api/knowledgeBaseRetrievalContext.ts`
- `src/search/api/searchContext.ts`
- `src/searchIndex/api/searchIndexContext.ts`
- `src/searchIndexer/api/searchIndexerContext.ts`
