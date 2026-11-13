// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchIndexerContext, SearchIndexerClientOptionalParams } from "./api/index.js";
import { createSearchIndexer } from "./api/index.js";
import type {
  ListDataSourcesResult,
  ListIndexersResult,
  ListSkillsetsResult,
  SearchIndexerDataSourceConnection,
  IndexerResyncBody,
  SearchIndexer,
  SearchIndexerStatus,
  SearchIndexerSkillset,
  SkillNames,
} from "../models/azure/search/documents/indexes/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  getDataSourceConnections,
  getIndexers,
  getSkillsets,
  resetSkills,
  createSkillset,
  listSkillsets,
  getSkillset,
  deleteSkillset,
  createOrUpdateSkillset,
  getIndexerStatus,
  createIndexer,
  listIndexers,
  getIndexer,
  deleteIndexer,
  createOrUpdateIndexer,
  runIndexer,
  resetDocuments,
  resync,
  resetIndexer,
  createDataSourceConnection,
  listDataSourceConnections,
  getDataSourceConnection,
  deleteDataSourceConnection,
  createOrUpdateDataSourceConnection,
} from "./api/operations.js";
import type {
  GetDataSourceConnectionsOptionalParams,
  GetIndexersOptionalParams,
  GetSkillsetsOptionalParams,
  ResetSkillsOptionalParams,
  CreateSkillsetOptionalParams,
  ListSkillsetsOptionalParams,
  GetSkillsetOptionalParams,
  DeleteSkillsetOptionalParams,
  CreateOrUpdateSkillsetOptionalParams,
  GetIndexerStatusOptionalParams,
  CreateIndexerOptionalParams,
  ListIndexersOptionalParams,
  GetIndexerOptionalParams,
  DeleteIndexerOptionalParams,
  CreateOrUpdateIndexerOptionalParams,
  RunIndexerOptionalParams,
  ResetDocumentsOptionalParams,
  ResyncOptionalParams,
  ResetIndexerOptionalParams,
  CreateDataSourceConnectionOptionalParams,
  ListDataSourceConnectionsOptionalParams,
  GetDataSourceConnectionOptionalParams,
  DeleteDataSourceConnectionOptionalParams,
  CreateOrUpdateDataSourceConnectionOptionalParams,
} from "./api/options.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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

  /** Lists all resources in the legacy result wrapper, following continuation pages. */
  getDataSourceConnections(
    options: GetDataSourceConnectionsOptionalParams = { requestOptions: {} },
  ): Promise<ListDataSourcesResult> {
    return getDataSourceConnections(this._client, options);
  }

  /** Lists all resources in the legacy result wrapper, following continuation pages. */
  getIndexers(
    options: GetIndexersOptionalParams = { requestOptions: {} },
  ): Promise<ListIndexersResult> {
    return getIndexers(this._client, options);
  }

  /** Lists all resources in the legacy result wrapper, following continuation pages. */
  getSkillsets(
    options: GetSkillsetsOptionalParams = { requestOptions: {} },
  ): Promise<ListSkillsetsResult> {
    return getSkillsets(this._client, options);
  }

  /** Reset an existing skillset in a search service. */
  resetSkills(
    name: string,
    skillNames: SkillNames,
    options: ResetSkillsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return resetSkills(this._client, name, skillNames, options);
  }

  /** Creates a new skillset in a search service. */
  createSkillset(
    skillset: SearchIndexerSkillset,
    options: CreateSkillsetOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerSkillset> {
    return createSkillset(this._client, skillset, options);
  }

  /** List all skillsets in a search service. */
  listSkillsets(
    options: ListSkillsetsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SearchIndexerSkillset> {
    return listSkillsets(this._client, options);
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
    options?: CreateOrUpdateSkillsetOptionalParams,
  ): Promise<SearchIndexerSkillset>;

  /** Accepts the resource name before the request body. */
  createOrUpdateSkillset(
    name: string,
    skillset: SearchIndexerSkillset,
    options?: CreateOrUpdateSkillsetOptionalParams,
  ): Promise<SearchIndexerSkillset>;

  createOrUpdateSkillset(
    nameOrSkillset: string | SearchIndexerSkillset,
    skillsetOrName: SearchIndexerSkillset | string,
    options: CreateOrUpdateSkillsetOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerSkillset> {
    const name = typeof nameOrSkillset === "string" ? nameOrSkillset : (skillsetOrName as string);
    const skillset =
      typeof nameOrSkillset === "string"
        ? (skillsetOrName as SearchIndexerSkillset)
        : nameOrSkillset;
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
  listIndexers(
    options: ListIndexersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SearchIndexer> {
    return listIndexers(this._client, options);
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
    options?: CreateOrUpdateIndexerOptionalParams,
  ): Promise<SearchIndexer>;

  /** Accepts the resource name before the request body. */
  createOrUpdateIndexer(
    name: string,
    indexer: SearchIndexer,
    options?: CreateOrUpdateIndexerOptionalParams,
  ): Promise<SearchIndexer>;

  createOrUpdateIndexer(
    nameOrIndexer: string | SearchIndexer,
    indexerOrName: SearchIndexer | string,
    options: CreateOrUpdateIndexerOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexer> {
    const name = typeof nameOrIndexer === "string" ? nameOrIndexer : (indexerOrName as string);
    const indexer =
      typeof nameOrIndexer === "string" ? (indexerOrName as SearchIndexer) : nameOrIndexer;
    return createOrUpdateIndexer(this._client, name, indexer, options);
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
  listDataSourceConnections(
    options: ListDataSourceConnectionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SearchIndexerDataSourceConnection> {
    return listDataSourceConnections(this._client, options);
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
    options?: CreateOrUpdateDataSourceConnectionOptionalParams,
  ): Promise<SearchIndexerDataSourceConnection>;

  /** Accepts the resource name before the request body. */
  createOrUpdateDataSourceConnection(
    name: string,
    dataSource: SearchIndexerDataSourceConnection,
    options?: CreateOrUpdateDataSourceConnectionOptionalParams,
  ): Promise<SearchIndexerDataSourceConnection>;

  createOrUpdateDataSourceConnection(
    nameOrDataSource: string | SearchIndexerDataSourceConnection,
    dataSourceOrName: SearchIndexerDataSourceConnection | string,
    options: CreateOrUpdateDataSourceConnectionOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndexerDataSourceConnection> {
    const name =
      typeof nameOrDataSource === "string" ? nameOrDataSource : (dataSourceOrName as string);
    const dataSource =
      typeof nameOrDataSource === "string"
        ? (dataSourceOrName as SearchIndexerDataSourceConnection)
        : nameOrDataSource;
    return createOrUpdateDataSourceConnection(this._client, name, dataSource, options);
  }
}
