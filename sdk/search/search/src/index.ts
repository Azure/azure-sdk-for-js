// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { SearchIndexClient, SearchIndexClientOptions } from "./searchIndexClient";
export {
  AutocompleteRequest,
  AutocompleteOptions,
  CountDocumentsOptions,
  DeleteDocumentsOptions,
  GetDocumentOptions,
  IndexAction,
  ListSearchResultsPageSettings,
  IndexDocuments,
  SearchDocumentsResultBase,
  SearchDocumentsResult,
  SearchDocumentsPageResult,
  SearchIterator,
  SearchOptions,
  SearchRequest,
  SearchResult,
  SuggestDocumentsResult,
  SuggestRequest,
  SuggestResult,
  SuggestOptions,
  MergeDocumentsOptions,
  UploadDocumentsOptions
} from "./models";
export { SearchApiKeyCredential } from "./searchApiKeyCredential";
export { default as GeographyPoint } from "./geographyPoint";
export { odata } from "./odata";
export {
  AutocompleteResult,
  AutocompleteMode,
  AutocompleteItem,
  FacetResult,
  IndexActionType,
  IndexDocumentsResult,
  IndexingResult,
  QueryType,
  SearchMode,
  SearchRequest as RawSearchRequest
} from "./generated/data/models";
