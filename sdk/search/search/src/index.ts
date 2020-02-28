// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { SearchIndexClient, SearchIndexClientOptions } from "./searchIndexClient";
export {
  AutocompleteRequest,
  AutocompleteOptions,
  CountOptions,
  DeleteDocumentsOptions,
  GetDocumentOptions,
  ListSearchResultsPageSettings,
  ModifyIndexOptions,
  SearchDocumentsResult,
  SearchOptions,
  SearchRequest,
  SearchResult,
  SuggestDocumentsResult,
  SuggestRequest,
  SuggestResult,
  SuggestOptions,
  UpdateDocumentsOptions,
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
  IndexAction,
  IndexActionType,
  IndexDocumentsResult,
  IndexingResult,
  QueryType,
  SearchMode
} from "./generated/data/models";
