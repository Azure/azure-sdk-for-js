// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { AutocompleteResult, IndexDocumentsResult } from "./generated/data/models";
import {
  CountDocumentsOptions,
  AutocompleteOptions,
  SearchOptions,
  SearchDocumentsResult,
  SuggestOptions,
  SuggestDocumentsResult,
  GetDocumentOptions,
  IndexDocumentsOptions,
  UploadDocumentsOptions,
  MergeDocumentsOptions,
  DeleteDocumentsOptions,
  MergeOrUploadDocumentsOptions,
  SearchIndexingBufferedSenderOptions
} from "./indexModels";
import { IndexDocumentsBatch } from "./indexDocumentsBatch";
import { SearchIndexingBufferedSender } from "./searchIndexingBufferedSender";

export interface SearchClient<T> {
  /**
   * Retrieves the number of documents in the index.
   * @param options - Options to the count operation.
   */
  getDocumentsCount(options?: CountDocumentsOptions): Promise<number>;

  /**
   * Based on a partial searchText from the user, return a list
   * of potential completion strings based on a specified suggester.
   * @param searchText - The search text on which to base autocomplete results.
   * @param suggesterName - The name of the suggester as specified in the suggesters collection that's part of the index definition.
   * @param options - Options to the autocomplete operation.
   */
  autocomplete<Fields extends keyof T>(
    searchText: string,
    suggesterName: string,
    options?: AutocompleteOptions<Fields>
  ): Promise<AutocompleteResult>;

  /**
   * Performs a search on the current index given
   * the specified arguments.
   * @param searchText - Text to search
   * @param options - Options for the search operation.
   */
  search<Fields extends keyof T>(
    searchText?: string,
    options?: SearchOptions<Fields>
  ): Promise<SearchDocumentsResult<Pick<T, Fields>>>;

  /**
   * Returns a short list of suggestions based on the searchText
   * and specified suggester.
   * @param searchText - The search text to use to suggest documents. Must be at least 1 character, and no more than 100 characters.
   * @param suggesterName - The name of the suggester as specified in the suggesters collection that's part of the index definition.
   * @param options - Options for the suggest operation
   */
  suggest<Fields extends keyof T = never>(
    searchText: string,
    suggesterName: string,
    options?: SuggestOptions<Fields>
  ): Promise<SuggestDocumentsResult<Pick<T, Fields>>>;

  /**
   * Retrieve a particular document from the index by key.
   * @param key - The primary key value of the document
   * @param options - Additional options
   */
  getDocument<Fields extends keyof T>(
    key: string,
    options?: GetDocumentOptions<Fields>
  ): Promise<T>;

  /**
   * Perform a set of index modifications (upload, merge, mergeOrUpload, delete)
   * for the given set of documents.
   * This operation may partially succeed and not all document operations will
   * be reflected in the index. If you would like to treat this as an exception,
   * set the `throwOnAnyFailure` option to true.
   * For more details about how merging works, see: https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param batch - An array of actions to perform on the index.
   * @param options - Additional options.
   */
  indexDocuments(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    batch: IndexDocumentsBatch<T>,
    options?: IndexDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  /**
   * Upload an array of documents to the index.
   * @param documents - The documents to upload.
   * @param options - Additional options.
   */
  uploadDocuments(documents: T[], options?: UploadDocumentsOptions): Promise<IndexDocumentsResult>;

  /**
   * Update a set of documents in the index.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   * @param options - Additional options.
   */
  mergeDocuments(documents: T[], options?: MergeDocumentsOptions): Promise<IndexDocumentsResult>;

  /**
   * Update a set of documents in the index or upload them if they don't exist.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   * @param options - Additional options.
   */
  mergeOrUploadDocuments(
    documents: T[],
    options?: MergeOrUploadDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  /**
   * Delete a set of documents.
   * @param documents - Documents to be deleted.
   * @param options - Additional options.
   */
  deleteDocuments(documents: T[], options?: DeleteDocumentsOptions): Promise<IndexDocumentsResult>;

  /**
   * Delete a set of documents.
   * @param keyName - The name of their primary key in the index.
   * @param keyValues - The primary key values of documents to delete.
   * @param options - Additional options.
   */
  deleteDocuments(
    keyName: keyof T,
    keyValues: string[],
    options?: DeleteDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  deleteDocuments(
    keyNameOrDocuments: keyof T | T[],
    keyValuesOrOptions?: string[] | DeleteDocumentsOptions,
    options?: DeleteDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  /**
   * Gets an instance of SearchIndexingBufferedSender.
   * @param options - SearchIndexingBufferedSender Options
   */
  getSearchIndexingBufferedSenderInstance(
    options?: SearchIndexingBufferedSenderOptions
  ): SearchIndexingBufferedSender<T>;
}
