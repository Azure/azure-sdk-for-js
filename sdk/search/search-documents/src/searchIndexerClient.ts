// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
  bearerTokenAuthenticationPolicyName,
} from "@azure/core-rest-pipeline";
import type { SearchIndexerStatus } from "./models/azure/search/documents/indexes/index.js";
import type { SearchIndexerClientOptionalParams } from "./searchIndexer/searchIndexerClient.js";
import { SearchIndexerClient as GeneratedClient } from "./searchIndexer/searchIndexerClient.js";
import { logger } from "./logger.js";
import { createOdataMetadataPolicy } from "./odataMetadataPolicy.js";
import { createSearchApiKeyCredentialPolicy } from "./searchApiKeyCredentialPolicy.js";
import { KnownSearchAudience } from "./searchAudience.js";
import type {
  CreateDataSourceConnectionOptions,
  CreateIndexerOptions,
  CreateorUpdateDataSourceConnectionOptions,
  CreateorUpdateIndexerOptions,
  CreateOrUpdateSkillsetOptions,
  CreateSkillsetOptions,
  DeleteDataSourceConnectionOptions,
  DeleteIndexerOptions,
  DeleteSkillsetOptions,
  GetDataSourceConnectionOptions,
  GetIndexerOptions,
  GetIndexerStatusOptions,
  GetSkillSetOptions,
  ListDataSourceConnectionsOptions,
  ListIndexersOptions,
  ListSkillsetsOptions,
  ResetDocumentsOptions,
  ResetIndexerOptions,
  ResetSkillsOptions,
  RunIndexerOptions,
  SearchIndexer,
  SearchIndexerDataSourceConnection,
  SearchIndexerSkillset,
} from "./serviceModels.js";
import * as utils from "./serviceUtils.js";
import { tracingClient } from "./tracing.js";
import type { ClientOptions } from "@azure-rest/core-client";

/**
 * Client options used to configure AI Search API requests.
 */
export interface SearchIndexerClientOptions extends ClientOptions {
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
   * @hidden
   * A reference to the auto-generated SearchServiceClient
   */
  private readonly client: GeneratedClient;

  /**
   * A reference to the internal HTTP pipeline for use with raw requests
   */
  public readonly pipeline: Pipeline;

  /**
   * Creates an instance of SearchIndexerClient.
   *
   * Example usage:
   * ```ts snippet:ReadmeSampleSearchIndexerClient
   * import { SearchIndexerClient, AzureKeyCredential } from "@azure/search-documents";
   *
   * const indexerClient = new SearchIndexerClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
   * ```
   * @param endpoint - The endpoint of the search service
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Search client.
   */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: SearchIndexerClientOptions = {},
  ) {
    this.endpoint = endpoint;

    const internalClientPipelineOptions: SearchIndexerClientOptionalParams = {
      ...options,
      apiVersion: options.serviceVersion ?? options.apiVersion ?? utils.defaultServiceVersion,
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

    this.serviceVersion =
      options.serviceVersion ?? options.apiVersion ?? utils.defaultServiceVersion;
    this.apiVersion = this.serviceVersion;

    this.client = new GeneratedClient(this.endpoint, credential, internalClientPipelineOptions);
    this.pipeline = this.client.pipeline;

    // Replaced with a custom policy below
    this.pipeline.removePolicy({ name: bearerTokenAuthenticationPolicyName });

    if (isTokenCredential(credential)) {
      const scope: string = options.audience
        ? `${options.audience}/.default`
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
   * Retrieves a list of existing indexers in the service.
   * @param options - Options to the list indexers operation.
   */
  public async listIndexers(options: ListIndexersOptions = {}): Promise<Array<SearchIndexer>> {
    return tracingClient.withSpan(
      "SearchIndexerClient-listIndexers",
      options,
      async (updatedOptions) => {
        const result = await this.client.getIndexers(updatedOptions);
        return result.indexers.map(utils.generatedSearchIndexerToPublicSearchIndexer);
      },
    );
  }

  /**
   * Retrieves a list of names of existing indexers in the service.
   * @param options - Options to the list indexers operation.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async listIndexersNames(options: ListIndexersOptions = {}): Promise<Array<string>> {
    return tracingClient.withSpan(
      "SearchIndexerClient-listIndexersNames",
      options,
      async (updatedOptions) => {
        const result = await this.client.getIndexers({
          ...updatedOptions,
          select: "name",
        });
        return result.indexers.map((idx) => idx.name);
      },
    );
  }

  /**
   * Retrieves a list of existing data sources in the service.
   * @param options - Options to the list indexers operation.
   */
  public async listDataSourceConnections(
    options: ListDataSourceConnectionsOptions = {},
  ): Promise<Array<SearchIndexerDataSourceConnection>> {
    return tracingClient.withSpan(
      "SearchIndexerClient-listDataSourceConnections",
      options,
      async (updatedOptions) => {
        const result = await this.client.getDataSourceConnections(updatedOptions);
        return result.dataSources.map(utils.generatedDataSourceToPublicDataSource);
      },
    );
  }

  /**
   * Retrieves a list of names of existing data sources in the service.
   * @param options - Options to the list indexers operation.
   */
  public async listDataSourceConnectionsNames(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: ListDataSourceConnectionsOptions = {},
  ): Promise<Array<string>> {
    return tracingClient.withSpan(
      "SearchIndexerClient-listDataSourceConnectionsNames",
      options,
      async (updatedOptions) => {
        const result = await this.client.getDataSourceConnections({
          ...updatedOptions,
          select: "name",
        });
        return result.dataSources.map((ds) => ds.name);
      },
    );
  }

  /**
   * Retrieves a list of existing Skillsets in the service.
   * @param options - Options to the list Skillsets operation.
   */
  public async listSkillsets(
    options: ListSkillsetsOptions = {},
  ): Promise<Array<SearchIndexerSkillset>> {
    return tracingClient.withSpan(
      "SearchIndexerClient-listSkillsets",
      options,
      async (updatedOptions) => {
        const result = await this.client.getSkillsets(updatedOptions);
        return result.skillsets.map(utils.generatedSkillsetToPublicSkillset);
      },
    );
  }

  /**
   * Retrieves a list of names of existing Skillsets in the service.
   * @param options - Options to the list Skillsets operation.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public async listSkillsetsNames(options: ListSkillsetsOptions = {}): Promise<Array<string>> {
    return tracingClient.withSpan(
      "SearchIndexerClient-listSkillsetsNames",
      options,
      async (updatedOptions) => {
        const result = await this.client.getSkillsets({
          ...updatedOptions,
          select: "name",
        });
        return result.skillsets.map((sks) => sks.name);
      },
    );
  }

  /**
   * Retrieves information about an Indexer.
   * @param indexerName - The name of the Indexer.
   * @param options - Additional optional arguments.
   */
  public async getIndexer(
    indexerName: string,
    options: GetIndexerOptions = {},
  ): Promise<SearchIndexer> {
    return tracingClient.withSpan(
      "SearchIndexerClient-getIndexer",
      options,
      async (updatedOptions) => {
        const result = await this.client.getIndexer(indexerName, updatedOptions);
        return utils.generatedSearchIndexerToPublicSearchIndexer(result);
      },
    );
  }

  /**
   * Retrieves information about a DataSource
   * @param dataSourceName - The name of the DataSource
   * @param options - Additional optional arguments
   */
  public async getDataSourceConnection(
    dataSourceConnectionName: string,
    options: GetDataSourceConnectionOptions = {},
  ): Promise<SearchIndexerDataSourceConnection> {
    return tracingClient.withSpan(
      "SearchIndexerClient-getDataSourceConnection",
      options,
      async (updatedOptions) => {
        const result = await this.client.getDataSourceConnection(
          dataSourceConnectionName,
          updatedOptions,
        );
        return utils.generatedDataSourceToPublicDataSource(result);
      },
    );
  }

  /**
   * Retrieves information about an Skillset.
   * @param indexName - The name of the Skillset.
   * @param options - Additional optional arguments.
   */
  public async getSkillset(
    skillsetName: string,
    options: GetSkillSetOptions = {},
  ): Promise<SearchIndexerSkillset> {
    return tracingClient.withSpan(
      "SearchIndexerClient-getSkillset",
      options,
      async (updatedOptions) => {
        const result = await this.client.getSkillset(skillsetName, updatedOptions);
        return utils.generatedSkillsetToPublicSkillset(result);
      },
    );
  }

  /**
   * Creates a new indexer in a search service.
   * @param indexer - The indexer definition to create in a search service.
   * @param options - Additional optional arguments.
   */
  public async createIndexer(
    indexer: SearchIndexer,
    options: CreateIndexerOptions = {},
  ): Promise<SearchIndexer> {
    return tracingClient.withSpan(
      "SearchIndexerClient-createIndexer",
      options,
      async (updatedOptions) => {
        const result = await this.client.createIndexer(
          utils.publicSearchIndexerToGeneratedSearchIndexer(indexer),
          updatedOptions,
        );
        return utils.generatedSearchIndexerToPublicSearchIndexer(result);
      },
    );
  }

  /**
   * Creates a new dataSource in a search service.
   * @param dataSourceConnection - The dataSource definition to create in a search service.
   * @param options - Additional optional arguments.
   */
  public async createDataSourceConnection(
    dataSourceConnection: SearchIndexerDataSourceConnection,
    options: CreateDataSourceConnectionOptions = {},
  ): Promise<SearchIndexerDataSourceConnection> {
    return tracingClient.withSpan(
      "SearchIndexerClient-createDataSourceConnection",
      options,
      async (updatedOptions) => {
        const result = await this.client.createDataSourceConnection(
          utils.publicDataSourceToGeneratedDataSource(dataSourceConnection),
          updatedOptions,
        );
        return utils.generatedDataSourceToPublicDataSource(result);
      },
    );
  }

  /**
   * Creates a new skillset in a search service.
   * @param skillset - The skillset containing one or more skills to create in a search service.
   * @param options - Additional optional arguments.
   */
  public async createSkillset(
    skillset: SearchIndexerSkillset,
    options: CreateSkillsetOptions = {},
  ): Promise<SearchIndexerSkillset> {
    return tracingClient.withSpan(
      "SearchIndexerClient-createSkillset",
      options,
      async (updatedOptions) => {
        const result = await this.client.createSkillset(
          utils.publicSkillsetToGeneratedSkillset(skillset),
          updatedOptions,
        );
        return utils.generatedSkillsetToPublicSkillset(result);
      },
    );
  }

  /**
   * Creates a new indexer or modifies an existing one.
   * @param indexer - The information describing the indexer to be created/updated.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateIndexer(
    indexer: SearchIndexer,
    options: CreateorUpdateIndexerOptions = {},
  ): Promise<SearchIndexer> {
    return tracingClient.withSpan(
      "SearchIndexerClient-createOrUpdateIndexer",
      options,
      async (updatedOptions) => {
        const { onlyIfUnchanged, ...restOptions } = updatedOptions;
        const etag = onlyIfUnchanged ? indexer.etag : undefined;
        const result = await this.client.createOrUpdateIndexer(
          utils.publicSearchIndexerToGeneratedSearchIndexer(indexer),
          indexer.name,
          {
            ...restOptions,
            ifMatch: etag,
          },
        );
        return utils.generatedSearchIndexerToPublicSearchIndexer(result);
      },
    );
  }

  /**
   * Creates a new datasource or modifies an existing one.
   * @param dataSourceConnection - The information describing the datasource to be created/updated.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateDataSourceConnection(
    dataSourceConnection: SearchIndexerDataSourceConnection,
    options: CreateorUpdateDataSourceConnectionOptions = {},
  ): Promise<SearchIndexerDataSourceConnection> {
    return tracingClient.withSpan(
      "SearchIndexerClient-createOrUpdateDataSourceConnection",
      options,
      async (updatedOptions) => {
        const etag = options.onlyIfUnchanged ? dataSourceConnection.etag : undefined;
        const result = await this.client.createOrUpdateDataSourceConnection(
          utils.publicDataSourceToGeneratedDataSource(dataSourceConnection),
          dataSourceConnection.name,
          {
            ...updatedOptions,
            ifMatch: etag,
          },
        );
        return utils.generatedDataSourceToPublicDataSource(result);
      },
    );
  }

  /**
   * Creates a new Skillset or modifies an existing one.
   * @param skillset - The information describing the index to be created.
   * @param options - Additional optional arguments.
   */
  public async createOrUpdateSkillset(
    skillset: SearchIndexerSkillset,
    options: CreateOrUpdateSkillsetOptions = {},
  ): Promise<SearchIndexerSkillset> {
    return tracingClient.withSpan(
      "SearchIndexerClient-createOrUpdateSkillset",
      options,
      async (updatedOptions) => {
        const etag = options.onlyIfUnchanged ? skillset.etag : undefined;
        const result = await this.client.createOrUpdateSkillset(
          utils.publicSkillsetToGeneratedSkillset(skillset),
          skillset.name,
          {
            ...updatedOptions,
            ifMatch: etag,
          },
        );
        return utils.generatedSkillsetToPublicSkillset(result);
      },
    );
  }

  /**
   * Deletes an existing indexer.
   * @param indexer - Indexer/Name of the indexer to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteIndexer(
    indexer: string | SearchIndexer,
    options: DeleteIndexerOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexerClient-deleteIndexer",
      options,
      async (updatedOptions) => {
        const indexerName: string = typeof indexer === "string" ? indexer : indexer.name;
        const etag =
          typeof indexer === "string"
            ? undefined
            : options.onlyIfUnchanged
              ? indexer.etag
              : undefined;

        await this.client.deleteIndexer(indexerName, {
          ...updatedOptions,
          ifMatch: etag,
        });
      },
    );
  }

  /**
   * Deletes an existing datasource.
   * @param dataSource - Datasource/Name of the datasource to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteDataSourceConnection(
    dataSourceConnection: string | SearchIndexerDataSourceConnection,
    options: DeleteDataSourceConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexerClient-deleteDataSourceConnection",
      options,
      async (updatedOptions) => {
        const dataSourceConnectionName: string =
          typeof dataSourceConnection === "string"
            ? dataSourceConnection
            : dataSourceConnection.name;
        const etag =
          typeof dataSourceConnection === "string"
            ? undefined
            : options.onlyIfUnchanged
              ? dataSourceConnection.etag
              : undefined;

        await this.client.deleteDataSourceConnection(dataSourceConnectionName, {
          ...updatedOptions,
          ifMatch: etag,
        });
      },
    );
  }

  /**
   * Deletes an existing Skillset.
   * @param skillset - Skillset/Name of the Skillset to delete.
   * @param options - Additional optional arguments.
   */
  public async deleteSkillset(
    skillset: string | SearchIndexerSkillset,
    options: DeleteSkillsetOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexerClient-deleteSkillset",
      options,
      async (updatedOptions) => {
        const skillsetName: string = typeof skillset === "string" ? skillset : skillset.name;
        const etag =
          typeof skillset === "string"
            ? undefined
            : options.onlyIfUnchanged
              ? skillset.etag
              : undefined;

        await this.client.deleteSkillset(skillsetName, {
          ...updatedOptions,
          ifMatch: etag,
        });
      },
    );
  }

  /**
   * Returns the current status and execution history of an indexer.
   * @param indexerName - The name of the indexer.
   * @param options - Additional optional arguments.
   */
  public async getIndexerStatus(
    indexerName: string,
    options: GetIndexerStatusOptions = {},
  ): Promise<SearchIndexerStatus> {
    return tracingClient.withSpan(
      "SearchIndexerClient-getIndexerStatus",
      options,
      async (updatedOptions) => {
        return this.client.getIndexerStatus(indexerName, updatedOptions);
      },
    );
  }

  /**
   * Resets the change tracking state associated with an indexer.
   * @param indexerName - The name of the indexer to reset.
   * @param options - Additional optional arguments.
   */
  public async resetIndexer(indexerName: string, options: ResetIndexerOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexerClient-resetIndexer",
      options,
      async (updatedOptions) => {
        await this.client.resetIndexer(indexerName, updatedOptions);
      },
    );
  }

  /**
   * Runs an indexer on-demand.
   * @param indexerName - The name of the indexer to run.
   * @param options - Additional optional arguments.
   */
  public async runIndexer(indexerName: string, options: RunIndexerOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexerClient-runIndexer",
      options,
      async (updatedOptions) => {
        await this.client.runIndexer(indexerName, updatedOptions);
      },
    );
  }

  /**
   * Resets specific documents in the datasource to be selectively re-ingested by the indexer.
   * @param indexerName - The name of the indexer to reset documents for.
   * @param options - Additional optional arguments.
   */
  public async resetDocuments(
    indexerName: string,
    options: ResetDocumentsOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexerClient-resetDocs",
      options,
      async (updatedOptions) => {
        await this.client.resetDocuments(indexerName, {
          ...updatedOptions,
          keysOrIds: {
            documentKeys: updatedOptions.documentKeys,
            datasourceDocumentIds: updatedOptions.datasourceDocumentIds,
          },
        });
      },
    );
  }

  /**
   * Reset an existing skillset in a search service.
   * @param skillsetName - The name of the skillset to reset.
   * @param skillNames - The names of skills to reset.
   * @param options - The options parameters.
   */
  public async resetSkills(skillsetName: string, options: ResetSkillsOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "SearchIndexerClient-resetSkills",
      options,
      async (updatedOptions) => {
        await this.client.resetSkills(
          { skillNames: options.skillNames },
          skillsetName,
          updatedOptions,
        );
      },
    );
  }
}
