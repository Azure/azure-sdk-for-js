# Breaking Changes for @azure/search-documents v13

<!-- dev-tool snippets ignore -->

This document describes the breaking changes introduced in `@azure/search-documents` v13. This major version migrates the package from hand-written wrappers around generated code to using TypeSpec-generated types directly, significantly reducing the package's maintenance surface area.

## Property Renames

### `hidden` replaced by `retrievable` on `SearchField`

The `hidden` property on `SearchField` has been removed. Use `retrievable` instead, which is the property name used by the service. Note the boolean inversion: `hidden: true` is equivalent to `retrievable: false`.

```ts
// Before (v12)
const field: SearchField = {
  name: "internalNotes",
  type: "Edm.String",
  hidden: true,
};

// After (v13)
const field: SearchField = {
  name: "internalNotes",
  type: "Edm.String",
  retrievable: false,
};
```

### `vaultUrl` renamed to `vaultUri` on `SearchResourceEncryptionKey`

```ts
// Before (v12)
const key: SearchResourceEncryptionKey = {
  keyName: "myKey",
  vaultUrl: "https://my-keyvault.vault.azure.net",
};

// After (v13)
const key: SearchResourceEncryptionKey = {
  keyName: "myKey",
  vaultUri: "https://my-keyvault.vault.azure.net",
};
```

### `etag` renamed to `eTag`

The `etag` property has been renamed to `eTag` on all resource types that support it. This affects `SearchIndex`, `SynonymMap`, `SearchIndexer`, `SearchIndexerDataSourceConnection`, `SearchIndexerSkillset`, and alias types.

```ts
// Before (v12)
const index = await client.getIndex("myIndex");
console.log(index.etag);

// After (v13)
const index = await client.getIndex("myIndex");
console.log(index.eTag);
```

### `__actionType` renamed to `actionType` on `IndexDocumentsAction`

```ts
// Before (v12)
const action: IndexDocumentsAction<MyDoc> = {
  __actionType: "upload",
  id: "1",
  content: "hello",
};

// After (v13)
const action: IndexDocumentsAction<MyDoc> = {
  actionType: "upload",
  id: "1",
  content: "hello",
};
```

## Removed: `SearchIndexingBufferedSender`

The `SearchIndexingBufferedSender` class and all associated types have been removed entirely. This includes:

- `SearchIndexingBufferedSender`
- `IndexDocumentsClient`
- `SearchIndexingBufferedSenderOptions`
- `SearchIndexingBufferedSenderUploadDocumentsOptions`
- `SearchIndexingBufferedSenderMergeDocumentsOptions`
- `SearchIndexingBufferedSenderMergeOrUploadDocumentsOptions`
- `SearchIndexingBufferedSenderDeleteDocumentsOptions`
- `SearchIndexingBufferedSenderFlushDocumentsOptions`
- `DEFAULT_BATCH_SIZE`
- `DEFAULT_FLUSH_WINDOW`
- `DEFAULT_RETRY_COUNT`

**Migration**: Use `SearchClient.indexDocuments` or `IndexDocumentsBatch` directly to manage document indexing. For batching, implement application-level batching logic.

## Removed: `SimpleField` / `ComplexField` Discriminated Union

The custom `SimpleField` and `ComplexField` types have been removed. The `SearchField` type is now the generated type directly, which is a single interface with all properties as optional (except `name` and `type`).

The `ComplexDataType` type alias and `isComplexField()` helper function have also been removed.

```ts
// Before (v12) - discriminated union
const simpleField: SimpleField = {
  name: "title",
  type: "Edm.String",
  searchable: true,
  filterable: true,
};
const complexField: ComplexField = {
  name: "address",
  type: "Edm.ComplexType",
  fields: [{ name: "city", type: "Edm.String" }],
};

// After (v13) - single SearchField type
const simpleField: SearchField = {
  name: "title",
  type: "Edm.String",
  searchable: true,
  filterable: true,
};
const complexField: SearchField = {
  name: "address",
  type: "Edm.ComplexType",
  fields: [{ name: "city", type: "Edm.String" }],
};
```

> **Important**: In v12, the `SimpleField` type defaulted `searchable`, `filterable`, `sortable`, and `facetable` to `false` when omitted. In v13, these properties are no longer set by the SDK, so the **service defaults** apply instead — the service defaults these to `true` for simple fields. If you previously relied on the SDK setting these to `false`, you must now explicitly set them:
>
> ```ts
> // v12: these were implicitly false
> const field: SimpleField = { name: "id", type: "Edm.String", key: true };
>
> // v13: explicitly set to false if that's the desired behavior
> const field: SearchField = {
>   name: "id",
>   type: "Edm.String",
>   key: true,
>   filterable: false,
>   sortable: false,
>   facetable: false,
> };
> ```

## Removed: Deprecated Skill Types

The following types related to [deprecated skills](https://learn.microsoft.com/azure/search/cognitive-search-skill-deprecated) have been removed from the public API:

- `EntityRecognitionSkill` — use `EntityRecognitionSkillV3` instead
- `SentimentSkill` — use `SentimentSkillV3` instead
- `EntityCategory` (type alias) — use `string` instead
- `EntityRecognitionSkillLanguage` (type alias) — use `string` instead
- `SentimentSkillLanguage` (type alias) — use `string` instead
- `KnownEntityCategory` (enum)
- `KnownEntityRecognitionSkillLanguage` (enum)
- `KnownSentimentSkillLanguage` (enum)

## Simplified Generics

The complex generic type system for narrowing search results based on `select` fields has been removed. This was the largest ergonomic change in v13.

### Removed utility types

The following types are no longer exported:

- `SelectFields<TModel>`
- `SelectArray<TFields>`
- `SearchFieldArray<TModel>`
- `NarrowedModel<TModel, TFields>`
- `SuggestNarrowedModel<TModel, TFields>`
- `SearchPick<TModel, TFields>`
- `ExtractDocumentKey<TModel>`
- `ExcludedODataTypes`
- `UnionToIntersection<T>`

### Generic parameter changes

Types that previously had `<TModel, TFields>` generic parameters now only have `<TModel>` (or no generic parameter at all):

| Type | Before | After |
| --- | --- | --- |
| `SearchOptions` | `SearchOptions<TModel, TFields>` | `SearchOptions` |
| `SuggestOptions` | `SuggestOptions<TModel, TFields>` | `SuggestOptions` |
| `AutocompleteOptions` | `AutocompleteOptions<TModel>` | `AutocompleteOptions` |
| `GetDocumentOptions` | `GetDocumentOptions<TModel, TFields>` | `GetDocumentOptions` |
| `SearchResult` | `SearchResult<TModel, TFields>` | `SearchResult<TModel>` |
| `SearchDocumentsResult` | `SearchDocumentsResult<TModel, TFields>` | `SearchDocumentsResult<TModel>` |
| `SearchDocumentsPageResult` | `SearchDocumentsPageResult<TModel, TFields>` | `SearchDocumentsPageResult<TModel>` |
| `SuggestResult` | `SuggestResult<TModel, TFields>` | `SuggestResult<TModel>` |
| `SuggestDocumentsResult` | `SuggestDocumentsResult<TModel, TFields>` | `SuggestDocumentsResult<TModel>` |
| `SearchIterator` | `SearchIterator<TModel, TFields>` | `SearchIterator<TModel>` |
| `SearchRequestOptions` | `SearchRequestOptions<TModel, TFields>` | `SearchRequestOptions` |
| `SuggestRequest` | `SuggestRequest<TModel, TFields>` | `SuggestRequest` |
| `AutocompleteRequest` | `AutocompleteRequest<TModel>` | `AutocompleteRequest` |
| `VectorQuery` | `VectorQuery<TModel>` | `VectorQuery` |
| `VectorizedQuery` | `VectorizedQuery<TModel>` | `VectorizedQuery` |
| `VectorizableTextQuery` | `VectorizableTextQuery<TModel>` | `VectorizableTextQuery` |
| `VectorizableImageUrlQuery` | `VectorizableImageUrlQuery<TModel>` | `VectorizableImageUrlQuery` |
| `VectorizableImageBinaryQuery` | `VectorizableImageBinaryQuery<TModel>` | `VectorizableImageBinaryQuery` |
| `VectorSearchOptions` | `VectorSearchOptions<TModel>` | `VectorSearchOptions` |

### Property type changes due to simplified generics

- `select` and `selectedFields` are now `string[]` instead of `SelectArray<TFields>`
- `searchFields` and `fields` are now `string[]` instead of `SearchFieldArray<TModel>`
- `SearchResult.document` is now `TModel` instead of `NarrowedModel<TModel, TFields>`
- `SuggestResult.document` is now `TModel` instead of `SuggestNarrowedModel<TModel, TFields>`
- `SearchResult.highlights` key type is now `keyof TModel` instead of `SelectFields<TModel>`

```ts
// Before (v12) - compile-time narrowing based on select
const results = await client.search("hotels", {
  select: ["name", "rating"] as const,
});
for await (const result of results.results) {
  // result.document was narrowed to { name: string; rating: number }
}

// After (v13) - TModel is returned as-is
const results = await client.search("hotels", {
  select: ["name", "rating"],
});
for await (const result of results.results) {
  // result.document is TModel (the full type)
}
```

## Renamed Types

| Before (v12) | After (v13) |
| --- | --- |
| `AzureOpenAIParameters` | `AzureOpenAIVectorizerParameters` |
| `WebApiParameters` | `WebApiVectorizerParameters` |
| `AzureMachineLearningVectorizerParameters` | `AzureMachineLearningParameters` |
| `SearchIndexAlias` | `SearchAlias` |
| `AnalyzeRequest` | `AnalyzeTextParameters` (or use `AnalyzeTextOptions` for the options bag) |
| `WebApiSkills` | Removed — use `WebApiSkill` instead |

## Removed Types

The following additional types have been removed:

| Removed Type | Replacement |
| --- | --- |
| `BaseKnowledgeSource` | Use `KnowledgeSource` (the union type) |
| `BaseVectorSearchAlgorithmConfiguration` | Use `VectorSearchAlgorithmConfiguration` (the union type) |
| `BaseVectorSearchVectorizer` | Use `VectorSearchVectorizer` (the union type) |
| `BaseAzureMachineLearningVectorizerParameters` | Use `AzureMachineLearningParameters` |
| `KeyAuthAzureMachineLearningVectorizerParameters` | Use `AzureMachineLearningParameters` |
| `NoAuthAzureMachineLearningVectorizerParameters` | Use `AzureMachineLearningParameters` |
| `TokenAuthAzureMachineLearningVectorizerParameters` | Use `AzureMachineLearningParameters` |
| `GetSynonymMapsOptions` | Use `OperationOptions` directly |
| `ListSynonymMapsOptions` | Use `OperationOptions` directly |

## Option Types Now Use Generated Types

Many option types (e.g., `CreateIndexOptions`, `GetIndexOptions`, `ListIndexesOptions`) are now re-exported from the generated client code rather than being hand-defined as `OperationOptions`. In most cases the shape is compatible, but the type identity has changed. If you were extending these types, you may need to update your code.
