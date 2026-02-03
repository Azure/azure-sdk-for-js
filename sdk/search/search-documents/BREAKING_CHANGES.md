# Breaking Changes - TypeSpec Migration

This document summarizes breaking changes introduced by the migration from Swagger to TypeSpec code generation in the `@azure/search-documents` package.

## Summary

The migration from Swagger to TypeSpec introduces several categories of breaking changes:

- **HIGH IMPACT**: Changes likely to break existing code
- **MEDIUM IMPACT**: Changes that may break some code patterns
- **LOW IMPACT**: Changes unlikely to break code
- **BY DESIGN**: Changes intentionally made by the service team

---

## HIGH IMPACT Changes

### Import Source Changes

The base infrastructure has changed from `@azure/core-client` to `@azure-rest/core-client`:

| Import             | Old Source                                                | New Source                |
| ------------------ | --------------------------------------------------------- | ------------------------- |
| `OperationOptions` | `@azure/core-client`                                      | `@azure-rest/core-client` |
| `ClientOptions`    | `@azure/core-http-compat` (`ExtendedCommonClientOptions`) | `@azure-rest/core-client` |

**Hypothesis**: TypeSpec generates code using the newer `@azure-rest/core-client` infrastructure.

**Mitigation**: Update imports or re-export the types from the package for backward compatibility.

### Client Options Base Type Change

All client options interfaces now extend `ClientOptions` from `@azure-rest/core-client` instead of `ExtendedCommonClientOptions` from `@azure/core-http-compat`:

- `SearchClientOptions`
- `SearchIndexClientOptions`
- `SearchIndexerClientOptions`
- `KnowledgeRetrievalClientOptions`

**Hypothesis**: TypeSpec uses a different base options type.

**Mitigation**: Most user code should be unaffected as both types provide similar options. Users with custom client options may need to update their types.

### Index Signature Changes

The following interfaces previously had an index signature `[property: string]: any` which has been replaced with an explicit `additionalProperties` property:

| Interface            | Old                       | New                                          |
| -------------------- | ------------------------- | -------------------------------------------- |
| `FacetResult`        | `[property: string]: any` | `additionalProperties?: Record<string, any>` |
| `QueryAnswerResult`  | `[property: string]: any` | `additionalProperties?: Record<string, any>` |
| `QueryCaptionResult` | `[property: string]: any` | `additionalProperties?: Record<string, any>` |

**Hypothesis**: TypeSpec represents additional properties explicitly rather than via index signatures.

**Mitigation**: Update code that accesses dynamic properties to use `result.additionalProperties["propertyName"]` instead of `result["propertyName"]`.

### Type Rename

| Old Name                                           | New Name                         |
| -------------------------------------------------- | -------------------------------- |
| `IndexerState`                                     | `IndexerCurrentState`            |
| `ChatCompletionResponseFormatJsonSchemaProperties` | `ChatCompletionSchemaProperties` |
| `KnowledgeBaseMessageImageContentImage`            | `KnowledgeBaseImageContent`      |

**Hypothesis**: TypeSpec uses different naming conventions or the service spec was updated.

**Mitigation**: Update type references in user code. Consider adding type aliases for backward compatibility.

### Property Casing Change

| Interface                   | Property    | Old         | New         |
| --------------------------- | ----------- | ----------- | ----------- |
| `ContentUnderstandingSkill` | `odatatype` | `odatatype` | `odataType` |

**Hypothesis**: TypeSpec generates camelCase property names.

**Mitigation**: Update property references in user code.

---

## MEDIUM IMPACT Changes

### Nullable Properties

Many optional properties now include `| null` in their type signature. For example:

```typescript
// Before
authenticationKey?: string;

// After
authenticationKey?: string | null;
```

This affects many properties across multiple interfaces including:

- `AzureMachineLearningSkill`: `authenticationKey`, `degreeOfParallelism`, `region`, `resourceId`, `scoringUri`, `timeout`
- `AzureOpenAITokenizerParameters`: `encoderModelName`
- `ContentUnderstandingSkillChunkingProperties`: `maximumLength`, `overlapLength`, `unit`
- `CorsOptions`: `maxAgeInSeconds`
- `DocumentExtractionSkill`: `configuration`, `dataToExtract`, `parsingMode`
- `EntityLinkingSkill`: `defaultLanguageCode`, `modelVersion`
- `IndexerExecutionResult`: `endTime`
- `IndexerRuntime`: `remainingSeconds`
- `RescoringOptions`: `defaultOversampling`, `enableRescoring`, `rescoreStorageMethod`
- `BaseVectorSearchCompression`: `rescoringOptions`, `truncationDimension`
- And many others

**Hypothesis**: TypeSpec explicitly represents nullable types per the service schema.

**Mitigation**: Most TypeScript code should continue to work. Users with strict null checks may need to handle `null` explicitly.

### Interface Property Changes

#### Required to Optional

| Interface           | Property | Change              |
| ------------------- | -------- | ------------------- |
| `QueryAnswerResult` | `key`    | Required → Optional |
| `QueryAnswerResult` | `score`  | Required → Optional |
| `QueryAnswerResult` | `text`   | Required → Optional |

#### Optional to Required

| Interface                                            | Property           | Change              |
| ---------------------------------------------------- | ------------------ | ------------------- |
| `SearchIndexerKnowledgeStoreTableProjectionSelector` | `generatedKeyName` | Optional → Required |

**Hypothesis**: Service schema updates or TypeSpec interpretation differences.

**Mitigation**: Code accessing these properties may need null checks.

### Discriminator Type Loosening

Base interface `odatatype` properties changed from specific literal unions to `string`:

| Interface                         | Old `odatatype` Type                                                                                | New `odatatype` Type |
| --------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------- |
| `BaseCharFilter`                  | `"#Microsoft.Azure.Search.MappingCharFilter" \| "#Microsoft.Azure.Search.PatternReplaceCharFilter"` | `string`             |
| `BaseCognitiveServicesAccount`    | Specific literal union                                                                              | `string`             |
| `BaseDataChangeDetectionPolicy`   | Specific literal union                                                                              | `string`             |
| `BaseDataDeletionDetectionPolicy` | Specific literal union                                                                              | `string`             |
| `BaseLexicalAnalyzer`             | Specific literal union                                                                              | `string`             |
| `BaseLexicalTokenizer`            | Specific literal union                                                                              | `string`             |
| `BaseSearchIndexerSkill`          | Specific literal union                                                                              | `string`             |
| `BaseTokenFilter`                 | Specific literal union                                                                              | `string`             |

**Hypothesis**: TypeSpec generates looser base types, with concrete types having specific literals.

**Mitigation**: Type narrowing code may need updates. Consider using type guards.

---

## LOW IMPACT Changes

### Enum Value Changes

| Enum                                         | Key           | Old Value       | New Value        |
| -------------------------------------------- | ------------- | --------------- | ---------------- |
| `KnownChatCompletionExtraParametersBehavior` | `PassThrough` | `"passThrough"` | `"pass-through"` |

**Hypothesis**: Service API changed the wire value.

**Mitigation**: Update any code comparing against this enum value.

---

## Removed Types

The following types have been removed from the public API:

### Deprecated Skill Types (BY DESIGN per [Azure docs](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-deprecated))

These types are related to deprecated skills and their removal is intentional:

| Type                                  | Reason                           | Replacement                   |
| ------------------------------------- | -------------------------------- | ----------------------------- |
| `EntityCategory`                      | Deprecated skill support removed | Use `string[]` for categories |
| `KnownEntityCategory`                 | Deprecated skill enum            | N/A                           |
| `EntityRecognitionSkillLanguage`      | Deprecated skill support removed | Use `string`                  |
| `KnownEntityRecognitionSkillLanguage` | Deprecated skill enum            | N/A                           |
| `SentimentSkillLanguage`              | Deprecated skill support removed | Use `string`                  |
| `KnownSentimentSkillLanguage`         | Deprecated skill enum            | N/A                           |

Note: The deprecated skills `EntityRecognitionSkill` and `SentimentSkill` still exist but with simplified types:

| Interface                | Property              | Old Type                         | New Type   |
| ------------------------ | --------------------- | -------------------------------- | ---------- |
| `EntityRecognitionSkill` | `categories`          | `EntityCategory[]`               | `string[]` |
| `EntityRecognitionSkill` | `defaultLanguageCode` | `EntityRecognitionSkillLanguage` | `string`   |
| `SentimentSkill`         | `defaultLanguageCode` | `SentimentSkillLanguage`         | `string`   |

### Knowledge Source Status Types

These types were removed, likely because the corresponding API endpoint was also removed:

- `KnowledgeSourceStatus`
- `KnowledgeSourceStatistics`
- `KnowledgeSourceSynchronizationStatus`
- `CompletedSynchronizationState`
- `SynchronizationState`

**Hypothesis**: These types supported the `getKnowledgeSourceStatus()` method which was removed.

### Knowledge Source Retrieval Activity Types

These types were consolidated or removed:

- `BaseKnowledgeBaseRetrievalActivityRecord` (type union changed)
- `KnowledgeBaseRetrievalActivityRecord` (type union changed)
- `KnowledgeBaseSearchIndexActivityRecord`
- `KnowledgeBaseSearchIndexActivityArguments`
- `KnowledgeBaseSearchIndexFieldReference`
- `KnowledgeBaseAzureBlobActivityRecord`
- `KnowledgeBaseAzureBlobActivityArguments`
- `KnowledgeBaseIndexedSharePointActivityRecord`
- `KnowledgeBaseIndexedSharePointActivityArguments`
- `KnowledgeBaseIndexedOneLakeActivityRecord`
- `KnowledgeBaseIndexedOneLakeActivityArguments`
- `KnowledgeBaseWebActivityRecord`
- `KnowledgeBaseWebActivityArguments`
- `KnowledgeBaseRemoteSharePointActivityRecord`
- `KnowledgeBaseRemoteSharePointActivityArguments`

**Hypothesis**: TypeSpec models knowledge retrieval activity differently or these are internal types.

### Other Removed Types

| Type                                        | Hypothesis                                          |
| ------------------------------------------- | --------------------------------------------------- |
| `AIServices`                                | Replaced or internal-only                           |
| `CommonModelParameters`                     | Now internal (warning: `ae-forgotten-export`)       |
| `BaseKnowledgeSourceVectorizer`             | Consolidated into `KnowledgeSourceVectorizer`       |
| `KnowledgeSourceKind`                       | Now internal (warning: `ae-forgotten-export`)       |
| `KnownKnowledgeSourceKind`                  | Removed with `KnowledgeSourceKind`                  |
| `KnowledgeSourceContentExtractionMode`      | Now internal (warning: `ae-forgotten-export`)       |
| `KnowledgeSourceIngestionPermissionOption`  | Now internal (warning: `ae-forgotten-export`)       |
| `IndexedSharePointContainerName`            | Now internal (warning: `ae-forgotten-export`)       |
| `KnowledgeRetrievalOutputMode`              | Use `BaseKnowledgeRetrievalOutputMode` instead      |
| `KnowledgeRetrievalReasoningEffort`         | Use `BaseKnowledgeRetrievalReasoningEffort` instead |
| `KnownKnowledgeRetrievalOutputMode`         | Removed                                             |
| `RemoteSharePointKnowledgeSourceParameters` | Now internal (warning: `ae-forgotten-export`)       |
| `WebKnowledgeSourceParameters`              | Removed or internal                                 |
| `WebKnowledgeSourceDomains`                 | Removed                                             |
| `WebKnowledgeSourceDomain`                  | Removed                                             |
| `GetIndexStatsSummaryOptionalParams`        | Internal operation params                           |
| `GetIndexStatsSummaryResponse`              | Internal response type                              |
| `ListIndexStatsSummary`                     | Internal list type                                  |
| `IndexersResyncOptionalParams`              | Internal operation params                           |

---

## Removed Methods

| Class               | Method                       | Hypothesis                                         |
| ------------------- | ---------------------------- | -------------------------------------------------- |
| `SearchIndexClient` | `getKnowledgeSourceStatus()` | Feature removed or not yet implemented in TypeSpec |

---

## Types with Missing Exports (ae-forgotten-export warnings)

The following types are referenced but not exported from the package entry point. This may affect users who were importing these types:

- `PagedAsyncIterableIterator` - Now from internal module
- `KnowledgeBaseActivityRecordType`
- `KnowledgeBaseMessageContentType`
- `KnowledgeBaseModelKind`
- `KnowledgeRetrievalReasoningEffortKind`
- `KnowledgeRetrievalIntentType`
- `KnowledgeBaseReferenceType`
- `KnowledgeSourceKind`
- `SimilarityAlgorithm_2`
- `ChatCompletionSchemaProperties`
- `CommonModelParameters`
- `AIServices`
- `KnowledgeSourceContentExtractionMode`
- `KnowledgeSourceIngestionPermissionOption`
- `IndexedSharePointContainerName`
- `RemoteSharePointKnowledgeSourceParameters`
- `KnowledgeSourceVectorizer_2`
- `KnowledgeBaseImageContent`

**Mitigation**: These should be exported from the package. File an issue or PR to add missing exports.

---

## Migration Guide

### For Index Signature Changes

```typescript
// Before
const value = facetResult["myProperty"];

// After
const value = facetResult.additionalProperties?.["myProperty"];
```

### For Type Renames

```typescript
// Before
const state: IndexerState = ...;

// After
const state: IndexerCurrentState = ...;
```

### For Nullable Properties

```typescript
// Before
if (skill.timeout) { ... }

// After
if (skill.timeout != null) { ... }
// or
if (skill.timeout !== undefined && skill.timeout !== null) { ... }
```

### For Deprecated Skills

Follow the [Azure migration guide](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-deprecated) to migrate from deprecated skills:

- `EntityRecognitionSkill` → `EntityRecognitionSkillV3`
- `SentimentSkill` → `SentimentSkillV3`
