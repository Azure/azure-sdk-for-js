// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
  bearerTokenAuthenticationPolicyName,
} from "@azure/core-rest-pipeline";
import type { AnalyzeResult } from "./models/azure/search/documents/indexes/index.js";
import type { SearchIndexClientOptionalParams } from "./searchIndex/searchIndexClient.js";
import { SearchIndexClient as GeneratedClient } from "./searchIndex/searchIndexClient.js";
import type { KnowledgeBase } from "./knowledgeBaseModels.js";
import type { KnowledgeRetrievalClientOptions as GetKnowledgeRetrievalClientOptions } from "./knowledgeRetrievalClient.js";
import { KnowledgeRetrievalClient } from "./knowledgeRetrievalClient.js";
import { logger } from "./logger.js";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy.js";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy.js";
import { KnownSearchAudience } from "./searchAudience.js";
import type { SearchClientOptions as GetSearchClientOptions } from "./searchClient.js";
import { SearchClient } from "./searchClient.js";
import type {
  AliasIterator,
  AnalyzeTextOptions,
  BetaIndexIterator,
  BetaSearchIndex,
  CreateAliasOptions,
  CreateIndexOptions,
  CreateKnowledgeBaseOptions,
  CreateKnowledgeSourceOptions,
  CreateOrUpdateAliasOptions,
  CreateOrUpdateIndexOptions,
  CreateOrUpdateKnowledgeBaseOptions,
  CreateOrUpdateKnowledgeSourceOptions,
  CreateOrUpdateSynonymMapOptions,
  CreateSynonymMapOptions,
  DeleteAliasOptions,
  DeleteIndexOptions,
  DeleteKnowledgeBaseOptions,
  DeleteKnowledgeSourceOptions,
  DeleteSynonymMapOptions,
  GetAliasOptions,
  GetIndexOptions,
  GetIndexStatisticsOptions,
  GetIndexStatsSummaryOptions,
  GetKnowledgeBaseOptions,
  GetKnowledgeSourceOptions,
  GetKnowledgeSourceStatusOptions,
  GetServiceStatisticsOptions,
  GetSynonymMapsOptions,
  IndexIterator,
  IndexNameIterator,
  IndexStatisticsSummaryIterator,
  KnowledgeBaseIterator,
  KnowledgeSource,
  KnowledgeSourceIterator,
  ListAliasesOptions,
  ListIndexesOptions,
  ListKnowledgeBasesOptions,
  ListKnowledgeSourcesOptions,
  ListSynonymMapsOptions,
  SearchIndex,
  SearchIndexAlias,
  SearchIndexStatistics,
  SearchServiceStatistics,
  SynonymMap,
} from "./serviceModels.js";
import * as utils from "./serviceUtils.js";
import { previewServiceVersion } from "./serviceUtils.js";
import { tracingClient } from "./tracing.js";
import type { ClientOptions } from "@azure-rest/core-client";
import type { KnowledgeSourceStatus } from "./models/azure/search/documents/knowledgeBases/index.js";

/**
 * Client options used to configure AI Search API requests.
 */
export interface SearchIndexClientOptions extends ClientOptions {
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
 * Beta operations available on {@link SearchIndexClient} after calling
 * {@link SearchIndexClient.enableBeta}. These operations require the preview
 * API version and are subject to change.
 */
export interface SearchIndexClientBetaOperations {
  /**
   * Creates a new knowledge base.
   * @param knowledgeBase - definition of the knowledge base to create.
   * @param options - options parameters.
   */
  createKnowledgeBase(
    knowledgeBase: KnowledgeBase,
    options?: CreateKnowledgeBaseOptions,
  ): Promise<KnowledgeBase>;

  /**
   * Creates a new knowledge base or updates a knowledge base if it already exists.
   * @param knowledgeBaseName - name of the knowledge base to create or update.
   * @param knowledgeBase - definition of the knowledge base to create or update.
   * @param options - options parameters.
   */
  createOrUpdateKnowledgeBase(
    knowledgeBaseName: string,
    knowledgeBase: KnowledgeBase,
    options?: CreateOrUpdateKnowledgeBaseOptions,
  ): Promise<KnowledgeBase>;

  /**
   * Retrieves a knowledge base definition.
   * @param knowledgeBaseName - name of the knowledge base to retrieve.
   * @param options - options parameters.
   */
  getKnowledgeBase(
    knowledgeBaseName: string,
    options?: GetKnowledgeBaseOptions,
  ): Promise<KnowledgeBase>;

  /**
   * Retrieves a list of existing knowledge bases in the service.
   * @param options - Options to the list knowledge bases operation.
   */
  listKnowledgeBases(options?: ListKnowledgeBasesOptions): KnowledgeBaseIterator;

  /**
   * Deletes an existing knowledge base.
   * @param knowledgeBaseName - name of the knowledge base to delete.
   * @param options - options parameters.
   */
  deleteKnowledgeBase(
    knowledgeBaseName: string,
    options?: DeleteKnowledgeBaseOptions,
  ): Promise<void>;

  /**
   * Deletes an existing knowledge base.
   * @param knowledgeBase - the knowledge base to delete.
   * @param options - options parameters.
   */
  deleteKnowledgeBase(
    knowledgeBase: KnowledgeBase,
    options?: DeleteKnowledgeBaseOptions,
  ): Promise<void>;

  /**
   * Creates a new knowledge source or updates a knowledge source if it already exists.
   * @param sourceName - name of the knowledge source to create or update.
   * @param knowledgeSource - definition of the knowledge source to create or update.
   * @param options - options parameters.
   */
  createOrUpdateKnowledgeSource(
    sourceName: string,
    knowledgeSource: KnowledgeSource,
    options?: CreateOrUpdateKnowledgeSourceOptions,
  ): Promise<KnowledgeSource>;

  /**
   * Deletes an existing knowledge source.
   * @param sourceName - name of the knowledge source to delete.
   * @param options - options parameters.
   */
  deleteKnowledgeSource(sourceName: string, options?: DeleteKnowledgeSourceOptions): Promise<void>;

  /**
   * Deletes an existing knowledge source.
   * @param source - the knowledge source to delete.
   * @param options - options parameters.
   */
  deleteKnowledgeSource(
    source: KnowledgeSource,
    options?: DeleteKnowledgeSourceOptions,
  ): Promise<void>;

  /**
   * Retrieves a knowledge source definition.
   * @param sourceName - The name of the knowledge source to retrieve.
   * @param options - The options parameters.
   */
  getKnowledgeSource(
    sourceName: string,
    options?: GetKnowledgeSourceOptions,
  ): Promise<KnowledgeSource>;

  /**
   * Retrieves a list of existing knowledge sources in the service.
   * @param options - Options to the list knowledge sources operation.
   */
  listKnowledgeSources(options?: ListKnowledgeSourcesOptions): KnowledgeSourceIterator;

  /**
   * Creates a new knowledge source.
   * @param knowledgeSource - The definition of the knowledge source to create.
   * @param options - The options parameters.
   */
  createKnowledgeSource(
    knowledgeSource: KnowledgeSource,
    options?: CreateKnowledgeSourceOptions,
  ): Promise<KnowledgeSource>;

  /**
   * Returns the current status and synchronization history of a knowledge source.
   * @param sourceName - The name of the knowledge source for which to retrieve status.
   * @param options - The options parameters.
   */
  getKnowledgeSourceStatus(
    sourceName: string,
    options?: GetKnowledgeSourceStatusOptions,
  ): Promise<KnowledgeSourceStatus>;

  /**
   * Retrieves the KnowledgeRetrievalClient corresponding to this SearchIndexClient.
   * @param knowledgeBaseName - Name of the knowledge base
   * @param options - KnowledgeRetrievalClient Options
   */
  getKnowledgeRetrievalClient(
    knowledgeBaseName: string,
    options?: GetKnowledgeRetrievalClientOptions,
  ): KnowledgeRetrievalClient;

  /**
   * Retrieves a list of existing indexes in the service with statistics.
   * @param options - Options to the list index stats summary operation.
   */
  getIndexStatsSummary(options?: GetIndexStatsSummaryOptions): IndexStatisticsSummaryIterator;

  /**
   * Lists all aliases available for a search service.
   * @param options - The options parameters.
   */
  listAliases(options?: ListAliasesOptions): AliasIterator;

  /**
   * Creates a new search alias.
   * @param alias - The definition of the alias to create.
   * @param options - The options parameters.
   */
  createAlias(alias: SearchIndexAlias, options?: CreateAliasOptions): Promise<SearchIndexAlias>;

  /**
   * Creates a new search alias or updates an alias if it already exists.
   * @param alias - The definition of the alias to create or update.
   * @param options - The options parameters.
   */
  createOrUpdateAlias(
    alias: SearchIndexAlias,
    options?: CreateOrUpdateAliasOptions,
  ): Promise<SearchIndexAlias>;

  /**
   * Deletes a search alias and its associated mapping to an index. This operation is permanent,
   * with no recovery option. The mapped index is untouched by this operation.
   * @param aliasName - Name of the alias to delete.
   * @param options - Additional optional arguments.
   */
  deleteAlias(aliasName: string, options?: DeleteAliasOptions): Promise<void>;

  /**
   * Deletes a search alias and its associated mapping to an index. This operation is permanent,
   * with no recovery option. The mapped index is untouched by this operation.
   * @param alias - The alias to delete.
   * @param options - Additional optional arguments.
   */
  deleteAlias(alias: SearchIndexAlias, options?: DeleteAliasOptions): Promise<void>;

  /**
   * Retrieves an alias definition.
   * @param aliasName - The name of the alias to retrieve.
   * @param options - The options parameters.
   */
  getAlias(aliasName: string, options?: GetAliasOptions): Promise<SearchIndexAlias>;

  // --- Scenario B: stable operations returning wider model with preview properties ---

  /**
   * Retrieves a list of existing indexes in the service, including preview-only properties.
   * @param options - Options to the list index operation.
   */
  listIndexes(options?: ListIndexesOptions): BetaIndexIterator;

  /**
   * Retrieves information about an index, including preview-only properties.
   * @param indexName - The name of the index.
   * @param options - Additional optional arguments.
   */
  getIndex(indexName: string, options?: GetIndexOptions): Promise<BetaSearchIndex>;

  /**
   * Creates a new index and returns the result including preview-only properties.
   * @param index - The information describing the index to be created.
   * @param options - Additional optional arguments.
   */
  createIndex(index: SearchIndex, options?: CreateIndexOptions): Promise<BetaSearchIndex>;

  /**
   * Creates a new index or modifies an existing one, returning the result including
   * preview-only properties.
   * @param index - The information describing the index to be created.
   * @param options - Additional optional arguments.
   */
  createOrUpdateIndex(
    index: SearchIndex,
    options?: CreateOrUpdateIndexOptions,
  ): Promise<BetaSearchIndex>;
}

/**
 * The beta-enabled projection of {@link SearchIndexClient}. Returned by
 * {@link SearchIndexClient.enableBeta}. This is the same client instance with a
 * wider type that includes preview operations and wider return types.
 */
export type SearchIndexClientWithBeta = Omit<
  SearchIndexClient,
  "listIndexes" | "getIndex" | "createIndex" | "createOrUpdateIndex"
> &
  SearchIndexClientBetaOperations;

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
   * Whether beta operations have been activated on this instance.
   */
  private _betaActivated: boolean = false;

  /**
   * Creates an instance of SearchIndexClient.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleSearchIndexClient
   * import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";
   *
   * const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
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

    this.serviceVersion =
      this.options.serviceVersion ?? this.options.apiVersion ?? utils.defaultServiceVersion;
    this.apiVersion = this.serviceVersion;

    const internalClientPipelineOptions: SearchIndexClientOptionalParams = {
      ...this.options,
      apiVersion: this.serviceVersion,
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

    this.client = new GeneratedClient(this.endpoint, credential, internalClientPipelineOptions);
    this.pipeline = this.client.pipeline;

    // Replaced with a custom policy below
    this.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });

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

  /**
   * Retrieves a list of existing indexes in the service.
   * @param options - Options to the list index operation.
   */
  public listIndexes(options: ListIndexesOptions = {}): IndexIterator {
    return utils.mapPagedAsyncIterable(
      this.client.listIndexes(options),
      utils.generatedIndexToPublicIndex,
    );
  }

  /**
   * Retrieves a list of names of existing indexes in the service.
   * @param options - Options to the list index operation.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public listIndexesNames(options: ListIndexesOptions = {}): IndexNameIterator {
    return utils.mapPagedAsyncIterable(
      this.client.listIndexesWithSelectedProperties({ ...options, select: "name" }),
      (idx) => idx.name,
    );
  }

  /**
   * Retrieves a list of existing SynonymMaps in the service.
   * @param options - Options to the list SynonymMaps operation.
   */
  public async listSynonymMaps(options: ListSynonymMapsOptions = {}): Promise<Array<SynonymMap>> {
    return tracingClient.withSpan(
      "SearchIndexClient-listSynonymMaps",
      options,
      async (updatedOptions) => {
        const result = await this.client.getSynonymMaps(updatedOptions);
        return result.synonymMaps.map(utils.generatedSynonymMapToPublicSynonymMap);
      },
    );
  }

  /**
   * Retrieves a list of names of existing SynonymMaps in the service.
   * @param options - Options to the list SynonymMaps operation.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async listSynonymMapsNames(options: ListSynonymMapsOptions = {}): Promise<Array<string>> {
    return tracingClient.withSpan(
      "SearchIndexClient-listSynonymMapsNames",
      options,
      async (updatedOptions) => {
        const result = await this.client.getSynonymMaps({
          ...updatedOptions,
          select: "name",
        });
        return result.synonymMaps.map((sm) => sm.name);
      },
    );
  }

  /**
   * Retrieves information about an index.
   * @param indexName - The name of the index.
   * @param options - Additional optional arguments.
   */
  public async getIndex(indexName: string, options: GetIndexOptions = {}): Promise<SearchIndex> {
    return tracingClient.withSpan("SearchIndexClient-getIndex", options, async (updatedOptions) => {
      const result = await this.client.getIndex(indexName, updatedOptions);
      return utils.generatedIndexToPublicIndex(result);
    });
  }

  /**
   * Retrieves information about a SynonymMap.
   * @param synonymMapName - The name of the SynonymMap.
   * @param options - Additional optional arguments.
   */
  public async getSynonymMap(
    synonymMapName: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: GetSynonymMapsOptions = {},
  ): Promise<SynonymMap> {
    return tracingClient.withSpan(
      "SearchIndexClient-getSynonymMap",
      options,
      async (updatedOptions) => {
        const result = await this.client.getSynonymMap(synonymMapName, updatedOptions);
        return utils.generatedSynonymMapToPublicSynonymMap(result);
      },
    );
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
    return tracingClient.withSpan(
      "SearchIndexClient-createIndex",
      options,
      async (updatedOptions) => {
        const result = await this.client.createIndex(
          utils.publicIndexToGeneratedIndex(index),
          updatedOptions,
        );
        this.client.pipeline.removePolicy({ name: "debugPolicy" });
        return utils.generatedIndexToPublicIndex(result);
      },
    );
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
    return tracingClient.withSpan(
      "SearchIndexClient-createSynonymMaps",
      options,
      async (updatedOptions) => {
        const result = await this.client.createSynonymMap(
          utils.publicSynonymMapToGeneratedSynonymMap(synonymMap),
          updatedOptions,
        );
        return utils.generatedSynonymMapToPublicSynonymMap(result);
      },
    );
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
    return tracingClient.withSpan(
      "SearchIndexClient-createOrUpdateIndex",
      options,
      async (updatedOptions) => {
        const etag = options.onlyIfUnchanged ? index.etag : undefined;
        const result = await this.client.createOrUpdateIndex(
          utils.publicIndexToGeneratedIndex(index),
          index.name,
          { ...updatedOptions, ifMatch: etag },
        );
        return utils.generatedIndexToPublicIndex(result);
      },
    );
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
    return tracingClient.withSpan(
      "SearchIndexClient-createOrUpdateSynonymMap",
      options,
      async (updatedOptions) => {
        const etag = options.onlyIfUnchanged ? synonymMap.etag : undefined;

        const result = await this.client.createOrUpdateSynonymMap(
          utils.publicSynonymMapToGeneratedSynonymMap(synonymMap),
          synonymMap.name,
          {
            ...updatedOptions,
            ifMatch: etag,
          },
        );
        return utils.generatedSynonymMapToPublicSynonymMap(result);
      },
    );
  }

  /**
   * Deletes an existing index.
   * @param indexName - Name of the index to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteIndex(indexName: string, options?: DeleteIndexOptions): Promise<void>;

  /**
   * Deletes an existing index.
   * @param index - The index to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteIndex(index: SearchIndex, options?: DeleteIndexOptions): Promise<void>;
  public async deleteIndex(
    index: string | SearchIndex,
    options: DeleteIndexOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexClient-deleteIndex",
      options,
      async (updatedOptions) => {
        const indexName: string = typeof index === "string" ? index : index.name;
        const etag =
          typeof index === "string" ? undefined : options.onlyIfUnchanged ? index.etag : undefined;

        await this.client.deleteIndex(indexName, {
          ...updatedOptions,
          ifMatch: etag,
        });
      },
    );
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
    return tracingClient.withSpan(
      "SearchIndexClient-deleteSynonymMap",
      options,
      async (updatedOptions) => {
        const synonymMapName: string =
          typeof synonymMap === "string" ? synonymMap : synonymMap.name;
        const etag =
          typeof synonymMap === "string"
            ? undefined
            : options.onlyIfUnchanged
              ? synonymMap.etag
              : undefined;

        await this.client.deleteSynonymMap(synonymMapName, {
          ...updatedOptions,
          ifMatch: etag,
        });
      },
    );
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
    return tracingClient.withSpan(
      "SearchIndexClient-getIndexStatistics",
      options,
      async (updatedOptions) => {
        return this.client.getIndexStatistics(indexName, updatedOptions);
      },
    );
  }

  /**
   * Calls an analyzer or tokenizer manually on provided text.
   * @param indexName - The name of the index that contains the field to analyze
   * @param text - The text to break into tokens.
   * @param options - Additional arguments
   */
  public async analyzeText(indexName: string, options: AnalyzeTextOptions): Promise<AnalyzeResult> {
    const { abortSignal, requestOptions, tracingOptions, ...restOptions } = options;

    const operationOptions = {
      abortSignal,
      requestOptions,
      tracingOptions,
    };

    return tracingClient.withSpan(
      "SearchIndexClient-analyzeText",
      operationOptions,
      async (updatedOptions) => {
        return this.client.analyzeText({ ...restOptions }, indexName, updatedOptions);
      },
    );
  }

  /**
   * Retrieves statistics about the service, such as the count of documents, index, etc.
   * @param options - Additional optional arguments.
   */
  public async getServiceStatistics(
    options: GetServiceStatisticsOptions = {},
  ): Promise<SearchServiceStatistics> {
    return tracingClient.withSpan(
      "SearchIndexClient-getServiceStatistics",
      options,
      async (updatedOptions) => {
        return this.client.getServiceStatistics(updatedOptions);
      },
    );
  }

  /**
   * Activates preview (beta) operations on this client instance and returns
   * it with a wider type that includes preview operations and wider return types.
   *
   * After calling this method, the returned reference exposes all preview operations
   * such as Knowledge Base and Knowledge Source management, and the API version
   * will be upgraded to the latest preview version (unless explicitly set
   * in the constructor options).
   *
   * This method is idempotent — calling it more than once has no additional effect.
   *
   * @example
   * ```ts snippet:SearchIndexClient_enableBeta
   * import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";
   *
   * const endpoint = "<endpoint>";
   * const credential = new AzureKeyCredential("<apiKey>");
   * const client = new SearchIndexClient(endpoint, credential).enableBeta();
   * ```
   */
  public enableBeta(): SearchIndexClientWithBeta {
    if (this._betaActivated) {
      return this as unknown as SearchIndexClientWithBeta;
    }
    this._betaActivated = true;

    // Upgrade the API version to preview unless the user explicitly set one
    if (!this.options.serviceVersion && !this.options.apiVersion) {
      (this as { serviceVersion: string }).serviceVersion = previewServiceVersion;
      (this as { apiVersion: string }).apiVersion = previewServiceVersion;
      // Mutate the generated client's internal context to use the preview version
      this.client["_client"].apiVersion = previewServiceVersion;
    }

    const generatedClient = this.client;
    const endpoint = this.endpoint;
    const credential = this.credential;
    const options = this.options;

    const betaOperations: SearchIndexClientBetaOperations = {
      createKnowledgeBase(
        knowledgeBase: KnowledgeBase,
        opts: CreateKnowledgeBaseOptions = {},
      ): Promise<KnowledgeBase> {
        return tracingClient.withSpan(
          "SearchIndexClient-createKnowledgeBase",
          opts,
          async (updatedOptions) => {
            const result = await generatedClient.createKnowledgeBase(
              utils.convertKnowledgeBaseToGenerated(knowledgeBase)!,
              updatedOptions,
            );
            return utils.convertKnowledgeBaseToPublic(result)!;
          },
        );
      },

      createOrUpdateKnowledgeBase(
        knowledgeBaseName: string,
        knowledgeBase: KnowledgeBase,
        opts: CreateOrUpdateKnowledgeBaseOptions = {},
      ): Promise<KnowledgeBase> {
        return tracingClient.withSpan(
          "SearchIndexClient-createOrUpdateKnowledgeBase",
          opts,
          async (updatedOptions) => {
            const etag = opts.onlyIfUnchanged ? knowledgeBase.etag : undefined;
            const result = await generatedClient.createOrUpdateKnowledgeBase(
              utils.convertKnowledgeBaseToGenerated(knowledgeBase)!,
              knowledgeBaseName,
              {
                ...updatedOptions,
                ifMatch: etag,
              },
            );
            return utils.convertKnowledgeBaseToPublic(result)!;
          },
        );
      },

      getKnowledgeBase(
        knowledgeBaseName: string,
        opts: GetKnowledgeBaseOptions = {},
      ): Promise<KnowledgeBase> {
        return tracingClient.withSpan(
          "SearchIndexClient-getKnowledgeBase",
          opts,
          async (updatedOptions) => {
            const result = await generatedClient.getKnowledgeBase(
              knowledgeBaseName,
              updatedOptions,
            );
            return utils.convertKnowledgeBaseToPublic(result);
          },
        );
      },

      listKnowledgeBases(opts: ListKnowledgeBasesOptions = {}): KnowledgeBaseIterator {
        return utils.mapPagedAsyncIterable(
          generatedClient.listKnowledgeBases(opts),
          utils.convertKnowledgeBaseToPublic,
        );
      },

      deleteKnowledgeBase(
        knowledgeBase: string | KnowledgeBase,
        opts: DeleteKnowledgeBaseOptions = {},
      ): Promise<void> {
        return tracingClient.withSpan(
          "SearchIndexClient-deleteKnowledgeBase",
          opts,
          async (updatedOptions) => {
            const knowledgeBaseName =
              typeof knowledgeBase === "string" ? knowledgeBase : knowledgeBase.name;
            const etag =
              typeof knowledgeBase !== "string" && opts.onlyIfUnchanged
                ? knowledgeBase.etag
                : undefined;

            const result = await generatedClient.deleteKnowledgeBase(knowledgeBaseName, {
              ...updatedOptions,
              ifMatch: etag,
            });
            return result;
          },
        );
      },

      createOrUpdateKnowledgeSource(
        sourceName: string,
        knowledgeSource: KnowledgeSource,
        opts: CreateOrUpdateKnowledgeSourceOptions = {},
      ): Promise<KnowledgeSource> {
        return tracingClient.withSpan(
          "SearchIndexClient-createOrUpdateKnowledgeSource",
          opts,
          async (updatedOptions) => {
            const etag = opts.onlyIfUnchanged ? knowledgeSource.etag : undefined;
            const result = await generatedClient.createOrUpdateKnowledgeSource(
              utils.convertKnowledgeSourceToGenerated(knowledgeSource)!,
              sourceName,
              {
                ...updatedOptions,
                ifMatch: etag,
              },
            );
            return utils.convertKnowledgeSourceToPublic(result)!;
          },
        );
      },

      deleteKnowledgeSource(
        source: string | KnowledgeSource,
        opts: DeleteKnowledgeSourceOptions = {},
      ): Promise<void> {
        return tracingClient.withSpan(
          "SearchIndexClient-deleteKnowledgeSource",
          opts,
          async (updatedOptions) => {
            const sourceName = typeof source === "string" ? source : source.name;
            const etag =
              typeof source !== "string" && opts.onlyIfUnchanged ? source.etag : undefined;

            return generatedClient.deleteKnowledgeSource(sourceName, {
              ...updatedOptions,
              ifMatch: etag,
            });
          },
        );
      },

      getKnowledgeSource(
        sourceName: string,
        opts: GetKnowledgeSourceOptions = {},
      ): Promise<KnowledgeSource> {
        return tracingClient.withSpan(
          "SearchIndexClient-getKnowledgeSource",
          opts,
          async (updatedOptions) => {
            const result = await generatedClient.getKnowledgeSource(sourceName, updatedOptions);
            return utils.convertKnowledgeSourceToPublic(result)!;
          },
        );
      },

      listKnowledgeSources(opts: ListKnowledgeSourcesOptions = {}): KnowledgeSourceIterator {
        return utils.mapPagedAsyncIterable(
          generatedClient.listKnowledgeSources(opts),
          (ks) => utils.convertKnowledgeSourceToPublic(ks)!,
        );
      },

      createKnowledgeSource(
        knowledgeSource: KnowledgeSource,
        opts: CreateKnowledgeSourceOptions = {},
      ): Promise<KnowledgeSource> {
        return tracingClient.withSpan(
          "SearchIndexClient-createKnowledgeSource",
          opts,
          async (updatedOptions) => {
            const result = await generatedClient.createKnowledgeSource(
              utils.convertKnowledgeSourceToGenerated(knowledgeSource)!,
              updatedOptions,
            );
            return utils.convertKnowledgeSourceToPublic(result)!;
          },
        );
      },

      getKnowledgeSourceStatus(
        sourceName: string,
        opts: GetKnowledgeSourceStatusOptions = {},
      ): Promise<KnowledgeSourceStatus> {
        return tracingClient.withSpan(
          "SearchIndexClient-getKnowledgeSourceStatus",
          opts,
          async (updatedOptions) => {
            return generatedClient.getKnowledgeSourceStatus(sourceName, updatedOptions);
          },
        );
      },

      getKnowledgeRetrievalClient(
        knowledgeBaseName: string,
        opts?: GetKnowledgeRetrievalClientOptions,
      ): KnowledgeRetrievalClient {
        return new KnowledgeRetrievalClient(
          endpoint,
          knowledgeBaseName,
          credential,
          opts || options,
        );
      },

      getIndexStatsSummary(opts: GetIndexStatsSummaryOptions = {}): IndexStatisticsSummaryIterator {
        return generatedClient.listIndexStatsSummary(opts);
      },

      listAliases(opts: ListAliasesOptions = {}): AliasIterator {
        return generatedClient.listAliases(opts);
      },

      createAlias(
        alias: SearchIndexAlias,
        opts: CreateAliasOptions = {},
      ): Promise<SearchIndexAlias> {
        return tracingClient.withSpan(
          "SearchIndexClient-createAlias",
          opts,
          async (updatedOptions) => {
            return generatedClient.createAlias(alias, updatedOptions);
          },
        );
      },

      createOrUpdateAlias(
        alias: SearchIndexAlias,
        opts: CreateOrUpdateAliasOptions = {},
      ): Promise<SearchIndexAlias> {
        return tracingClient.withSpan(
          "SearchIndexClient-createOrUpdateAlias",
          opts,
          async (updatedOptions) => {
            const etag = opts.onlyIfUnchanged ? alias.etag : undefined;
            return generatedClient.createOrUpdateAlias(alias, alias.name, {
              ...updatedOptions,
              ifMatch: etag,
            });
          },
        );
      },

      deleteAlias(alias: string | SearchIndexAlias, opts: DeleteAliasOptions = {}): Promise<void> {
        return tracingClient.withSpan(
          "SearchIndexClient-deleteAlias",
          opts,
          async (updatedOptions) => {
            const aliasName: string = typeof alias === "string" ? alias : alias.name;
            const etag =
              typeof alias === "string" ? undefined : opts.onlyIfUnchanged ? alias.etag : undefined;

            await generatedClient.deleteAlias(aliasName, {
              ...updatedOptions,
              ifMatch: etag,
            });
          },
        );
      },

      getAlias(aliasName: string, opts: GetAliasOptions = {}): Promise<SearchIndexAlias> {
        return tracingClient.withSpan(
          "SearchIndexClient-getAlias",
          opts,
          async (updatedOptions) => {
            return generatedClient.getAlias(aliasName, updatedOptions);
          },
        );
      },

      // --- Scenario B: stable operations returning wider model with preview properties ---

      listIndexes(opts: ListIndexesOptions = {}): BetaIndexIterator {
        return utils.mapPagedAsyncIterable(
          generatedClient.listIndexes(opts),
          utils.generatedIndexToPublicIndex,
        );
      },

      getIndex(indexName: string, opts: GetIndexOptions = {}): Promise<BetaSearchIndex> {
        return tracingClient.withSpan(
          "SearchIndexClient-getIndex",
          opts,
          async (updatedOptions) => {
            const result = await generatedClient.getIndex(indexName, updatedOptions);
            return utils.generatedIndexToPublicIndex(result);
          },
        );
      },

      createIndex(index: SearchIndex, opts: CreateIndexOptions = {}): Promise<BetaSearchIndex> {
        return tracingClient.withSpan(
          "SearchIndexClient-createIndex",
          opts,
          async (updatedOptions) => {
            const result = await generatedClient.createIndex(
              utils.publicIndexToGeneratedIndex(index),
              updatedOptions,
            );
            generatedClient.pipeline.removePolicy({ name: "debugPolicy" });
            return utils.generatedIndexToPublicIndex(result);
          },
        );
      },

      createOrUpdateIndex(
        index: SearchIndex,
        opts: CreateOrUpdateIndexOptions = {},
      ): Promise<BetaSearchIndex> {
        return tracingClient.withSpan(
          "SearchIndexClient-createOrUpdateIndex",
          opts,
          async (updatedOptions) => {
            const etag = opts.onlyIfUnchanged ? index.etag : undefined;
            const result = await generatedClient.createOrUpdateIndex(
              utils.publicIndexToGeneratedIndex(index),
              index.name,
              { ...updatedOptions, ifMatch: etag },
            );
            return utils.generatedIndexToPublicIndex(result);
          },
        );
      },
    };

    Object.assign(this, betaOperations);

    return this as unknown as SearchIndexClientWithBeta;
  }

  /**
   * Retrieves the SearchClient corresponding to this SearchIndexClient
   * @param indexName - Name of the index
   * @param options - SearchClient Options
   * @typeParam TModel - An optional type that represents the documents stored in the search index.
   * For the best typing experience, all non-key fields should be marked optional and nullable, and
   * the key property should have the non-nullable type `string`.
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
