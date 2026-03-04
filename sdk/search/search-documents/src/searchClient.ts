// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  bearerTokenAuthenticationPolicyName,
  type Pipeline,
} from "@azure/core-rest-pipeline";
import { decode, encode } from "./base64.js";
import type {
  AutocompleteResult,
  IndexDocumentsResult,
  QueryAnswerType as BaseAnswers,
  QueryCaptionType as BaseCaptions,
  QueryRewritesType as GeneratedQueryRewrites,
  SearchRequest as GeneratedSearchRequest,
  VectorQueryUnion as GeneratedVectorQuery,
} from "./models/azure/search/documents/index.js";
import type { SearchClientOptionalParams } from "./search/searchClient.js";
import { SearchClient as GeneratedClient } from "./search/searchClient.js";
import { IndexDocumentsBatch } from "./indexDocumentsBatch.js";
import type {
  AutocompleteOptions,
  CountDocumentsOptions,
  DeleteDocumentsOptions,
  GetDocumentOptions,
  IndexDocumentsAction,
  IndexDocumentsOptions,
  ListSearchResultsPageSettings,
  MergeDocumentsOptions,
  MergeOrUploadDocumentsOptions,
  NarrowedModel,
  QueryAnswer,
  QueryCaption,
  QueryRewrites,
  SearchDocumentsPageResult,
  SearchDocumentsResult,
  SearchFieldArray,
  SearchIterator,
  SearchOptions,
  SearchResult,
  SelectArray,
  SelectFields,
  SemanticErrorReason,
  SemanticSearchResultsType,
  SuggestDocumentsResult,
  SuggestOptions,
  UploadDocumentsOptions,
  VectorQuery,
} from "./indexModels.js";
import { logger } from "./logger.js";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy.js";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy.js";
import { KnownSearchAudience } from "./searchAudience.js";
import type { IndexDocumentsClient } from "./searchIndexingBufferedSender.js";
import { deserialize, serialize } from "./serialization.js";
import * as utils from "./serviceUtils.js";
import { tracingClient } from "./tracing.js";
import type { ClientOptions, OperationOptions } from "@azure-rest/core-client";
import type {
  GetDocumentOptionalParams,
  SuggestPostOptionalParams,
  SearchPostOptionalParams,
} from "./search/index.js";

/**
 * Client options used to configure AI Search API requests.
 */
export interface SearchClientOptions extends ClientOptions {
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
   * @hidden
   * A reference to the auto-generated SearchClient
   */
  private readonly client: GeneratedClient;

  /**
   * A reference to the internal HTTP pipeline for use with raw requests
   */
  public readonly pipeline: Pipeline;

  /**
   * Creates an instance of SearchClient.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleSearchClient
   * import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
   *
   * const searchClient = new SearchClient(
   *   "<endpoint>",
   *   "<indexName>",
   *   new AzureKeyCredential("<apiKey>"),
   * );
   * ```
   *
   * Optionally, the type of the model can be used to enable strong typing and type hints:
   * ```ts snippet:ReadmeSampleSearchClientWithModel
   * import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
   *
   * type TModel = {
   *   keyName: string;
   *   field1?: string | null;
   *   field2?: {
   *     anotherField?: string | null;
   *   } | null;
   * };
   *
   * const searchClient = new SearchClient<TModel>(
   *   "<endpoint>",
   *   "<indexName>",
   *   new AzureKeyCredential("<apiKey>"),
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
    options: SearchClientOptions = {},
  ) {
    this.endpoint = endpoint;
    this.indexName = indexName;

    const internalClientPipelineOptions: SearchClientOptionalParams = {
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
      credential,
      this.indexName,
      internalClientPipelineOptions,
    );

    this.pipeline = this.client.pipeline;

    // Replaced with a custom policy below
    this.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });

    if (isTokenCredential(credential)) {
      const scope: string = options.audience
        ? `${options.audience}/.default`
        : `${KnownSearchAudience.AzurePublicCloud}/.default`;
      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({ credential, scopes: scope }),
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async getDocumentsCount(options: CountDocumentsOptions = {}): Promise<number> {
    return tracingClient.withSpan(
      "SearchClient-getDocumentsCount",
      options,
      async (updatedOptions) => {
        const response = await this.client.getDocumentCount(updatedOptions);
        return Number(response); // Service responds with `text/plain` content-type, which core will not deserialize as number
      },
    );
  }

  /**
   * Based on a partial searchText from the user, return a list of potential completion strings
   * based on a specified suggester.
   * @param searchText - The search text on which to base autocomplete results.
   * @param suggesterName - The name of the suggester as specified in the suggesters collection
   * that's part of the index definition.
   * @param options - Options to the autocomplete operation.
   * @example
   * ```ts snippet:ReadmeSampleAutocomplete
   * import { SearchClient, AzureKeyCredential, SearchFieldArray } from "@azure/search-documents";
   *
   * type TModel = {
   *   key: string;
   *   azure?: {
   *     sdk: string | null;
   *   } | null;
   * };
   *
   * const client = new SearchClient<TModel>(
   *   "endpoint.azure",
   *   "indexName",
   *   new AzureKeyCredential("key"),
   * );
   *
   * const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];
   *
   * const autocompleteResult = await client.autocomplete("searchText", "suggesterName", {
   *   searchFields,
   * });
   * ```
   */
  public async autocomplete(
    searchText: string,
    suggesterName: string,
    options: AutocompleteOptions<TModel> = {},
  ): Promise<AutocompleteResult> {
    if (!searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { searchFields, ...restOptions } = options;

    return tracingClient.withSpan("SearchClient-autocomplete", options, async (updatedOptions) => {
      return this.client.autocompletePost(searchText, suggesterName, {
        ...updatedOptions,
        ...restOptions,
        // Cast readonly array to mutable - the generated code doesn't mutate it
        searchFields: searchFields as string[] | undefined,
      });
    });
  }

  private async searchDocuments<TFields extends SelectFields<TModel>>(
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {},
    nextPageParameters: GeneratedSearchRequest = {},
  ): Promise<SearchDocumentsPageResult<TModel, TFields>> {
    const {
      includeTotalCount,
      orderBy,
      searchFields,
      select,
      speller,
      highlightFields,
      vectorSearchOptions,
      semanticSearchOptions,
      hybridSearch,
      xMsQuerySourceAuthorization,
      xMsEnableElevatedRead,
      ...restOptions
    } = options as typeof options & { queryType: "semantic" };

    const {
      semanticFields,
      configurationName,
      errorMode,
      answers,
      captions,
      debugMode,
      queryRewrites,
      ...restSemanticOptions
    } = semanticSearchOptions ?? {};
    const { queries, filterMode, ...restVectorOptions } = vectorSearchOptions ?? {};

    const fullOptions: SearchPostOptionalParams = {
      ...restSemanticOptions,
      ...restVectorOptions,
      ...restOptions,
      ...nextPageParameters,
      searchFields: this.convertSearchFields(searchFields),
      select: this.convertSelect(select) || "*",
      querySpeller: speller,
      semanticFields,
      highlightFields: highlightFields?.split(","),
      orderBy: this.convertOrderBy(orderBy),
      includeTotalCount,
      vectorQueries: queries?.map(this.convertVectorQuery.bind(this)),
      answers: this.convertQueryAnswers(answers),
      captions: this.convertQueryCaptions(captions),
      semanticErrorHandling: errorMode,
      semanticConfigurationName: configurationName,
      debug: debugMode,
      queryRewrites: this.convertQueryRewrites(queryRewrites),
      vectorFilterMode: filterMode,
      hybridSearch: hybridSearch,
      querySourceAuthorization: xMsQuerySourceAuthorization,
      enableElevatedRead: xMsEnableElevatedRead,
    };

    return tracingClient.withSpan(
      "SearchClient-searchDocuments",
      fullOptions,
      async (updatedOptions) => {
        const result = await this.client.searchPost({
          ...updatedOptions,
          searchText: searchText,
        });

        const {
          results,
          nextLink,
          nextPageParameters: resultNextPageParameters,
          semanticPartialResponseReason: semanticErrorReason,
          semanticPartialResponseType: semanticSearchResultsType,
          facets,
          answers: resultAnswers,
          ...restResult
        } = result as typeof result & {
          semanticPartialResponseReason: SemanticErrorReason | undefined;
          semanticPartialResponseType: SemanticSearchResultsType | undefined;
        };

        const modifiedResults = utils.generatedSearchResultToPublicSearchResult<TModel, TFields>(
          results,
        );

        const converted: SearchDocumentsPageResult<TModel, TFields> = {
          ...restResult,
          facets: utils.convertGeneratedFacetsToPublic(facets),
          answers: utils.convertGeneratedAnswersToPublic(resultAnswers),
          debugInfo: restResult.debugInfo,
          results: modifiedResults,
          semanticErrorReason,
          semanticSearchResultsType,
          continuationToken: this.encodeContinuationToken(nextLink, resultNextPageParameters),
        };

        return deserialize<SearchDocumentsPageResult<TModel, TFields>>(converted);
      },
    );
  }

  private async *listSearchResultsPage<TFields extends SelectFields<TModel>>(
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {},
    settings: ListSearchResultsPageSettings = {},
  ): AsyncIterableIterator<SearchDocumentsPageResult<TModel, TFields>> {
    let decodedContinuation = this.decodeContinuationToken(settings.continuationToken);
    let result = await this.searchDocuments(
      searchText,
      options,
      decodedContinuation?.nextPageParameters,
    );

    yield result;

    // Technically, we should also leverage nextLink, but the generated code
    // doesn't support this yet.
    while (result.continuationToken) {
      decodedContinuation = this.decodeContinuationToken(result.continuationToken);
      result = await this.searchDocuments(
        searchText,
        options,
        decodedContinuation?.nextPageParameters,
      );
      yield result;
    }
  }

  private async *listSearchResultsAll<TFields extends SelectFields<TModel>>(
    firstPage: SearchDocumentsPageResult<TModel, TFields>,
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {},
  ): AsyncIterableIterator<SearchResult<TModel, TFields>> {
    yield* firstPage.results;
    if (firstPage.continuationToken) {
      for await (const page of this.listSearchResultsPage(searchText, options, {
        continuationToken: firstPage.continuationToken,
      })) {
        yield* page.results;
      }
    }
  }

  private listSearchResults<TFields extends SelectFields<TModel>>(
    firstPage: SearchDocumentsPageResult<TModel, TFields>,
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {},
  ): SearchIterator<TModel, TFields> {
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
   * ```ts snippet:ReadmeSampleSearchTModel
   * import { SearchClient, AzureKeyCredential, SearchFieldArray } from "@azure/search-documents";
   *
   * type TModel = {
   *   key: string;
   *   azure?: {
   *     sdk: string | null;
   *   } | null;
   * };
   *
   * const client = new SearchClient<TModel>(
   *   "endpoint.azure",
   *   "indexName",
   *   new AzureKeyCredential("key"),
   * );
   *
   * const select = ["azure/sdk"] as const;
   * const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];
   *
   * const searchResult = await client.search("searchText", {
   *   select,
   *   searchFields,
   * });
   * ```
   */
  public async search<TFields extends SelectFields<TModel>>(
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {},
  ): Promise<SearchDocumentsResult<TModel, TFields>> {
    return tracingClient.withSpan("SearchClient-search", options, async (updatedOptions) => {
      const pageResult = await this.searchDocuments<TFields>(searchText, updatedOptions);
      return {
        ...pageResult,
        results: this.listSearchResults(pageResult, searchText, updatedOptions),
      };
    });
  }

  /**
   * Returns a short list of suggestions based on the searchText and specified suggester.
   * @param searchText - The search text to use to suggest documents. Must be at least 1 character,
   * and no more than 100 characters.
   * @param suggesterName - The name of the suggester as specified in the suggesters collection
   * that's part of the index definition.
   * @param options - Options for the suggest operation
   * @example
   * ```ts snippet:ReadmeSampleSuggest
   * import { SearchClient, AzureKeyCredential, SearchFieldArray } from "@azure/search-documents";
   *
   * type TModel = {
   *   key: string;
   *   azure?: {
   *     sdk: string | null;
   *   } | null;
   * };
   *
   * const client = new SearchClient<TModel>(
   *   "endpoint.azure",
   *   "indexName",
   *   new AzureKeyCredential("key"),
   * );
   *
   * const select = ["azure/sdk"] as const;
   * const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];
   *
   * const suggestResult = await client.suggest("searchText", "suggesterName", {
   *   select,
   *   searchFields,
   * });
   * ```
   */
  public async suggest<TFields extends SelectFields<TModel> = never>(
    searchText: string,
    suggesterName: string,
    options: SuggestOptions<TModel, TFields> = {},
  ): Promise<SuggestDocumentsResult<TModel, TFields>> {
    const { select, searchFields, orderBy, ...nonFieldOptions } = options;
    const fullOptions: SuggestPostOptionalParams = {
      // Cast readonly arrays to mutable - the generated code doesn't mutate them
      searchFields: this.convertSearchFields(searchFields),
      select: this.convertSelect(select),
      orderBy: this.convertOrderBy(orderBy),
      ...nonFieldOptions,
    };

    if (!searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    return tracingClient.withSpan("SearchClient-suggest", fullOptions, async (updatedOptions) => {
      const result = await this.client.suggestPost(searchText, suggesterName, updatedOptions);

      const modifiedResult = utils.generatedSuggestDocumentsResultToPublicSuggestDocumentsResult<
        TModel,
        TFields
      >(result);

      return deserialize<SuggestDocumentsResult<TModel, TFields>>(modifiedResult);
    });
  }

  /**
   * Retrieve a particular document from the index by key.
   * @param key - The primary key value of the document
   * @param options - Additional options
   */
  public async getDocument<TFields extends SelectFields<TModel>>(
    key: string,
    options: GetDocumentOptions<TModel, TFields> = {},
  ): Promise<NarrowedModel<TModel, TFields>> {
    return tracingClient.withSpan(
      "SearchClient-getDocument",
      options as OperationOptions,
      async (updatedOptions: GetDocumentOptionalParams) => {
        const result = await this.client.getDocument(key, {
          ...updatedOptions,
          selectedFields: updatedOptions.selectedFields,
        });
        // The generated code puts document fields in additionalProperties
        return deserialize<NarrowedModel<TModel, TFields>>(result.additionalProperties ?? {});
      },
    );
  }

  /**
   * Perform a set of index modifications (upload, merge, mergeOrUpload, delete)
   * for the given set of documents.
   * This operation may partially succeed and not all document operations will
   * be reflected in the index. If you would like to treat this as an exception,
   * set the `throwOnAnyFailure` option to true.
   * For more details about how merging works, see: https://learn.microsoft.com/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param batch - An array of actions to perform on the index.
   * @param options - Additional options.
   */
  public async indexDocuments(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    batch: IndexDocumentsBatch<TModel>,
    options: IndexDocumentsOptions = {},
  ): Promise<IndexDocumentsResult> {
    return tracingClient.withSpan(
      "SearchClient-indexDocuments",
      options,
      async (updatedOptions) => {
        let status = 0;
        const serializedActions = serialize<IndexDocumentsAction<TModel>[]>(batch.actions);
        const result = await this.client.index(
          { actions: utils.convertPublicActionsToGeneratedActions(serializedActions) },
          {
            ...updatedOptions,
            onResponse: (rawResponse, flatResponse) => {
              status = rawResponse.status;
              if (updatedOptions.onResponse) {
                updatedOptions.onResponse(rawResponse, flatResponse);
              }
            },
          },
        );
        if (options.throwOnAnyFailure && status === 207) {
          throw result;
        }
        return result;
      },
    );
  }

  /**
   * Upload an array of documents to the index.
   * @param documents - The documents to upload.
   * @param options - Additional options.
   */
  public async uploadDocuments(
    documents: TModel[],
    options: UploadDocumentsOptions = {},
  ): Promise<IndexDocumentsResult> {
    return tracingClient.withSpan(
      "SearchClient-uploadDocuments",
      options,
      async (updatedOptions) => {
        const batch = new IndexDocumentsBatch<TModel>();
        batch.upload(documents);

        return this.indexDocuments(batch, updatedOptions);
      },
    );
  }

  /**
   * Update a set of documents in the index.
   *
   * For more details about how merging works, see
   * https://learn.microsoft.com/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   * @param options - Additional options.
   */
  public async mergeDocuments(
    documents: TModel[],
    options: MergeDocumentsOptions = {},
  ): Promise<IndexDocumentsResult> {
    return tracingClient.withSpan(
      "SearchClient-mergeDocuments",
      options,
      async (updatedOptions) => {
        const batch = new IndexDocumentsBatch<TModel>();
        batch.merge(documents);

        return this.indexDocuments(batch, updatedOptions);
      },
    );
  }

  /**
   * Update a set of documents in the index or upload them if they don't exist.
   *
   * For more details about how merging works, see
   * https://learn.microsoft.com/rest/api/searchservice/AddUpdate-or-Delete-Documents
   * @param documents - The updated documents.
   * @param options - Additional options.
   */
  public async mergeOrUploadDocuments(
    documents: TModel[],
    options: MergeOrUploadDocumentsOptions = {},
  ): Promise<IndexDocumentsResult> {
    return tracingClient.withSpan(
      "SearchClient-mergeOrUploadDocuments",
      options,
      async (updatedOptions) => {
        const batch = new IndexDocumentsBatch<TModel>();
        batch.mergeOrUpload(documents);
        return this.indexDocuments(batch, updatedOptions);
      },
    );
  }

  /**
   * Delete a set of documents.
   * @param documents - Documents to be deleted.
   * @param options - Additional options.
   */
  public async deleteDocuments(
    documents: TModel[],
    options?: DeleteDocumentsOptions,
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
    options?: DeleteDocumentsOptions,
  ): Promise<IndexDocumentsResult>;

  public async deleteDocuments(
    keyNameOrDocuments: keyof TModel | TModel[],
    keyValuesOrOptions?: string[] | DeleteDocumentsOptions,
    options: DeleteDocumentsOptions = {},
  ): Promise<IndexDocumentsResult> {
    return tracingClient.withSpan(
      "SearchClient-deleteDocuments",
      options,
      async (updatedOptions) => {
        const batch = new IndexDocumentsBatch<TModel>();
        if (typeof keyNameOrDocuments === "string") {
          batch.delete(keyNameOrDocuments, keyValuesOrOptions as string[]);
        } else {
          batch.delete(keyNameOrDocuments as TModel[]);
        }

        return this.indexDocuments(batch, updatedOptions);
      },
    );
  }

  private encodeContinuationToken(
    nextLink: string | undefined,
    nextPageParameters: GeneratedSearchRequest | undefined,
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
    token?: string,
  ): { nextPageParameters: GeneratedSearchRequest; nextLink: string } | undefined {
    if (!token) {
      return undefined;
    }

    const decodedToken = decode(token);

    try {
      const result: {
        apiVersion: string;
        nextLink: string;
        nextPageParameters: GeneratedSearchRequest;
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

  private convertSelect<TFields extends SelectFields<TModel>>(
    select?: SelectArray<TFields>,
  ): string | undefined {
    if (select) {
      return select.join(",");
    }
    return select;
  }

  private convertVectorQueryFields(fields?: SearchFieldArray<TModel>): string | undefined {
    if (fields) {
      return fields.join(",");
    }
    return fields;
  }

  private convertSearchFields(searchFields?: SearchFieldArray<TModel>): string | undefined {
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

  private convertQueryAnswers(answers?: QueryAnswer): BaseAnswers | undefined {
    if (!answers) {
      return answers;
    }

    const config = [];
    const { answerType: output, count, threshold, maxAnswerLength } = answers;

    if (count) {
      config.push(`count-${count}`);
    }

    if (threshold) {
      config.push(`threshold-${threshold}`);
    }

    if (maxAnswerLength) {
      config.push(`maxcharlength-${maxAnswerLength}`);
    }

    if (config.length) {
      return output + `|${config.join(",")}`;
    }

    return output;
  }

  private convertQueryCaptions(captions?: QueryCaption): BaseCaptions | undefined {
    if (!captions) {
      return captions;
    }

    const config = [];
    const { captionType: output, highlight, maxCaptionLength } = captions;

    if (highlight !== undefined) {
      config.push(`highlight-${highlight}`);
    }

    if (maxCaptionLength) {
      config.push(`maxcharlength-${maxCaptionLength}`);
    }

    if (config.length) {
      return output + `|${config.join(",")}`;
    }

    return output;
  }

  private convertVectorQuery<T extends VectorQuery<TModel>>(vectorQuery: T): GeneratedVectorQuery {
    switch (vectorQuery.kind) {
      case "text": {
        const { fields, queryRewrites, ...restFields } = vectorQuery;
        return {
          ...restFields,
          fields: this.convertVectorQueryFields(fields),
          queryRewrites: this.convertQueryRewrites(queryRewrites),
        };
      }
      case "vector":
      case "imageUrl":
      case "imageBinary": {
        return { ...vectorQuery, fields: this.convertVectorQueryFields(vectorQuery?.fields) };
      }
      default: {
        logger.warning("Unknown vector query kind; sending without serialization");
        return vectorQuery as any;
      }
    }
  }

  private convertQueryRewrites(queryRewrites?: QueryRewrites): GeneratedQueryRewrites | undefined {
    if (!queryRewrites) {
      return queryRewrites;
    }

    const { rewritesType: baseOutput } = queryRewrites;
    switch (baseOutput) {
      case "generative": {
        const { count } = queryRewrites;

        const config = [...(count === undefined ? [] : [`count-${count}`])];
        if (config.length) return baseOutput + `|${config.join(",")}`;
        return baseOutput;
      }
      default:
        return baseOutput;
    }
  }
}
