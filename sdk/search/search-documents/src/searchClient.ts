// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  PipelineOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SearchClient as GeneratedClient } from "./generated/data/searchClient";
import { KeyCredential } from "@azure/core-auth";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import {
  AutocompleteResult,
  AutocompleteRequest,
  SuggestRequest,
  IndexDocumentsResult
} from "./generated/data/models";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";
import { deserialize, serialize } from "./serialization";
import {
  CountDocumentsOptions,
  AutocompleteOptions,
  SearchOptions,
  SearchDocumentsResult,
  SearchIterator,
  ListSearchResultsPageSettings,
  SearchResult,
  SuggestOptions,
  SuggestDocumentsResult,
  GetDocumentOptions,
  IndexDocumentsOptions,
  UploadDocumentsOptions,
  MergeDocumentsOptions,
  DeleteDocumentsOptions,
  SearchDocumentsPageResult,
  MergeOrUploadDocumentsOptions,
  SearchRequest
} from "./indexModels";
import { odataMetadataPolicy } from "./odataMetadataPolicy";
import { IndexDocumentsBatch } from "./indexDocumentsBatch";
import { encode, decode } from "./base64";
import * as utils from "./serviceUtils";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchClientOptions = PipelineOptions;

/**
 * Class used to perform operations against a search index,
 * including querying documents in the index as well as
 * adding, updating, and removing them.
 */
export class SearchClient<T> {
  /// Maintenance note: when updating supported API versions,
  /// the ContinuationToken logic will need to be updated below.

  /**
   * The API version to use when communicating with the service.
   */
  public readonly apiVersion: string = "2020-06-30";

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
   * A reference to the auto-generated SearchClient
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of SearchClient.
   *
   * Example usage:
   * ```ts
   * const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
   *
   * const client = new SearchClient(
   *   "<endpoint>",
   *   "<indexName>",
   *   new AzureKeyCredential("<Admin Key>");
   * );
   * ```
   * @param {string} endpoint The endpoint of the search service
   * @param {string} indexName The name of the index
   * @param {KeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    indexName: string,
    credential: KeyCredential,
    options: SearchClientOptions = {}
  ) {
    this.endpoint = endpoint;
    this.indexName = indexName;

    const libInfo = `azsdk-js-search-documents/${SDK_VERSION}`;
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
            "elapsed-time",
            "Location",
            "OData-MaxVersion",
            "OData-Version",
            "Prefer",
            "throttle-reason"
          ]
        }
      }
    };

    const pipeline = createPipelineFromOptions(
      internalPipelineOptions,
      createSearchApiKeyCredentialPolicy(credential)
    );
    if (Array.isArray(pipeline.requestPolicyFactories)) {
      pipeline.requestPolicyFactories.unshift(odataMetadataPolicy("none"));
    }

    this.client = new GeneratedClient(this.apiVersion, this.endpoint, this.indexName, pipeline);
  }

  /**
   * Retrieves the number of documents in the index.
   * @param options Options to the count operation.
   */
  public async getDocumentsCount(options: CountDocumentsOptions = {}): Promise<number> {
    const { span, updatedOptions } = createSpan("SearchClient-getDocumentsCount", options);
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
   * @param searchText The search text on which to base autocomplete results.
   * @param suggesterName The name of the suggester as specified in the suggesters collection that's part of the index definition.
   * @param options Options to the autocomplete operation.
   */
  public async autocomplete<Fields extends keyof T>(
    searchText: string,
    suggesterName: string,
    options: AutocompleteOptions<Fields> = {}
  ): Promise<AutocompleteResult> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { searchFields, ...nonFieldOptions } = restOptions;
    const fullOptions: AutocompleteRequest = {
      searchText: searchText,
      suggesterName: suggesterName,
      searchFields: this.convertSearchFields<Fields>(searchFields),
      ...nonFieldOptions
    };

    if (!fullOptions.searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!fullOptions.suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { span, updatedOptions } = createSpan("SearchClient-autocomplete", operationOptions);

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

  private async searchDocuments<Fields extends keyof T>(
    searchText?: string,
    options: SearchOptions<Fields> = {},
    nextPageParameters: SearchRequest = {}
  ): Promise<SearchDocumentsPageResult<Pick<T, Fields>>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, searchFields, orderBy, ...nonFieldOptions } = restOptions;
    const fullOptions: SearchRequest = {
      searchFields: this.convertSearchFields<Fields>(searchFields),
      select: this.convertSelect<Fields>(select),
      orderBy: this.convertOrderBy(orderBy),
      ...nonFieldOptions,
      ...nextPageParameters
    };

    const { span, updatedOptions } = createSpan("SearchClient-searchDocuments", operationOptions);

    try {
      const result = await this.client.documents.searchPost(
        {
          ...fullOptions,
          includeTotalResultCount: fullOptions.includeTotalCount,
          searchText: searchText
        },
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      const { results, count, coverage, facets, nextLink, nextPageParameters } = result;

      let modifiedResults = utils.generatedSearchResultToPublicSearchResult<T>(results);

      const converted: SearchDocumentsPageResult<T> = {
        results: modifiedResults,
        count,
        coverage,
        facets,
        continuationToken: this.encodeContinuationToken(nextLink, nextPageParameters)
      };

      return deserialize<SearchDocumentsPageResult<Pick<T, Fields>>>(converted);
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
    searchText?: string,
    options: SearchOptions<Fields> = {},
    settings: ListSearchResultsPageSettings = {}
  ): AsyncIterableIterator<SearchDocumentsPageResult<Pick<T, Fields>>> {
    const decodedContinuation = this.decodeContinuationToken(settings.continuationToken);
    let result = await this.searchDocuments<Fields>(
      searchText,
      options,
      decodedContinuation?.nextPageParameters
    );

    yield result;

    // Technically, we should also leverage nextLink, but the generated code
    // doesn't support this yet.
    while (result.continuationToken) {
      const decodedContinuation = this.decodeContinuationToken(result.continuationToken);
      result = await this.searchDocuments(
        searchText,
        options,
        decodedContinuation?.nextPageParameters
      );
      yield result;
    }
  }

  private async *listSearchResultsAll<Fields extends keyof T>(
    firstPage: SearchDocumentsPageResult<Pick<T, Fields>>,
    searchText?: string,
    options: SearchOptions<Fields> = {}
  ): AsyncIterableIterator<SearchResult<Pick<T, Fields>>> {
    yield* firstPage.results;
    if (firstPage.continuationToken) {
      for await (const page of this.listSearchResultsPage(searchText, options, {
        continuationToken: firstPage.continuationToken
      })) {
        yield* page.results;
      }
    }
  }

  private listSearchResults<Fields extends keyof T>(
    firstPage: SearchDocumentsPageResult<Pick<T, Fields>>,
    searchText?: string,
    options: SearchOptions<Fields> = {}
  ): SearchIterator<Pick<T, Fields>> {
    const iter = this.listSearchResultsAll(firstPage, searchText, options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: ListSearchResultsPageSettings = {}) => {
        return this.listSearchResultsPage(searchText, options, settings);
      }
    };
  }

  /**
   * Performs a search on the current index given
   * the specified arguments.
   * @param searchText Text to search
   * @param options Options for the search operation.
   */
  public async search<Fields extends keyof T>(
    searchText?: string,
    options: SearchOptions<Fields> = {}
  ): Promise<SearchDocumentsResult<Pick<T, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchClient-search", options);

    try {
      const pageResult = await this.searchDocuments(searchText, updatedOptions);

      const { count, coverage, facets } = pageResult;

      return {
        count,
        coverage,
        facets,
        results: this.listSearchResults(pageResult, searchText, updatedOptions)
      };
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
   * Returns a short list of suggestions based on the searchText
   * and specified suggester.
   * @param searchText The search text to use to suggest documents. Must be at least 1 character, and no more than 100 characters.
   * @param suggesterName The name of the suggester as specified in the suggesters collection that's part of the index definition.
   * @param options Options for the suggest operation
   */
  public async suggest<Fields extends keyof T = never>(
    searchText: string,
    suggesterName: string,
    options: SuggestOptions<Fields> = {}
  ): Promise<SuggestDocumentsResult<Pick<T, Fields>>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, searchFields, orderBy, ...nonFieldOptions } = restOptions;
    const fullOptions: SuggestRequest = {
      searchText: searchText,
      suggesterName: suggesterName,
      searchFields: this.convertSearchFields<Fields>(searchFields),
      select: this.convertSelect<Fields>(select),
      orderBy: this.convertOrderBy(orderBy),
      ...nonFieldOptions
    };

    if (!fullOptions.searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!fullOptions.suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { span, updatedOptions } = createSpan("SearchClient-suggest", operationOptions);

    try {
      const result = await this.client.documents.suggestPost(
        fullOptions,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );

      const modifiedResult = utils.generatedSuggestDocumentsResultToPublicSuggestDocumentsResult<T>(
        result
      );

      return deserialize<SuggestDocumentsResult<Pick<T, Fields>>>(modifiedResult);
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
    const { span, updatedOptions } = createSpan("SearchClient-getDocument", options);
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
  public async indexDocuments(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    batch: IndexDocumentsBatch<T>,
    options: IndexDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-indexDocuments", options);
    try {
      const result = await this.client.documents.index(
        { actions: serialize(batch.actions) },
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
    const { span, updatedOptions } = createSpan("SearchClient-uploadDocuments", options);

    const batch = new IndexDocumentsBatch<T>();
    batch.upload(documents);

    try {
      return await this.indexDocuments(batch, updatedOptions);
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
  public async mergeDocuments(
    documents: T[],
    options: MergeDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-mergeDocuments", options);

    const batch = new IndexDocumentsBatch<T>();
    batch.merge(documents);

    try {
      return await this.indexDocuments(batch, updatedOptions);
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
   * Update a set of documents in the index or upload them if they don't exist.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents The updated documents.
   * @param options Additional options.
   */
  public async mergeOrUploadDocuments(
    documents: T[],
    options: MergeOrUploadDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-mergeDocuments", options);

    const batch = new IndexDocumentsBatch<T>();
    batch.mergeOrUpload(documents);

    try {
      return await this.indexDocuments(batch, updatedOptions);
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
   * Delete a set of documents.
   * @param documents Documents to be deleted.
   * @param options Additional options.
   */
  public async deleteDocuments(
    documents: T[],
    options?: DeleteDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  /**
   * Delete a set of documents.
   * @param keyName The name of their primary key in the index.
   * @param keyValues The primary key values of documents to delete.
   * @param options Additional options.
   */
  public async deleteDocuments(
    keyName: keyof T,
    keyValues: string[],
    options?: DeleteDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  public async deleteDocuments(
    keyNameOrDocuments: keyof T | T[],
    keyValuesOrOptions?: string[] | DeleteDocumentsOptions,
    options: DeleteDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-deleteDocuments", options);

    const batch = new IndexDocumentsBatch<T>();
    if (typeof keyNameOrDocuments === "string") {
      batch.delete(keyNameOrDocuments, keyValuesOrOptions as string[]);
    } else {
      batch.delete(keyNameOrDocuments as T[]);
    }

    try {
      return await this.indexDocuments(batch, updatedOptions);
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

  private encodeContinuationToken(
    nextLink: string | undefined,
    nextPageParameters: SearchRequest | undefined
  ): string | undefined {
    if (!nextLink || !nextPageParameters) {
      return undefined;
    }
    const payload = JSON.stringify({
      apiVersion: this.apiVersion,
      nextLink,
      nextPageParameters
    });
    return encode(payload);
  }

  private decodeContinuationToken(
    token?: string
  ): { nextPageParameters: SearchRequest; nextLink: string } | undefined {
    if (!token) {
      return undefined;
    }

    const decodedToken = decode(token);

    try {
      const result: {
        apiVersion: string;
        nextLink: string;
        nextPageParameters: SearchRequest;
      } = JSON.parse(decodedToken);

      if (result.apiVersion !== this.apiVersion) {
        throw new RangeError(`Continuation token uses unsupported apiVersion "${this.apiVersion}"`);
      }

      return {
        nextLink: result.nextLink,
        nextPageParameters: result.nextPageParameters
      };
    } catch (e) {
      throw new Error(`Corrupted or invalid continuation token: ${decodedToken}`);
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

  private convertOrderBy(orderBy?: string[]): string | undefined {
    if (orderBy) {
      return orderBy.join(",");
    }
    return orderBy;
  }
}
