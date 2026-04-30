# Type Mapping Reference

## Property Name Changes

### Search Fields

| User-Facing Property | Generated (Wire) Name | Location                                           |
| -------------------- | --------------------- | -------------------------------------------------- |
| `analyzerName`       | `analyzerName`        | `serviceUtils.ts: convertFieldsToGenerated/Public` |
| `searchAnalyzerName` | `searchAnalyzerName`  | `serviceUtils.ts`                                  |
| `indexAnalyzerName`  | `indexAnalyzerName`   | `serviceUtils.ts`                                  |
| `normalizerName`     | `normalizerName`      | `serviceUtils.ts`                                  |
| `synonymMapNames`    | `synonymMapNames`     | `serviceUtils.ts`                                  |

### Encryption Keys

| User-Facing         | Generated (Wire) Name |
| ------------------- | --------------------- |
| `applicationId`     | `applicationId`       |
| `applicationSecret` | `applicationSecret`   |
| `vaultUrl`          | `vaultUri`            |

### Vector Search

| User-Facing                  | Generated (Wire) Name                 |
| ---------------------------- | ------------------------------------- |
| `parameters` (CustomWebApi)  | `webApiParameters`                    |
| `aIServicesVisionParameters` | `aiServicesVisionParameters` (casing) |

### Custom Analyzers

| User-Facing     | Generated (Wire) Name   |
| --------------- | ----------------------- |
| `tokenizerName` | `tokenizer` (shortened) |

### Other

| User-Facing | Generated (Wire) Name     | Context          |
| ----------- | ------------------------- | ---------------- |
| `hidden`    | `!retrievable` (inverted) | Field visibility |
| `etag`      | `eTag`                    | SynonymMap       |

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

## Null Handling

TypeSpec marks many optional properties as `T | null`. Mitigation:

- `--emitter-options="ignore-nullable-on-optional=true"` in generate:client
- In conversions: `value: generated.value ?? undefined`

## Readonly Arrays

User code uses `as const` (readonly). Cast when passing to generated code:

```typescript
select: userSelect as string[] | undefined;
```

## Backward Compat (`backcompatTypes.ts`)

Deprecated enums preserved: `KnownEntityCategory`, `KnownEntityRecognitionSkillLanguage`, `KnownSentimentSkillLanguage`

## Key Conversion Functions (serviceUtils.ts)

### Index

`publicIndexToGeneratedIndex()`, `generatedIndexToPublicIndex()`, `convertFieldsToGenerated()`, `convertFieldsToPublic()`

### Search Results

`generatedSearchResultToPublicSearchResult()`, `generatedSuggestDocumentsResultToPublicSuggestDocumentsResult()`, `convertGeneratedFacetsToPublic()`, `convertGeneratedAnswersToPublic()`, `convertGeneratedCaptionsToPublic()`

### Vector Search

`generatedVectorSearchToPublicVectorSearch()`, `generatedVectorSearchVectorizerToPublicVectorizer()`, `generatedVectorSearchAlgorithmConfigurationToPublicVectorSearchAlgorithmConfiguration()`

Note: There is no `publicVectorSearchToGeneratedVectorSearch()` — `publicIndexToGeneratedIndex()` passes `vectorSearch` through directly without a dedicated reverse conversion.

### Skillsets/Indexers

`convertSkillsToPublic()`, `convertCognitiveServicesAccountToPublic()`, `convertCognitiveServicesAccountToGenerated()`, `generatedSkillsetToPublicSkillset()`, `publicSkillsetToGeneratedSkillset()`, `publicSearchIndexerToGeneratedSearchIndexer()`, `generatedSearchIndexerToPublicSearchIndexer()`, `publicDataSourceToGeneratedDataSource()`, `generatedDataSourceToPublicDataSource()`

Note: There is no `convertSkillsToGenerated()` — `publicSkillsetToGeneratedSkillset()` passes individual skills through directly via `SearchIndexerSkillUnion`.

### Synonym Maps

`generatedSynonymMapToPublicSynonymMap()`, `publicSynonymMapToGeneratedSynonymMap()`

### Knowledge Base

`convertKnowledgeBaseToPublic()`, `convertKnowledgeBaseToGenerated()`, `convertKnowledgeSourceToPublic()`, `convertKnowledgeSourceToGenerated()`

### SearchClient-Specific (in searchClient.ts, NOT serviceUtils.ts)

`convertSearchFields()`, `convertSelect()`, `convertVectorQuery()`, `convertQueryAnswers()`, `convertQueryCaptions()`, `convertQueryRewrites()`, continuation token Base64 encode/decode
