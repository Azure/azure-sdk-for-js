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
  ServiceStatistics
} from "./generated/service/models";
import { SearchServiceClient as GeneratedClient } from "./generated/service/searchServiceClient";
import { logger } from "./logger";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import {
  AnalyzeTextOptions,
  CreateIndexOptions,
  CreateOrUpdateIndexOptions,
  CreateOrUpdateSynonymMapOptions,
  CreateSynonymMapOptions,
  DeleteIndexOptions,
  DeleteSynonymMapOptions,
  GetIndexOptions,
  GetIndexStatisticsOptions,
  GetSynonymMapsOptions,
  Index,
  ListIndexesOptions,
  ListSynonymMapsOptions,
  SynonymMap,
  GetServiceStatisticsOptions
} from "./serviceModels";
import * as utils from "./serviceUtils";
import { createSpan } from "./tracing";
import { odataMetadataPolicy } from "./odataMetadataPolicy";
import { SearchClient, SearchClientOptions } from "./searchClient";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchIndexClientOptions = PipelineOptions;

/**
 * Class to perform operations to manage
 * (create, update, list/delete)
 * indexes, & synonymmaps.
 */
export class SearchIndexClient {
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
   * @param {string} endpoint The endpoint of the search service
   * @param {KeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchIndexClientOptions} [options] Used to configure the Search client.
   */
  constructor(endpoint: string, credential: KeyCredential, options: SearchIndexClientOptions = {}) {
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
   * Retrieves the SearchClient corresponding to this SearchIndexClient
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
    options: ListIndexesOptions = {}
  ): Promise<Array<Pick<Index, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listIndexes", options);
    try {
      const result = await this.client.indexes.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Retrieves a list of names of existing indexes in the service.
   * @param options Options to the list index operation.
   */
  public async listIndexesNames(options: ListIndexesOptions = {}): Promise<Array<String>> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listIndexesNames", options);
    try {
      const result = await this.client.indexes.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: "name"
      });
      return result.indexes.map((idx) => idx.name);
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
    options: ListSynonymMapsOptions = {}
  ): Promise<Array<Pick<SynonymMap, Fields>>> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listSynonymMaps", options);
    try {
      const result = await this.client.synonymMaps.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Retrieves a list of names of existing SynonymMaps in the service.
   * @param options Options to the list SynonymMaps operation.
   */
  public async listSynonymMapsNames(options: ListSynonymMapsOptions = {}): Promise<Array<String>> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listSynonymMapsNames", options);
    try {
      const result = await this.client.synonymMaps.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: "name"
      });
      return result.synonymMaps.map((sm) => sm.name);
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
    const { span, updatedOptions } = createSpan("SearchIndexClient-getIndex", options);
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
   * Retrieves information about a SynonymMap.
   * @param indexName The name of the Skillset.
   * @param options Additional optional arguments.
   */
  public async getSynonymMap(
    synonymMapName: string,
    options: GetSynonymMapsOptions = {}
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getSynonymMaps", options);
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
   * Creates a new index.
   * @param index The information describing the index to be created.
   * @param options Additional optional arguments.
   */
  public async createIndex(index: Index, options: CreateIndexOptions = {}): Promise<Index> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createIndex", options);
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
   * Creates a new SynonymMap in a search service.
   * @param synonymMap The synonymMap definition to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createSynonymMap(
    synonymMap: SynonymMap,
    options: CreateSynonymMapOptions = {}
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createSynonymMaps", options);
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
   * Creates a new index or modifies an existing one.
   * @param index The information describing the index to be created.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateIndex(
    index: Index,
    options: CreateOrUpdateIndexOptions = {}
  ): Promise<Index> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createOrUpdateIndex", options);
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
   * Creates a new SynonymMap or modifies an existing one.
   * @param synonymMap The information describing the SynonymMap to be created.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateSynonymMap(
    synonymMap: SynonymMap,
    options: CreateOrUpdateSynonymMapOptions = {}
  ): Promise<SynonymMap> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexClient-createOrUpdateSynonymMap",
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
   * Deletes an existing index.
   * @param indexName The name of the index to delete.
   * @param options Additional optional arguments.
   */
  public async deleteIndex(indexName: string, options: DeleteIndexOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-deleteIndex", options);
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
   * Deletes an existing SynonymMap.
   * @param synonymMapName The name of the synonymMap to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSynonymMap(
    synonymMapName: string,
    options: DeleteSynonymMapOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-deleteSynonymMap", options);
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
   * Retrieves statistics about an index, such as the count of documents and the size
   * of index storage.
   * @param indexName The name of the index.
   * @param options Additional optional arguments.
   */
  public async getIndexStatistics(
    indexName: string,
    options: GetIndexStatisticsOptions = {}
  ): Promise<GetIndexStatisticsResult> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getIndexStatistics", options);
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
   * Calls an analyzer or tokenizer manually on provided text.
   * @param indexName The name of the index that contains the field to analyze
   * @param options Additional arguments
   */
  public async analyzeText(indexName: string, options: AnalyzeTextOptions): Promise<AnalyzeResult> {
    const { operationOptions, restOptions } = utils.extractOperationOptions(options);

    const { span, updatedOptions } = createSpan("SearchIndexClient-analyzeText", operationOptions);
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

  /**
   * Retrieves statistics about the service, such as the count of documents, index, etc.
   * @param options Additional optional arguments.
   */
  public async getServiceStatistics(
    options: GetServiceStatisticsOptions = {}
  ): Promise<ServiceStatistics> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getServiceStatistics", options);
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
}
