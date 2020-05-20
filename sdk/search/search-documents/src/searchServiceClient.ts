// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  operationOptionsToRequestOptionsBase,
  PipelineOptions,
  ServiceClientCredentials
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import { SDK_VERSION } from "./constants";
import {
  AnalyzeResult,
  GetIndexStatisticsResult,
  Indexer,
  IndexerExecutionInfo,
  ServiceStatistics
} from "./generated/service/models";
import { SearchServiceClient as GeneratedClient } from "./generated/service/searchServiceClient";
import { logger } from "./logger";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import {
  AnalyzeTextOptions,
  CreateIndexOptions,
  CreateOrUpdateIndexOptions,
  CreateOrUpdateSkillsetOptions,
  CreateOrUpdateSynonymMapOptions,
  CreateSkillsetOptions,
  CreateSynonymMapOptions,
  DeleteIndexOptions,
  DeleteSkillsetOptions,
  DeleteSynonymMapOptions,
  GetIndexOptions,
  GetIndexStatisticsOptions,
  GetSkillSetOptions,
  GetSynonymMapsOptions,
  Index,
  ListIndexesOptions,
  ListSkillsetsOptions,
  ListSynonymMapsOptions,
  Skillset,
  SynonymMap,
  ListIndexersOptions,
  CreateIndexerOptions,
  GetIndexerOptions,
  CreateorUpdateIndexerOptions,
  DeleteIndexerOptions,
  GetIndexerStatusOptions,
  ResetIndexerOptions,
  RunIndexerOptions,
  ListDataSourcesOptions,
  DataSource,
  CreateDataSourceOptions,
  DeleteDataSourceOptions,
  GetDataSourceOptions,
  CreateorUpdateDataSourceOptions,
  GetServiceStatisticsOptions
} from "./serviceModels";
import * as utils from "./serviceUtils";
import { createSpan } from "./tracing";
import { odataMetadataPolicy } from "./odataMetadataPolicy";
import { SearchClient, SearchClientOptions } from "./searchClient";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchServiceClientOptions = PipelineOptions;

/**
 * Class to perform operations to manage
 * (create, update, list/delete)
 * indexes, skillssets, synonymmaps, etc.
 */
export class SearchServiceClient {
  /**
   * The API version to use when communicating with the service.
   */
  public readonly apiVersion: string = "2019-05-06-Preview";

  /**
   * The endpoint of the search service
   */
  public readonly endpoint: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated SearchServiceClient
   */
  private readonly client: GeneratedClient;

  private readonly credential: KeyCredential;

  private readonly options: SearchServiceClientOptions;

  /**
   * Creates an instance of SearchServiceClient.
   *
   * Example usage:
   * ```ts
   * const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");
   *
   * const client = new SearchServiceClient(
   *   "<endpoint>",
   *   new AzureKeyCredential("<Admin Key>");
   * );
   * ```
   * @param {string} endpoint The endpoint of the search service
   * @param {KeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchServiceClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential,
    options: SearchServiceClientOptions = {}
  ) {
    this.endpoint = endpoint;
    this.credential = credential;
    this.options = options;

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

    // The contract with the generated client requires a credential, even though it is never used
    // when a pipeline is provided. Until that contract can be changed, this dummy credential will
    // throw an error if the client ever attempts to use it.
    const dummyCredential: ServiceClientCredentials = {
      signRequest() {
        throw new Error(
          "Internal error: Attempted to use credential from service client, but a pipeline was provided."
        );
      }
    };

    const pipeline = createPipelineFromOptions(
      internalPipelineOptions,
      createSearchApiKeyCredentialPolicy(credential)
    );

    if (Array.isArray(pipeline.requestPolicyFactories)) {
      pipeline.requestPolicyFactories.unshift(odataMetadataPolicy("minimal"));
    }

    this.client = new GeneratedClient(dummyCredential, this.apiVersion, this.endpoint, pipeline);
  }

  /**
   * Retrieves the SearchClient corresponding to this SearchServiceClient
   * @param indexName Name of the index
   * @param options SearchClient Options
   */
  public getSearchClient<T>(indexName: string, options?: SearchClientOptions): SearchClient<T> {
    return new SearchClient<T>(this.endpoint, indexName, this.credential, options || this.options);
  }

  /**
   * Retrieves a list of existing indexes in the service.
   * @param options Options to the list index operation.
   */
  public async listIndexes<Fields extends keyof Index>(
    options: ListIndexesOptions<Fields> = {}
  ): Promise<Array<Pick<Index, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-listIndexes", options);
    try {
      const result = await this.client.indexes.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: updatedOptions.select?.join(",")
      });
      return result.indexes.map(utils.generatedIndexToPublicIndex);
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
   * Retrieves a list of existing Skillsets in the service.
   * @param options Options to the list Skillsets operation.
   */
  public async listSkillsets<Fields extends keyof Skillset>(
    options: ListSkillsetsOptions<Fields> = {}
  ): Promise<Array<Pick<Skillset, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-listSkillsets", options);
    try {
      const result = await this.client.skillsets.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: updatedOptions.select?.join(",")
      });
      return result.skillsets.map(utils.generatedSkillsetToPublicSkillset);
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
   * Retrieves a list of existing SynonymMaps in the service.
   * @param options Options to the list SynonymMaps operation.
   */
  public async listSynonymMaps<Fields extends keyof SynonymMap>(
    options: ListSynonymMapsOptions<Fields> = {}
  ): Promise<Array<Pick<SynonymMap, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-listSynonymMaps", options);
    try {
      const result = await this.client.synonymMaps.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: updatedOptions.select?.join(",")
      });
      return result.synonymMaps.map(utils.generatedSynonymMapToPublicSynonymMap);
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
   * Retrieves a list of existing indexers in the service.
   * @param options Options to the list indexers operation.
   */
  public async listIndexers<Fields extends keyof Indexer>(
    options: ListIndexersOptions<Fields> = {}
  ): Promise<Array<Pick<Indexer, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-listIndexers", options);
    try {
      const result = await this.client.indexers.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: updatedOptions.select?.join(",")
      });
      return result.indexers;
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
   * Retrieves a list of existing data sources in the service.
   * @param options Options to the list indexers operation.
   */
  public async listDataSources<Fields extends keyof DataSource>(
    options: ListDataSourcesOptions<Fields> = {}
  ): Promise<Array<Pick<DataSource, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-listDataSources", options);
    try {
      const result = await this.client.dataSources.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: updatedOptions.select?.join(",s")
      });
      return result.dataSources.map(utils.generatedDataSourceToPublicDataSource);
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
   * Retrieves information about an index.
   * @param indexName The name of the index.
   * @param options Additional optional arguments.
   */
  public async getIndex(indexName: string, options: GetIndexOptions = {}): Promise<Index> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-getIndex", options);
    try {
      const result = await this.client.indexes.get(
        indexName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedIndexToPublicIndex(result);
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
   * Retrieves information about an Skillset.
   * @param indexName The name of the Skillset.
   * @param options Additional optional arguments.
   */
  public async getSkillset(
    skillsetName: string,
    options: GetSkillSetOptions = {}
  ): Promise<Skillset> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-getSkillset", options);
    try {
      const result = await this.client.skillsets.get(
        skillsetName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSkillsetToPublicSkillset(result);
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
   * Retrieves information about a SynonymMap.
   * @param indexName The name of the Skillset.
   * @param options Additional optional arguments.
   */
  public async getSynonymMap(
    synonymMapName: string,
    options: GetSynonymMapsOptions = {}
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-getSynonymMaps", options);
    try {
      const result = await this.client.synonymMaps.get(
        synonymMapName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSynonymMapToPublicSynonymMap(result);
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
   * Retrieves information about an Indexer.
   * @param indexerName The name of the Indexer.
   * @param options Additional optional arguments.
   */
  public async getIndexer(indexerName: string, options: GetIndexerOptions = {}): Promise<Indexer> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-getIndexer", options);
    try {
      const result = await this.client.indexers.get(
        indexerName,
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

  /**
   * Retrieves information about a DataSource
   * @param dataSourceName The name of the DataSource
   * @param options Additional optional arguments
   */
  public async getDataSource(
    dataSourceName: string,
    options: GetDataSourceOptions = {}
  ): Promise<DataSource> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-getDataSource", options);
    try {
      const result = await this.client.dataSources.get(
        dataSourceName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedDataSourceToPublicDataSource(result);
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
   * Creates a new index.
   * @param index The information describing the index to be created.
   * @param options Additional optional arguments.
   */
  public async createIndex(index: Index, options: CreateIndexOptions = {}): Promise<Index> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-createIndex", options);
    try {
      const result = await this.client.indexes.create(
        utils.publicIndexToGeneratedIndex(index),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedIndexToPublicIndex(result);
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
   * Creates a new skillset in a search service.
   * @param skillset The skillset containing one or more skills to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createSkillset(
    skillset: Skillset,
    options: CreateSkillsetOptions = {}
  ): Promise<Skillset> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-createSkillset", options);
    try {
      const result = await this.client.skillsets.create(
        utils.publicSkillsetToGeneratedSkillset(skillset),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSkillsetToPublicSkillset(result);
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
   * Creates a new SynonymMap in a search service.
   * @param synonymMap The synonymMap definition to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createSynonymMap(
    synonymMap: SynonymMap,
    options: CreateSynonymMapOptions = {}
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-createSynonymMaps", options);
    try {
      const result = await this.client.synonymMaps.create(
        utils.publicSynonymMapToGeneratedSynonymMap(synonymMap),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSynonymMapToPublicSynonymMap(result);
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
   * Creates a new indexer in a search service.
   * @param indexer The indexer definition to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createIndexer(
    indexer: Indexer,
    options: CreateIndexerOptions = {}
  ): Promise<Indexer> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-createIndexer", options);
    try {
      const result = await this.client.indexers.create(
        indexer,
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

  /**
   * Creates a new dataSource in a search service.
   * @param dataSource The dataSource definition to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createDataSource(
    dataSource: DataSource,
    options: CreateDataSourceOptions = {}
  ): Promise<DataSource> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-createDataSource", options);
    try {
      const result = await this.client.dataSources.create(
        dataSource,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedDataSourceToPublicDataSource(result);
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
   * Creates a new index or modifies an existing one.
   * @param index The information describing the index to be created.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateIndex(
    index: Index,
    options: CreateOrUpdateIndexOptions = {}
  ): Promise<Index> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-createOrUpdateIndex", options);
    try {
      const result = await this.client.indexes.createOrUpdate(
        index.name,
        utils.publicIndexToGeneratedIndex(index),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedIndexToPublicIndex(result);
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
   * Creates a new Skillset or modifies an existing one.
   * @param skillset The information describing the index to be created.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateSkillset(
    skillset: Skillset,
    options: CreateOrUpdateSkillsetOptions = {}
  ): Promise<Skillset> {
    const { span, updatedOptions } = createSpan(
      "SearchServiceClient-createOrUpdateSkillset",
      options
    );
    try {
      const result = await this.client.skillsets.createOrUpdate(
        skillset.name,
        utils.publicSkillsetToGeneratedSkillset(skillset),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSkillsetToPublicSkillset(result);
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
   * Creates a new SynonymMap or modifies an existing one.
   * @param synonymMap The information describing the SynonymMap to be created.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateSynonymMap(
    synonymMap: SynonymMap,
    options: CreateOrUpdateSynonymMapOptions = {}
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan(
      "SearchServiceClient-createOrUpdateSynonymMap",
      options
    );
    try {
      const result = await this.client.synonymMaps.createOrUpdate(
        synonymMap.name,
        utils.publicSynonymMapToGeneratedSynonymMap(synonymMap),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSynonymMapToPublicSynonymMap(result);
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
   * Creates a new indexer or modifies an existing one.
   * @param indexer The information describing the indexer to be created/updated.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateIndexer(
    indexer: Indexer,
    options: CreateorUpdateIndexerOptions = {}
  ): Promise<Indexer> {
    const { span, updatedOptions } = createSpan(
      "SearchServiceClient-createOrUpdateIndexer",
      options
    );
    try {
      const result = await this.client.indexers.createOrUpdate(
        indexer.name,
        indexer,
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

  /**
   * Creates a new datasource or modifies an existing one.
   * @param dataSource The information describing the datasource to be created/updated.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateDataSource(
    dataSource: DataSource,
    options: CreateorUpdateDataSourceOptions = {}
  ): Promise<DataSource> {
    const { span, updatedOptions } = createSpan(
      "SearchServiceClient-createOrUpdateDataSource",
      options
    );
    try {
      const result = await this.client.dataSources.createOrUpdate(
        dataSource.name,
        dataSource,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedDataSourceToPublicDataSource(result);
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
   * Deletes an existing index.
   * @param indexName The name of the index to delete.
   * @param options Additional optional arguments.
   */
  public async deleteIndex(indexName: string, options: DeleteIndexOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-deleteIndex", options);
    try {
      await this.client.indexes.deleteMethod(
        indexName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Deletes an existing Skillset.
   * @param skillsetName The name of the Skillset to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSkillset(
    skillsetName: string,
    options: DeleteSkillsetOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-deleteSkillset", options);
    try {
      await this.client.skillsets.deleteMethod(
        skillsetName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Deletes an existing SynonymMap.
   * @param synonymMapName The name of the synonymMap to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSynonymMap(
    synonymMapName: string,
    options: DeleteSynonymMapOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-deleteSynonymMap", options);
    try {
      await this.client.synonymMaps.deleteMethod(
        synonymMapName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Deletes an existing indexer.
   * @param indexerName The name of the indexer to delete.
   * @param options Additional optional arguments.
   */
  public async deleteIndexer(
    indexerName: string,
    options: DeleteIndexerOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-deleteIndexer", options);
    try {
      await this.client.indexers.deleteMethod(
        indexerName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Deletes an existing datasource.
   * @param dataSourceName The name of the datasource to delete.
   * @param options Additional optional arguments.
   */
  public async deleteDataSource(
    dataSourceName: string,
    options: DeleteDataSourceOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-deleteDataSource", options);
    try {
      await this.client.dataSources.deleteMethod(
        dataSourceName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Retrieves statistics about an index, such as the count of documents and the size
   * of index storage.
   * @param indexName The name of the index.
   * @param options Additional optional arguments.
   */
  public async getIndexStatistics(
    indexName: string,
    options: GetIndexStatisticsOptions = {}
  ): Promise<GetIndexStatisticsResult> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-getIndexStatistics", options);
    try {
      const result = await this.client.indexes.getStatistics(
        indexName,
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

  /**
   * Retrieves statistics about the service, such as the count of documents, index, etc.
   * @param options Additional optional arguments.
   */
  public async getServiceStatistics(
    options: GetServiceStatisticsOptions = {}
  ): Promise<ServiceStatistics> {
    const { span, updatedOptions } = createSpan(
      "SearchServiceClient-getServiceStatistics",
      options
    );
    try {
      const result = await this.client.getServiceStatistics(
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

  /**
   * Returns the current status and execution history of an indexer.
   * @param indexerName The name of the indexer.
   * @param options Additional optional arguments.
   */
  public async getIndexerStatus(
    indexerName: string,
    options: GetIndexerStatusOptions = {}
  ): Promise<IndexerExecutionInfo> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-getIndexerStatus", options);
    try {
      const result = await this.client.indexers.getStatus(
        indexerName,
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

  /**
   * Resets the change tracking state associated with an indexer.
   * @param indexerName The name of the indexer to reset.
   * @param options Additional optional arguments.
   */
  public async resetIndexer(indexerName: string, options: ResetIndexerOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-resetIndexer", options);
    try {
      await this.client.indexers.reset(
        indexerName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Runs an indexer on-demand.
   * @param indexerName The name of the indexer to run.
   * @param options Additional optional arguments.
   */
  public async runIndexer(indexerName: string, options: RunIndexerOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-runIndexer", options);
    try {
      await this.client.indexers.run(
        indexerName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Calls an analyzer or tokenizer manually on provided text.
   * @param indexName The name of the index that contains the field to analyze
   * @param options Additional arguments
   */
  public async analyzeText(indexName: string, options: AnalyzeTextOptions): Promise<AnalyzeResult> {
    const { operationOptions, restOptions } = utils.extractOperationOptions(options);

    const { span, updatedOptions } = createSpan(
      "SearchServiceClient-analyzeText",
      operationOptions
    );
    try {
      const result = await this.client.indexes.analyze(
        indexName,
        restOptions,
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
}
