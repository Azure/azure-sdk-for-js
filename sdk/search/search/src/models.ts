// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import {
  AutocompleteRequest,
  SearchRequest,
  SearchResult as RawSearchResult,
  SearchDocumentsResult as RawSearchDocumentsResult,
  SuggestDocumentsResult as RawSuggestDocumentsResult,
  SuggestRequest,
  SuggestResult
} from "./generated/data/models";
import { ReplaceProperties, KnownKeys } from "./util";

export type CountOptions = OperationOptions;
export type AutocompleteOptions = OperationOptions & AutocompleteRequest;

export interface SelectedFields<T, Fields extends keyof T> {
  /**
   * The list of fields to retrieve. If unspecified, all fields marked as retrievable in the schema
   * are included.
   */
  select?: Fields[];
}
export type SearchOptions<T, Fields extends keyof T> = OperationOptions &
  SelectedFields<T, Fields> &
  Omit<SearchRequest, "select">;

export type SearchResult<T> = Pick<RawSearchResult, KnownKeys<RawSearchResult>> & T;

export type SearchDocumentsResult<T> = ReplaceProperties<
  RawSearchDocumentsResult,
  { readonly results?: RawSearchResult[] },
  { readonly results?: Array<SearchResult<T>> }
>;

export type SuggestOptions<T, Fields extends keyof T> = OperationOptions &
  SelectedFields<T, Fields> &
  Omit<SuggestRequest, "select">;

export type SuggestDocumentsResult<T> = ReplaceProperties<
  RawSuggestDocumentsResult,
  { readonly results?: SuggestResult[] },
  { readonly results?: Array<Pick<SuggestResult, KnownKeys<SuggestResult>> & T> }
>;

export interface GetDocumentOptions extends OperationOptions {
  /**
   * List of field names to retrieve for the document; Any field not retrieved will be missing from
   * the returned document.
   */
  selectedFields?: string[];
}
export interface ModifyIndexOptions extends OperationOptions {
  /**
   * If true, will cause this operation to throw if any document operation
   * in the batch did not succeed.
   */
  throwOnAnyFailure?: boolean;
}

export interface UploadDocumentsOptions extends ModifyIndexOptions {
  mergeIfExists?: boolean;
}

export interface UpdateDocumentsOptions extends ModifyIndexOptions {
  uploadIfNotExists?: boolean;
}

export type DeleteDocumentsOptions = ModifyIndexOptions;

export interface ListSearchResultsPageSettings {
  /**
   * When server pagination occurs, this is the URL to the next result page.
   */
  nextLink?: string;
  /**
   * When server pagination occurs, this is the set of parameters to include in the POST body.
   */
  nextPageParameters?: SearchRequest;
}
