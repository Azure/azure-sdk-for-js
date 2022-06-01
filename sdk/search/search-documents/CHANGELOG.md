# Release History

## 11.3.0-beta.8 (unreleased)

Added `core-http-compat` dependency

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
