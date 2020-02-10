// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  signingPolicy,
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SearchIndexClient as GeneratedClient } from "./generated/data/searchIndexClient";
import { SearchApiKeyCredential } from "./searchApiKeyCredential";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import {
  AutocompleteResult,
  AutocompleteRequest,
  SearchRequest,
  DocumentsSearchPostResponse,
  SearchResult,
  SearchDocumentsResult
} from "./generated/data/models";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface SearchIndexClientOptions extends PipelineOptions {
  /**
   * The DNS suffix of the search service. Default value: 'search.windows.net'.
   */
  searchDnsSuffix?: string;
}

export type CountOptions = OperationOptions;
export type AutocompleteOptions = OperationOptions &
  Omit<AutocompleteRequest, "searchText" | "suggesterName">;
export type SearchOptions = OperationOptions & Omit<SearchRequest, "searchText">;

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

// something extends OperationOptions

export class SearchIndexClient {
  /**
   * The API version to use when communicating with the service.
   */
  public readonly apiVersion: string = "2019-05-06";

  /**
   * The name of the search service
   */
  public readonly searchServiceName: string;

  /**
   * The name of the index
   */
  public readonly indexName: string;

  /**
   * The DNS suffix of the search service. Default value: 'search.windows.net'.
   */
  public searchDnsSuffix: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated SearchIndexClient
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of SearchClient.
   *
   * Example usage:
   * ```ts
   * // tbd
   * ```
   * @param {string} searchServiceName The name of the search service
   * @param {string} indexName The name of the index
   * @param {SearchApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    searchServiceName: string,
    indexName: string,
    credential: SearchApiKeyCredential,
    options: SearchIndexClientOptions = {}
  ) {
    this.searchServiceName = searchServiceName;
    this.indexName = indexName;
    const { searchDnsSuffix = "search.windows.net", ...pipelineOptions } = options;
    this.searchDnsSuffix = searchDnsSuffix;

    const libInfo = `azsdk-js-ai-search/${SDK_VERSION}`;
    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"]
        },
        deserializationOptions: {
          expectedContentTypes: {
            json: ["application/json", "text/json"]
          }
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, signingPolicy(credential));
    this.client = new GeneratedClient(
      credential,
      this.apiVersion,
      this.searchServiceName,
      this.indexName,
      pipeline
    );
  }

  public async count(options: CountOptions = {}) {
    const result = await this.client.documents.count(operationOptionsToRequestOptionsBase(options));
    return Number(result._response.bodyAsText);
  }

  public async autocomplete(
    suggesterName: string,
    searchText: string,
    options: AutocompleteOptions = {}
  ): Promise<AutocompleteResult> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const fullOptions: AutocompleteRequest = {
      suggesterName,
      searchText,
      ...restOptions
    };

    const result = await this.client.documents.autocompletePost(
      fullOptions,
      operationOptionsToRequestOptionsBase(operationOptions)
    );
    return result;
  }

  private async search(
    searchText: string,
    options: SearchOptions = {}
  ): Promise<DocumentsSearchPostResponse> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const fullOptions: SearchRequest = {
      searchText,
      ...restOptions
    };

    const result = await this.client.documents.searchPost(
      fullOptions,
      operationOptionsToRequestOptionsBase(operationOptions)
    );
    return result;
  }

  private async *listSearchResultsPage(
    searchText: string,
    options: SearchOptions = {}
  ): AsyncIterableIterator<SearchDocumentsResult> {
    let result = await this.search(searchText, options);

    yield result;

    while (result.nextPageParameters) {
      result = await this.search(searchText, {
        ...options,
        top: result.nextPageParameters.top,
        skip: result.nextPageParameters.skip
      });
      yield result;
    }
  }

  public async *listSearchResultsAll(
    searchText: string,
    options: SearchOptions = {}
  ): AsyncIterableIterator<SearchResult> {
    for await (const page of this.listSearchResultsPage(searchText, options)) {
      const results = page.results || [];
      yield* results;
    }
  }

  public listSearchResults(
    searchText: string,
    options: SearchOptions = {}
  ): PagedAsyncIterableIterator<
    SearchResult,
    SearchDocumentsResult,
    ListSearchResultsPageSettings
  > {
    const iter = this.listSearchResultsAll(searchText, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: ListSearchResultsPageSettings = {}) =>
        this.listSearchResultsPage(searchText, options)
    };
  }

  private extractOperationOptions<T extends OperationOptions>(
    obj: T
  ): {
    operationOptions: OperationOptions;
    restOptions: Pick<T, Exclude<keyof T, keyof OperationOptions>>;
  } {
    const { abortSignal, requestOptions, tracingOptions, ...restOptions } = obj;

    return {
      operationOptions: {
        abortSignal,
        requestOptions,
        tracingOptions
      },
      restOptions
    };
  }
}
