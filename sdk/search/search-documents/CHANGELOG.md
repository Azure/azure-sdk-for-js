# Release History

## 1.0.0-preview.4 (2020-06-08)

- [Breaking] Refactored `SearchServiceClient` and split it to `SearchIndexClient` and `SearchIndexerClient`.[#8986](https://github.com/Azure/azure-sdk-for-js/issues/8986)
- [Breaking] Changed `SearchIndexClient` class to `SearchClient` class.[#9014](https://github.com/Azure/azure-sdk-for-js/issues/9014)
- [Breaking] Changed `ListIndexes` operation to a pageable operation.[#8484](https://github.com/Azure/azure-sdk-for-js/issues/8484)
- [Breaking] Added `onlyIfUnchanged` parameter for CreateOrUpdate and Delete operations.[#8517](https://github.com/Azure/azure-sdk-for-js/issues/8517)
- [Breaking] Handled `$select` property for the List operations.[#8784](https://github.com/Azure/azure-sdk-for-js/issues/8784)
- [Breaking] Modified the names of several models & parameters. [#9266](https://github.com/Azure/azure-sdk-for-js/pull/9266)
- [Breaking] Moved non-optional parameters from options bag.[#9238](https://github.com/Azure/azure-sdk-for-js/issues/9238)

Refer [#7166](https://github.com/Azure/azure-sdk-for-js/issues/7166) for a detailed list of changes.


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
