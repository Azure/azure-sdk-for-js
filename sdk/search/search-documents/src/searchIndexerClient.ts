// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { SpanStatusCode } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";
import { SearchIndexerStatus } from "./generated/service/models";
import { SearchServiceClient as GeneratedClient } from "./generated/service/searchServiceClient";
import { logger } from "./logger";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy";
import {
  CreateOrUpdateSkillsetOptions,
  CreateSkillsetOptions,
  DeleteSkillsetOptions,
  GetSkillSetOptions,
  ListSkillsetsOptions,
  SearchIndexerSkillset,
  ListIndexersOptions,
  CreateIndexerOptions,
  GetIndexerOptions,
  CreateorUpdateIndexerOptions,
  DeleteIndexerOptions,
  GetIndexerStatusOptions,
  ResetIndexerOptions,
  RunIndexerOptions,
  ListDataSourceConnectionsOptions,
  SearchIndexer,
  SearchIndexerDataSourceConnection,
  CreateDataSourceConnectionOptions,
  DeleteDataSourceConnectionOptions,
  GetDataSourceConnectionOptions,
  CreateorUpdateDataSourceConnectionOptions,
  ResetDocumentsOptions,
  ResetSkillsOptions,
} from "./serviceModels";
import * as utils from "./serviceUtils";
import { createSpan } from "./tracing";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy";
import { ExtendedCommonClientOptions } from "@azure/core-http-compat";

/**
 * Client options used to configure Cognitive Search API requests.
 */
export interface SearchIndexerClientOptions extends ExtendedCommonClientOptions {
  /**
   * The API version to use when communicating with the service.
   * @deprecated use {@Link serviceVersion} instead
   */
  apiVersion?: string;

  /**
   * The service version to use when communicating with the service.
   */
  serviceVersion?: string;
}

/**
 * Class to perform operations to manage
 * (create, update, list/delete)
 * indexers, datasources & skillsets.
 */
export class SearchIndexerClient {
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
   * @internal
   * @hidden
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
   * @param endpoint - The endpoint of the search service
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
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

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...options,
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

    if (options.apiVersion) {
      if (!utils.serviceVersions.includes(options.apiVersion)) {
        throw new Error(`Invalid Api Version: ${options.apiVersion}`);
      }
      this.serviceVersion = options.apiVersion;
      this.apiVersion = options.apiVersion;
    }

    if (options.serviceVersion) {
      if (!utils.serviceVersions.includes(options.serviceVersion)) {
        throw new Error(`Invalid Service Version: ${options.serviceVersion}`);
      }
      this.serviceVersion = options.serviceVersion;
      this.apiVersion = options.serviceVersion;
    }

    this.client = new GeneratedClient(
      this.endpoint,
      this.serviceVersion,
      internalClientPipelineOptions
    );

    if (isTokenCredential(credential)) {
      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({ credential, scopes: utils.DEFAULT_SEARCH_SCOPE })
      );
    } else {
      this.client.pipeline.addPolicy(createSearchApiKeyCredentialPolicy(credential));
    }

    this.client.pipeline.addPolicy(createOdataMetadataPolicy("minimal"));
  }

  /**
   * Retrieves a list of existing indexers in the service.
   * @param options - Options to the list indexers operation.
   */
  public async listIndexers(options: ListIndexersOptions = {}): Promise<Array<SearchIndexer>> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-listIndexers", options);
    try {
      const result = await this.client.indexers.list(updatedOptions);
      return result.indexers.map(utils.generatedSearchIndexerToPublicSearchIndexer);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves a list of names of existing indexers in the service.
   * @param options - Options to the list indexers operation.
   */
  public async listIndexersNames(options: ListIndexersOptions = {}): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-listIndexersNames", options);
    try {
      const result = await this.client.indexers.list({
        ...updatedOptions,
        select: "name",
      });
      return result.indexers.map((idx) => idx.name);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves a list of existing data sources in the service.
   * @param options - Options to the list indexers operation.
   */
  public async listDataSourceConnections(
    options: ListDataSourceConnectionsOptions = {}
  ): Promise<Array<SearchIndexerDataSourceConnection>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-listDataSourceConnections",
      options
    );
    try {
      const result = await this.client.dataSources.list(updatedOptions);
      return result.dataSources.map(utils.generatedDataSourceToPublicDataSource);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves a list of names of existing data sources in the service.
   * @param options - Options to the list indexers operation.
   */
  public async listDataSourceConnectionsNames(
    options: ListDataSourceConnectionsOptions = {}
  ): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-listDataSourceConnectionsNames",
      options
    );
    try {
      const result = await this.client.dataSources.list({
        ...updatedOptions,
        select: "name",
      });
      return result.dataSources.map((ds) => ds.name);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves a list of existing Skillsets in the service.
   * @param options - Options to the list Skillsets operation.
   */
  public async listSkillsets(
    options: ListSkillsetsOptions = {}
  ): Promise<Array<SearchIndexerSkillset>> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-listSkillsets", options);
    try {
      const result = await this.client.skillsets.list(updatedOptions);
      return result.skillsets.map(utils.generatedSkillsetToPublicSkillset);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves a list of names of existing Skillsets in the service.
   * @param options - Options to the list Skillsets operation.
   */
  public async listSkillsetsNames(options: ListSkillsetsOptions = {}): Promise<Array<string>> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-listSkillsetsNames", options);
    try {
      const result = await this.client.skillsets.list({
        ...updatedOptions,
        select: "name",
      });
      return result.skillsets.map((sks) => sks.name);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves information about an Indexer.
   * @param indexerName - The name of the Indexer.
   * @param options - Additional optional arguments.
   */
  public async getIndexer(
    indexerName: string,
    options: GetIndexerOptions = {}
  ): Promise<SearchIndexer> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-getIndexer", options);
    try {
      const result = await this.client.indexers.get(indexerName, updatedOptions);
      return utils.generatedSearchIndexerToPublicSearchIndexer(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves information about a DataSource
   * @param dataSourceName - The name of the DataSource
   * @param options - Additional optional arguments
   */
  public async getDataSourceConnection(
    dataSourceConnectionName: string,
    options: GetDataSourceConnectionOptions = {}
  ): Promise<SearchIndexerDataSourceConnection> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-getDataSourceConnection",
      options
    );
    try {
      const result = await this.client.dataSources.get(dataSourceConnectionName, updatedOptions);
      return utils.generatedDataSourceToPublicDataSource(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves information about an Skillset.
   * @param indexName - The name of the Skillset.
   * @param options - Additional optional arguments.
   */
  public async getSkillset(
    skillsetName: string,
    options: GetSkillSetOptions = {}
  ): Promise<SearchIndexerSkillset> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-getSkillset", options);
    try {
      const result = await this.client.skillsets.get(skillsetName, updatedOptions);
      return utils.generatedSkillsetToPublicSkillset(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new indexer in a search service.
   * @param indexer - The indexer definition to create in a search service.
   * @param options - Additional optional arguments.
   */
  public async createIndexer(
    indexer: SearchIndexer,
    options: CreateIndexerOptions = {}
  ): Promise<SearchIndexer> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-createIndexer", options);
    try {
      const result = await this.client.indexers.create(
        utils.publicSearchIndexerToGeneratedSearchIndexer(indexer),
        updatedOptions
      );
      return utils.generatedSearchIndexerToPublicSearchIndexer(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new dataSource in a search service.
   * @param dataSourceConnection - The dataSource definition to create in a search service.
   * @param options - Additional optional arguments.
   */
  public async createDataSourceConnection(
    dataSourceConnection: SearchIndexerDataSourceConnection,
    options: CreateDataSourceConnectionOptions = {}
  ): Promise<SearchIndexerDataSourceConnection> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createDataSourceConnection",
      options
    );
    try {
      const result = await this.client.dataSources.create(
        utils.publicDataSourceToGeneratedDataSource(dataSourceConnection),
        updatedOptions
      );
      return utils.generatedDataSourceToPublicDataSource(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new skillset in a search service.
   * @param skillset - The skillset containing one or more skills to create in a search service.
   * @param options - Additional optional arguments.
   */
  public async createSkillset(
    skillset: SearchIndexerSkillset,
    options: CreateSkillsetOptions = {}
  ): Promise<SearchIndexerSkillset> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-createSkillset", options);
    try {
      const result = await this.client.skillsets.create(
        utils.publicSkillsetToGeneratedSkillset(skillset),
        updatedOptions
      );
      return utils.generatedSkillsetToPublicSkillset(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new indexer or modifies an existing one.
   * @param indexer - The information describing the indexer to be created/updated.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateIndexer(
    indexer: SearchIndexer,
    options: CreateorUpdateIndexerOptions = {}
  ): Promise<SearchIndexer> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createOrUpdateIndexer",
      options
    );
    try {
      const etag = options.onlyIfUnchanged ? indexer.etag : undefined;

      const result = await this.client.indexers.createOrUpdate(
        indexer.name,
        utils.publicSearchIndexerToGeneratedSearchIndexer(indexer),
        {
          ...updatedOptions,
          ifMatch: etag,
          skipIndexerResetRequirementForCache: options.skipIndexerResetRequirementForCache,
          disableCacheReprocessingChangeDetection: options.disableCacheReprocessingChangeDetection,
        }
      );
      return utils.generatedSearchIndexerToPublicSearchIndexer(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new datasource or modifies an existing one.
   * @param dataSourceConnection - The information describing the datasource to be created/updated.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateDataSourceConnection(
    dataSourceConnection: SearchIndexerDataSourceConnection,
    options: CreateorUpdateDataSourceConnectionOptions = {}
  ): Promise<SearchIndexerDataSourceConnection> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createOrUpdateDataSourceConnection",
      options
    );
    try {
      const etag = options.onlyIfUnchanged ? dataSourceConnection.etag : undefined;

      const result = await this.client.dataSources.createOrUpdate(
        dataSourceConnection.name,
        utils.publicDataSourceToGeneratedDataSource(dataSourceConnection),
        {
          ...updatedOptions,
          ifMatch: etag,
          skipIndexerResetRequirementForCache: options.skipIndexerResetRequirementForCache,
        }
      );
      return utils.generatedDataSourceToPublicDataSource(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new Skillset or modifies an existing one.
   * @param skillset - The information describing the index to be created.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateSkillset(
    skillset: SearchIndexerSkillset,
    options: CreateOrUpdateSkillsetOptions = {}
  ): Promise<SearchIndexerSkillset> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-createOrUpdateSkillset",
      options
    );
    try {
      const etag = options.onlyIfUnchanged ? skillset.etag : undefined;

      const result = await this.client.skillsets.createOrUpdate(
        skillset.name,
        utils.publicSkillsetToGeneratedSkillset(skillset),
        {
          ...updatedOptions,
          ifMatch: etag,
          skipIndexerResetRequirementForCache: options.skipIndexerResetRequirementForCache,
          disableCacheReprocessingChangeDetection: options.disableCacheReprocessingChangeDetection,
        }
      );

      return utils.generatedSkillsetToPublicSkillset(result);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes an existing indexer.
   * @param indexer - Indexer/Name of the indexer to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteIndexer(
    indexer: string | SearchIndexer,
    options: DeleteIndexerOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-deleteIndexer", options);
    try {
      const indexerName: string = typeof indexer === "string" ? indexer : indexer.name;
      const etag =
        typeof indexer === "string"
          ? undefined
          : options.onlyIfUnchanged
          ? indexer.etag
          : undefined;

      await this.client.indexers.delete(indexerName, {
        ...updatedOptions,
        ifMatch: etag,
      });
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes an existing datasource.
   * @param dataSource - Datasource/Name of the datasource to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteDataSourceConnection(
    dataSourceConnection: string | SearchIndexerDataSourceConnection,
    options: DeleteDataSourceConnectionOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "SearchIndexerClient-deleteDataSourceConnection",
      options
    );
    try {
      const dataSourceConnectionName: string =
        typeof dataSourceConnection === "string" ? dataSourceConnection : dataSourceConnection.name;
      const etag =
        typeof dataSourceConnection === "string"
          ? undefined
          : options.onlyIfUnchanged
          ? dataSourceConnection.etag
          : undefined;

      await this.client.dataSources.delete(dataSourceConnectionName, {
        ...updatedOptions,
        ifMatch: etag,
      });
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes an existing Skillset.
   * @param skillset - Skillset/Name of the Skillset to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteSkillset(
    skillset: string | SearchIndexerSkillset,
    options: DeleteSkillsetOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-deleteSkillset", options);
    try {
      const skillsetName: string = typeof skillset === "string" ? skillset : skillset.name;
      const etag =
        typeof skillset === "string"
          ? undefined
          : options.onlyIfUnchanged
          ? skillset.etag
          : undefined;

      await this.client.skillsets.delete(skillsetName, {
        ...updatedOptions,
        ifMatch: etag,
      });
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns the current status and execution history of an indexer.
   * @param indexerName - The name of the indexer.
   * @param options - Additional optional arguments.
   */
  public async getIndexerStatus(
    indexerName: string,
    options: GetIndexerStatusOptions = {}
  ): Promise<SearchIndexerStatus> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-getIndexerStatus", options);
    try {
      const result = await this.client.indexers.getStatus(indexerName, updatedOptions);
      return result;
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Resets the change tracking state associated with an indexer.
   * @param indexerName - The name of the indexer to reset.
   * @param options - Additional optional arguments.
   */
  public async resetIndexer(indexerName: string, options: ResetIndexerOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-resetIndexer", options);
    try {
      await this.client.indexers.reset(indexerName, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Runs an indexer on-demand.
   * @param indexerName - The name of the indexer to run.
   * @param options - Additional optional arguments.
   */
  public async runIndexer(indexerName: string, options: RunIndexerOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-runIndexer", options);
    try {
      await this.client.indexers.run(indexerName, updatedOptions);
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Resets specific documents in the datasource to be selectively re-ingested by the indexer.
   * @param indexerName - The name of the indexer to reset documents for.
   * @param options - Additional optional arguments.
   */
  public async resetDocuments(
    indexerName: string,
    options: ResetDocumentsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-resetDocs", options);
    try {
      await this.client.indexers.resetDocs(indexerName, {
        ...updatedOptions,
        keysOrIds: {
          documentKeys: updatedOptions.documentKeys,
          datasourceDocumentIds: updatedOptions.datasourceDocumentIds,
        },
      });
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Reset an existing skillset in a search service.
   * @param skillsetName - The name of the skillset to reset.
   * @param skillNames - The names of skills to reset.
   * @param options - The options parameters.
   */
  public async resetSkills(skillsetName: string, options: ResetSkillsOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("SearchIndexerClient-resetSkills", options);
    try {
      await this.client.skillsets.resetSkills(
        skillsetName,
        { skillNames: options.skillNames },
        updatedOptions
      );
    } catch (e: any) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
