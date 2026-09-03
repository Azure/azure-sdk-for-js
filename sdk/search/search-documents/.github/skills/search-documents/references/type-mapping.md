# Type Mapping Reference

## Property Name Changes

### Search Fields

| User-Facing Property | Generated (Wire) Name | Location |
|---|---|---|
| `analyzerName` | `analyzerName` | `serviceUtils.ts: convertFieldsToGenerated/Public` |
| `searchAnalyzerName` | `searchAnalyzerName` | `serviceUtils.ts` |
| `indexAnalyzerName` | `indexAnalyzerName` | `serviceUtils.ts` |
| `normalizerName` | `normalizerName` | `serviceUtils.ts` |
| `synonymMapNames` | `synonymMapNames` | `serviceUtils.ts` |

### Encryption Keys

| User-Facing | Generated (Wire) Name |
|---|---|
| `applicationId` | `applicationId` |
| `applicationSecret` | `applicationSecret` |
| `vaultUrl` | `vaultUri` |

### Vector Search

| User-Facing | Generated (Wire) Name |
|---|---|
| `parameters` (CustomWebApi) | `webApiParameters` |
| `aIServicesVisionParameters` | `aiServicesVisionParameters` (casing) |

### Custom Analyzers

| User-Facing | Generated (Wire) Name |
|---|---|
| `tokenizerName` | `tokenizer` (shortened) |

### Other

| User-Facing | Generated (Wire) Name | Context |
|---|---|---|
| `hidden` | `!retrievable` (inverted) | Field visibility |
| `etag` | `eTag` | SynonymMap |

## The additionalProperties Pattern

**Problem**: TypeSpec wraps document fields in `additionalProperties` instead of index signatures.

**Generated**: `{ score, additionalProperties: { hotelName, rating } }`
**Public**: `{ score, document: { hotelName, rating } }`

**Conversion** in `serviceUtils.ts`:

```typescript
function generatedSearchResultToPublicSearchResult<TModel>(results) {
  return results.map((result) => {
    const { score, additionalProperties } = result;
    return {
      score,
      document: (additionalProperties ?? {}) as TModel, // UNWRAP
    };
  });
}
```

Affects: `search()`, `suggest()`, `autocomplete()`, `getDocument()`, `indexDocuments()`

## Wire Format Encodings

### Array-to-String Joins (in searchClient.ts)

| User Option | Wire Format | Notes |
|---|---|---|
| `searchFields: string[]` | comma-separated string | |
| `select: string[]` | comma-separated string | Defaults to `"*"` if not provided |
| `orderBy: string[]` | comma-separated string | |

### Pipe-Delimited Semantic Encoding (in searchClient.ts)

| User Option | Wire Format Example |
|---|---|
| `queryAnswers: { answerType, count, threshold, maxAnswerLength }` | `"extractive\|count-3,threshold-0.7,maxcharlength-200"` |
| `queryCaptions: { captionType, highlight, maxCaptionLength }` | `"extractive\|highlight-true,maxcharlength-200"` |
| `queryRewrites: { rewritesType, count }` | `"generative\|count-5"` |

Note: `maxAnswerLength` maps to `maxcharlength` (not `maxanswerlength`). Config items are only appended if present.

### Vector Query Dispatch

`convertVectorQuery()` dispatches on `vectorQuery.kind`: `"text"`, `"vector"`, `"imageUrl"`, `"imageBinary"`. Only `"text"` has `queryRewrites` to convert. For all kinds, `fields` is joined into a comma-separated string. Unknown kinds get a logger warning and are passed through (forward-compat).

### SynonymMap Wire Format

- `format: "solr"` is always injected — the public type doesn't expose a format field.
- Generated type: `synonyms` as string (newline-delimited). Public type: `synonyms` as `string[]`.
- Generated type: `eTag`. Public type: `etag` (lowercase).

### resetDocuments Body Restructuring

`resetDocuments()` restructures flat options (`documentKeys`, `datasourceDocumentIds`) into a nested `keysOrIds` object expected by the wire format.

## Null Handling

TypeSpec marks many optional properties as `T | null`. Mitigation:

- `--emitter-options="ignore-nullable-on-optional=true"` in generate:client
- In conversions: `value: generated.value ?? undefined`

## Readonly Arrays

User code uses `as const` (readonly). Cast when passing to generated code:

```typescript
select: userSelect as string[] | undefined;
```

## AML Vectorizer Auth Kind Inference

`generatedAzureMachineLearningVectorizerParametersToPublic...` infers `authKind` via `switch(true)`: `resourceId` non-null → `"token"`, `authenticationKey` non-null → `"key"`, `scoringUri` non-null → `"none"`. Order of checks matters.

## Known Skills Whitelist

`convertSkillsToPublic()` filters through a hardcoded `knownSkills` record in `serviceUtils.ts`. Unknown skill types returned by the service are **silently dropped**. Adding support for new skill types requires updating this record.

## Backward Compat (`backcompatTypes.ts`)

Deprecated enums preserved: `KnownEntityCategory`, `KnownEntityRecognitionSkillLanguage`, `KnownSentimentSkillLanguage`

## Key Conversion Functions (serviceUtils.ts)

### Index

`publicIndexToGeneratedIndex()`, `generatedIndexToPublicIndex()`, `convertFieldsToGenerated()`, `convertFieldsToPublic()`

### Search Results

`generatedSearchResultToPublicSearchResult()`, `generatedSuggestDocumentsResultToPublicSuggestDocumentsResult()`, `convertGeneratedFacetsToPublic()`, `convertGeneratedAnswersToPublic()`, `convertGeneratedCaptionsToPublic()`

### Vector Search

`generatedVectorSearchToPublicVectorSearch()`, `generatedVectorSearchVectorizerToPublicVectorizer()`, `generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration()`

Note: No `publicVectorSearchToGeneratedVectorSearch()` — `publicIndexToGeneratedIndex()` passes `vectorSearch` through directly.

### Skillsets/Indexers

`convertSkillsToPublic()`, `convertCognitiveServicesAccountToPublic()`, `convertCognitiveServicesAccountToGenerated()`, `generatedSkillsetToPublicSkillset()`, `publicSkillsetToGeneratedSkillset()`, `publicSearchIndexerToGeneratedSearchIndexer()`, `generatedSearchIndexerToPublicSearchIndexer()`, `publicDataSourceToGeneratedDataSource()`, `generatedDataSourceToPublicDataSource()`

Note: No `convertSkillsToGenerated()` — skills are passed through as `SearchIndexerSkillUnion`.

### Synonym Maps

`generatedSynonymMapToPublicSynonymMap()`, `publicSynonymMapToGeneratedSynonymMap()`

### Knowledge Base

`convertKnowledgeBaseToPublic()`, `convertKnowledgeBaseToGenerated()`, `convertKnowledgeSourceToPublic()`, `convertKnowledgeSourceToGenerated()`

### SearchClient-Specific (in searchClient.ts, NOT serviceUtils.ts)

`convertSearchFields()`, `convertSelect()`, `convertVectorQuery()`, `convertQueryAnswers()`, `convertQueryCaptions()`, `convertQueryRewrites()`, continuation token Base64 encode/decode
