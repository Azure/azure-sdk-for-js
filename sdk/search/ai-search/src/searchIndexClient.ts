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
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SearchIndexClient as GeneratedClient } from "./generated/data/searchIndexClient";
import { SearchApiKeyCredential } from "./searchApiKeyCredential";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import {
  AutocompleteResult,
  AutocompleteRequest,
  SearchRequest,
  SearchResult as RawSearchResult,
  SearchDocumentsResult as RawSearchDocumentsResult,
  SuggestRequest,
  IndexAction,
  IndexDocumentsResult,
  SuggestResult,
  SuggestDocumentsResult as RawSuggestDocumentsResult
} from "./generated/data/models";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/types";
import { KnownKeys, ReplaceProperties } from "./util";
import { deserialize, serialize } from "./serialization";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchIndexClientOptions = PipelineOptions;
export type CountOptions = OperationOptions;
export type AutocompleteOptions = OperationOptions &
  Omit<AutocompleteRequest, "searchText" | "suggesterName">;

export interface SelectedFields<T, Fields extends keyof T> {
  /**
   * The list of fields to retrieve. If unspecified, all fields marked as retrievable in the schema
   * are included.
   */
  select?: Fields[];
}
export type SearchOptions<T, Fields extends keyof T> = OperationOptions &
  SelectedFields<T, Fields> &
  Omit<SearchRequest, "searchText" | "select">;

export type SearchResult<T> = Pick<RawSearchResult, KnownKeys<RawSearchResult>> & T;

export type SearchDocumentsResult<T> = ReplaceProperties<
  RawSearchDocumentsResult,
  { readonly results?: RawSearchResult[] },
  { readonly results?: Array<SearchResult<T>> }
>;

export type SuggestOptions<T, Fields extends keyof T> = OperationOptions &
  SelectedFields<T, Fields> &
  Omit<SuggestRequest, "searchText" | "suggesterName" | "select">;

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

// something extends OperationOptions

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
   * // tbd
   * ```
   * @param {string} endpoint The endpoint of the search service
   * @param {string} indexName The name of the index
   * @param {SearchApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    indexName: string,
    credential: SearchApiKeyCredential,
    options: SearchIndexClientOptions = {}
  ) {
    this.endpoint = endpoint;
    this.indexName = indexName;

    const libInfo = `azsdk-js-ai-search/${SDK_VERSION}`;
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
    searchText: string,
    options: SearchOptions<T, Fields> = {}
  ): Promise<SearchDocumentsResult<Pick<T, Fields>>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, ...nonSelectOptions } = restOptions;
    const fullOptions: SearchRequest = {
      searchText,
      select: this.convertSelect<T, Fields>(select),
      ...nonSelectOptions
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
    searchText: string,
    options: SearchOptions<T, Fields> = {},
    settings: ListSearchResultsPageSettings = {}
  ): AsyncIterableIterator<SearchDocumentsResult<Pick<T, Fields>>> {
    let result = await this.search<Fields>(searchText, {
      ...options,
      ...(settings.nextPageParameters as any)
    });

    yield result;

    // Technically, we should also leverage nextLink, but the generated code
    // doesn't support this yet.
    while (result.nextPageParameters) {
      result = await this.search(searchText, {
        ...options,
        ...(result.nextPageParameters as any)
      });
      yield result;
    }
  }

  public async *listSearchResultsAll<Fields extends keyof T>(
    searchText: string,
    options: SearchOptions<T, Fields> = {}
  ): AsyncIterableIterator<SearchResult<T>> {
    for await (const page of this.listSearchResultsPage(searchText, options)) {
      const results: Array<SearchResult<T>> = (page.results as any) || [];
      yield* results;
    }
  }

  public listSearchResults<Fields extends keyof T>(
    searchText: string,
    options: SearchOptions<T, Fields> = {}
  ): PagedAsyncIterableIterator<
    SearchResult<Pick<T, Fields>>,
    SearchDocumentsResult<Pick<T, Fields>>,
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
      byPage: (settings: ListSearchResultsPageSettings = {}) => {
        return this.listSearchResultsPage(searchText, options, settings);
      }
    };
  }

  public async suggest<Fields extends keyof T>(
    suggesterName: string,
    searchText: string,
    options: SuggestOptions<T, Fields> = {}
  ): Promise<SuggestDocumentsResult<Pick<T, Fields>>> {
    const { operationOptions, restOptions } = this.extractOperationOptions({ ...options });
    const { select, ...nonSelectOptions } = restOptions;
    const fullOptions: SuggestRequest = {
      suggesterName,
      searchText,
      select: this.convertSelect<T, Fields>(select),
      ...nonSelectOptions
    };
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

  public async getDocument(key: string, options: GetDocumentOptions = {}): Promise<T> {
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
   * @param batch
   * @param options
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

  private convertSelect<T, Fields extends keyof T>(select?: Fields[]): string | undefined {
    if (select) {
      return select.join(",");
    }
    return select;
  }
}
