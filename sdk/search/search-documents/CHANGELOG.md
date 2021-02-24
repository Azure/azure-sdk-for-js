# Release History

## 11.1.1 (Unreleased)

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

## 11.0.0-preview.1 (2020-03-09)

- Initial implementation of the data-plane Cognitive Search Client. The version number starts at 11 to align with client libraries in other languages.
- This first preview has support for document operations on an index, such as querying and document management.

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
