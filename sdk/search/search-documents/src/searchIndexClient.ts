// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { ExtendedCommonClientOptions } from "@azure/core-http-compat";
import { bearerTokenAuthenticationPolicy, Pipeline } from "@azure/core-rest-pipeline";
import { AnalyzeResult } from "./generated/service/models";
import { SearchServiceClient as GeneratedClient } from "./generated/service/searchServiceClient";
import { logger } from "./logger";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import { KnownSearchAudience } from "./searchAudience";
import { SearchClient, SearchClientOptions as GetSearchClientOptions } from "./searchClient";
import {
  AliasIterator,
  AnalyzeTextOptions,
  CreateAliasOptions,
  CreateIndexOptions,
  CreateOrUpdateAliasOptions,
  CreateOrUpdateIndexOptions,
  CreateOrUpdateSynonymMapOptions,
  CreateSynonymMapOptions,
  DeleteAliasOptions,
  DeleteIndexOptions,
  DeleteSynonymMapOptions,
  GetAliasOptions,
  GetIndexOptions,
  GetIndexStatisticsOptions,
  GetServiceStatisticsOptions,
  GetSynonymMapsOptions,
  IndexIterator,
  IndexNameIterator,
  ListAliasesOptions,
  ListIndexesOptions,
  ListSynonymMapsOptions,
  SearchIndex,
  SearchIndexAlias,
  SearchIndexStatistics,
  SearchServiceStatistics,
  SynonymMap,
} from "./serviceModels";
import * as utils from "./serviceUtils";
import { createSpan } from "./tracing";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface SearchIndexClientOptions extends ExtendedCommonClientOptions {
  /**
   * The API version to use when communicating with the service.
   * @deprecated use {@Link serviceVersion} instead
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
 * Class to perform operations to manage
 * (create, update, list/delete)
 * indexes, & synonymmaps.
 */
export class SearchIndexClient {
  /**
   * The API version to use when communicating with the service.
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
   * @hidden
   * A reference to the auto-generated SearchServiceClient
   */
  private readonly client: GeneratedClient;

  /**
   * A reference to the internal HTTP pipeline for use with raw requests
   */
  public readonly pipeline: Pipeline;

  /**
   * Used to authenticate requests to the service.
   */
  private readonly credential: KeyCredential | TokenCredential;

  /**
   * Used to configure the Search Index client.
   */
  private readonly options: SearchIndexClientOptions;

  /**
   * Creates an instance of SearchIndexClient.
   *
   * Example usage:
   * ```ts
   * const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");
   *
   * const client = new SearchIndexClient(
   *   "<endpoint>",
   *   new AzureKeyCredential("<Admin Key>");
   * );
   * ```
   * @param endpoint - The endpoint of the search service
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Search Index client.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: SearchIndexClientOptions = {},
  ) {
    this.endpoint = endpoint;
    this.credential = credential;
    this.options = options;

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...this.options,
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
      this.options.serviceVersion ?? this.options.apiVersion ?? utils.defaultServiceVersion;
    this.apiVersion = this.serviceVersion;

    this.client = new GeneratedClient(
      this.endpoint,
      this.serviceVersion,
      internalClientPipelineOptions,
    );
    this.pipeline = this.client.pipeline;

    if (isTokenCredential(credential)) {
      const scope: string = this.options.audience
        ? `${this.options.audience}/.default`
        : `${KnownSearchAudience.AzurePublicCloud}/.default`;

      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({ credential, scopes: scope }),
      );
    } else {
      this.client.pipeline.addPolicy(createSearchApiKeyCredentialPolicy(credential));
    }

    this.client.pipeline.addPolicy(createOdataMetadataPolicy("minimal"));
  }

  private async *listIndexesPage(
    options: ListIndexesOptions = {},
  ): AsyncIterableIterator<SearchIndex[]> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listIndexesPage", options);
    try {
      const result = await this.client.indexes.list(updatedOptions);
      const mapped = result.indexes.map(utils.generatedIndexToPublicIndex);
      yield mapped;
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

  private async *listIndexesAll(
    options: ListIndexesOptions = {},
  ): AsyncIterableIterator<SearchIndex> {
    for await (const page of this.listIndexesPage(options)) {
      yield* page;
    }
  }

  /**
   * Retrieves a list of existing indexes in the service.
   * @param options - Options to the list index operation.
   */
  public listIndexes(options: ListIndexesOptions = {}): IndexIterator {
    const iter = this.listIndexesAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listIndexesPage(options);
      },
    };
  }

  private async *listAliasesPage(
    options: ListAliasesOptions = {},
  ): AsyncIterableIterator<SearchIndexAlias[]> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listAliases", options);
    try {
      const result = await this.client.aliases.list(updatedOptions);
      yield result.aliases;
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

  private async *listAliasesAll(
    options: ListAliasesOptions = {},
  ): AsyncIterableIterator<SearchIndexAlias> {
    for await (const page of this.listAliasesPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all aliases available for a search service.
   * @param options - The options parameters.
   */
  public listAliases(options: ListAliasesOptions = {}): AliasIterator {
    const iter = this.listAliasesAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAliasesPage(options);
      },
    };
  }

  private async *listIndexesNamesPage(
    options: ListIndexesOptions = {},
  ): AsyncIterableIterator<string[]> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listIndexesNamesPage", options);
    try {
      const result = await this.client.indexes.list({
        ...updatedOptions,
        select: "name",
      });
      const mapped = result.indexes.map((idx) => idx.name);
      yield mapped;
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

  private async *listIndexesNamesAll(
    options: ListIndexesOptions = {},
  ): AsyncIterableIterator<string> {
    for await (const page of this.listIndexesNamesPage(options)) {
      yield* page;
    }
  }

  /**
   * Retrieves a list of names of existing indexes in the service.
   * @param options - Options to the list index operation.
   */
  public listIndexesNames(options: ListIndexesOptions = {}): IndexNameIterator {
    const iter = this.listIndexesNamesAll(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listIndexesNamesPage(options);
      },
    };
  }

  /**
   * Retrieves a list of existing SynonymMaps in the service.
   * @param options - Options to the list SynonymMaps operation.
   */
  public async listSynonymMaps(options: ListSynonymMapsOptions = {}): Promise<Array<SynonymMap>> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listSynonymMaps", options);
    try {
      const result = await this.client.synonymMaps.list(updatedOptions);
      return result.synonymMaps.map(utils.generatedSynonymMapToPublicSynonymMap);
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
   * Retrieves a list of names of existing SynonymMaps in the service.
   * @param options - Options to the list SynonymMaps operation.
   */
  public async listSynonymMapsNames(options: ListSynonymMapsOptions = {}): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listSynonymMapsNames", options);
    try {
      const result = await this.client.synonymMaps.list({
        ...updatedOptions,
        select: "name",
      });
      return result.synonymMaps.map((sm) => sm.name);
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
   * Retrieves information about an index.
   * @param indexName - The name of the index.
   * @param options - Additional optional arguments.
   */
  public async getIndex(indexName: string, options: GetIndexOptions = {}): Promise<SearchIndex> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getIndex", options);
    try {
      const result = await this.client.indexes.get(indexName, updatedOptions);
      return utils.generatedIndexToPublicIndex(result);
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
   * Retrieves information about a SynonymMap.
   * @param synonymMapName - The name of the SynonymMap.
   * @param options - Additional optional arguments.
   */
  public async getSynonymMap(
    synonymMapName: string,
    options: GetSynonymMapsOptions = {},
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getSynonymMaps", options);
    try {
      const result = await this.client.synonymMaps.get(synonymMapName, updatedOptions);
      return utils.generatedSynonymMapToPublicSynonymMap(result);
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
   * Creates a new index.
   * @param index - The information describing the index to be created.
   * @param options - Additional optional arguments.
   */
  public async createIndex(
    index: SearchIndex,
    options: CreateIndexOptions = {},
  ): Promise<SearchIndex> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createIndex", options);
    try {
      const result = await this.client.indexes.create(
        utils.publicIndexToGeneratedIndex(index),
        updatedOptions,
      );
      return utils.generatedIndexToPublicIndex(result);
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
   * Creates a new SynonymMap in a search service.
   * @param synonymMap - The synonymMap definition to create in a search service.
   * @param options - Additional optional arguments.
   */
  public async createSynonymMap(
    synonymMap: SynonymMap,
    options: CreateSynonymMapOptions = {},
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createSynonymMaps", options);
    try {
      const result = await this.client.synonymMaps.create(
        utils.publicSynonymMapToGeneratedSynonymMap(synonymMap),
        updatedOptions,
      );
      return utils.generatedSynonymMapToPublicSynonymMap(result);
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
   * Creates a new index or modifies an existing one.
   * @param index - The information describing the index to be created.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateIndex(
    index: SearchIndex,
    options: CreateOrUpdateIndexOptions = {},
  ): Promise<SearchIndex> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createOrUpdateIndex", options);
    try {
      const etag = options.onlyIfUnchanged ? index.etag : undefined;

      const result = await this.client.indexes.createOrUpdate(
        index.name,
        utils.publicIndexToGeneratedIndex(index),
        {
          ...updatedOptions,
          ifMatch: etag,
        },
      );
      return utils.generatedIndexToPublicIndex(result);
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
   * Creates a new SynonymMap or modifies an existing one.
   * @param synonymMap - The information describing the SynonymMap to be created.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateSynonymMap(
    synonymMap: SynonymMap,
    options: CreateOrUpdateSynonymMapOptions = {},
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexClient-createOrUpdateSynonymMap",
      options,
    );
    try {
      const etag = options.onlyIfUnchanged ? synonymMap.etag : undefined;

      const result = await this.client.synonymMaps.createOrUpdate(
        synonymMap.name,
        utils.publicSynonymMapToGeneratedSynonymMap(synonymMap),
        {
          ...updatedOptions,
          ifMatch: etag,
        },
      );
      return utils.generatedSynonymMapToPublicSynonymMap(result);
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
   * Deletes an existing index.
   * @param indexName - Index/Name of the index to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteIndex(
    index: string | SearchIndex,
    options: DeleteIndexOptions = {},
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-deleteIndex", options);
    try {
      const indexName: string = typeof index === "string" ? index : index.name;
      const etag =
        typeof index === "string" ? undefined : options.onlyIfUnchanged ? index.etag : undefined;

      await this.client.indexes.delete(indexName, {
        ...updatedOptions,
        ifMatch: etag,
      });
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
   * Deletes an existing SynonymMap.
   * @param synonymMapName - SynonymMap/Name of the synonymMap to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteSynonymMap(
    synonymMap: string | SynonymMap,
    options: DeleteSynonymMapOptions = {},
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-deleteSynonymMap", options);
    try {
      const synonymMapName: string = typeof synonymMap === "string" ? synonymMap : synonymMap.name;
      const etag =
        typeof synonymMap === "string"
          ? undefined
          : options.onlyIfUnchanged
            ? synonymMap.etag
            : undefined;

      await this.client.synonymMaps.delete(synonymMapName, {
        ...updatedOptions,
        ifMatch: etag,
      });
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
   * Creates a new search alias or updates an alias if it already exists.
   * @param alias - The definition of the alias to create or update.
   * @param options - The options parameters.
   */
  public async createOrUpdateAlias(
    alias: SearchIndexAlias,
    options: CreateOrUpdateAliasOptions = {},
  ): Promise<SearchIndexAlias> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createOrUpdateAlias", options);
    try {
      const etag = options.onlyIfUnchanged ? alias.etag : undefined;

      const result = await this.client.aliases.createOrUpdate(alias.name, alias, {
        ...updatedOptions,
        ifMatch: etag,
      });
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
   * Creates a new search alias.
   * @param alias - The definition of the alias to create.
   * @param options - The options parameters.
   */
  public async createAlias(
    alias: SearchIndexAlias,
    options: CreateAliasOptions = {},
  ): Promise<SearchIndexAlias> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createAlias", options);
    try {
      const result = await this.client.aliases.create(alias, updatedOptions);
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
   * Deletes a search alias and its associated mapping to an index. This operation is permanent, with no
   * recovery option. The mapped index is untouched by this operation.
   * @param alias - Alias/Name name of the alias to delete.
   * @param options - The options parameters.
   */
  public async deleteAlias(
    alias: string | SearchIndexAlias,
    options: DeleteAliasOptions = {},
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-deleteAlias", options);
    try {
      const aliasName: string = typeof alias === "string" ? alias : alias.name;
      const etag =
        typeof alias === "string" ? undefined : options.onlyIfUnchanged ? alias.etag : undefined;

      await this.client.aliases.delete(aliasName, {
        ...updatedOptions,
        ifMatch: etag,
      });
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
   * Retrieves an alias definition.
   * @param aliasName - The name of the alias to retrieve.
   * @param options - The options parameters.
   */
  public async getAlias(
    aliasName: string,
    options: GetAliasOptions = {},
  ): Promise<SearchIndexAlias> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getAlias", options);
    try {
      const result = await this.client.aliases.get(aliasName, updatedOptions);
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
   * Retrieves statistics about an index, such as the count of documents and the size
   * of index storage.
   * @param indexName - The name of the index.
   * @param options - Additional optional arguments.
   */
  public async getIndexStatistics(
    indexName: string,
    options: GetIndexStatisticsOptions = {},
  ): Promise<SearchIndexStatistics> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getIndexStatistics", options);
    try {
      const result = await this.client.indexes.getStatistics(indexName, updatedOptions);
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
   * Calls an analyzer or tokenizer manually on provided text.
   * @param indexName - The name of the index that contains the field to analyze
   * @param text - The text to break into tokens.
   * @param options - Additional arguments
   */
  public async analyzeText(indexName: string, options: AnalyzeTextOptions): Promise<AnalyzeResult> {
    const {
      abortSignal,
      requestOptions,
      tracingOptions,
      analyzerName: analyzer,
      tokenizerName: tokenizer,
      ...restOptions
    } = options;

    const operationOptions = {
      abortSignal,
      requestOptions,
      tracingOptions,
    };

    const { span, updatedOptions } = createSpan("SearchIndexClient-analyzeText", operationOptions);

    try {
      const result = await this.client.indexes.analyze(
        indexName,
        { ...restOptions, analyzer, tokenizer },
        updatedOptions,
      );
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
   * Retrieves statistics about the service, such as the count of documents, index, etc.
   * @param options - Additional optional arguments.
   */
  public async getServiceStatistics(
    options: GetServiceStatisticsOptions = {},
  ): Promise<SearchServiceStatistics> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getServiceStatistics", options);
    try {
      const result = await this.client.getServiceStatistics(updatedOptions);
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
   * Retrieves the SearchClient corresponding to this SearchIndexClient
   * @param indexName - Name of the index
   * @param options - SearchClient Options
   * @typeParam TModel - An optional type that represents the documents stored in
   * the search index. For the best typing experience, all non-key fields should
   * be marked optional and nullable, and the key property should have the
   * non-nullable type `string`.
   */
  public getSearchClient<TModel extends object>(
    indexName: string,
    options?: GetSearchClientOptions,
  ): SearchClient<TModel> {
    return new SearchClient<TModel>(
      this.endpoint,
      indexName,
      this.credential,
      options || this.options,
    );
  }
}
