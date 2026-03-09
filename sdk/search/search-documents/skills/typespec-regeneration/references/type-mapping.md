# Type Mapping Reference

## Property Name Changes

### Search Fields
| User-Facing Property | Old Swagger | New TypeSpec | Location |
|---------------------|-------------|--------------|----------|
| `analyzerName` | `analyzer` | `analyzerName` | `serviceUtils.ts: convertFieldsToGenerated/Public` |
| `searchAnalyzerName` | `searchAnalyzer` | `searchAnalyzerName` | `serviceUtils.ts` |
| `indexAnalyzerName` | `indexAnalyzer` | `indexAnalyzerName` | `serviceUtils.ts` |
| `normalizerName` | `normalizer` | `normalizerName` | `serviceUtils.ts` |
| `synonymMapNames` | `synonymMaps` | `synonymMapNames` | `serviceUtils.ts` |

### Encryption Keys
| User-Facing | Old Swagger | New TypeSpec |
|------------|-------------|-------------|
| `applicationId` | `accessCredentials.applicationId` | `applicationId` (flattened) |
| `applicationSecret` | `accessCredentials.applicationSecret` | `applicationSecret` (flattened) |

### Vector Search
| User-Facing | Old | New |
|------------|-----|-----|
| `parameters` (CustomWebApi) | `parameters` | `webApiParameters` |
| `aIServicesVisionParameters` | `aIServicesVisionParameters` | `aiServicesVisionParameters` (casing) |

### Custom Analyzers
| User-Facing | Old | New |
|------------|-----|-----|
| `tokenizerName` | `tokenizerName` | `tokenizer` (shortened) |

## The additionalProperties Pattern

**Problem**: TypeSpec wraps document fields in `additionalProperties` instead of index signatures.

**Generated**: `{ score, additionalProperties: { hotelName, rating } }`
**Public**: `{ score, document: { hotelName, rating } }`

**Conversion** in `serviceUtils.ts`:
```typescript
function generatedSearchResultToPublicSearchResult<TModel>(result) {
  return {
    score: result.searchScore,
    document: (result.additionalProperties ?? {}) as TModel,  // UNWRAP
  };
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
select: userSelect as string[] | undefined
```

## Discriminator Types

TypeSpec loosens base discriminator to `string` (was specific literal union). Affected types:
`BaseCharFilter`, `BaseCognitiveServicesAccount`, `BaseDataChangeDetectionPolicy`, `BaseDataDeletionDetectionPolicy`, `BaseLexicalAnalyzer`, `BaseLexicalTokenizer`, `BaseSearchIndexerSkill`, `BaseTokenFilter`, `BaseVectorQuery`, `BaseKnowledgeSource`

## Backward Compat (`backcompatTypes.ts`)

Deprecated enums preserved: `KnownEntityCategory`, `KnownEntityRecognitionSkillLanguage`, `KnownSentimentSkillLanguage`

## Import Source Changes

| What | Before (Swagger) | After (TypeSpec) |
|------|-----------------|------------------|
| `OperationOptions` | `@azure/core-client` | `@azure-rest/core-client` |
| Client base | `ExtendedCommonClientOptions` | `ClientOptions` from `@azure-rest/core-client` |

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
