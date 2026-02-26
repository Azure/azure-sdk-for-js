# Release History

## 12.3.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

- Code is now generated from TypeSpec to align with the latest service definitions and code generation pipeline. [#37200](https://github.com/Azure/azure-sdk-for-js/pull/37200)

## 12.3.0-beta.1 (2025-11-17)

### Features Added

- Add support for elevated read for document retrieval operations [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Add support for new facet results: avg, min, max, cardinality [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Add new knowledge source kinds types: `web`, `remoteSharePoint`, `indexedSharePoint`, `indexedOneLake`.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added support for `sharepoint` data source type in `SearchIndexerDataSourceType`.
- Add support for indexers runtime [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Add support for purview in search indexes [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Add new property in service limits [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Add new `ContentUnderstandingSkill` in skills [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added `product` scoring function aggregation type in `ScoringFunctionAggregation`. [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added support for new Azure OpenAI models: `gpt-5`, `gpt-5-mini`, `gpt-5-nano` in `AzureOpenAIModelName`.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added `maxCumulativeIndexerRuntimeSeconds` property in `ServiceLimits` for runtime constraints.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added enhanced knowledge source configuration options:[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
  - `sourceDataFields`, `searchFields`, `semanticConfigurationName` in `SearchIndexKnowledgeSourceParameters`
  - `isADLSGen2`, `ingestionParameters` in `AzureBlobKnowledgeSourceParameters`
- Added optional parameter `x-ms-enable-elevated-read` for document retrieval operations with elevated permissions.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added support for partial content responses (HTTP 206) in knowledge base operations.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added `error` property in `KnowledgeBaseActivityRecord` for improved error tracking.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added enhanced knowledge source parameters: `includeReferences`, `includeReferenceSourceData`, `alwaysQuerySource`, `rerankerThreshold` in `SearchIndexKnowledgeSourceParams`.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Added new method `getKnowledgeSourceStatus` to search index client. [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)

### Breaking Changes
- Renamed KnowledgeAgent* -> KnowledgeBase* [#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Renamed Knowledge Agent to Knowledge Base across all APIs and models:[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
  - All `KnowledgeAgent*` classes renamed to `KnowledgeBase*` equivalents
  - API paths changed from `/agents` to `/knowledgebases`
  - All agent-related activity record types updated with new naming convention
- Removed deprecated Knowledge Agent configuration models:[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
  - `KnowledgeAgentOutputConfiguration`
  - `KnowledgeAgentRequestLimits`
  - `KnowledgeAgentModel`
  - `KnowledgeAgentModelKind`
  - `KnowledgeAgentAzureOpenAIModel`
- Removed properties from `KnowledgeSourceReference`:[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
  - `includeReferences`
  - `includeReferenceSourceData`
  - `alwaysQuerySource`
  - `maxSubQueries`
  - `rerankerThreshold`
- Removed `sourceDataSelect` property from `SearchIndexKnowledgeSourceParameters`.[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
- Removed properties from `AzureBlobKnowledgeSourceParameters`:[#36262](https://github.com/Azure/azure-sdk-for-js/pull/36262)
  - `identity`
  - `embeddingModel`
  - `chatCompletionModel`
  - `ingestionSchedule`
  - `disableImageVerbalization`

## 12.2.0-beta.3 (2025-10-07)

### Features Added

- Added API for listing index statistics [#34408](https://github.com/Azure/azure-sdk-for-js/pull/34408)
- Added semantic ranking based on scoring profile boosted score [#34408](https://github.com/Azure/azure-sdk-for-js/pull/34408)
- Added agentic retrieval functionality through `KnowledgeRetrievalClient` and `KnowledgeAgent` [#34408](https://github.com/Azure/azure-sdk-for-js/pull/34408)
- Added ACL functionality for indexer ingestion [#34408](https://github.com/Azure/azure-sdk-for-js/pull/34408)
- Added document-level access control [#34408](https://github.com/Azure/azure-sdk-for-js/pull/34408)
- Added support for vector fields in top-level complex fields [#34408](https://github.com/Azure/azure-sdk-for-js/pull/34408)
- Added `ChatCompletionSkill` as a variant of `WebAPISkill` [#34408](https://github.com/Azure/azure-sdk-for-js/pull/34408)
- Added `strictPostFilter` option for filtering on global top results [#35924](https://github.com/Azure/azure-sdk-for-js/pull/35924)

## 12.2.0-beta.2 (2024-11-25)

### Features Added

- Added generative query rewriting for semantic and vectorized text queries [#31792](https://github.com/Azure/azure-sdk-for-js/pull/31792)
  - Use the new `queryRewrites` field in `SemanticSearchOptions` and `VectorizedTextQuery`.
- Added hierarchical aggregation and facet filtering [#31792](https://github.com/Azure/azure-sdk-for-js/pull/31792)
  - `FacetResult` now includes a recursive `facets` field.
- Added configuration for storing vectors in their uncompressed state for rescoring [#31792](https://github.com/Azure/azure-sdk-for-js/pull/31792)
  - Configure through `VectorSearchCompression.rescoringOptions`.
- Added Markdown parsing mode for indexers [#31792](https://github.com/Azure/azure-sdk-for-js/pull/31792)
  - Configure through the `markdownParsingSubmode` and `markdownHeaderDepth` properties of `IndexingParametersConfiguration`.
- Added `DocumentIntelligenceLayoutSkill` [#31792](https://github.com/Azure/azure-sdk-for-js/pull/31792)
- Added subdomain billing for skillsets [#31792](https://github.com/Azure/azure-sdk-for-js/pull/31792)

### Bugs Fixed

- Fixed the type of `SearchResult.documentDebugInfo` to not erroneously describe it as an array [#31792](https://github.com/Azure/azure-sdk-for-js/pull/31792)

## 12.2.0-beta.1 (2024-09-25)

### Breaking Changes

- Added trivial API changes to align with the latest stable release [#31133](https://github.com/Azure/azure-sdk-for-js/pull/31133)

### Features Added

- `SplitSkill` can now be configured to use Azure OpenAI through `SplitSkill.AzureOpenAITokenizerParameters`
- Vector queries allow for filters to be overridden through `VectorQuery.filterOverride`
- Vector fields with compression now have a `VectorSearchCompression.truncationDimension` configuration option

## 12.1.0 (2024-07-24)

### Features Added

- Added support for text queries against vector fields [#30494](https://github.com/Azure/azure-sdk-for-js/pull/29597)
  - Create text queries against vector fields with the `VectorizedTextQuery` variant of `VectorQuery`. Such queries are supported by configuring the corresponding index field with a `VectorSearchVectorizer`. This configuration describes a delegate, which the service uses to generate vector embeddings for the query text.
- Added `AzureOpenAIEmbeddingSkill` to allow for `SearchIndexer`s to populate embedding fields at index-time.
- Added index configuration for vector quantization through `VectorSearchCompression`

### Bugs Fixed

- Improved serialization performance on large payloads [#29597](https://github.com/Azure/azure-sdk-for-js/pull/29597)

### Note

- This GA release introduces bug fixes, convenience improvements, and select features from prior beta releases. Except for the features listed in these release notes, no preview features are being pulled into this release.

## 12.1.0-beta.2 (2024-05-20)

### Breaking Changes

- Fixed an incorrect enum variant in `KnownVectorQueryKind` [#29601](https://github.com/Azure/azure-sdk-for-js/pull/29601)

### Bugs Fixed

- Fixed serialization performance on large payloads [#29597](https://github.com/Azure/azure-sdk-for-js/pull/29597)

### Features Added

- Enhance vector search support for image data [#29594](https://github.com/Azure/azure-sdk-for-js/pull/29594)
  - `AIServicesVisionVectorizer` leverages your Azure AI Vision deployment to generate embeddings from image data or text provided at query ime
  - `VisionVectorizeSkill` allows for indexers to do the same
  - Vector queries now have the ability to accept an image in the form of a URL or base64 encoded string
- Add support for enrichment of search results with your own ML model [#29594](https://github.com/Azure/azure-sdk-for-js/pull/29594)
  - `AzureMachineLearningVectorizer` leverages your Azure AI Foundry model deployment to generate embeddings for text provided at query time
- Add support for search indexers to use OneLake as a data source [#29594](https://github.com/Azure/azure-sdk-for-js/pull/29594)
- Add support for search score and vector similarity to be used as a threshold on the results of vector queries [#29594](https://github.com/Azure/azure-sdk-for-js/pull/29594)
- Add support for hybrid search [#29594](https://github.com/Azure/azure-sdk-for-js/pull/29594)

## 12.1.0-beta.1 (2024-02-06)

### Breaking Changes

- Refactor in alignment with v12 [#28576](https://github.com/Azure/azure-sdk-for-js/pull/28576)
  - Replace or replace the following types/properties
    - Use `ExhaustiveKnnAlgorithmConfiguration` in place of
      - `ExhaustiveKnnVectorSearchAlgorithmConfiguration`
    - Use `HnswAlgorithmConfiguration` in place of
      - `HnswVectorSearchAlgorithmConfiguration`
    - Use `PIIDetectionSkill.categories` in place of
      - `PIIDetectionSkill.piiCategories`
    - Use `QueryAnswer` in place of
      - `Answers`
      - `AnswersOption`
      - `QueryAnswerType`
    - Use `QueryAnswerResult` in place of
      - `AnswerResult`
    - Use `QueryCaption` in place of
      - `Captions`
        - `QueryCaptionType`
    - Use `QueryCaptionResult` in place of
      - `CaptionResult`
    - Use `SearchRequestOptions.VectorSearchOptions.filterMode` in place of
      - `SearchRequestOptions.vectorFilterMode`
    - Use `SearchRequestOptions.VectorSearchOptions.queries` in place of
      - `SearchRequestOptions.vectorQueries`
    - Use `SearchRequestOptions.semanticSearchOptions.answers` in place of
      - `SearchRequestOptions.answers`
    - Use `SearchRequestOptions.semanticSearchOptions.captions` in place of
      - `SearchRequestOptions.captions`
    - Use `SearchRequestOptions.semanticSearchOptions.configurationName` in place of
      - `SearchRequestOptions.semanticConfiguration`
    - Use `SearchRequestOptions.semanticSearchOptions.debugMode` in place of
      - `SearchRequestOptions.debugMode`
    - Use `SearchRequestOptions.semanticSearchOptions.errorMode` in place of
      - `SearchRequestOptions.semanticErrorHandlingMode`
    - Use `SearchRequestOptions.semanticSearchOptions.maxWaitInMilliseconds` in place of
      - `SearchRequestOptions.semanticMaxWaitInMilliseconds`
    - Use `SearchRequestOptions.semanticSearchOptions.semanticFields` in place of
      - `SearchRequestOptions.semanticFields`
    - Use `SearchRequestOptions.semanticSearchOptions.semanticQuery` in place of
      - `SearchRequestOptions.semanticQuery`
    - Use `SemanticErrorMode` in place of
      - `SemanticErrorHandlingMode`
    - Use `SemanticErrorReason` in place of
      - `SemanticPartialResponseReason`
    - Use `SemanticPrioritizedFields` in place of
      - `PrioritizedFields`
    - Use `SemanticSearch` in place of
      - `SemanticSettings`
    - Use `SemanticSearchResultsType` in place of
      - `SemanticPartialResponseType`
    - Use `SimpleField.vectorSearchProfileName` in place of
      - `SimpleField.vectorSearchProfile`
    - Use `VectorSearchProfile.algorithmConfigurationName` in place of
      - `VectorSearchProfile.algorithm`
  - Narrow some enum property types to the respective string literal union
    - `BlobIndexerDataToExtract`
    - `BlobIndexerImageAction`
    - `BlobIndexerParsingMode`
    - `BlobIndexerPDFTextRotationAlgorithm`
    - `CustomEntityLookupSkillLanguage`
    - `EntityCategory`
    - `EntityRecognitionSkillLanguage`
    - `ImageAnalysisSkillLanguage`
    - `ImageDetail`
    - `IndexerExecutionEnvironment`
    - `KeyPhraseExtractionSkillLanguage`
    - `OcrSkillLanguage`
    - `RegexFlags`
    - `SearchIndexerDataSourceType`
    - `SentimentSkillLanguage`
    - `SplitSkillLanguage`
    - `TextSplitMode`
    - `TextTranslationSkillLanguage`
    - `VisualFeature`
  - Remove `KnownLexicalAnalyzerName` as a duplicate of `KnownAnalyzerNames`
  - Remove `KnownCharFilterName` as a duplicate of `KnownCharFilterNames`
  - Remove `KnownTokenFilterName` as a duplicate of `KnownTokenFilterNames`
  - Remove `SearchRequest` as a duplicate of `SearchRequestOptions`

### Features Added

- Add vector compression [#28772](https://github.com/Azure/azure-sdk-for-js/pull/28772)
  - Service-side scalar quantization of your vector data
  - Optional reranking with full-precision vectors
  - Optional oversampling of documents when reranking compressed vectors
- Add `Edm.Half`, `Edm.Int16`, and `Edm.SByte` vector spaces [#28772](https://github.com/Azure/azure-sdk-for-js/pull/28772)
- Add non-persistent vector usage through `SimpleField.stored` [#28772](https://github.com/Azure/azure-sdk-for-js/pull/28772)
- Expose the internal HTTP pipeline to allow users to send raw requests with it

## 12.0.0 (2023-11-13)

### Features Added

- Added support for vector search
- Added support for semantic search and reranking
- New `SearchIndexerSkill`s
  - `EntityLinkingSkill`
  - `EntityRecognitionSkillV3`
  - `PIIDetectionSkill`
  - `SentimentSkillV3`

### Breaking Changes

- Minor type changes
  - All nullable optional properties can no longer be assigned `null`. Use `undefined` instead.
  - Updated specific property types for enhanced precision, replacing `any` with more defined types.
- Narrowed some enum property types to the respective string literal union
  - `BlobIndexerDataToExtract`
  - `BlobIndexerImageAction`
  - `BlobIndexerParsingMode`
  - `BlobIndexerPDFTextRotationAlgorithm`
  - `CustomEntityLookupSkillLanguage`
  - `EntityCategory`
  - `EntityRecognitionSkillLanguage`
  - `ImageAnalysisSkillLanguage`
  - `ImageDetail`
  - `IndexerExecutionEnvironment`
  - `KeyPhraseExtractionSkillLanguage`
  - `OcrSkillLanguage`
  - `RegexFlags`
  - `SearchIndexerDataSourceType`
  - `SentimentSkillLanguage`
  - `SplitSkillLanguage`
  - `TextSplitMode`
  - `TextTranslationSkillLanguage`
  - `VisualFeature`
- Removed `KnownLexicalAnalyzerName` as a duplicate of `KnownAnalyzerNames`
- Removed `KnownCharFilterName` as a duplicate of `KnownCharFilterNames`
- Removed `KnownTokenFilterName` as a duplicate of `KnownTokenFilterNames`
- Removed `SearchRequest` as a duplicate of `SearchRequestOptions`
- Added type narrowing for response types based on `select`ed fields
- For types that are generic on a model type, the model type is now constrained to extend `object`

### Other Changes

- Deprecated `apiVersion` in favor of `serviceVersion` in clients:
  - `SearchClient`
  - `SearchIndexClient`
  - `SearchIndexerClient`

### Note

- This GA release introduces bug fixes, convenience improvements, and select features from prior beta releases. Except for the features listed in these release notes, no preview features are being pulled into this release.

## 12.0.0-beta.4 (2023-10-11)

### Features Added

- Added support for text based vector queries backed by a vectorizer [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)
- Added exhaustive k-nearest neighbors search algorithm for vector search [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)
- Added `SearchOptions.semanticQuery`, which allows for using an independent text query for semantic search features [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)
- Added support for `AzureOpenAIEmbeddingSkill`, which generates text embeddings through the Azure OpenAI service. [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)
- Added `SearchIndexerSkillset.IndexProjections`, which specifies additional projections to secondary search indexes. [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)

### Breaking Changes

- `SearchOptions.vector` has been abstracted into `SearchOptions.vectorQueries` [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)
- `SearchField.vectorSearchConfiguration` has been abstracted into `SearchField.vectorSearchProfile` [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)
- `VectorSearch.algorithmConfiguration` has been renamed to `VectorSearch.algorithms` [#27338](https://github.com/Azure/azure-sdk-for-js/pull/27338)

## 11.3.3 (2023-09-27)

### Bugs Fixed

- Fix some `SearchIndex` fields being improperly serialized.[#27238](https://github.com/Azure/azure-sdk-for-js/pull/27238)

## 12.0.0-beta.3 (2023-08-10)

### Features Added

- Add multi-vector search. [#26765](https://github.com/Azure/azure-sdk-for-js/pull/26765)

### Breaking Changes

- Change vector option `SearchOptions.vector` to array of vectors option
  `SearchOptions.vectors`. [#26765](https://github.com/Azure/azure-sdk-for-js/pull/26765)

## 12.0.0-beta.2 (2023-07-11)

### Features Added

- Add vector search. [#26069](https://github.com/Azure/azure-sdk-for-js/pull/26069)

### Bugs Fixed

- Fix compiler errors when using `SearchClient` without defined model. [#25999](https://github.com/Azure/azure-sdk-for-js/pull/25999)
- Fix all clients adding one or more duplicate user agents. [#26298](https://github.com/Azure/azure-sdk-for-js/pull/26298)
- Fix serializerOptions and onResponse options for SearchClient methods. [#26327](https://github.com/Azure/azure-sdk-for-js/pull/26327)

## 11.3.2 (2023-06-06)

### Bugs Fixed

- Fix ISO8601 deserialization. [#25802](https://github.com/Azure/azure-sdk-for-js/pull/25802)
- Fix all clients adding one or more duplicate user agents. [#26298](https://github.com/Azure/azure-sdk-for-js/pull/26298)
- Fix `serializerOptions` and `onResponse` options for SearchClient methods. [#26327](https://github.com/Azure/azure-sdk-for-js/pull/26327)
- Fix discarded user-defined `onResponse` callback. [#24479](https://github.com/Azure/azure-sdk-for-js/pull/24479)
- Fix type error on `select` statement with nested fields. [#26407](https://github.com/Azure/azure-sdk-for-js/pull/26407)

### Other Changes

- Add deprecation warning to `EntityRecognitionSkill` and `SentimentSkill` [#25686](https://github.com/Azure/azure-sdk-for-js/pull/25686)

## 12.0.0-beta.1 (2023-05-09)

### Features Added

- Enable `OcrSkill` and `ImageAnalysisSkill`. [#23495](https://github.com/Azure/azure-sdk-for-js/pull/23495)

### Breaking Changes

- Update `SearchIndexerDataNoneIdentity.odatatype`. [#23495](https://github.com/Azure/azure-sdk-for-js/pull/23495)
- Fix `SearchClient.getDocument` returning documents that contain fields which were not selected [#23627](https://github.com/Azure/azure-sdk-for-js/pull/23627)
- Add type narrowing to returned documents [#23627](https://github.com/Azure/azure-sdk-for-js/pull/23627)
  - Add breaking type parameters to these types:
    - `AutocompleteOptions`
    - `AutocompleteRequest`
    - `GetDocumentOptions`
    - `SearchIterator`
    - `SearchOptions`
    - `SearchRequestOptions`
    - `SuggestOptions`
    - `SuggestRequest`

### Bugs Fixed

- Allow nested field names to be specified in `select` and `searchFields` options [#23627](https://github.com/Azure/azure-sdk-for-js/pull/23627)
  - Affects these types:
    - `AutocompleteRequest`
    - `SearchRequestOptions`
    - `SuggestRequest`
- Fix discarded user-defined `onResponse` callback [#24479](https://github.com/Azure/azure-sdk-for-js/pull/24479)
- Fix ISO8601 deserialization [#25801](https://github.com/Azure/azure-sdk-for-js/pull/25801)

### Other Changes

- Add `object` type constraint to `IndexDocumentsClient` and its dependencies [#23627](https://github.com/Azure/azure-sdk-for-js/pull/23627)

  - Affects these types:
    - `IndexDocumentsClient`
    - `SearchClient`
    - `SearchDocumentsPageResult`
    - `SearchDocumentsResult`
    - `SearchIndexClient.getSearchClient`
    - `SearchIndexingBufferedSender`
    - `SearchResult`
    - `SuggestDocumentsResult`
    - `SuggestResult`

- Add deprecation warning to `EntityRecognitionSkill` and `SentimentSkill` [#25686](https://github.com/Azure/azure-sdk-for-js/pull/25686)

## 11.3.1 (2022-11-18)

### Bugs Fixed

- Addressed an issue where `similarity` settings on indexes wouldn't populate correctly. See [#23811](https://github.com/Azure/azure-sdk-for-js/issues/23811)

## 11.3.0 (2022-09-06)

### Features Added

- Enabled national cloud support for Azure Search SDK. Please refer [#22887](https://github.com/Azure/azure-sdk-for-js/pull/22887) for further details.
- Support for TokenCredential has been added. With this addition, the Search SDK supports authentication via AAD.

### Bugs Fixed

- Converted the complex fields correctly within the Search Fields. Please refer [#16489](https://github.com/Azure/azure-sdk-for-js/issues/16489) for more details.
- Fixed the typos `anayzerName` to `analyzerName` in `convertFieldsToPublic` method of `serviceUtils.ts`.
- Fixed the issue with the presence of recursive structure while uploading documents. Please refer [#15656](https://github.com/Azure/azure-sdk-for-js/issues/15656) for further details.

### Note

- This GA release includes AAD with multi-cloud support and all the bug fixes since the last [11.2.0](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md#1120-2021-06-08) GA release. Other preview features and breaking changes from the [11.3.0-beta.1](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md#1130-beta1-2021-07-07) to [11.3.0-beta.8](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md#1130-beta8-unreleased) releases are not included in this GA release.

- Add deprecation warning to `EntityRecognitionSkill` and `SentimentSkill` [#25686](https://github.com/Azure/azure-sdk-for-js/pull/25686)

## 11.3.0-beta.8 (2022-09-06)

- Added `core-http-compat` dependency
- Enabled national cloud support for Azure Search SDK. Please refer [#22887](https://github.com/Azure/azure-sdk-for-js/pull/22887) for further details.

## 11.3.0-beta.7 (2022-03-08)

### Features Added

- Added new APIs `createAlias`, `createOrUpdateAlias`, `deleteAlias`, `getAlias` & `listAliases` operations to the `SearchIndexClient`.

## 11.3.0-beta.6 (2022-02-08)

### Features Added

- Added new type of SearchIndexer skill - `AzureMachineLearningSkill`. Please refer [#20183](https://github.com/Azure/azure-sdk-for-js/pull/20183) for further details.

### Other Changes

- Deprecated `SearchClientOptions.apiVersion` in favor of `SearchClientOptions.serviceVersion`.
  - `apiVersion` will continue to be supported in version 11.x; however, customers are encouraged to migrate to `serviceVersion` instead which is more consistent with the rest of our client libraries.

## 11.3.0-beta.5 (2021-11-09)

### Features Added

- Added `semanticConfiguration` property to `SearchRequest` object.
- Several new languages are added to the `KnownQueryLanguage` object.
- Added `semanticSettings` property to `SearchIndex` object.

### Breaking Changes

- Renamed `IndexerCurrentState` property to `IndexerState` property.
- Renamed `AllDocsInitialChangeTrackingState` property to `AllDocumentsInitialChangeTrackingState` property.
- Renamed `AllDocsFinalChangeTrackingState` property to `AllDocumentsFinalChangeTrackingState` property.
- Renamed `ResetDocsInitialChangeTrackingState` property to `ResetDocumentsInitialChangeTrackingState` property.
- Renamed `ResetDocsFinalChangeTrackingState` property to `ResetDocumentsFinalChangeTrackingState` property.
- Renamed `SkillNames` property to `ResetSkillsOptions` (with a `SkillNames` property)
- Renamed `ResetDocs` method to `ResetDocuments` in the SDK client.

### Bugs Fixed

- Fixed the issue with the presence of recursive structure while uploading documents. Please refer [#15656](https://github.com/Azure/azure-sdk-for-js/issues/15656) for further details.

## 11.3.0-beta.4 (2021-10-05)

### Features Added

- Added properties `currentState` & `statusDetail` to the `IndexerExecutionResult` object.
- Added operations `resetDocs` & `resetSkills` to the `SearchIndexerClient` class.

### Breaking Changes

- Changed property `ignoreResetRequirements` to `skipIndexerResetRequirementForCache` in `CreateorUpdateDataSourceConnectionOptions`, `CreateorUpdateIndexerOptions` & `CreateOrUpdateSkillsetOptions` objects.
- Changed the type of `answers` property from `Answers` to `QueryAnswerType`, in the `SearchRequest` object.
- Changed the type of `captions` property from `Captions` to `QueryCaptionType`, in the `SearchRequest` object.
- Changed the type of `speller` property from `Speller` to `QuerySpellerType`, in the `SearchRequest` object.
- Changed the underlying dependency of the SDK from `core-http` to `core-rest-pipeline` package.

## 11.3.0-beta.3 (2021-09-07)

### Features Added

- Added a new property `normalizerName` to the `AnalyzeRequest` object.
- Added 2 new properties `captions` & `semanticFields` to the `SearchRequestOptions` object.

## 11.3.0-beta.2 (2021-08-10)

### Features Added

- Added a new parameter `ignoreResetRequirements` for the `createOrUpdate` operation of Data Sources.
- Added new parameters `ignoreResetRequirements` & `disableCacheReprocessingChangeDetection` for the `createOrUpdate` operation of Indexers and Skillsets.

### Bugs Fixed

- Converted the complex fields correctly within the Search Fields. Please refer [#16489](https://github.com/Azure/azure-sdk-for-js/issues/16489) for more details.
- Fixed the typos `anayzerName` to `analyzerName` and `normalizerNames` to `normalizerName` in `convertFieldsToPublic` method of `serviceUtils.ts`.

### Other Changes

- Removed the `| null` from the definitions of the optional values. Please refer [#16694](https://github.com/Azure/azure-sdk-for-js/pull/16694) for more details.

## 11.3.0-beta.1 (2021-07-07)

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Regenerated the search SDK with the latest swaggers that includes the following changes:

  - Support for `TokenCredential` has been added. With this addition, the Search SDK supports authentication via AAD.
  - Identity types - `SearchIndexerDataNoneIdentity` & `SearchIndexerDataUserAssignedIdentity` have been added.
  - The following new skills have been added:
    - SentimentSkill(V3)
    - EntityLinkingSkill(V3)
    - EntityRecognitionSkill(V3)
    - PIIDetectionSkill
  - A new property `lineEnding` has been added to the skill `OcrSkill`.

## 11.2.0 (2021-06-08)

The list of changes in 11.2.0 since 11.1.0 & 11.2.0-beta.2 are provided below:

**Changes since 11.1.0**

- Added support for Knowledge Store feature through the new `SearchIndexerKnowledgeStore` in the `SearchIndexerSkillset` object.
- The `skillsetCounter` property in `ServiceCounters` object has been made optional.
- Added Support for new datasource `adlsgen2`. Please refer [#14620](https://github.com/Azure/azure-sdk-for-js/pull/14620) for further details.
- Added Support for new skills such as `CustomEntityLookupSkill`, `DocumentExtractionSkill`, etc. Please refer [#14620](https://github.com/Azure/azure-sdk-for-js/pull/14620) for further details.

**Changes since 11.2.0-beta.2**

- Removed Support for Semantic Search and introduced new properties in `SearchOptions`, `SearchRequest`, `SearchResult` and `SearchDocumentsResult` objects.
- Removed Support for normalizers `LexicalNormalizer` & `CustomNormalizer`. Please refer [#14620](https://github.com/Azure/azure-sdk-for-js/pull/14620) for further details.

## 11.2.0-beta.2 (2021-05-11)

- Added Support for Semantic Search and introduced new properties in `SearchOptions`, `SearchRequest`, `SearchResult` and `SearchDocumentsResult` objects.
- Added support for Knowledge Store feature through the new `SearchIndexerKnowledgeStore` in the `SearchIndexerSkillset` object.
- The `skillsetCounter` property in `ServiceCounters` object has been made optional.

## 11.2.0-beta.1 (2021-04-06)

- Added Support for new skills such as `CustomEntityLookupSkill`, `DocumentExtractionSkill`, etc. Please refer [#14620](https://github.com/Azure/azure-sdk-for-js/pull/14620) for further details.
- Added Support for new datasource `adlsgen2`. Please refer [#14620](https://github.com/Azure/azure-sdk-for-js/pull/14620) for further details.
- Added Support for normalizers `LexicalNormalizer` & `CustomNormalizer`. Please refer [#14620](https://github.com/Azure/azure-sdk-for-js/pull/14620) for further details.

## 11.1.0 (2021-02-11)

- The list of changes in 11.1.0 since 11.0.3 & 11.1.0-beta.2 are provided below:

**Changes since 11.0.3**

- Added Batching ability to the search SDK. The `SearchIndexingBufferedSender` class enables the user to perform indexing documents in batch mode. There are several user configurable properties such as `autoFlush`, `flushWindowInMs`, `throttlingDelayInMs`, etc.
- The types `BlobIndexerDataToExtract`, `BlobIndexerImageAction`, `BlobIndexerParsingMode`, `BlobIndexerPDFTextRotationAlgorithm` have changed from union of string literals to string. This is to support the service definition for these types to be extensible enums. The documentation on methods that use these have been updated with known values that can be used for these types.

**Changes since 11.1.0-beta.2**

- [Breaking] Hidden the constructor of `SearchIndexingBufferedSender` and made it to an interface. Please refer [#11785](https://github.com/Azure/azure-sdk-for-js/pull/11785) for further details.
- Added `encryptionKey` property to `SearchIndexerDataSource`, `SearchIndexer` and `SearchIndexerSkillSet` objects. Please refer [#12275](https://github.com/Azure/azure-sdk-for-js/pull/12275) for further details.
- Added user configurable properties such as `flushWindowInMs`, `initialBatchActionCount`, `maxRetries`, etc to the `SearchIndexingBufferedSenderOptions` object. Please refer [#12297](https://github.com/Azure/azure-sdk-for-js/pull/12297) for further details.

## 11.1.0-beta.1 (2020-10-05)

- Added Batching ability to the search SDK. Please refer [#11544](https://github.com/Azure/azure-sdk-for-js/pull/11544) for further details.
- Regenerated the search SDK using the latest swaggers. Please refer [#11533](https://github.com/Azure/azure-sdk-for-js/pull/11533) for further details.
- Fixed the testcases to ensure success in CI. Please refer [#11518](https://github.com/Azure/azure-sdk-for-js/pull/11518) for further details.
- Added more test cases for odata scenario. Please refer [#11321](https://github.com/Azure/azure-sdk-for-js/pull/11321) for further details.

## 11.0.3 (2020-08-04)

- Fixed the parented tracing span in the searchClient.search API. Please refer [#10442](https://github.com/Azure/azure-sdk-for-js/issues/10442) for further details.

## 11.0.2 (2020-07-31)

- Fixed the samples in the Readme File. Please refer [#10383](https://github.com/Azure/azure-sdk-for-js/pull/10383) for further details.

## 11.0.1 (2020-07-20)

- [BugFix] Set the correct continuation token in the search documrnts API. Please refer [#10146](https://github.com/Azure/azure-sdk-for-js/pull/10146) for further details.

## 11.0.0 (2020-07-06)

- Set `ConnectionString` value to `<unchanged>` in `SearchIndexerDataSourceConnection`, if the value is not set by the user.
- [Breaking] In Suggest API & Search API return values, a new property called `document` is introduced. All user-defined fields are moved inside this `document` property.
- [Breaking] In `analyzeText` API, the `text` parameter is moved from method level to inside `options` bag.
- [Breaking] In `search` API, `includeTotalResultCount` property is renamed to `includeTotalCount`.
- [Breaking] In `ServiceCounters`, the `skillsetCounter` property has been removed.
- [Breaking] Modified the names of several properties. Please refer [#9321](https://github.com/Azure/azure-sdk-for-js/issues/9321) for a detailed list of renames.

## 1.0.0-preview.4 (2020-06-08)

- [Breaking] Changed `ListIndexes` operation to a pageable operation.
- [Breaking] Added `onlyIfUnchanged` parameter for CreateOrUpdate and Delete operations.
- [Breaking] Removed `$select` property for the List operations.
- [Breaking] Refactored `SearchServiceClient` and split it to `SearchIndexClient` and `SearchIndexerClient` and changed `SearchIndexClient` class to `SearchClient` class.
- [Breaking] Moved non-optional parameters from options bag.
- [Breaking] Renamed `countDocuments` method to `getDocumentsCount` method.
- [Breaking] In `search` method, moved the `searchText` parameter from the options bag to method parameter.
- [Breaking] In `indexDocuments` method, the options parameter is renamed to `IndexDocumentsOptions`.
- [Breaking] Modified `deleteDocuments` method to get documents as a parameter.
- [Breaking] In `getIndexStatistics` method, renamed the return type from `GetIndexStatisticsResult` to `SearchIndexStatistics`.
- [Breaking] In `getServiceStatistics` method, renamed the return type from `ServiceStatistics` to `SearchServiceStatistics`.
- [Breaking] Modified `DataSource` model name to `DataSourceConnection`. Changed all references in the method names, parameters, etc.
- [Breaking] Renamed `SimpleDataType` model to `SearchFieldDataType` model.
- [Breaking] Modified the names of several models & parameters. Please refer [#8984](https://github.com/Azure/azure-sdk-for-js/issues/8984), [#9037](https://github.com/Azure/azure-sdk-for-js/issues/9037) and [#8383](https://github.com/Azure/azure-sdk-for-js/issues/8383) for a detailed list of renames.
- Added separate methods for getting just names such as `listIndexesNames`, `listSynonymMapsNames`, etc.
- Added `getSearchClient` method to the `SearchIndexClient` class.

## 1.0.0-preview.3 (2020-05-05)

- Added support for Indexers API (Create, Get, List, etc.)
- Added support for Datasources API.(Create, Get, List, etc.)
- Fixed a bug where GeographyPoints were serialized incorrectly causing latitude and longitude to be flipped.

## 1.0.0-preview.2 (2020-04-06)

- [Breaking] Package renamed to `@azure/search-documents` and version number reset to `1.0.0-preview.2`.
- Support for index management operations using the `SearchServiceClient`.
- [Breaking] `indexDocuments` on `SearchIndexClient` now takes an `IndexDocumentsBatch` object instead of a raw action array. This new type helps compose an array of actions to be performed on the index.
- [Breaking] In `SearchIndexClient`, removed options `mergeIfExists` and `uploadIfNotExists` on `uploadDocuments` and `mergeDocuments` and replaced them with new helper `mergeOrUploadDocuments`.
- The type `IndexAction` was renamed to `IndexDocumentsAction`.
- [Breaking] Removed `SearchApiKeyCredential` and replaced with `AzureKeyCredential`.
- [Breaking] Search results accessed `byPage` now have an opaque `continuationToken` in place of `nextLink` and `nextPageParameters`.

## 11.0.0-preview.1 (2020-03-09)

- Initial implementation of the data-plane Cognitive Search Client. The version number starts at 11 to align with client libraries in other languages.
- This first preview has support for document operations on an index, such as querying and document management.
