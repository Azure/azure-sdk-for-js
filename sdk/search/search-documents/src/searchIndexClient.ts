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
   * Lists all aliases available for a search service.
   * @param options - The options parameters.
   */
  public listAliases(options: ListAliasesOptions = {}): AliasIterator {
    return this.client.listAliases(options);
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
   * Creates a new search alias or updates an alias if it already exists.
   * @param alias - The definition of the alias to create or update.
   * @param options - The options parameters.
   */
  public async createOrUpdateAlias(
    alias: SearchIndexAlias,
    options: CreateOrUpdateAliasOptions = {},
  ): Promise<SearchIndexAlias> {
    return tracingClient.withSpan(
      "SearchIndexClient-createOrUpdateAlias",
      options,
      async (updatedOptions) => {
        const etag = options.onlyIfUnchanged ? alias.etag : undefined;
        return this.client.createOrUpdateAlias(alias, alias.name, {
          ...updatedOptions,
          ifMatch: etag,
        });
      },
    );
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
    return tracingClient.withSpan(
      "SearchIndexClient-createAlias",
      options,
      async (updatedOptions) => {
        return this.client.createAlias(alias, updatedOptions);
      },
    );
  }

  /**
   * Deletes a search alias and its associated mapping to an index. This operation is permanent,
   * with no recovery option. The mapped index is untouched by this operation.
   * @param aliasName - Name of the alias to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteAlias(aliasName: string, options?: DeleteAliasOptions): Promise<void>;

  /**
   * Deletes a search alias and its associated mapping to an index. This operation is permanent,
   * with no recovery option. The mapped index is untouched by this operation.
   * @param alias - The alias to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteAlias(alias: SearchIndexAlias, options?: DeleteAliasOptions): Promise<void>;
  public async deleteAlias(
    alias: string | SearchIndexAlias,
    options: DeleteAliasOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexClient-deleteAlias",
      options,
      async (updatedOptions) => {
        const aliasName: string = typeof alias === "string" ? alias : alias.name;
        const etag =
          typeof alias === "string" ? undefined : options.onlyIfUnchanged ? alias.etag : undefined;

        await this.client.deleteAlias(aliasName, {
          ...updatedOptions,
          ifMatch: etag,
        });
      },
    );
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
    return tracingClient.withSpan("SearchIndexClient-getAlias", options, async (updatedOptions) => {
      return this.client.getAlias(aliasName, updatedOptions);
    });
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
   * Retrieves a list of existing indexes in the service.
   * @param options - Options to the list index operation.
   */
  public getIndexStatsSummary(
    options: GetIndexStatsSummaryOptions = {},
  ): IndexStatisticsSummaryIterator {
    return this.client.listIndexStatsSummary(options);
  }

  /**
   * Creates a new knowledgebase.
   * @param knowledgeBase - definition of the knowledgebase to create.
   * @param options - options parameters.
   */
  public async createKnowledgeBase(
    knowledgeBase: KnowledgeBase,
    options: CreateKnowledgeBaseOptions = {},
  ): Promise<KnowledgeBase> {
    return tracingClient.withSpan(
      "SearchIndexClient-createKnowledgeBase",
      options,
      async (updatedOptions) => {
        const result = await this.client.createKnowledgeBase(
          utils.convertKnowledgeBaseToGenerated(knowledgeBase)!,
          updatedOptions,
        );
        return utils.convertKnowledgeBaseToPublic(result)!;
      },
    );
  }

  /**
   * Creates a new knowledge base or updates a knowledge base if it already exists.
   * @param knowledgeBaseName - name of the knowledge base to create or update.
   * @param knowledgeBase - definition of the knowledge base to create or update.
   * @param options - options parameters.
   */
  public async createOrUpdateKnowledgeBase(
    knowledgeBaseName: string,
    knowledgeBase: KnowledgeBase,
    options: CreateOrUpdateKnowledgeBaseOptions = {},
  ): Promise<KnowledgeBase> {
    return tracingClient.withSpan(
      "SearchIndexClient-createOrUpdateKnowledgeBase",
      options,
      async (updatedOptions) => {
        const etag = options.onlyIfUnchanged ? knowledgeBase.etag : undefined;
        const result = await this.client.createOrUpdateKnowledgeBase(
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
  }

  /**
   * Retrieves a knowledge base definition.
   * @param knowledgeBaseName - name of the knowledge base to retrieve.
   * @param options - options parameters.
   */
  public async getKnowledgeBase(
    knowledgeBaseName: string,
    options: GetKnowledgeBaseOptions = {},
  ): Promise<KnowledgeBase> {
    return tracingClient.withSpan(
      "SearchIndexClient-getKnowledgeBase",
      options,
      async (updatedOptions) => {
        const result = await this.client.getKnowledgeBase(knowledgeBaseName, updatedOptions);
        return utils.convertKnowledgeBaseToPublic(result);
      },
    );
  }

  /**
   * Retrieves a list of existing KnowledgeBases in the service.
   * @param options - Options to the list knowledge bases operation.
   */
  public listKnowledgeBases(options: ListKnowledgeBasesOptions = {}): KnowledgeBaseIterator {
    return utils.mapPagedAsyncIterable(
      this.client.listKnowledgeBases(options),
      utils.convertKnowledgeBaseToPublic,
    );
  }

  /**
   * Deletes an existing knowledge base.
   * @param knowledgeBaseName - name of the knowledge base to delete.
   * @param options - options parameters.
   */
  public async deleteKnowledgeBase(
    knowledgeBaseName: string,
    options?: DeleteKnowledgeBaseOptions,
  ): Promise<void>;
  /**
   * Deletes an existing knowledge base.
   * @param knowledgeBase - the knowledge base to delete.
   * @param options - options parameters.
   */
  public async deleteKnowledgeBase(
    knowledgeBase: KnowledgeBase,
    options?: DeleteKnowledgeBaseOptions,
  ): Promise<void>;
  public async deleteKnowledgeBase(
    knowledgeBase: string | KnowledgeBase,
    options: DeleteKnowledgeBaseOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexClient-deleteKnowledgeBase",
      options,
      async (updatedOptions) => {
        const knowledgeBaseName =
          typeof knowledgeBase === "string" ? knowledgeBase : knowledgeBase.name;
        const etag =
          typeof knowledgeBase !== "string" && options.onlyIfUnchanged
            ? knowledgeBase.etag
            : undefined;

        const result = await this.client.deleteKnowledgeBase(knowledgeBaseName, {
          ...updatedOptions,
          ifMatch: etag,
        });
        return result;
      },
    );
  }

  public async createOrUpdateKnowledgeSource(
    sourceName: string,
    knowledgeSource: KnowledgeSource,
    options: CreateOrUpdateKnowledgeSourceOptions = {},
  ): Promise<KnowledgeSource> {
    return tracingClient.withSpan(
      "SearchIndexClient-createOrUpdateKnowledgeSource",
      options,
      async (updatedOptions) => {
        const etag = options.onlyIfUnchanged ? knowledgeSource.etag : undefined;
        const result = await this.client.createOrUpdateKnowledgeSource(
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
  }

  /**
   * Deletes an existing source.
   * @param sourceName - name of the knowledge source to delete.
   * @param options - options parameters.
   */
  public async deleteKnowledgeSource(
    sourceName: string,
    options?: DeleteKnowledgeSourceOptions,
  ): Promise<void>;
  /**
   * Deletes an existing source.
   * @param source - the knowledge source to delete.
   * @param options - options parameters.
   */
  public async deleteKnowledgeSource(
    source: KnowledgeSource,
    options?: DeleteKnowledgeSourceOptions,
  ): Promise<void>;
  public async deleteKnowledgeSource(
    source: string | KnowledgeSource,
    options: DeleteKnowledgeSourceOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexClient-deleteKnowledgeSource",
      options,
      async (updatedOptions) => {
        const sourceName = typeof source === "string" ? source : source.name;
        const etag =
          typeof source !== "string" && options.onlyIfUnchanged ? source.etag : undefined;

        return this.client.deleteKnowledgeSource(sourceName, { ...updatedOptions, ifMatch: etag });
      },
    );
  }

  /**
   * Retrieves a knowledge source definition.
   * @param sourceName - The name of the knowledge source to retrieve.
   * @param options - The options parameters.
   */
  public async getKnowledgeSource(
    sourceName: string,
    options: GetKnowledgeSourceOptions = {},
  ): Promise<KnowledgeSource> {
    return tracingClient.withSpan(
      "SearchIndexClient-getKnowledgeSource",
      options,
      async (updatedOptions) => {
        const result = await this.client.getKnowledgeSource(sourceName, updatedOptions);
        return utils.convertKnowledgeSourceToPublic(result)!;
      },
    );
  }
  /**
   * Retrieves a list of existing KnowledgeSources in the service.
   * @param options - Options to the list knowledge sources operation.
   */
  public listKnowledgeSources(options: ListKnowledgeSourcesOptions = {}): KnowledgeSourceIterator {
    return utils.mapPagedAsyncIterable(
      this.client.listKnowledgeSources(options),
      (ks) => utils.convertKnowledgeSourceToPublic(ks)!,
    );
  }

  /**
   * Creates a new knowledge source.
   * @param knowledgeSource - The definition of the knowledge source to create.
   * @param options - The options parameters.
   */
  public async createKnowledgeSource(
    knowledgeSource: KnowledgeSource,
    options: CreateKnowledgeSourceOptions = {},
  ): Promise<KnowledgeSource> {
    return tracingClient.withSpan(
      "SearchIndexClient-createKnowledgeSource",
      options,
      async (updatedOptions) => {
        const result = await this.client.createKnowledgeSource(
          utils.convertKnowledgeSourceToGenerated(knowledgeSource)!,
          updatedOptions,
        );
        return utils.convertKnowledgeSourceToPublic(result)!;
      },
    );
  }

  /**
   * Returns the current status and synchronization history of a knowledge source.
   * @param sourceName - The name of the knowledge source for which to retrieve status.
   * @param options - The options parameters.
   */
  public async getKnowledgeSourceStatus(
    sourceName: string,
    options: GetKnowledgeSourceStatusOptions = {},
  ): Promise<KnowledgeSourceStatus> {
    return tracingClient.withSpan(
      "SearchIndexClient-getKnowledgeSourceStatus",
      options,
      async (updatedOptions) => {
        return this.client.getKnowledgeSourceStatus(sourceName, updatedOptions);
      },
    );
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

  /**
   * Retrieves the KnowledgeRetrievalClient corresponding to this SearchIndexClient
   * @param knowledgeBaseName - Name of the knowledge base
   * @param options - KnowledgeRetrievalClient Options
   */
  public getKnowledgeRetrievalClient(
    knowledgeBaseName: string,
    options?: GetKnowledgeRetrievalClientOptions,
  ): KnowledgeRetrievalClient {
    return new KnowledgeRetrievalClient(
      this.endpoint,
      knowledgeBaseName,
      this.credential,
      options || this.options,
    );
  }
}
