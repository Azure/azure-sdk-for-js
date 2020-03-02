// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  PipelineOptions,
  signingPolicy,
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SearchIndexClient as GeneratedClient } from "./generated/data/searchIndexClient";
import { SearchApiKeyCredential } from "./searchApiKeyCredential";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import {
  AutocompleteResult,
  AutocompleteRequest,
  SearchRequest,
  SuggestRequest,
  IndexAction,
  IndexDocumentsResult
} from "./generated/data/models";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/types";
import { deserialize, serialize } from "./serialization";
import {
  CountOptions,
  AutocompleteOptions,
  SearchOptions,
  SearchDocumentsResult,
  SearchIterator,
  ListSearchResultsPageSettings,
  SearchResult,
  SuggestOptions,
  SuggestDocumentsResult,
  GetDocumentOptions,
  ModifyIndexOptions,
  UploadDocumentsOptions,
  UpdateDocumentsOptions,
  DeleteDocumentsOptions
} from "./models";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchIndexClientOptions = PipelineOptions;

/**
 * Class used to perform operations against a search index,
 * including querying documents in the index as well as
 * adding, updating, and removing them.
 */
export class SearchIndexClient<T> {
  /**
   * The API version to use when communicating with the service.
   */
  public readonly apiVersion: string = "2019-05-06";

  /**
   * The endpoint of the search service
   */
  public readonly endpoint: string;

  /**
   * The name of the index
   */
  public readonly indexName: string;

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
   * const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/search");
   *
   * const client = new SearchIndexClient(
   *   "<endpoint>",
   *   "<indexName>",
   *   new SearchApiKeyCredential("<Admin Key>");
   * );
   * ```
   * @param {string} endpoint The endpoint of the search service
   * @param {string} indexName The name of the index
   * @param {SearchApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    indexName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    credential: SearchApiKeyCredential,
    options: SearchIndexClientOptions = {}
  ) {
    this.endpoint = endpoint;
    this.indexName = indexName;

    const libInfo = `azsdk-js-search/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: [
            "x-ms-correlation-request-id",
            "x-ms-request-id",
            "client-request-id"
          ]
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
      this.endpoint,
      this.indexName,
      pipeline
    );
  }

  /**
   * Retrieves the number of documents in the index.
   * @param options Options to the count operation.
   */
  public async count(options: CountOptions = {}): Promise<number> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-count", options);
    try {
      const result = await this.client.documents.count(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return Number(result._response.bodyAsText);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Based on a partial searchText from the user, return a list
   * of potential completion strings based on a specified suggester.
   * @param options Options to the autocomplete operation.
   */
  public async autocomplete<Fields extends keyof T>(
    options: AutocompleteOptions<Fields>
  ): Promise<AutocompleteResult> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { searchFields, ...nonFieldOptions } = restOptions;
    const fullOptions: AutocompleteRequest = {
      searchFields: this.convertSearchFields<Fields>(searchFields),
      ...nonFieldOptions
    };

    if (!fullOptions.searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!fullOptions.suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { span, updatedOptions } = createSpan("SearchIndexClient-autocomplete", operationOptions);

    try {
      const result = await this.client.documents.autocompletePost(
        fullOptions,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async search<Fields extends keyof T>(
    options: SearchOptions<Fields> = {}
  ): Promise<SearchDocumentsResult<Pick<T, Fields>>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, searchFields, ...nonFieldOptions } = restOptions;
    const fullOptions: SearchRequest = {
      searchFields: this.convertSearchFields<Fields>(searchFields),
      select: this.convertSelect<Fields>(select),
      ...nonFieldOptions
    };

    const { span, updatedOptions } = createSpan("SearchIndexClient-search", operationOptions);

    try {
      const result = await this.client.documents.searchPost(
        fullOptions,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return deserialize<SearchDocumentsResult<Pick<T, Fields>>>(result);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listSearchResultsPage<Fields extends keyof T>(
    options: SearchOptions<Fields> = {},
    settings: ListSearchResultsPageSettings = {}
  ): AsyncIterableIterator<SearchDocumentsResult<Pick<T, Fields>>> {
    let result = await this.search<Fields>({
      ...options,
      ...(settings.nextPageParameters as any)
    });

    yield result;

    // Technically, we should also leverage nextLink, but the generated code
    // doesn't support this yet.
    while (result.nextPageParameters) {
      result = await this.search({
        ...options,
        ...(result.nextPageParameters as any)
      });
      yield result;
    }
  }

  private async *listSearchResultsAll<Fields extends keyof T>(
    options: SearchOptions<Fields> = {}
  ): AsyncIterableIterator<SearchResult<T>> {
    for await (const page of this.listSearchResultsPage(options)) {
      const results: Array<SearchResult<T>> = (page.results as any) || [];
      yield* results;
    }
  }

  /**
   * Performs a search on the current index given
   * the specified arguments.
   * @param options Options for the search operation.
   */
  public listSearchResults<Fields extends keyof T>(
    options: SearchOptions<Fields> = {}
  ): SearchIterator<Pick<T, Fields>> {
    const iter = this.listSearchResultsAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: ListSearchResultsPageSettings = {}) => {
        return this.listSearchResultsPage(options, settings);
      }
    };
  }

  /**
   * Returns a short list of suggestions based on the searchText
   * and specified suggester.
   * @param options Options for the suggest operation
   */
  public async suggest<Fields extends keyof T>(
    options: SuggestOptions<Fields>
  ): Promise<SuggestDocumentsResult<Pick<T, Fields>>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, searchFields, ...nonFieldOptions } = restOptions;
    const fullOptions: SuggestRequest = {
      searchFields: this.convertSearchFields<Fields>(searchFields),
      select: this.convertSelect<Fields>(select),
      ...nonFieldOptions
    };

    if (!fullOptions.searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!fullOptions.suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { span, updatedOptions } = createSpan("SearchIndexClient-suggest", operationOptions);

    try {
      const result = await this.client.documents.suggestPost(
        fullOptions,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return deserialize<SuggestDocumentsResult<Pick<T, Fields>>>(result);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieve a particular document from the index by key.
   * @param key The primary key value of the document
   * @param options Additional options
   */
  public async getDocument<Fields extends keyof T>(
    key: string,
    options: GetDocumentOptions<Fields> = {}
  ): Promise<T> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getDocument", options);
    try {
      const result = await this.client.documents.get(
        key,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return deserialize<T>(result.body);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Perform a set of index modifications (upload, merge, mergeOrUpload, delete)
   * for the given set of documents.
   * This operation may partially succeed and not all document operations will
   * be reflected in the index. If you would like to treat this as an exception,
   * set the `throwOnAnyFailure` option to true.
   * For more details about how merging works, see: https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param batch An array of actions to perform on the index.
   * @param options Additional options.
   */
  public async modifyIndex(
    batch: IndexAction[],
    options: ModifyIndexOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-modifyIndex", options);
    try {
      const result = await this.client.documents.index(
        { actions: serialize(batch) },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      if (options.throwOnAnyFailure && result._response.status === 207) {
        throw result;
      }
      return result;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Upload an array of documents to the index.
   * @param documents The documents to upload.
   * @param options Additional options.
   */
  public async uploadDocuments(
    documents: T[],
    options: UploadDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const actionType = options.mergeIfExists ? "mergeOrUpload" : "upload";
    const { span, updatedOptions } = createSpan("SearchIndexClient-uploadDocuments", options);

    const batch = documents.map<IndexAction>((doc) => {
      return {
        ...doc,
        actionType
      };
    });

    try {
      return await this.modifyIndex(batch, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Update a set of documents in the index.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents The updated documents.
   * @param options Additional options.
   */
  public async updateDocuments(
    documents: T[],
    options: UpdateDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const actionType = options.uploadIfNotExists ? "mergeOrUpload" : "merge";
    const { span, updatedOptions } = createSpan("SearchIndexClient-updateDocuments", options);

    const batch = documents.map<IndexAction>((doc) => {
      return {
        ...doc,
        actionType
      };
    });

    try {
      return await this.modifyIndex(batch, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete a set of documents by their primary key.
   * @param keyName The name of their primary key in the index.
   * @param keyValues The primary key values of documents to delete.
   * @param options Additional options.
   */
  public async deleteDocuments(
    keyName: string,
    keyValues: string[],
    options: DeleteDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-deleteDocuments", options);
    const batch = keyValues.map<IndexAction>((keyValue) => {
      return {
        actionType: "delete",
        [keyName]: keyValue
      };
    });

    try {
      return await this.modifyIndex(batch, updatedOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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

  private convertSelect<Fields>(select?: Fields[]): string | undefined {
    if (select) {
      return select.join(",");
    }
    return select;
  }

  private convertSearchFields<Fields>(searchFields?: Fields[]): string | undefined {
    if (searchFields) {
      return searchFields.join(",");
    }
    return searchFields;
  }
}
