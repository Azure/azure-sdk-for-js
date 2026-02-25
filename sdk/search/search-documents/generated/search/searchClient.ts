// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createSearch, SearchContext, SearchClientOptionalParams } from "./api/index.js";
import {
  SearchDocumentsResult,
  LookupDocument,
  SuggestDocumentsResult,
  IndexDocumentsBatch,
  IndexDocumentsResult,
  AutocompleteResult,
} from "../models/azure/search/documents/models.js";
import {
  autocompletePost,
  autocompleteGet,
  index,
  suggestPost,
  suggestGet,
  getDocument,
  searchPost,
  searchGet,
  getDocumentCount,
} from "./api/operations.js";
import {
  AutocompletePostOptionalParams,
  AutocompleteGetOptionalParams,
  IndexOptionalParams,
  SuggestPostOptionalParams,
  SuggestGetOptionalParams,
  GetDocumentOptionalParams,
  SearchPostOptionalParams,
  SearchGetOptionalParams,
  GetDocumentCountOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { SearchClientOptionalParams } from "./api/searchContext.js";

export class SearchClient {
  private _client: SearchContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    indexName: string,
    options: SearchClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSearch(endpointParam, credential, indexName, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Autocompletes incomplete query terms based on input text and matching terms in the index. */
  autocompletePost(
    searchText: string,
    suggesterName: string,
    options: AutocompletePostOptionalParams = { requestOptions: {} },
  ): Promise<AutocompleteResult> {
    return autocompletePost(this._client, searchText, suggesterName, options);
  }

  /** Autocompletes incomplete query terms based on input text and matching terms in the index. */
  autocompleteGet(
    searchText: string,
    suggesterName: string,
    options: AutocompleteGetOptionalParams = { requestOptions: {} },
  ): Promise<AutocompleteResult> {
    return autocompleteGet(this._client, searchText, suggesterName, options);
  }

  /** Sends a batch of document write actions to the index. */
  index(
    batch: IndexDocumentsBatch,
    options: IndexOptionalParams = { requestOptions: {} },
  ): Promise<IndexDocumentsResult> {
    return index(this._client, batch, options);
  }

  /** Suggests documents in the index that match the given partial query text. */
  suggestPost(
    searchText: string,
    suggesterName: string,
    options: SuggestPostOptionalParams = { requestOptions: {} },
  ): Promise<SuggestDocumentsResult> {
    return suggestPost(this._client, searchText, suggesterName, options);
  }

  /** Suggests documents in the index that match the given partial query text. */
  suggestGet(
    searchText: string,
    suggesterName: string,
    options: SuggestGetOptionalParams = { requestOptions: {} },
  ): Promise<SuggestDocumentsResult> {
    return suggestGet(this._client, searchText, suggesterName, options);
  }

  /** Retrieves a document from the index. */
  getDocument(
    key: string,
    options: GetDocumentOptionalParams = { requestOptions: {} },
  ): Promise<LookupDocument> {
    return getDocument(this._client, key, options);
  }

  /** Searches for documents in the index. */
  searchPost(
    options: SearchPostOptionalParams = { requestOptions: {} },
  ): Promise<SearchDocumentsResult> {
    return searchPost(this._client, options);
  }

  /** Searches for documents in the index. */
  searchGet(
    options: SearchGetOptionalParams = { requestOptions: {} },
  ): Promise<SearchDocumentsResult> {
    return searchGet(this._client, options);
  }

  /** Queries the number of documents in the index. */
  getDocumentCount(
    options: GetDocumentCountOptionalParams = { requestOptions: {} },
  ): Promise<number> {
    return getDocumentCount(this._client, options);
  }
}
