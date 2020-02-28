// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  SearchIndexClient,
  SearchIndexClientOptions,
  AutocompleteOptions,
  CountOptions,
  DeleteDocumentsOptions,
  GetDocumentOptions,
  ListSearchResultsPageSettings,
  ModifyIndexOptions,
  SearchDocumentsResult,
  SearchOptions,
  SearchResult,
  SelectedFields,
  SuggestDocumentsResult,
  SuggestOptions,
  UpdateDocumentsOptions,
  UploadDocumentsOptions
} from "./searchIndexClient";
export { SearchApiKeyCredential } from "./searchApiKeyCredential";
export { default as GeographyPoint } from "./geographyPoint";
export { odata } from "./odata";
export { KnownKeys, ReplaceProperties } from "./util";
export {
  AutocompleteRequest,
  AutocompleteResult,
  AutocompleteMode,
  AutocompleteItem,
  FacetResult,
  IndexAction,
  IndexActionType,
  IndexDocumentsResult,
  IndexingResult,
  QueryType,
  SearchDocumentsResult as GeneratedSearchDocumentsResult,
  SearchRequest,
  SearchResult as GeneratedSearchResult,
  SearchMode,
  SuggestRequest,
  SuggestResult as GeneratedSuggestResult,
  SuggestDocumentsResult as GeneratedSuggestDocumentsResult
} from "./generated/data/models";
