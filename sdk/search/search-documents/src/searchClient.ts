// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { InternalClientPipelineOptions, OperationOptions } from "@azure/core-client";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { SearchClient as GeneratedClient } from "./generated/data/searchClient";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import {
  AutocompleteRequest,
  AutocompleteResult,
  IndexDocumentsResult,
  SuggestRequest,
} from "./generated/data/models";
import { createSpan } from "./tracing";
import { deserialize, serialize } from "./serialization";
import {
  AutocompleteOptions,
  CountDocumentsOptions,
  DeleteDocumentsOptions,
  GetDocumentOptions,
  IndexDocumentsOptions,
  ListSearchResultsPageSettings,
  MergeDocumentsOptions,
  MergeOrUploadDocumentsOptions,
  SearchDocumentsPageResult,
  SearchDocumentsResult,
  SearchIterator,
  SearchOptions,
  SearchRequest,
  SelectFields,
  SearchResult,
  SuggestDocumentsResult,
  SuggestOptions,
  UploadDocumentsOptions,
  NarrowedModel,
} from "./indexModels";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy";
import { IndexDocumentsBatch } from "./indexDocumentsBatch";
import { decode, encode } from "./base64";
import * as utils from "./serviceUtils";
import { IndexDocumentsClient } from "./searchIndexingBufferedSender";
import { ExtendedCommonClientOptions } from "@azure/core-http-compat";
import { KnownSearchAudience } from "./searchAudience";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface SearchClientOptions extends ExtendedCommonClientOptions {
  /**
   * The API version to use when communicating with the service.
   * @deprecated use {@link serviceVersion} instead
   */
  apiVersion?: string;

  /**
   * The service version to use when communicating with the service.
   */
  serviceVersion?: string;

  /**
   * The Audience to use for authentication with Azure Active Directory (AAD). The
   * audience is not considered when using a shared key.
   * {@link KnownSearchAudience} can be used interchangeably with audience
   */
  audience?: string;
}

/**
 * Class used to perform operations against a search index,
 * including querying documents in the index as well as
 * adding, updating, and removing them.
 */
export class SearchClient<TModel extends object> implements IndexDocumentsClient<TModel> {
  /// Maintenance note: when updating supported API versions,
  /// the ContinuationToken logic will need to be updated below.

  /**
   *  The service version to use when communicating with the service.
   */
  public readonly serviceVersion: string = utils.defaultServiceVersion;

  /**
   * The API version to use when communicating with the service.
   * @deprecated use {@Link serviceVersion} instead
   */
  public readonly apiVersion: string = utils.defaultServiceVersion;

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
   * @hidden
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
   *   new AzureKeyCredential("<Admin Key>")
   * );
   * ```
   *
   * Optionally, the type of the model can be used to enable strong typing and type hints:
   * ```ts
   * type TModel = {
   *   keyName: string;
   *   field1?: string | null;
   *   field2?: { anotherField?: string | null } | null;
   * };
   *
   * const client = new SearchClient<TModel>(
   *   ...
   * );
   * ```
   *
   * @param endpoint - The endpoint of the search service
   * @param indexName - The name of the index
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Search client.
   *
   * @typeParam TModel - An optional type that represents the documents stored in
   * the search index. For the best typing experience, all non-key fields should
   * be marked optional and nullable, and the key property should have the
   * non-nullable type `string`.
   */
  constructor(
    endpoint: string,
    indexName: string,
    credential: KeyCredential | TokenCredential,
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

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
          additionalAllowedHeaderNames: [
            "elapsed-time",
            "Location",
            "OData-MaxVersion",
            "OData-Version",
            "Prefer",
            "throttle-reason",
          ],
        },
      },
    };

    this.serviceVersion =
      options.serviceVersion ?? options.apiVersion ?? utils.defaultServiceVersion;
    this.apiVersion = this.serviceVersion;

    this.client = new GeneratedClient(
      this.endpoint,
      this.indexName,
      this.serviceVersion,
      internalClientPipelineOptions
    );

    if (isTokenCredential(credential)) {
      const scope: string = options.audience
        ? `${options.audience}/.default`
        : `${KnownSearchAudience.AzurePublicCloud}/.default`;

      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({ credential, scopes: scope })
      );
    } else {
      this.client.pipeline.addPolicy(createSearchApiKeyCredentialPolicy(credential));
    }

    this.client.pipeline.addPolicy(createOdataMetadataPolicy("none"));
  }

  /**
   * Retrieves the number of documents in the index.
   * @param options - Options to the count operation.
   */
  public async getDocumentsCount(options: CountDocumentsOptions = {}): Promise<number> {
    const { span, updatedOptions } = createSpan("SearchClient-getDocumentsCount", options);
    try {
      let documentsCount: number = 0;
      await this.client.documents.count({
        ...updatedOptions,
        onResponse: (rawResponse, flatResponse) => {
          documentsCount = Number(rawResponse.bodyAsText);
          if (updatedOptions.onResponse) {
            updatedOptions.onResponse(rawResponse, flatResponse);
          }
        },
      });

      return documentsCount;
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Based on a partial searchText from the user, return a list
   * of potential completion strings based on a specified suggester.
   * @param searchText - The search text on which to base autocomplete results.
   * @param suggesterName - The name of the suggester as specified in the suggesters collection that's part of the index definition.
   * @param options - Options to the autocomplete operation.
   * @example
   * ```ts
   * import {
   *   AzureKeyCredential,
   *   SearchClient,
   *   SelectFields,
   * } from "@azure/search-documents";
   *
   * type TModel = {
   *   key: string;
   *   azure?: { sdk: string | null } | null;
   * };
   *
   * const client = new SearchClient<TModel>(
   *   "endpoint.azure",
   *   "indexName",
   *   new AzureKeyCredential("key")
   * );
   *
   * const searchFields: SelectFields<TModel>[] = ["azure/sdk"];
   *
   * const autocompleteResult = await client.autocomplete(
   *   "searchText",
   *   "suggesterName",
   *   { searchFields }
   * );
   * ```
   */
  public async autocomplete(
    searchText: string,
    suggesterName: string,
    options: AutocompleteOptions<TModel> = {}
  ): Promise<AutocompleteResult> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { searchFields, ...nonFieldOptions } = restOptions;
    const fullOptions: AutocompleteRequest = {
      searchText: searchText,
      suggesterName: suggesterName,
      searchFields: this.convertSearchFields(searchFields),
      ...nonFieldOptions,
    };

    if (!fullOptions.searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!fullOptions.suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { span, updatedOptions } = createSpan("SearchClient-autocomplete", operationOptions);

    try {
      const result = await this.client.documents.autocompletePost(fullOptions, updatedOptions);
      return result;
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async searchDocuments<Fields extends SelectFields<TModel>>(
    searchText?: string,
    options: SearchOptions<TModel, Fields> = {},
    nextPageParameters: SearchRequest = {}
  ): Promise<SearchDocumentsPageResult<TModel, Fields>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, searchFields, orderBy, semanticFields, ...nonFieldOptions } = restOptions;
    const fullOptions: SearchRequest = {
      searchFields: this.convertSearchFields(searchFields),
      semanticFields: this.convertSemanticFields(semanticFields),
      select: this.convertSelect<Fields>(select) || "*",
      orderBy: this.convertOrderBy(orderBy),
      ...nonFieldOptions,
      ...nextPageParameters,
    };

    const { span, updatedOptions } = createSpan("SearchClient-searchDocuments", operationOptions);

    try {
      const result = await this.client.documents.searchPost(
        {
          ...fullOptions,
          includeTotalResultCount: fullOptions.includeTotalCount,
          searchText: searchText,
        },
        updatedOptions
      );

      const { results, count, coverage, facets, answers, nextLink } = result;

      const modifiedResults = utils.generatedSearchResultToPublicSearchResult<TModel, Fields>(
        results
      );

      const converted: SearchDocumentsPageResult<TModel, Fields> = {
        results: modifiedResults,
        count,
        coverage,
        facets,
        answers,
        continuationToken: this.encodeContinuationToken(nextLink, result.nextPageParameters),
      };

      return deserialize<SearchDocumentsPageResult<TModel, Fields>>(converted);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listSearchResultsPage<Fields extends SelectFields<TModel>>(
    searchText?: string,
    options: SearchOptions<TModel, Fields> = {},
    settings: ListSearchResultsPageSettings = {}
  ): AsyncIterableIterator<SearchDocumentsPageResult<TModel, Fields>> {
    let decodedContinuation = this.decodeContinuationToken(settings.continuationToken);
    let result = await this.searchDocuments(
      searchText,
      options,
      decodedContinuation?.nextPageParameters
    );

    yield result;

    // Technically, we should also leverage nextLink, but the generated code
    // doesn't support this yet.
    while (result.continuationToken) {
      decodedContinuation = this.decodeContinuationToken(result.continuationToken);
      result = await this.searchDocuments(
        searchText,
        options,
        decodedContinuation?.nextPageParameters
      );
      yield result;
    }
  }

  private async *listSearchResultsAll<Fields extends SelectFields<TModel>>(
    firstPage: SearchDocumentsPageResult<TModel, Fields>,
    searchText?: string,
    options: SearchOptions<TModel, Fields> = {}
  ): AsyncIterableIterator<SearchResult<TModel, Fields>> {
    yield* firstPage.results;
    if (firstPage.continuationToken) {
      for await (const page of this.listSearchResultsPage(searchText, options, {
        continuationToken: firstPage.continuationToken,
      })) {
        yield* page.results;
      }
    }
  }

  private listSearchResults<Fields extends SelectFields<TModel>>(
    firstPage: SearchDocumentsPageResult<TModel, Fields>,
    searchText?: string,
    options: SearchOptions<TModel, Fields> = {}
  ): SearchIterator<TModel, Fields> {
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
      },
    };
  }

  /**
   * Performs a search on the current index given
   * the specified arguments.
   * @param searchText - Text to search
   * @param options - Options for the search operation.
   * @example
   * ```ts
   * import {
   *   AzureKeyCredential,
   *   SearchClient,
   *   SelectFields,
   * } from "@azure/search-documents";
   *
   * type TModel = {
   *   key: string;
   *   azure?: { sdk: string | null } | null;
   * };
   *
   * const client = new SearchClient<TModel>(
   *   "endpoint.azure",
   *   "indexName",
   *   new AzureKeyCredential("key")
   * );
   *
   * const select = ["azure/sdk"] as const;
   * const searchFields: SelectFields<TModel>[] = ["azure/sdk"];
   *
   * const searchResult = await client.search("searchText", {
   *   select,
   *   searchFields,
   * });
   * ```
   */
  public async search<Fields extends SelectFields<TModel>>(
    searchText?: string,
    options?: SearchOptions<TModel, Fields>
  ): Promise<SearchDocumentsResult<TModel, Fields>> {
    const { span, updatedOptions } = createSpan("SearchClient-search", options);

    try {
      const pageResult = await this.searchDocuments(searchText, updatedOptions);

      const { count, coverage, facets, answers } = pageResult;

      return {
        count,
        coverage,
        facets,
        answers,
        results: this.listSearchResults(pageResult, searchText, updatedOptions),
      };
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns a short list of suggestions based on the searchText
   * and specified suggester.
   * @param searchText - The search text to use to suggest documents. Must be at least 1 character, and no more than 100 characters.
   * @param suggesterName - The name of the suggester as specified in the suggesters collection that's part of the index definition.
   * @param options - Options for the suggest operation
   * @example
   * ```ts
   * import {
   *   AzureKeyCredential,
   *   SearchClient,
   *   SelectFields,
   * } from "@azure/search-documents";
   *
   * type TModel = {
   *   key: string;
   *   azure?: { sdk: string | null } | null;
   * };
   *
   * const client = new SearchClient<TModel>(
   *   "endpoint.azure",
   *   "indexName",
   *   new AzureKeyCredential("key")
   * );
   *
   * const select = ["azure/sdk"] as const;
   * const searchFields: SelectFields<TModel>[] = ["azure/sdk"];
   *
   * const suggestResult = await client.suggest("searchText", "suggesterName", {
   *   select,
   *   searchFields,
   * });
   * ```
   */
  public async suggest<Fields extends SelectFields<TModel> = never>(
    searchText: string,
    suggesterName: string,
    options: SuggestOptions<TModel, Fields> = {}
  ): Promise<SuggestDocumentsResult<TModel, Fields>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, searchFields, orderBy, ...nonFieldOptions } = restOptions;
    const fullOptions: SuggestRequest = {
      searchText: searchText,
      suggesterName: suggesterName,
      searchFields: this.convertSearchFields(searchFields),
      select: this.convertSelect<Fields>(select),
      orderBy: this.convertOrderBy(orderBy),
      ...nonFieldOptions,
    };

    if (!fullOptions.searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!fullOptions.suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { span, updatedOptions } = createSpan("SearchClient-suggest", operationOptions);

    try {
      const result = await this.client.documents.suggestPost(fullOptions, updatedOptions);

      const modifiedResult = utils.generatedSuggestDocumentsResultToPublicSuggestDocumentsResult<
        TModel,
        Fields
      >(result);

      return deserialize<SuggestDocumentsResult<TModel, Fields>>(modifiedResult);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieve a particular document from the index by key.
   * @param key - The primary key value of the document
   * @param options - Additional options
   */
  public async getDocument<Fields extends SelectFields<TModel>>(
    key: string,
    options: GetDocumentOptions<TModel, Fields> = {}
  ): Promise<NarrowedModel<TModel, Fields>> {
    const { span, updatedOptions } = createSpan("SearchClient-getDocument", options);
    try {
      const result = await this.client.documents.get(key, {
        ...updatedOptions,
        selectedFields: updatedOptions.selectedFields as string[],
      });
      return deserialize<NarrowedModel<TModel, Fields>>(result);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
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
   * @param batch - An array of actions to perform on the index.
   * @param options - Additional options.
   */
  public async indexDocuments(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    batch: IndexDocumentsBatch<TModel>,
    options: IndexDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-indexDocuments", options);
    try {
      let status: number = 0;
      const result = await this.client.documents.index(
        { actions: serialize(batch.actions) },
        {
          ...updatedOptions,
          onResponse: (rawResponse, flatResponse) => {
            status = rawResponse.status;
            if (updatedOptions.onResponse) {
              updatedOptions.onResponse(rawResponse, flatResponse);
            }
          },
        }
      );
      if (options.throwOnAnyFailure && status === 207) {
        throw result;
      }
      return result;
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Upload an array of documents to the index.
   * @param documents - The documents to upload.
   * @param options - Additional options.
   */
  public async uploadDocuments(
    documents: TModel[],
    options: UploadDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-uploadDocuments", options);

    const batch = new IndexDocumentsBatch<TModel>();
    batch.upload(documents);

    try {
      return await this.indexDocuments(batch, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Update a set of documents in the index.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   * @param options - Additional options.
   */
  public async mergeDocuments(
    documents: TModel[],
    options: MergeDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-mergeDocuments", options);

    const batch = new IndexDocumentsBatch<TModel>();
    batch.merge(documents);

    try {
      return await this.indexDocuments(batch, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Update a set of documents in the index or upload them if they don't exist.
   * For more details about how merging works, see https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   * @param options - Additional options.
   */
  public async mergeOrUploadDocuments(
    documents: TModel[],
    options: MergeOrUploadDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-mergeDocuments", options);

    const batch = new IndexDocumentsBatch<TModel>();
    batch.mergeOrUpload(documents);

    try {
      return await this.indexDocuments(batch, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete a set of documents.
   * @param documents - Documents to be deleted.
   * @param options - Additional options.
   */
  public async deleteDocuments(
    documents: TModel[],
    options?: DeleteDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  /**
   * Delete a set of documents.
   * @param keyName - The name of their primary key in the index.
   * @param keyValues - The primary key values of documents to delete.
   * @param options - Additional options.
   */
  public async deleteDocuments(
    keyName: keyof TModel,
    keyValues: string[],
    options?: DeleteDocumentsOptions
  ): Promise<IndexDocumentsResult>;

  public async deleteDocuments(
    keyNameOrDocuments: keyof TModel | TModel[],
    keyValuesOrOptions?: string[] | DeleteDocumentsOptions,
    options: DeleteDocumentsOptions = {}
  ): Promise<IndexDocumentsResult> {
    const { span, updatedOptions } = createSpan("SearchClient-deleteDocuments", options);

    const batch = new IndexDocumentsBatch<TModel>();
    if (typeof keyNameOrDocuments === "string") {
      batch.delete(keyNameOrDocuments, keyValuesOrOptions as string[]);
    } else {
      batch.delete(keyNameOrDocuments as TModel[]);
    }

    try {
      return await this.indexDocuments(batch, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        status: "error",
        error: e.message,
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
      nextPageParameters,
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
        nextPageParameters: result.nextPageParameters,
      };
    } catch (e: any) {
      throw new Error(`Corrupted or invalid continuation token: ${decodedToken}`);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  private extractOperationOptions<T extends OperationOptions>(
    obj: T
  ): {
    operationOptions: OperationOptions;
    restOptions: any;
  } {
    const { abortSignal, requestOptions, tracingOptions, ...restOptions } = obj;

    return {
      operationOptions: {
        abortSignal,
        requestOptions,
        tracingOptions,
      },
      restOptions,
    };
  }

  private convertSelect<Fields extends SelectFields<TModel>>(
    select?: Fields[]
  ): string | undefined {
    if (select) {
      return select.join(",");
    }
    return select;
  }

  private convertSearchFields(searchFields?: SelectFields<TModel>[]): string | undefined {
    if (searchFields) {
      return searchFields.join(",");
    }
    return searchFields;
  }

  private convertSemanticFields(semanticFields?: string[]): string | undefined {
    if (semanticFields) {
      return semanticFields.join(",");
    }
    return semanticFields;
  }

  private convertOrderBy(orderBy?: string[]): string | undefined {
    if (orderBy) {
      return orderBy.join(",");
    }
    return orderBy;
  }
}
