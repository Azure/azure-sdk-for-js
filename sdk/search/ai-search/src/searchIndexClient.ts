// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  TokenCredential,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  signingPolicy,
  InternalPipelineOptions,
  createPipelineFromOptions
} from "@azure/core-http";
import { SearchIndexClient as GeneratedClient } from "./generated/data/searchIndexClient";
import { SearchApiKeyCredential } from "./searchApiKeyCredential";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";

const DEFAULT_SEARCH_SCOPE = "https://search.azure.com/.default";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface SearchIndexClientOptions extends PipelineOptions {
  /**
   * The DNS suffix of the search service. Default value: 'search.windows.net'.
   */
  searchDnsSuffix?: string;
}

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
   * @param {TokenCredential | SearchApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    apiVersion: string,
    searchServiceName: string,
    indexName: string,
    credential: TokenCredential | SearchApiKeyCredential,
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

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy(credential, DEFAULT_SEARCH_SCOPE)
      : signingPolicy(credential);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"]
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new GeneratedClient(
      credential,
      this.apiVersion,
      this.searchServiceName,
      this.indexName,
      pipeline
    );
  }

  public count(options: any) {
    return this.client.documents.count(options);
  }
}
