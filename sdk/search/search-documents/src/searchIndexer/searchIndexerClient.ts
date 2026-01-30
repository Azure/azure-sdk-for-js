// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createSearchIndexer,
  SearchIndexerContext,
  SearchIndexerClientOptionalParams,
} from "./api/index.js";
import {
  SearchIndexerDataSourceConnection,
  ListDataSourcesResult,
  IndexerResyncBody,
  SearchIndexer,
  ListIndexersResult,
  SearchIndexerStatus,
  SearchIndexerSkillset,
  ListSkillsetsResult,
  SkillNames,
} from "../models/azure/search/documents/indexes/models.js";
import {
  resetSkills,
  createSkillset,
  getSkillsets,
  getSkillset,
  deleteSkillset,
  createOrUpdateSkillset,
  getIndexerStatus,
  createIndexer,
  getIndexers,
  getIndexer,
  deleteIndexer,
  createOrUpdateIndexer,
  runIndexer,
  resetDocuments,
  resync,
  resetIndexer,
  createDataSourceConnection,
  getDataSourceConnections,
  getDataSourceConnection,
  deleteDataSourceConnection,
  createOrUpdateDataSourceConnection,
} from "./api/operations.js";
import {
  ResetSkillsOptionalParams,
  CreateSkillsetOptionalParams,
  GetSkillsetsOptionalParams,
  GetSkillsetOptionalParams,
  DeleteSkillsetOptionalParams,
  CreateOrUpdateSkillsetOptionalParams,
  GetIndexerStatusOptionalParams,
  CreateIndexerOptionalParams,
  GetIndexersOptionalParams,
  GetIndexerOptionalParams,
  DeleteIndexerOptionalParams,
  CreateOrUpdateIndexerOptionalParams,
  RunIndexerOptionalParams,
  ResetDocumentsOptionalParams,
  ResyncOptionalParams,
  ResetIndexerOptionalParams,
  CreateDataSourceConnectionOptionalParams,
  GetDataSourceConnectionsOptionalParams,
  GetDataSourceConnectionOptionalParams,
  DeleteDataSourceConnectionOptionalParams,
  CreateOrUpdateDataSourceConnectionOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { SearchIndexerClientOptionalParams } from "./api/searchIndexerContext.js";

export class SearchIndexerClient {
  private _client: SearchIndexerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: SearchIndexerClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSearchIndexer(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Reset an existing skillset in a search service. */
  resetSkills(
    skillNames: SkillNames,
    name: string,
    options: ResetSkillsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return resetSkills(this._client, skillNames, name, options);
  }

  /** Creates a new skillset in a search service. */
  createSkillset(
    skillset: SearchIndexerSkillset,
    options: CreateSkillsetOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerSkillset> {
    return createSkillset(this._client, skillset, options);
  }

  /** List all skillsets in a search service. */
  getSkillsets(
    options: GetSkillsetsOptionalParams = { requestOptions: {} },
  ): Promise<ListSkillsetsResult> {
    return getSkillsets(this._client, options);
  }

  /** Retrieves a skillset in a search service. */
  getSkillset(
    name: string,
    options: GetSkillsetOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerSkillset> {
    return getSkillset(this._client, name, options);
  }

  /** Deletes a skillset in a search service. */
  deleteSkillset(
    name: string,
    options: DeleteSkillsetOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteSkillset(this._client, name, options);
  }

  /** Creates a new skillset in a search service or updates the skillset if it already exists. */
  createOrUpdateSkillset(
    skillset: SearchIndexerSkillset,
    name: string,
    options: CreateOrUpdateSkillsetOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerSkillset> {
    return createOrUpdateSkillset(this._client, skillset, name, options);
  }

  /** Returns the current status and execution history of an indexer. */
  getIndexerStatus(
    name: string,
    options: GetIndexerStatusOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerStatus> {
    return getIndexerStatus(this._client, name, options);
  }

  /** Creates a new indexer. */
  createIndexer(
    indexer: SearchIndexer,
    options: CreateIndexerOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexer> {
    return createIndexer(this._client, indexer, options);
  }

  /** Lists all indexers available for a search service. */
  getIndexers(
    options: GetIndexersOptionalParams = { requestOptions: {} },
  ): Promise<ListIndexersResult> {
    return getIndexers(this._client, options);
  }

  /** Retrieves an indexer definition. */
  getIndexer(
    name: string,
    options: GetIndexerOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexer> {
    return getIndexer(this._client, name, options);
  }

  /** Deletes an indexer. */
  deleteIndexer(
    name: string,
    options: DeleteIndexerOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteIndexer(this._client, name, options);
  }

  /** Creates a new indexer or updates an indexer if it already exists. */
  createOrUpdateIndexer(
    indexer: SearchIndexer,
    name: string,
    options: CreateOrUpdateIndexerOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexer> {
    return createOrUpdateIndexer(this._client, indexer, name, options);
  }

  /** Runs an indexer on-demand. */
  runIndexer(
    name: string,
    options: RunIndexerOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return runIndexer(this._client, name, options);
  }

  /** Resets specific documents in the datasource to be selectively re-ingested by the indexer. */
  resetDocuments(
    name: string,
    options: ResetDocumentsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return resetDocuments(this._client, name, options);
  }

  /** Resync selective options from the datasource to be re-ingested by the indexer." */
  resync(
    indexerResync: IndexerResyncBody,
    name: string,
    options: ResyncOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return resync(this._client, indexerResync, name, options);
  }

  /** Resets the change tracking state associated with an indexer. */
  resetIndexer(
    name: string,
    options: ResetIndexerOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return resetIndexer(this._client, name, options);
  }

  /** Creates a new datasource. */
  createDataSourceConnection(
    dataSourceConnection: SearchIndexerDataSourceConnection,
    options: CreateDataSourceConnectionOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerDataSourceConnection> {
    return createDataSourceConnection(this._client, dataSourceConnection, options);
  }

  /** Lists all datasources available for a search service. */
  getDataSourceConnections(
    options: GetDataSourceConnectionsOptionalParams = { requestOptions: {} },
  ): Promise<ListDataSourcesResult> {
    return getDataSourceConnections(this._client, options);
  }

  /** Retrieves a datasource definition. */
  getDataSourceConnection(
    name: string,
    options: GetDataSourceConnectionOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerDataSourceConnection> {
    return getDataSourceConnection(this._client, name, options);
  }

  /** Deletes a datasource. */
  deleteDataSourceConnection(
    name: string,
    options: DeleteDataSourceConnectionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteDataSourceConnection(this._client, name, options);
  }

  /** Creates a new datasource or updates a datasource if it already exists. */
  createOrUpdateDataSourceConnection(
    dataSource: SearchIndexerDataSourceConnection,
    name: string,
    options: CreateOrUpdateDataSourceConnectionOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerDataSourceConnection> {
    return createOrUpdateDataSourceConnection(this._client, dataSource, name, options);
  }
}
