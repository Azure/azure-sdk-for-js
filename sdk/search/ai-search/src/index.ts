// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  SearchIndexClient,
  SearchIndexClientOptions,
  AutocompleteOptions,
  CountOptions,
  GetDocumentOptions,
  ListSearchResultsPageSettings,
  ModifyIndexOptions,
  SearchOptions,
  SuggestOptions
} from "./searchIndexClient";
export { SearchApiKeyCredential } from "./searchApiKeyCredential";
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
  SearchRequest,
  SearchDocumentsResult,
  SearchResult,
  SearchMode,
  SuggestRequest
} from "./generated/data/models";
