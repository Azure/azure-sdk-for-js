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
import { SearchIndexer, SearchIndexerStatus } from "./generated/service/models";
import { SearchServiceClient as GeneratedClient } from "./generated/service/searchServiceClient";
import { logger } from "./logger";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import {
  CreateOrUpdateSearchIndexerSkillsetOptions,
  CreateSearchIndexerSkillsetOptions,
  DeleteSearchIndexerSkillsetOptions,
  GetSearchIndexerSkillSetOptions,
  ListSearchIndexerSkillsetsOptions,
  SearchIndexerSkillset,
  ListSearchIndexersOptions,
  CreateSearchIndexerOptions,
  GetSearchIndexerOptions,
  CreateorUpdateSearchIndexerOptions,
  DeleteSearchIndexerOptions,
  GetSearchIndexerStatusOptions,
  ResetSearchIndexerOptions,
  RunSearchIndexerOptions,
  ListSearchIndexerDataSourcesOptions,
  SearchIndexerDataSource,
  CreateSearchIndexerDataSourceOptions,
  DeleteSearchIndexerDataSourceOptions,
  GetSearchIndexerDataSourceOptions,
  CreateorUpdateSearchIndexerDataSourceOptions
} from "./serviceModels";
import * as utils from "./serviceUtils";
import { createSpan } from "./tracing";
import { odataMetadataPolicy } from "./odataMetadataPolicy";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export type SearchIndexerClientOptions = PipelineOptions;

/**
 * Class to perform operations to manage
 * (create, update, list/delete)
 * indexers, datasources & skillsets.
 */
export class SearchIndexerClient {
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
   * Creates an instance of SearchIndexerClient.
   *
   * Example usage:
   * ```ts
   * const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");
   *
   * const client = new SearchIndexerClient(
   *   "<endpoint>",
   *   new AzureKeyCredential("<Admin Key>");
   * );
   * ```
   * @param {string} endpoint The endpoint of the search service
   * @param {KeyCredential} credential Used to authenticate requests to the service.
   * @param {SearchIndexerClientOptions} [options] Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential,
    options: SearchIndexerClientOptions = {}
  ) {
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
   * Retrieves a list of existing SearchIndexers in the service.
   * @param options Options to list SearchIndexers operation.
   */
  public async listSearchIndexers(
    options: ListSearchIndexersOptions = {}
  ): Promise<Array<SearchIndexer>> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-listSearchIndexers", options);
    try {
      const result = await this.client.indexers.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
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
   * Retrieves a list of names of existing SearchIndexers in the service.
   * @param options Options to list SearchIndexers operation.
   */
  public async listSearchIndexersNames(
    options: ListSearchIndexersOptions = {}
  ): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-listSearchIndexersNames",
      options
    );
    try {
      const result = await this.client.indexers.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: "name"
      });
      return result.indexers.map((idx) => idx.name);
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
   * Retrieves a list of existing SearchIndexerDataSources in the service.
   * @param options Options to list SearchIndexerDataSources operation.
   */
  public async listSearchIndexerDataSources(
    options: ListSearchIndexerDataSourcesOptions = {}
  ): Promise<Array<SearchIndexerDataSource>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-listSearchIndexerDataSources",
      options
    );
    try {
      const result = await this.client.dataSources.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result.dataSources.map(
        utils.generatedSearchIndexerDataSourceToPublicSearchIndexerDataSource
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
   * Retrieves a list of names of existing SearchIndexerDataSources in the service.
   * @param options Options to list SearchIndexerDataSources operation.
   */
  public async listSearchIndexerDataSourcesNames(
    options: ListSearchIndexerDataSourcesOptions = {}
  ): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-listSearchIndexerDataSourcesNames",
      options
    );
    try {
      const result = await this.client.dataSources.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: "name"
      });
      return result.dataSources.map((ds) => ds.name);
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
   * Retrieves a list of existing SearchIndexerSkillsets in the service.
   * @param options Options to list SearchIndexerSkillsets operation.
   */
  public async listSearchIndexerSkillsets(
    options: ListSearchIndexerSkillsetsOptions = {}
  ): Promise<Array<SearchIndexerSkillset>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-listSearchIndexerSkillsets",
      options
    );
    try {
      const result = await this.client.skillsets.list(
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return result.skillsets.map(
        utils.generatedSearchIndexerSkillsetToPublicSearchIndexerSkillset
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
   * Retrieves a list of names of existing SearchIndexerSkillsets in the service.
   * @param options Options to the SearchIndexerSkillsets operation.
   */
  public async listSearchIndexerSkillsetsNames(
    options: ListSearchIndexerSkillsetsOptions = {}
  ): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-listSearchIndexerSkillsetsNames",
      options
    );
    try {
      const result = await this.client.skillsets.list({
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        select: "name"
      });
      return result.skillsets.map((sks) => sks.name);
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
   * Retrieves information about an SearchIndexer.
   * @param searchIndexerName The name of the SearchIndexer.
   * @param options Additional optional arguments.
   */
  public async getSearchIndexer(
    searchIndexerName: string,
    options: GetSearchIndexerOptions = {}
  ): Promise<SearchIndexer> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-getSearchIndexer", options);
    try {
      const result = await this.client.indexers.get(
        searchIndexerName,
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
   * Retrieves information about a SearchIndexerDataSource
   * @param searchIndexerDataSourceName The name of the SearchIndexerDataSource
   * @param options Additional optional arguments
   */
  public async getSearchIndexerDataSource(
    searchIndexerDataSourceName: string,
    options: GetSearchIndexerDataSourceOptions = {}
  ): Promise<SearchIndexerDataSource> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-getSearchIndexerDataSource",
      options
    );
    try {
      const result = await this.client.dataSources.get(
        searchIndexerDataSourceName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSearchIndexerDataSourceToPublicSearchIndexerDataSource(result);
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
   * Retrieves information about an SearchIndexerSkillset.
   * @param skillsetName The name of the SearchIndexerSkillset.
   * @param options Additional optional arguments.
   */
  public async getSearchIndexerSkillset(
    searchIndexerSkillsetName: string,
    options: GetSearchIndexerSkillSetOptions = {}
  ): Promise<SearchIndexerSkillset> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-getSearchIndexerSkillset",
      options
    );
    try {
      const result = await this.client.skillsets.get(
        searchIndexerSkillsetName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSearchIndexerSkillsetToPublicSearchIndexerSkillset(result);
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
   * Creates a new SearchIndexer in a search service.
   * @param searchIndexer The SearchIndexer definition to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createSearchIndexer(
    searchIndexer: SearchIndexer,
    options: CreateSearchIndexerOptions = {}
  ): Promise<SearchIndexer> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-createSearchIndexer", options);
    try {
      const result = await this.client.indexers.create(
        searchIndexer,
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
   * Creates a new SearchIndexerDataSource in a search service.
   * @param searchIndexerDataSource The SearchIndexerDataSource definition to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createSearchIndexerDataSource(
    searchIndexerDataSource: SearchIndexerDataSource,
    options: CreateSearchIndexerDataSourceOptions = {}
  ): Promise<SearchIndexerDataSource> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createSearchIndexerDataSource",
      options
    );
    try {
      const result = await this.client.dataSources.create(
        searchIndexerDataSource,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSearchIndexerDataSourceToPublicSearchIndexerDataSource(result);
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
   * Creates a new SearchIndexerSkillset in a search service.
   * @param searchIndexerskillset The SearchIndexerSkillset containing one or more skills to create in a search service.
   * @param options Additional optional arguments.
   */
  public async createSearchIndexerSkillset(
    searchIndexerskillset: SearchIndexerSkillset,
    options: CreateSearchIndexerSkillsetOptions = {}
  ): Promise<SearchIndexerSkillset> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createSearchIndexerSkillset",
      options
    );
    try {
      const result = await this.client.skillsets.create(
        utils.publicSearchIndexerSkillsetToGeneratedSearchIndexerSkillset(searchIndexerskillset),
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return utils.generatedSearchIndexerSkillsetToPublicSearchIndexerSkillset(result);
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
   * Creates a new SearchIndexer or modifies an existing one.
   * @param searchIndexer The information describing the searchIndexer to be created/updated.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateSearchIndexer(
    searchIndexer: SearchIndexer,
    options: CreateorUpdateSearchIndexerOptions = {}
  ): Promise<SearchIndexer> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createOrUpdateSearchIndexer",
      options
    );
    try {
      const etag = options.onlyIfUnchanged ? searchIndexer.etag : undefined;

      const result = await this.client.indexers.createOrUpdate(searchIndexer.name, searchIndexer, {
        ...operationOptionsToRequestOptionsBase(updatedOptions),
        ifMatch: etag
      });
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
   * Creates/Updates a new SearchIndexerDatasource or modifies an existing one.
   * @param searchIndexerDataSource The information describing the SearchIndexerDatasource to be created/updated.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateSearchIndexerDataSource(
    searchDataSource: SearchIndexerDataSource,
    options: CreateorUpdateSearchIndexerDataSourceOptions = {}
  ): Promise<SearchIndexerDataSource> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createOrUpdateSearchDataSource",
      options
    );
    try {
      const etag = options.onlyIfUnchanged ? searchDataSource.etag : undefined;

      const result = await this.client.dataSources.createOrUpdate(
        searchDataSource.name,
        searchDataSource,
        {
          ...operationOptionsToRequestOptionsBase(updatedOptions),
          ifMatch: etag
        }
      );
      return utils.generatedSearchIndexerDataSourceToPublicSearchIndexerDataSource(result);
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
   * Creates a new SearchIndexerSkillset or modifies an existing one.
   * @param searchIndexerskillset The information describing the SearchIndexerSkillset to be created.
   * @param options Additional optional arguments.
   */
  public async createOrUpdateSearchIndexerSkillset(
    searchIndexerSkillset: SearchIndexerSkillset,
    options: CreateOrUpdateSearchIndexerSkillsetOptions = {}
  ): Promise<SearchIndexerSkillset> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createOrUpdateSearchIndexerSkillset",
      options
    );
    try {
      const etag = options.onlyIfUnchanged ? searchIndexerSkillset.etag : undefined;

      const result = await this.client.skillsets.createOrUpdate(
        searchIndexerSkillset.name,
        utils.publicSearchIndexerSkillsetToGeneratedSearchIndexerSkillset(searchIndexerSkillset),
        {
          ...operationOptionsToRequestOptionsBase(updatedOptions),
          ifMatch: etag
        }
      );

      return utils.generatedSearchIndexerSkillsetToPublicSearchIndexerSkillset(result);
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
   * Deletes an existing SearchIndexer.
   * @param searchIndexer SearchIndexer/Name of the SearchIndexer to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSearchIndexer(
    searchIndexer: string | SearchIndexer,
    options: DeleteSearchIndexerOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-deleteSearchIndexer", options);
    try {
      const searchIndexerName: string =
        typeof searchIndexer === "string" ? searchIndexer : searchIndexer.name;
      const etag =
        typeof searchIndexer === "string"
          ? undefined
          : options.onlyIfUnchanged
          ? searchIndexer.etag
          : undefined;

      await this.client.indexers.deleteMethod(searchIndexerName, {
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
   * Deletes an existing SearchIndexerDatasource.
   * @param searchIndexerDataSource SearchIndexerDatasource/Name of the SearchIndexerDatasource to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSearchIndexerDataSource(
    searchIndexerDataSource: string | SearchIndexerDataSource,
    options: DeleteSearchIndexerDataSourceOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-deleteSearchIndexerDataSource",
      options
    );
    try {
      const dataSourceName: string =
        typeof searchIndexerDataSource === "string"
          ? searchIndexerDataSource
          : searchIndexerDataSource.name;
      const etag =
        typeof searchIndexerDataSource === "string"
          ? undefined
          : options.onlyIfUnchanged
          ? searchIndexerDataSource.etag
          : undefined;

      await this.client.dataSources.deleteMethod(dataSourceName, {
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
   * Deletes an existing SearchIndexerSkillset.
   * @param searchIndexerSkillset SearchIndexerSkillset/Name of the SearchIndexerSkillset to delete.
   * @param options Additional optional arguments.
   */
  public async deleteSearchIndexerSkillset(
    searchIndexerskillset: string | SearchIndexerSkillset,
    options: DeleteSearchIndexerSkillsetOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-deleteSearchIndexerSkillset",
      options
    );
    try {
      const skillsetName: string =
        typeof searchIndexerskillset === "string"
          ? searchIndexerskillset
          : searchIndexerskillset.name;
      const etag =
        typeof searchIndexerskillset === "string"
          ? undefined
          : options.onlyIfUnchanged
          ? searchIndexerskillset.etag
          : undefined;

      await this.client.skillsets.deleteMethod(skillsetName, {
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
   * Returns the current status and execution history of an searchindexer.
   * @param searchIndexerName The name of the SearchIndexer.
   * @param options Additional optional arguments.
   */
  public async getSearchIndexerStatus(
    searchIndexerName: string,
    options: GetSearchIndexerStatusOptions = {}
  ): Promise<SearchIndexerStatus> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-getSearchIndexerStatus",
      options
    );
    try {
      const result = await this.client.indexers.getStatus(
        searchIndexerName,
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
   * Resets the change tracking state associated with an SearchIndexer.
   * @param searchIndexerName The name of the SearchIndexer to reset.
   * @param options Additional optional arguments.
   */
  public async resetSearchIndexer(
    searchIndexerName: string,
    options: ResetSearchIndexerOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-resetSearchIndexer", options);
    try {
      await this.client.indexers.reset(
        searchIndexerName,
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
   * Runs an SearchIndexer on-demand.
   * @param searchIndexerName The name of the SearchIndexer to run.
   * @param options Additional optional arguments.
   */
  public async runSearchIndexer(
    searchIndexerName: string,
    options: RunSearchIndexerOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-runSearchIndexer", options);
    try {
      await this.client.indexers.run(
        searchIndexerName,
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
}
