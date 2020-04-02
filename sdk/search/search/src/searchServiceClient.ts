// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  operationOptionsToRequestOptionsBase,
  PipelineOptions,
  signingPolicy
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/types";
import { SDK_VERSION } from "./constants";
import { AnalyzeResult, GetIndexStatisticsResult } from "./generated/service/models";
import { SearchServiceClient as GeneratedClient } from "./generated/service/searchServiceClient";
import { logger } from "./logger";
import { SearchApiKeyCredential } from "./searchApiKeyCredential";
import * as utils from "./serviceUtils";
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
  SynonymMap
} from "./serviceModels";
import { createSpan } from "./tracing";

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

  /**
   * Creates an instance of SearchServiceClient.
   *
   * Example usage:
   * ```ts
   * const { SearchServiceClient, SearchApiKeyCredential } = require("@azure/search");
   *
   * const client = new SearchServiceClient(
   *   "<endpoint>",
   *   new SearchApiKeyCredential("<Admin Key>");
   * );
   * ```
   * @param {string} endpoint The endpoint of the search service
   * @param {SearchApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchServiceClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    credential: SearchApiKeyCredential,
    options: SearchServiceClientOptions = {}
  ) {
    this.endpoint = endpoint;

    const libInfo = `azsdk-js-search/${SDK_VERSION}`;
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

    const pipeline = createPipelineFromOptions(internalPipelineOptions, signingPolicy(credential));
    this.client = new GeneratedClient(credential, this.apiVersion, this.endpoint, pipeline);
  }

  /**
   * Retrieves a list of existing indexes in the service.
   * @param options Options to the list index operation.
   */
  public async listIndexes(options: ListIndexesOptions = {}): Promise<Index[]> {
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
  public async listSkillsets(options: ListSkillsetsOptions = {}): Promise<Skillset[]> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-listSkillsets", options);
    try {
      const result = await this.client.skillsets.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
  public async listSynonymMaps(options: ListSynonymMapsOptions = {}): Promise<SynonymMap[]> {
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
   * Retrieves information about an SynonymMap.
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
