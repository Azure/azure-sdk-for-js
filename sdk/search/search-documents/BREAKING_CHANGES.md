# Breaking Changes - TypeSpec Migration

This document summarizes breaking changes introduced by the migration from Swagger to TypeSpec code generation in the `@azure/search-documents` package.

## Enum Value Changes

| Enum                                         | Key           | Old Value       | New Value        |
| -------------------------------------------- | ------------- | --------------- | ---------------- |
| `KnownChatCompletionExtraParametersBehavior` | `PassThrough` | `"passThrough"` | `"pass-through"` |

## Interface Property Changes

### Required to Optional

| Interface           | Property | Change              |
| ------------------- | -------- | ------------------- |
| `QueryAnswerResult` | `key`    | Required → Optional |
| `QueryAnswerResult` | `score`  | Required → Optional |
| `QueryAnswerResult` | `text`   | Required → Optional |

### Optional to Required

| Interface                                            | Property           | Change              |
| ---------------------------------------------------- | ------------------ | ------------------- |
| `SearchIndexerKnowledgeStoreTableProjectionSelector` | `generatedKeyName` | Optional → Required |

### Index Signature Changes

The following interfaces previously had an index signature `[property: string]: any` which has been replaced with an explicit `additionalProperties` property:

| Interface            | Old                       | New                                          |
| -------------------- | ------------------------- | -------------------------------------------- |
| `FacetResult`        | `[property: string]: any` | `additionalProperties?: Record<string, any>` |
| `QueryAnswerResult`  | `[property: string]: any` | `additionalProperties?: Record<string, any>` |
| `QueryCaptionResult` | `[property: string]: any` | `additionalProperties?: Record<string, any>` |

## Type Changes

| Interface                | Property              | Old Type                         | New Type   |
| ------------------------ | --------------------- | -------------------------------- | ---------- |
| `EntityRecognitionSkill` | `categories`          | `EntityCategory[]`               | `string[]` |
| `EntityRecognitionSkill` | `defaultLanguageCode` | `EntityRecognitionSkillLanguage` | `string`   |
| `SentimentSkill`         | `defaultLanguageCode` | `SentimentSkillLanguage`         | `string`   |

## Removed Types

The following types have been removed from the public API:

### Enums

- `KnownEntityCategory` / `EntityCategory`
- `KnownEntityRecognitionSkillLanguage` / `EntityRecognitionSkillLanguage`
- `KnownSentimentSkillLanguage` / `SentimentSkillLanguage`
- `KnownKnowledgeRetrievalOutputMode`
- `KnownKnowledgeSourceKind`

### Interfaces

- `AIServices` (note: `AIServicesAccountKey` and `AIServicesAccountIdentity` still exist)
- `CommonModelParameters`
- `CompletedSynchronizationState`
- `SynchronizationState`
- `IndexerState` (replaced by `IndexerCurrentState`)
- `ChatCompletionResponseFormatJsonSchemaProperties` (replaced by `ChatCompletionSchemaProperties`)
- `GetIndexStatsSummaryOptionalParams`
- `GetIndexStatsSummaryResponse`
- `IndexersResyncOptionalParams`
- `ListIndexStatsSummary`
- `KnowledgeSourceStatistics`
- `KnowledgeSourceStatus`
- `KnowledgeSourceSynchronizationStatus`
- `KnowledgeRetrievalOutputMode` (use `BaseKnowledgeRetrievalOutputMode` instead)
- `KnowledgeRetrievalReasoningEffort` (use `BaseKnowledgeRetrievalReasoningEffort` instead)

### Knowledge Base Activity Records

- `BaseKnowledgeBaseRetrievalActivityRecord`
- `KnowledgeBaseRetrievalActivityRecord`
- `KnowledgeBaseSearchIndexActivityRecord`
- `KnowledgeBaseSearchIndexActivityArguments`
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
- `KnowledgeBaseSearchIndexFieldReference`
- `KnowledgeBaseMessageImageContentImage` (replaced by `KnowledgeBaseImageContent`)

### Other Removed Types

- `BaseKnowledgeSourceVectorizer`
- `KnowledgeSourceContentExtractionMode`
- `KnowledgeSourceIngestionPermissionOption`
- `KnowledgeSourceKind`
- `RemoteSharePointKnowledgeSourceParameters`
- `WebKnowledgeSourceParameters`
- `WebKnowledgeSourceDomains`
- `WebKnowledgeSourceDomain`

## Removed Methods

| Class               | Method                       |
| ------------------- | ---------------------------- |
| `SearchIndexClient` | `getKnowledgeSourceStatus()` |

## Client Options Base Type Change

All client options interfaces now extend `ClientOptions` from `@azure-rest/core-client` instead of `ExtendedCommonClientOptions` from `@azure/core-http-compat`:

- `SearchClientOptions`
- `SearchIndexClientOptions`
- `SearchIndexerClientOptions`
- `KnowledgeRetrievalClientOptions`

## Known Issue: Null Union Types

Many optional properties now include `| null` in their type signature. For example:

```typescript
// Before
authenticationKey?: string;

// After
authenticationKey?: string | null;
```

This is a known issue in the TypeSpec code generator and is being addressed upstream. It affects many properties across multiple interfaces but should not cause runtime issues.
