// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchIndexContext as Client } from "./index.js";
import {
  SynonymMap,
  synonymMapSerializer,
  synonymMapDeserializer,
  ListSynonymMapsResult,
  listSynonymMapsResultDeserializer,
  SearchIndex,
  searchIndexSerializer,
  searchIndexDeserializer,
  _ListIndexesResult,
  _listIndexesResultDeserializer,
  GetIndexStatisticsResult,
  getIndexStatisticsResultDeserializer,
  AnalyzeTextOptions,
  analyzeTextOptionsSerializer,
  AnalyzeResult,
  analyzeResultDeserializer,
  SearchAlias,
  searchAliasSerializer,
  searchAliasDeserializer,
  _ListAliasesResult,
  _listAliasesResultDeserializer,
  KnowledgeBase,
  knowledgeBaseSerializer,
  knowledgeBaseDeserializer,
  _ListKnowledgeBasesResult,
  _listKnowledgeBasesResultDeserializer,
  knowledgeSourceUnionSerializer,
  knowledgeSourceUnionDeserializer,
  KnowledgeSourceUnion,
  _ListKnowledgeSourcesResult,
  _listKnowledgeSourcesResultDeserializer,
  SearchServiceStatistics,
  searchServiceStatisticsDeserializer,
  _ListIndexStatsSummary,
  _listIndexStatsSummaryDeserializer,
  IndexStatisticsSummary,
} from "../../models/azure/search/documents/indexes/models.js";
import { errorResponseDeserializer } from "../../models/azure/search/documents/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ListIndexStatsSummaryOptionalParams,
  GetServiceStatisticsOptionalParams,
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
  ListIndexesOptionalParams,
  GetIndexOptionalParams,
  DeleteIndexOptionalParams,
  CreateOrUpdateIndexOptionalParams,
  CreateSynonymMapOptionalParams,
  GetSynonymMapsOptionalParams,
  GetSynonymMapOptionalParams,
  DeleteSynonymMapOptionalParams,
  CreateOrUpdateSynonymMapOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listIndexStatsSummarySend(
  context: Client,
  options: ListIndexStatsSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexstats{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listIndexStatsSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListIndexStatsSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _listIndexStatsSummaryDeserializer(result.body);
}

/** Retrieves a summary of statistics for all indexes in the search service. */
export function listIndexStatsSummary(
  context: Client,
  options: ListIndexStatsSummaryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IndexStatisticsSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listIndexStatsSummarySend(context, options),
    _listIndexStatsSummaryDeserialize,
    ["200"],
    { itemName: "IndexesStatistics" },
  );
}

export function _getServiceStatisticsSend(
  context: Client,
  options: GetServiceStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/servicestats{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getServiceStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchServiceStatistics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchServiceStatisticsDeserializer(result.body);
}

/** Gets service level statistics for a search service. */
export async function getServiceStatistics(
  context: Client,
  options: GetServiceStatisticsOptionalParams = { requestOptions: {} },
): Promise<SearchServiceStatistics> {
  const result = await _getServiceStatisticsSend(context, options);
  return _getServiceStatisticsDeserialize(result);
}

export function _createKnowledgeSourceSend(
  context: Client,
  knowledgeSource: KnowledgeSourceUnion,
  options: CreateKnowledgeSourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgesources{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: knowledgeSourceUnionSerializer(knowledgeSource),
  });
}

export async function _createKnowledgeSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeSourceUnion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return knowledgeSourceUnionDeserializer(result.body);
}

/** Creates a new knowledge source. */
export async function createKnowledgeSource(
  context: Client,
  knowledgeSource: KnowledgeSourceUnion,
  options: CreateKnowledgeSourceOptionalParams = { requestOptions: {} },
): Promise<KnowledgeSourceUnion> {
  const result = await _createKnowledgeSourceSend(context, knowledgeSource, options);
  return _createKnowledgeSourceDeserialize(result);
}

export function _listKnowledgeSourcesSend(
  context: Client,
  options: ListKnowledgeSourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgesources{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKnowledgeSourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListKnowledgeSourcesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _listKnowledgeSourcesResultDeserializer(result.body);
}

/** Lists all knowledge sources available for a search service. */
export function listKnowledgeSources(
  context: Client,
  options: ListKnowledgeSourcesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KnowledgeSourceUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listKnowledgeSourcesSend(context, options),
    _listKnowledgeSourcesDeserialize,
    ["200"],
    { itemName: "value" },
  );
}

export function _getKnowledgeSourceSend(
  context: Client,
  sourceName: string,
  options: GetKnowledgeSourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgesources('{sourceName}'){?api%2Dversion}",
    {
      sourceName: sourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getKnowledgeSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeSourceUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return knowledgeSourceUnionDeserializer(result.body);
}

/** Retrieves a knowledge source definition. */
export async function getKnowledgeSource(
  context: Client,
  sourceName: string,
  options: GetKnowledgeSourceOptionalParams = { requestOptions: {} },
): Promise<KnowledgeSourceUnion> {
  const result = await _getKnowledgeSourceSend(context, sourceName, options);
  return _getKnowledgeSourceDeserialize(result);
}

export function _deleteKnowledgeSourceSend(
  context: Client,
  sourceName: string,
  options: DeleteKnowledgeSourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgesources('{sourceName}'){?api%2Dversion}",
    {
      sourceName: sourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteKnowledgeSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an existing knowledge source. */
export async function deleteKnowledgeSource(
  context: Client,
  sourceName: string,
  options: DeleteKnowledgeSourceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteKnowledgeSourceSend(context, sourceName, options);
  return _deleteKnowledgeSourceDeserialize(result);
}

export function _createOrUpdateKnowledgeSourceSend(
  context: Client,
  knowledgeSource: KnowledgeSourceUnion,
  sourceName: string,
  options: CreateOrUpdateKnowledgeSourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgesources('{sourceName}'){?api%2Dversion}",
    {
      sourceName: sourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: knowledgeSourceUnionSerializer(knowledgeSource),
  });
}

export async function _createOrUpdateKnowledgeSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeSourceUnion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return knowledgeSourceUnionDeserializer(result.body);
}

/** Creates a new knowledge source or updates an knowledge source if it already exists. */
export async function createOrUpdateKnowledgeSource(
  context: Client,
  knowledgeSource: KnowledgeSourceUnion,
  sourceName: string,
  options: CreateOrUpdateKnowledgeSourceOptionalParams = { requestOptions: {} },
): Promise<KnowledgeSourceUnion> {
  const result = await _createOrUpdateKnowledgeSourceSend(
    context,
    knowledgeSource,
    sourceName,
    options,
  );
  return _createOrUpdateKnowledgeSourceDeserialize(result);
}

export function _createKnowledgeBaseSend(
  context: Client,
  knowledgeBase: KnowledgeBase,
  options: CreateKnowledgeBaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: knowledgeBaseSerializer(knowledgeBase),
  });
}

export async function _createKnowledgeBaseDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeBase> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return knowledgeBaseDeserializer(result.body);
}

/** Creates a new knowledge base. */
export async function createKnowledgeBase(
  context: Client,
  knowledgeBase: KnowledgeBase,
  options: CreateKnowledgeBaseOptionalParams = { requestOptions: {} },
): Promise<KnowledgeBase> {
  const result = await _createKnowledgeBaseSend(context, knowledgeBase, options);
  return _createKnowledgeBaseDeserialize(result);
}

export function _listKnowledgeBasesSend(
  context: Client,
  options: ListKnowledgeBasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listKnowledgeBasesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListKnowledgeBasesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _listKnowledgeBasesResultDeserializer(result.body);
}

/** Lists all knowledge bases available for a search service. */
export function listKnowledgeBases(
  context: Client,
  options: ListKnowledgeBasesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KnowledgeBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listKnowledgeBasesSend(context, options),
    _listKnowledgeBasesDeserialize,
    ["200"],
    { itemName: "value" },
  );
}

export function _getKnowledgeBaseSend(
  context: Client,
  knowledgeBaseName: string,
  options: GetKnowledgeBaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}'){?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getKnowledgeBaseDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return knowledgeBaseDeserializer(result.body);
}

/** Retrieves a knowledge base definition. */
export async function getKnowledgeBase(
  context: Client,
  knowledgeBaseName: string,
  options: GetKnowledgeBaseOptionalParams = { requestOptions: {} },
): Promise<KnowledgeBase> {
  const result = await _getKnowledgeBaseSend(context, knowledgeBaseName, options);
  return _getKnowledgeBaseDeserialize(result);
}

export function _deleteKnowledgeBaseSend(
  context: Client,
  knowledgeBaseName: string,
  options: DeleteKnowledgeBaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}'){?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteKnowledgeBaseDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a knowledge base. */
export async function deleteKnowledgeBase(
  context: Client,
  knowledgeBaseName: string,
  options: DeleteKnowledgeBaseOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteKnowledgeBaseSend(context, knowledgeBaseName, options);
  return _deleteKnowledgeBaseDeserialize(result);
}

export function _createOrUpdateKnowledgeBaseSend(
  context: Client,
  knowledgeBase: KnowledgeBase,
  knowledgeBaseName: string,
  options: CreateOrUpdateKnowledgeBaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgebases('{knowledgeBaseName}'){?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: knowledgeBaseSerializer(knowledgeBase),
  });
}

export async function _createOrUpdateKnowledgeBaseDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeBase> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return knowledgeBaseDeserializer(result.body);
}

/** Creates a new knowledge base or updates a knowledge base if it already exists. */
export async function createOrUpdateKnowledgeBase(
  context: Client,
  knowledgeBase: KnowledgeBase,
  knowledgeBaseName: string,
  options: CreateOrUpdateKnowledgeBaseOptionalParams = { requestOptions: {} },
): Promise<KnowledgeBase> {
  const result = await _createOrUpdateKnowledgeBaseSend(
    context,
    knowledgeBase,
    knowledgeBaseName,
    options,
  );
  return _createOrUpdateKnowledgeBaseDeserialize(result);
}

export function _createAliasSend(
  context: Client,
  alias: SearchAlias,
  options: CreateAliasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/aliases{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: searchAliasSerializer(alias),
  });
}

export async function _createAliasDeserialize(result: PathUncheckedResponse): Promise<SearchAlias> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchAliasDeserializer(result.body);
}

/** Creates a new search alias. */
export async function createAlias(
  context: Client,
  alias: SearchAlias,
  options: CreateAliasOptionalParams = { requestOptions: {} },
): Promise<SearchAlias> {
  const result = await _createAliasSend(context, alias, options);
  return _createAliasDeserialize(result);
}

export function _listAliasesSend(
  context: Client,
  options: ListAliasesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/aliases{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAliasesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListAliasesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _listAliasesResultDeserializer(result.body);
}

/** Lists all aliases available for a search service. */
export function listAliases(
  context: Client,
  options: ListAliasesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SearchAlias> {
  return buildPagedAsyncIterator(
    context,
    () => _listAliasesSend(context, options),
    _listAliasesDeserialize,
    ["200"],
    { itemName: "aliases" },
  );
}

export function _getAliasSend(
  context: Client,
  aliasName: string,
  options: GetAliasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/aliases('{aliasName}'){?api%2Dversion}",
    {
      aliasName: aliasName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAliasDeserialize(result: PathUncheckedResponse): Promise<SearchAlias> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchAliasDeserializer(result.body);
}

/** Retrieves an alias definition. */
export async function getAlias(
  context: Client,
  aliasName: string,
  options: GetAliasOptionalParams = { requestOptions: {} },
): Promise<SearchAlias> {
  const result = await _getAliasSend(context, aliasName, options);
  return _getAliasDeserialize(result);
}

export function _deleteAliasSend(
  context: Client,
  aliasName: string,
  options: DeleteAliasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/aliases('{aliasName}'){?api%2Dversion}",
    {
      aliasName: aliasName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteAliasDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a search alias and its associated mapping to an index. This operation is permanent, with no recovery option. The mapped index is untouched by this operation. */
export async function deleteAlias(
  context: Client,
  aliasName: string,
  options: DeleteAliasOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAliasSend(context, aliasName, options);
  return _deleteAliasDeserialize(result);
}

export function _createOrUpdateAliasSend(
  context: Client,
  alias: SearchAlias,
  aliasName: string,
  options: CreateOrUpdateAliasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/aliases('{aliasName}'){?api%2Dversion}",
    {
      aliasName: aliasName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: searchAliasSerializer(alias),
  });
}

export async function _createOrUpdateAliasDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchAlias> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchAliasDeserializer(result.body);
}

/** Creates a new search alias or updates an alias if it already exists. */
export async function createOrUpdateAlias(
  context: Client,
  alias: SearchAlias,
  aliasName: string,
  options: CreateOrUpdateAliasOptionalParams = { requestOptions: {} },
): Promise<SearchAlias> {
  const result = await _createOrUpdateAliasSend(context, alias, aliasName, options);
  return _createOrUpdateAliasDeserialize(result);
}

export function _analyzeTextSend(
  context: Client,
  request: AnalyzeTextOptions,
  indexName: string,
  options: AnalyzeTextOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/search.analyze{?api%2Dversion}",
    {
      indexName: indexName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.querySourceAuthorization !== undefined
        ? {
            "x-ms-query-source-authorization": options?.querySourceAuthorization,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: analyzeTextOptionsSerializer(request),
  });
}

export async function _analyzeTextDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalyzeResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return analyzeResultDeserializer(result.body);
}

/** Shows how an analyzer breaks text into tokens. */
export async function analyzeText(
  context: Client,
  request: AnalyzeTextOptions,
  indexName: string,
  options: AnalyzeTextOptionalParams = { requestOptions: {} },
): Promise<AnalyzeResult> {
  const result = await _analyzeTextSend(context, request, indexName, options);
  return _analyzeTextDeserialize(result);
}

export function _getIndexStatisticsSend(
  context: Client,
  indexName: string,
  options: GetIndexStatisticsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}')/search.stats{?api%2Dversion}",
    {
      indexName: indexName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.querySourceAuthorization !== undefined
        ? {
            "x-ms-query-source-authorization": options?.querySourceAuthorization,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getIndexStatisticsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetIndexStatisticsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return getIndexStatisticsResultDeserializer(result.body);
}

/** Returns statistics for the given index, including a document count and storage usage. */
export async function getIndexStatistics(
  context: Client,
  indexName: string,
  options: GetIndexStatisticsOptionalParams = { requestOptions: {} },
): Promise<GetIndexStatisticsResult> {
  const result = await _getIndexStatisticsSend(context, indexName, options);
  return _getIndexStatisticsDeserialize(result);
}

export function _createIndexSend(
  context: Client,
  index: SearchIndex,
  options: CreateIndexOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: searchIndexSerializer(index),
  });
}

export async function _createIndexDeserialize(result: PathUncheckedResponse): Promise<SearchIndex> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexDeserializer(result.body);
}

/** Creates a new search index. */
export async function createIndex(
  context: Client,
  index: SearchIndex,
  options: CreateIndexOptionalParams = { requestOptions: {} },
): Promise<SearchIndex> {
  const result = await _createIndexSend(context, index, options);
  return _createIndexDeserialize(result);
}

export function _listIndexesSend(
  context: Client,
  options: ListIndexesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes{?api%2Dversion,%24select}",
    {
      "api%2Dversion": context.apiVersion,
      "%24select": options?.select,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listIndexesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListIndexesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _listIndexesResultDeserializer(result.body);
}

/** Lists all indexes available for a search service. */
export function listIndexes(
  context: Client,
  options: ListIndexesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SearchIndex> {
  return buildPagedAsyncIterator(
    context,
    () => _listIndexesSend(context, options),
    _listIndexesDeserialize,
    ["200"],
    { itemName: "indexes" },
  );
}

export function _getIndexSend(
  context: Client,
  indexName: string,
  options: GetIndexOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}'){?api%2Dversion}",
    {
      indexName: indexName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.querySourceAuthorization !== undefined
        ? {
            "x-ms-query-source-authorization": options?.querySourceAuthorization,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getIndexDeserialize(result: PathUncheckedResponse): Promise<SearchIndex> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexDeserializer(result.body);
}

/** Retrieves an index definition. */
export async function getIndex(
  context: Client,
  indexName: string,
  options: GetIndexOptionalParams = { requestOptions: {} },
): Promise<SearchIndex> {
  const result = await _getIndexSend(context, indexName, options);
  return _getIndexDeserialize(result);
}

export function _deleteIndexSend(
  context: Client,
  indexName: string,
  options: DeleteIndexOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}'){?api%2Dversion}",
    {
      indexName: indexName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.querySourceAuthorization !== undefined
        ? {
            "x-ms-query-source-authorization": options?.querySourceAuthorization,
          }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteIndexDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a search index and all the documents it contains. This operation is permanent, with no recovery option. Make sure you have a master copy of your index definition, data ingestion code, and a backup of the primary data source in case you need to re-build the index. */
export async function deleteIndex(
  context: Client,
  indexName: string,
  options: DeleteIndexOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteIndexSend(context, indexName, options);
  return _deleteIndexDeserialize(result);
}

export function _createOrUpdateIndexSend(
  context: Client,
  index: SearchIndex,
  indexName: string,
  options: CreateOrUpdateIndexOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexes('{indexName}'){?api%2Dversion,allowIndexDowntime}",
    {
      indexName: indexName,
      "api%2Dversion": context.apiVersion,
      allowIndexDowntime: options?.allowIndexDowntime,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...(options?.querySourceAuthorization !== undefined
        ? {
            "x-ms-query-source-authorization": options?.querySourceAuthorization,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: searchIndexSerializer(index),
  });
}

export async function _createOrUpdateIndexDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndex> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexDeserializer(result.body);
}

/** Creates a new search index or updates an index if it already exists. */
export async function createOrUpdateIndex(
  context: Client,
  index: SearchIndex,
  indexName: string,
  options: CreateOrUpdateIndexOptionalParams = { requestOptions: {} },
): Promise<SearchIndex> {
  const result = await _createOrUpdateIndexSend(context, index, indexName, options);
  return _createOrUpdateIndexDeserialize(result);
}

export function _createSynonymMapSend(
  context: Client,
  synonymMap: SynonymMap,
  options: CreateSynonymMapOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/synonymmaps{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: synonymMapSerializer(synonymMap),
  });
}

export async function _createSynonymMapDeserialize(
  result: PathUncheckedResponse,
): Promise<SynonymMap> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return synonymMapDeserializer(result.body);
}

/** Creates a new synonym map. */
export async function createSynonymMap(
  context: Client,
  synonymMap: SynonymMap,
  options: CreateSynonymMapOptionalParams = { requestOptions: {} },
): Promise<SynonymMap> {
  const result = await _createSynonymMapSend(context, synonymMap, options);
  return _createSynonymMapDeserialize(result);
}

export function _getSynonymMapsSend(
  context: Client,
  options: GetSynonymMapsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/synonymmaps{?api%2Dversion,%24select}",
    {
      "api%2Dversion": context.apiVersion,
      "%24select": options?.select,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSynonymMapsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListSynonymMapsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return listSynonymMapsResultDeserializer(result.body);
}

/** Lists all synonym maps available for a search service. */
export async function getSynonymMaps(
  context: Client,
  options: GetSynonymMapsOptionalParams = { requestOptions: {} },
): Promise<ListSynonymMapsResult> {
  const result = await _getSynonymMapsSend(context, options);
  return _getSynonymMapsDeserialize(result);
}

export function _getSynonymMapSend(
  context: Client,
  synonymMapName: string,
  options: GetSynonymMapOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/synonymmaps('{synonymMapName}'){?api%2Dversion}",
    {
      synonymMapName: synonymMapName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSynonymMapDeserialize(
  result: PathUncheckedResponse,
): Promise<SynonymMap> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return synonymMapDeserializer(result.body);
}

/** Retrieves a synonym map definition. */
export async function getSynonymMap(
  context: Client,
  synonymMapName: string,
  options: GetSynonymMapOptionalParams = { requestOptions: {} },
): Promise<SynonymMap> {
  const result = await _getSynonymMapSend(context, synonymMapName, options);
  return _getSynonymMapDeserialize(result);
}

export function _deleteSynonymMapSend(
  context: Client,
  synonymMapName: string,
  options: DeleteSynonymMapOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/synonymmaps('{synonymMapName}'){?api%2Dversion}",
    {
      synonymMapName: synonymMapName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteSynonymMapDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a synonym map. */
export async function deleteSynonymMap(
  context: Client,
  synonymMapName: string,
  options: DeleteSynonymMapOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSynonymMapSend(context, synonymMapName, options);
  return _deleteSynonymMapDeserialize(result);
}

export function _createOrUpdateSynonymMapSend(
  context: Client,
  synonymMap: SynonymMap,
  synonymMapName: string,
  options: CreateOrUpdateSynonymMapOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/synonymmaps('{synonymMapName}'){?api%2Dversion}",
    {
      synonymMapName: synonymMapName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: synonymMapSerializer(synonymMap),
  });
}

export async function _createOrUpdateSynonymMapDeserialize(
  result: PathUncheckedResponse,
): Promise<SynonymMap> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return synonymMapDeserializer(result.body);
}

/** Creates a new synonym map or updates a synonym map if it already exists. */
export async function createOrUpdateSynonymMap(
  context: Client,
  synonymMap: SynonymMap,
  synonymMapName: string,
  options: CreateOrUpdateSynonymMapOptionalParams = { requestOptions: {} },
): Promise<SynonymMap> {
  const result = await _createOrUpdateSynonymMapSend(context, synonymMap, synonymMapName, options);
  return _createOrUpdateSynonymMapDeserialize(result);
}
