// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  signingPolicy,
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SearchIndexClient as GeneratedClient } from "./generated/data/searchIndexClient";
import { SearchApiKeyCredential } from "./searchApiKeyCredential";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface SearchIndexClientOptions extends PipelineOptions {
  /**
   * The DNS suffix of the search service. Default value: 'search.windows.net'.
   */
  searchDnsSuffix?: string;
}

export type CountOptions = OperationOptions;

// something extends OperationOptions

export class SearchIndexClient {
  /**
   * The API version to use when communicating with the service.
   */
  public readonly apiVersion: string;

  /**
   * The name of the search service
   */
  public readonly searchServiceName: string;

  /**
   * The name of the index
   */
  public readonly indexName: string;

  /**
   * The DNS suffix of the search service. Default value: 'search.windows.net'.
   */
  public searchDnsSuffix: string;

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
   * @param {string} apiVersion The API version to use
   * @param {string} searchServiceName The name of the search service
   * @param {string} indexName The name of the index
   * @param {SearchApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    apiVersion: string,
    searchServiceName: string,
    indexName: string,
    credential: SearchApiKeyCredential,
    options: SearchIndexClientOptions = {}
  ) {
    this.apiVersion = apiVersion;
    this.searchServiceName = searchServiceName;
    this.indexName = indexName;
    const { searchDnsSuffix = "search.windows.net", ...pipelineOptions } = options;
    this.searchDnsSuffix = searchDnsSuffix;

    const libInfo = `azsdk-js-ai-search/${SDK_VERSION}`;
    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"]
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, signingPolicy(credential));
    this.client = new GeneratedClient(
      credential,
      this.apiVersion,
      this.searchServiceName,
      this.indexName,
      pipeline
    );
  }

  public count(options: CountOptions = {}) {
    return this.client.documents.count(operationOptionsToRequestOptionsBase(options));
  }
}
