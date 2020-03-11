// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  signingPolicy,
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase,
  OperationOptions
} from "@azure/core-http";
import { SearchServiceClient as GeneratedClient } from "./generated/service/searchServiceClient";
import { SearchApiKeyCredential } from "./searchApiKeyCredential";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/types";
import {
  ListIndexesOptions,
  GetIndexOptions,
  CreateIndexOptions,
  CreateOrUpdateIndexOptions,
  DeleteIndexOptions,
  AnalyzeTextOptions,
  GetIndexStatisticsOptions
} from "./serviceModels";
import { Index, AnalyzeResult, GetIndexStatisticsResult } from "./generated/service/models";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchServiceClientOptions = PipelineOptions;

export class SearchServiceClient {
  /**
   * The API version to use when communicating with the service.
   */
  public readonly apiVersion: string = "2019-05-06";

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
        },
        deserializationOptions: {
          expectedContentTypes: {
            json: ["application/json", "text/json"]
          }
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
      const result = await this.client.indexes.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result.indexes;
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
   * Creates a new index.
   * @param index The information describing the index to be created.
   * @param options Additional optional arguments.
   */
  public async createIndex(index: Index, options: CreateIndexOptions = {}): Promise<Index> {
    const { span, updatedOptions } = createSpan("SearchServiceClient-createIndex", options);
    try {
      const result = await this.client.indexes.create(
        index,
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
        index,
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
    const { operationOptions, restOptions } = this.extractOperationOptions(options);

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
}
