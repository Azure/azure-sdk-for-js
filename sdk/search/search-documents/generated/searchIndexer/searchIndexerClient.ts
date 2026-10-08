// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SearchIndexerContext,
  SearchIndexerClientOptionalParams,
  createSearchIndexer,
} from "./api/index.js";
import {
  SearchIndexerDataSourceConnection,
  IndexerResyncBody,
  SearchIndexer,
  SearchIndexerStatus,
  SearchIndexerSkillset,
} from "../models/azure/search/documents/indexes/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
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
  resync,
  resetIndexer,
  createDataSourceConnection,
  getDataSourceConnections,
  getDataSourceConnection,
  deleteDataSourceConnection,
  createOrUpdateDataSourceConnection,
} from "./api/operations.js";
import {
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

export type { SearchIndexerClientOptionalParams } from "./api/searchIndexerContext.js";

export class SearchIndexerClient {
  private _client: SearchIndexerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: SearchIndexerClientOptionalParams = {},
  ) {
    this._client = createSearchIndexer(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
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
  ): PagedAsyncIterableIterator<SearchIndexerSkillset> {
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
    name: string,
    skillset: SearchIndexerSkillset,
    options: CreateOrUpdateSkillsetOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerSkillset> {
    return createOrUpdateSkillset(this._client, name, skillset, options);
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
  ): PagedAsyncIterableIterator<SearchIndexer> {
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
    name: string,
    indexer: SearchIndexer,
    options: CreateOrUpdateIndexerOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexer> {
    return createOrUpdateIndexer(this._client, name, indexer, options);
  }

  /** Runs an indexer on-demand. */
  runIndexer(
    name: string,
    options: RunIndexerOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return runIndexer(this._client, name, options);
  }

  /** Resync selective options from the datasource to be re-ingested by the indexer." */
  resync(
    name: string,
    indexerResync: IndexerResyncBody,
    options: ResyncOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return resync(this._client, name, indexerResync, options);
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
  ): PagedAsyncIterableIterator<SearchIndexerDataSourceConnection> {
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
    name: string,
    dataSource: SearchIndexerDataSourceConnection,
    options: CreateOrUpdateDataSourceConnectionOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerDataSourceConnection> {
    return createOrUpdateDataSourceConnection(this._client, name, dataSource, options);
  }
}
