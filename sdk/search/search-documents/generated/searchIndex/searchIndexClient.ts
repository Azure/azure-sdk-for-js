// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createSearchIndex,
  SearchIndexContext,
  SearchIndexClientOptionalParams,
} from "./api/index.js";
import {
  SynonymMap,
  ListSynonymMapsResult,
  SearchIndex,
  SearchIndexResponse,
  GetIndexStatisticsResult,
  AnalyzeTextOptions,
  AnalyzeResult,
  SearchAlias,
  KnowledgeBase,
  KnowledgeSourceUnion,
  SearchServiceStatistics,
  IndexStatisticsSummary,
} from "../models/azure/search/documents/indexes/models.js";
import { KnowledgeSourceStatus } from "../models/azure/search/documents/knowledgeBases/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  listIndexStatsSummary,
  getServiceStatistics,
  getKnowledgeSourceStatus,
  createKnowledgeSource,
  listKnowledgeSources,
  getKnowledgeSource,
  deleteKnowledgeSource,
  createOrUpdateKnowledgeSource,
  createKnowledgeBase,
  listKnowledgeBases,
  getKnowledgeBase,
  deleteKnowledgeBase,
  createOrUpdateKnowledgeBase,
  createAlias,
  listAliases,
  getAlias,
  deleteAlias,
  createOrUpdateAlias,
  analyzeText,
  getIndexStatistics,
  createIndex,
  listIndexesWithSelectedProperties,
  listIndexes,
  getIndex,
  deleteIndex,
  createOrUpdateIndex,
  createSynonymMap,
  getSynonymMaps,
  getSynonymMap,
  deleteSynonymMap,
  createOrUpdateSynonymMap,
} from "./api/operations.js";
import {
  ListIndexStatsSummaryOptionalParams,
  GetServiceStatisticsOptionalParams,
  GetKnowledgeSourceStatusOptionalParams,
  CreateKnowledgeSourceOptionalParams,
  ListKnowledgeSourcesOptionalParams,
  GetKnowledgeSourceOptionalParams,
  DeleteKnowledgeSourceOptionalParams,
  CreateOrUpdateKnowledgeSourceOptionalParams,
  CreateKnowledgeBaseOptionalParams,
  ListKnowledgeBasesOptionalParams,
  GetKnowledgeBaseOptionalParams,
  DeleteKnowledgeBaseOptionalParams,
  CreateOrUpdateKnowledgeBaseOptionalParams,
  CreateAliasOptionalParams,
  ListAliasesOptionalParams,
  GetAliasOptionalParams,
  DeleteAliasOptionalParams,
  CreateOrUpdateAliasOptionalParams,
  AnalyzeTextOptionalParams,
  GetIndexStatisticsOptionalParams,
  CreateIndexOptionalParams,
  ListIndexesWithSelectedPropertiesOptionalParams,
  ListIndexesOptionalParams,
  GetIndexOptionalParams,
  DeleteIndexOptionalParams,
  CreateOrUpdateIndexOptionalParams,
  CreateSynonymMapOptionalParams,
  GetSynonymMapsOptionalParams,
  GetSynonymMapOptionalParams,
  DeleteSynonymMapOptionalParams,
  CreateOrUpdateSynonymMapOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { SearchIndexClientOptionalParams } from "./api/searchIndexContext.js";

export class SearchIndexClient {
  private _client: SearchIndexContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: SearchIndexClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSearchIndex(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Retrieves a summary of statistics for all indexes in the search service. */
  listIndexStatsSummary(
    options: ListIndexStatsSummaryOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<IndexStatisticsSummary> {
    return listIndexStatsSummary(this._client, options);
  }

  /** Gets service level statistics for a search service. */
  getServiceStatistics(
    options: GetServiceStatisticsOptionalParams = { requestOptions: {} },
  ): Promise<SearchServiceStatistics> {
    return getServiceStatistics(this._client, options);
  }

  /** Retrieves the status of a knowledge source. */
  getKnowledgeSourceStatus(
    name: string,
    options: GetKnowledgeSourceStatusOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeSourceStatus> {
    return getKnowledgeSourceStatus(this._client, name, options);
  }

  /** Creates a new knowledge source. */
  createKnowledgeSource(
    knowledgeSource: KnowledgeSourceUnion,
    options: CreateKnowledgeSourceOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeSourceUnion> {
    return createKnowledgeSource(this._client, knowledgeSource, options);
  }

  /** Lists all knowledge sources available for a search service. */
  listKnowledgeSources(
    options: ListKnowledgeSourcesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<KnowledgeSourceUnion> {
    return listKnowledgeSources(this._client, options);
  }

  /** Retrieves a knowledge source definition. */
  getKnowledgeSource(
    name: string,
    options: GetKnowledgeSourceOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeSourceUnion> {
    return getKnowledgeSource(this._client, name, options);
  }

  /** Deletes an existing knowledge source. */
  deleteKnowledgeSource(
    name: string,
    options: DeleteKnowledgeSourceOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteKnowledgeSource(this._client, name, options);
  }

  /** Creates a new knowledge source or updates an knowledge source if it already exists. */
  createOrUpdateKnowledgeSource(
    knowledgeSource: KnowledgeSourceUnion,
    name: string,
    options: CreateOrUpdateKnowledgeSourceOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeSourceUnion> {
    return createOrUpdateKnowledgeSource(this._client, knowledgeSource, name, options);
  }

  /** Creates a new knowledge base. */
  createKnowledgeBase(
    knowledgeBase: KnowledgeBase,
    options: CreateKnowledgeBaseOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeBase> {
    return createKnowledgeBase(this._client, knowledgeBase, options);
  }

  /** Lists all knowledge bases available for a search service. */
  listKnowledgeBases(
    options: ListKnowledgeBasesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<KnowledgeBase> {
    return listKnowledgeBases(this._client, options);
  }

  /** Retrieves a knowledge base definition. */
  getKnowledgeBase(
    name: string,
    options: GetKnowledgeBaseOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeBase> {
    return getKnowledgeBase(this._client, name, options);
  }

  /** Deletes a knowledge base. */
  deleteKnowledgeBase(
    name: string,
    options: DeleteKnowledgeBaseOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteKnowledgeBase(this._client, name, options);
  }

  /** Creates a new knowledge base or updates a knowledge base if it already exists. */
  createOrUpdateKnowledgeBase(
    knowledgeBase: KnowledgeBase,
    name: string,
    options: CreateOrUpdateKnowledgeBaseOptionalParams = { requestOptions: {} },
  ): Promise<KnowledgeBase> {
    return createOrUpdateKnowledgeBase(this._client, knowledgeBase, name, options);
  }

  /** Creates a new search alias. */
  createAlias(
    alias: SearchAlias,
    options: CreateAliasOptionalParams = { requestOptions: {} },
  ): Promise<SearchAlias> {
    return createAlias(this._client, alias, options);
  }

  /** Lists all aliases available for a search service. */
  listAliases(
    options: ListAliasesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SearchAlias> {
    return listAliases(this._client, options);
  }

  /** Retrieves an alias definition. */
  getAlias(
    name: string,
    options: GetAliasOptionalParams = { requestOptions: {} },
  ): Promise<SearchAlias> {
    return getAlias(this._client, name, options);
  }

  /** Deletes a search alias and its associated mapping to an index. This operation is permanent, with no recovery option. The mapped index is untouched by this operation. */
  deleteAlias(
    name: string,
    options: DeleteAliasOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteAlias(this._client, name, options);
  }

  /** Creates a new search alias or updates an alias if it already exists. */
  createOrUpdateAlias(
    alias: SearchAlias,
    name: string,
    options: CreateOrUpdateAliasOptionalParams = { requestOptions: {} },
  ): Promise<SearchAlias> {
    return createOrUpdateAlias(this._client, alias, name, options);
  }

  /** Shows how an analyzer breaks text into tokens. */
  analyzeText(
    request: AnalyzeTextOptions,
    name: string,
    options: AnalyzeTextOptionalParams = { requestOptions: {} },
  ): Promise<AnalyzeResult> {
    return analyzeText(this._client, request, name, options);
  }

  /** Returns statistics for the given index, including a document count and storage usage. */
  getIndexStatistics(
    name: string,
    options: GetIndexStatisticsOptionalParams = { requestOptions: {} },
  ): Promise<GetIndexStatisticsResult> {
    return getIndexStatistics(this._client, name, options);
  }

  /** Creates a new search index. */
  createIndex(
    index: SearchIndex,
    options: CreateIndexOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndex> {
    return createIndex(this._client, index, options);
  }

  /** Lists all indexes available for a search service. */
  listIndexesWithSelectedProperties(
    options: ListIndexesWithSelectedPropertiesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SearchIndexResponse> {
    return listIndexesWithSelectedProperties(this._client, options);
  }

  /** Lists all indexes available for a search service. */
  listIndexes(
    options: ListIndexesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SearchIndex> {
    return listIndexes(this._client, options);
  }

  /** Retrieves an index definition. */
  getIndex(
    name: string,
    options: GetIndexOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndex> {
    return getIndex(this._client, name, options);
  }

  /** Deletes a search index and all the documents it contains. This operation is permanent, with no recovery option. Make sure you have a master copy of your index definition, data ingestion code, and a backup of the primary data source in case you need to re-build the index. */
  deleteIndex(
    name: string,
    options: DeleteIndexOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteIndex(this._client, name, options);
  }

  /** Creates a new search index or updates an index if it already exists. */
  createOrUpdateIndex(
    index: SearchIndex,
    name: string,
    options: CreateOrUpdateIndexOptionalParams = { requestOptions: {} },
  ): Promise<SearchIndex> {
    return createOrUpdateIndex(this._client, index, name, options);
  }

  /** Creates a new synonym map. */
  createSynonymMap(
    synonymMap: SynonymMap,
    options: CreateSynonymMapOptionalParams = { requestOptions: {} },
  ): Promise<SynonymMap> {
    return createSynonymMap(this._client, synonymMap, options);
  }

  /** Lists all synonym maps available for a search service. */
  getSynonymMaps(
    options: GetSynonymMapsOptionalParams = { requestOptions: {} },
  ): Promise<ListSynonymMapsResult> {
    return getSynonymMaps(this._client, options);
  }

  /** Retrieves a synonym map definition. */
  getSynonymMap(
    name: string,
    options: GetSynonymMapOptionalParams = { requestOptions: {} },
  ): Promise<SynonymMap> {
    return getSynonymMap(this._client, name, options);
  }

  /** Deletes a synonym map. */
  deleteSynonymMap(
    name: string,
    options: DeleteSynonymMapOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteSynonymMap(this._client, name, options);
  }

  /** Creates a new synonym map or updates a synonym map if it already exists. */
  createOrUpdateSynonymMap(
    synonymMap: SynonymMap,
    name: string,
    options: CreateOrUpdateSynonymMapOptionalParams = { requestOptions: {} },
  ): Promise<SynonymMap> {
    return createOrUpdateSynonymMap(this._client, synonymMap, name, options);
  }
}
