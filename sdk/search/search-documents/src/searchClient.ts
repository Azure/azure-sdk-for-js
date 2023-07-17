// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { InternalClientPipelineOptions } from "@azure/core-client";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { SearchClient as GeneratedClient } from "./generated/data/searchClient";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import { logger } from "./logger";
import {
  AutocompleteRequest,
  AutocompleteResult,
  IndexDocumentsResult,
  KnownSemanticPartialResponseReason,
  KnownSemanticPartialResponseType,
  SuggestRequest,
  SearchRequest as GeneratedSearchRequest,
  Answers,
  QueryAnswerType,
  Vector as GeneratedVector,
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
  SelectArray,
  SearchFieldArray,
  AnswersOptions,
  Vector,
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
   *   SearchFieldArray,
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
   * const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];
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
    const { searchFields, ...nonFieldOptions } = options;
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

    const { span, updatedOptions } = createSpan("SearchClient-autocomplete", options);

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

  private async searchDocuments<TFields extends SelectFields<TModel>>(
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {},
    nextPageParameters: SearchRequest<TModel> = {}
  ): Promise<SearchDocumentsPageResult<TModel, TFields>> {
    const {
      searchFields,
      semanticFields,
      select,
      orderBy,
      includeTotalCount,
      vector,
      answers,
      semanticErrorHandlingMode,
      debugMode,
      ...restOptions
    } = options;
    const fullOptions: GeneratedSearchRequest = {
      ...restOptions,
      ...nextPageParameters,
      searchFields: this.convertSearchFields(searchFields),
      semanticFields: this.convertSemanticFields(semanticFields),
      select: this.convertSelect<TFields>(select) || "*",
      orderBy: this.convertOrderBy(orderBy),
      includeTotalResultCount: includeTotalCount,
      vector: this.convertVector(vector),
      answers: this.convertAnswers(answers),
      semanticErrorHandling: semanticErrorHandlingMode,
      debug: debugMode,
    };

    const { span, updatedOptions } = createSpan("SearchClient-searchDocuments", options);

    try {
      const result = await this.client.documents.searchPost(
        {
          ...fullOptions,
          searchText: searchText,
        },
        updatedOptions
      );

      const {
        results,
        nextLink,
        nextPageParameters: resultNextPageParameters,
        semanticPartialResponseReason,
        semanticPartialResponseType,
        ...restResult
      } = result;

      const modifiedResults = utils.generatedSearchResultToPublicSearchResult<TModel, TFields>(
        results
      );

      const converted: SearchDocumentsPageResult<TModel, TFields> = {
        ...restResult,
        results: modifiedResults,
        semanticPartialResponseReason:
          semanticPartialResponseReason as `${KnownSemanticPartialResponseReason}`,
        semanticPartialResponseType:
          semanticPartialResponseType as `${KnownSemanticPartialResponseType}`,
        continuationToken: this.encodeContinuationToken(
          nextLink,
          resultNextPageParameters
            ? utils.generatedSearchRequestToPublicSearchRequest(resultNextPageParameters)
            : resultNextPageParameters
        ),
      };

      return deserialize<SearchDocumentsPageResult<TModel, TFields>>(converted);
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

  private async *listSearchResultsPage<TFields extends SelectFields<TModel>>(
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {},
    settings: ListSearchResultsPageSettings = {}
  ): AsyncIterableIterator<SearchDocumentsPageResult<TModel, TFields>> {
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

  private async *listSearchResultsAll<TFields extends SelectFields<TModel>>(
    firstPage: SearchDocumentsPageResult<TModel, TFields>,
    searchText?: string,
    options: SearchOptions<TModel, TFields> = {}
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
    options: SearchOptions<TModel, TFields> = {}
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
   * ```ts
   * import {
   *   AzureKeyCredential,
   *   SearchClient,
   *   SearchFieldArray,
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
    options?: SearchOptions<TModel, TFields>
  ): Promise<SearchDocumentsResult<TModel, TFields>> {
    const { span, updatedOptions } = createSpan("SearchClient-search", options);

    try {
      const pageResult = await this.searchDocuments(searchText, updatedOptions);

      return {
        ...pageResult,
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
   *   SearchFieldArray,
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
    options: SuggestOptions<TModel, TFields> = {}
  ): Promise<SuggestDocumentsResult<TModel, TFields>> {
    const { select, searchFields, orderBy, ...nonFieldOptions } = options;
    const fullOptions: SuggestRequest = {
      searchText: searchText,
      suggesterName: suggesterName,
      searchFields: this.convertSearchFields(searchFields),
      select: this.convertSelect<TFields>(select),
      orderBy: this.convertOrderBy(orderBy),
      ...nonFieldOptions,
    };

    if (!fullOptions.searchText) {
      throw new RangeError("searchText must be provided.");
    }

    if (!fullOptions.suggesterName) {
      throw new RangeError("suggesterName must be provided.");
    }

    const { span, updatedOptions } = createSpan("SearchClient-suggest", options);

    try {
      const result = await this.client.documents.suggestPost(fullOptions, updatedOptions);

      const modifiedResult = utils.generatedSuggestDocumentsResultToPublicSuggestDocumentsResult<
        TModel,
        TFields
      >(result);

      return deserialize<SuggestDocumentsResult<TModel, TFields>>(modifiedResult);
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
  public async getDocument<TFields extends SelectFields<TModel>>(
    key: string,
    options: GetDocumentOptions<TModel, TFields> = {}
  ): Promise<NarrowedModel<TModel, TFields>> {
    const { span, updatedOptions } = createSpan("SearchClient-getDocument", options);
    try {
      const result = await this.client.documents.get(key, {
        ...updatedOptions,
        selectedFields: updatedOptions.selectedFields as string[],
      });
      return deserialize<NarrowedModel<TModel, TFields>>(result);
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
    nextPageParameters: SearchRequest<TModel> | undefined
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
  ): { nextPageParameters: SearchRequest<TModel>; nextLink: string } | undefined {
    if (!token) {
      return undefined;
    }

    const decodedToken = decode(token);

    try {
      const result: {
        apiVersion: string;
        nextLink: string;
        nextPageParameters: SearchRequest<TModel>;
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
    select?: SelectArray<TFields>
  ): string | undefined {
    if (select) {
      return select.join(",");
    }
    return select;
  }

  private convertVectorFields(fields?: SearchFieldArray<TModel>): string | undefined {
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

  private convertAnswers(answers?: Answers | AnswersOptions): QueryAnswerType | undefined {
    if (!answers || typeof answers === "string") {
      return answers;
    }
    if (answers.answers === "none") {
      return answers.answers;
    }

    const config = [];
    const { answers: output, count, threshold } = answers;

    if (count) {
      config.push(`count-${count}`);
    }

    if (threshold) {
      config.push(`threshold-${threshold}`);
    }

    if (config.length) {
      return output + `|${config.join(",")}`;
    }

    return output;
  }

  private convertVector(vector?: Vector<TModel>): GeneratedVector | undefined {
    if (!vector) {
      return vector;
    }
    return { ...vector, fields: this.convertVectorFields(vector?.fields) };
  }
}
