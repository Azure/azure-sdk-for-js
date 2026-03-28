// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchContext, SearchClientOptionalParams } from "./api/index.js";
import { createSearch } from "./api/index.js";
import type {
  SearchDocumentsResult,
  LookupDocument,
  SuggestDocumentsResult,
  IndexDocumentsBatch,
  IndexDocumentsResult,
  AutocompleteResult,
} from "../models/azure/search/documents/models.js";
import {
  ExplainRequest,
  ExplainDocumentsResult,
  GetDocumentCountResponse,
} from "../models/models.js";
import {
  explainPost,
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
import type {
  ExplainPostOptionalParams,
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
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SearchClientOptionalParams } from "./api/searchContext.js";

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

  /** Explains how a specific document is scored for a given search query. Returns a detailed breakdown of the scoring components that contribute to the document's relevance score. */
  explainPost(
    body: ExplainRequest,
    options: ExplainPostOptionalParams = { requestOptions: {} },
  ): Promise<ExplainDocumentsResult> {
    return explainPost(this._client, body, options);
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
  ): Promise<GetDocumentCountResponse> {
    return getDocumentCount(this._client, options);
  }
}
