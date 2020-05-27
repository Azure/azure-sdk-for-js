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
  CreateSearchIndexOptions,
  CreateOrUpdateSearchIndexOptions,
  CreateOrUpdateSynonymMapOptions,
  CreateSynonymMapOptions,
  DeleteSearchIndexOptions,
  DeleteSynonymMapOptions,
  GetSearchIndexOptions,
  GetSearchIndexStatisticsOptions,
  GetSynonymMapsOptions,
  SearchIndex,
  ListSearchIndexesOptions,
  ListSynonymMapsOptions,
  SynonymMap,
  GetServiceStatisticsOptions
} from "./serviceModels";
import * as utils from "./serviceUtils";
import { createSpan } from "./tracing";
import { odataMetadataPolicy } from "./odataMetadataPolicy";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchIndexClientOptions = PipelineOptions;

/**
 * Class to perform operations to manage
 * (create, update, list/delete)
 * SearchIndexes, & synonymmaps.
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
   * Retrieves a list of existing SearchIndexes in the service.
   * @param options Options to list SearchIndexes operation.
   */
  public async listSearchIndexes(
    options: ListSearchIndexesOptions = {}
  ): Promise<Array<SearchIndex>> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-listSearchIndexes", options);
    try {
      const result = await this.client.indexes.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result.indexes.map(utils.generatedSearchIndexToPublicSearchIndex);
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
   * Retrieves a list of names of existing SearchIndexes in the service.
   * @param options Options to list SearchIndexes operation.
   */
  public async listSearchIndexesNames(
    options: ListSearchIndexesOptions = {}
  ): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexClient-listSearchIndexesNames",
      options
    );
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
   * @param options Options to list SynonymMaps operation.
   */
  public async listSynonymMaps(options: ListSynonymMapsOptions = {}): Promise<Array<SynonymMap>> {
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
   * @param options Options to list SynonymMaps operation.
   */
  public async listSynonymMapsNames(options: ListSynonymMapsOptions = {}): Promise<Array<string>> {
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
   * Retrieves information about an SearchIndex.
   * @param searchIndexName The name of the SearchIndex.
   * @param options Additional optional arguments.
   */
  public async getSearchIndex(
    searchIndexName: string,
    options: GetSearchIndexOptions = {}
  ): Promise<SearchIndex> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getSearchIndex", options);
    try {
      const result = await this.client.indexes.get(
        searchIndexName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSearchIndexToPublicSearchIndex(result);
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
   * @param synonymMapName The name of the SynonymMap.
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
   * Creates a new SearchIndex.
   * @param searchIndex The information describing the SearchIndex to be created.
   * @param options Additional optional arguments.
   */
  public async createSearchIndex(
    searchIndex: SearchIndex,
    options: CreateSearchIndexOptions = {}
  ): Promise<SearchIndex> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-createSearchIndex", options);
    try {
      const result = await this.client.indexes.create(
        utils.publicSearchIndexToGeneratedSearchIndex(searchIndex),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSearchIndexToPublicSearchIndex(result);
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
   * Creates a new SearchIndex or modifies an existing one.
   * @param searchIndex The information describing the SearchIndex to be created.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateSearchIndex(
    searchIndex: SearchIndex,
    options: CreateOrUpdateSearchIndexOptions = {}
  ): Promise<SearchIndex> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexClient-createOrUpdateSearchIndex",
      options
    );
    try {
      const etag = options.onlyIfUnchanged ? searchIndex.etag : undefined;

      const result = await this.client.indexes.createOrUpdate(
        searchIndex.name,
        utils.publicSearchIndexToGeneratedSearchIndex(searchIndex),
        {
          ...operationOptionsToRequestOptionsBase(updatedOptions),
          ifMatch: etag
        }
      );
      return utils.generatedSearchIndexToPublicSearchIndex(result);
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
      const etag = options.onlyIfUnchanged ? synonymMap.etag : undefined;

      const result = await this.client.synonymMaps.createOrUpdate(
        synonymMap.name,
        utils.publicSynonymMapToGeneratedSynonymMap(synonymMap),
        {
          ...operationOptionsToRequestOptionsBase(updatedOptions),
          ifMatch: etag
        }
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
   * Deletes an existing SearchIndex.
   * @param searchIndexName SearchIndex/Name of the SearchIndex to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSearchIndex(
    searchIndex: string | SearchIndex,
    options: DeleteSearchIndexOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-deleteSearchIndex", options);
    try {
      const indexName: string = typeof searchIndex === "string" ? searchIndex : searchIndex.name;
      const etag =
        typeof searchIndex === "string"
          ? undefined
          : options.onlyIfUnchanged
          ? searchIndex.etag
          : undefined;

      await this.client.indexes.deleteMethod(indexName, {
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        ifMatch: etag
      });
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
   * @param synonymMapName SynonymMap/Name of the synonymMap to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSynonymMap(
    synonymMap: string | SynonymMap,
    options: DeleteSynonymMapOptions = {}
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

      await this.client.synonymMaps.deleteMethod(synonymMapName, {
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        ifMatch: etag
      });
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
   * Retrieves statistics about an SearchIndex, such as the count of documents and the size
   * of SearchIndex storage.
   * @param searchIndexName The name of the SearchIndex.
   * @param options Additional optional arguments.
   */
  public async getIndexStatistics(
    searchIndexName: string,
    options: GetSearchIndexStatisticsOptions = {}
  ): Promise<GetIndexStatisticsResult> {
    const { span, updatedOptions } = createSpan("SearchIndexClient-getIndexStatistics", options);
    try {
      const result = await this.client.indexes.getStatistics(
        searchIndexName,
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
   * @param searchIndexName The name of the SearchIndex that contains the field to analyze
   * @param options Additional arguments
   */
  public async analyzeText(
    searchIndexName: string,
    options: AnalyzeTextOptions
  ): Promise<AnalyzeResult> {
    const { operationOptions, restOptions } = utils.extractOperationOptions(options);

    const { span, updatedOptions } = createSpan("SearchIndexClient-analyzeText", operationOptions);
    try {
      const result = await this.client.indexes.analyze(
        searchIndexName,
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
   * Retrieves statistics about the service, such as the count of documents, searchindex, etc.
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
