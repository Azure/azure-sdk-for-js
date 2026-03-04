// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchIndexerContext as Client } from "./index.js";
import {
  SearchIndexerDataSourceConnection,
  searchIndexerDataSourceConnectionSerializer,
  searchIndexerDataSourceConnectionDeserializer,
  ListDataSourcesResult,
  listDataSourcesResultDeserializer,
  IndexerResyncBody,
  indexerResyncBodySerializer,
  documentKeysOrIdsSerializer,
  SearchIndexer,
  searchIndexerSerializer,
  searchIndexerDeserializer,
  ListIndexersResult,
  listIndexersResultDeserializer,
  SearchIndexerStatus,
  searchIndexerStatusDeserializer,
  SearchIndexerSkillset,
  searchIndexerSkillsetSerializer,
  searchIndexerSkillsetDeserializer,
  ListSkillsetsResult,
  listSkillsetsResultDeserializer,
  SkillNames,
  skillNamesSerializer,
} from "../../models/azure/search/documents/indexes/models.js";
import { errorResponseDeserializer } from "../../models/azure/search/documents/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _resetSkillsSend(
  context: Client,
  skillNames: SkillNames,
  name: string,
  options: ResetSkillsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skillsets('{skillsetName}')/search.resetskills{?api%2Dversion}",
    {
      skillsetName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: skillNamesSerializer(skillNames),
  });
}

export async function _resetSkillsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Reset an existing skillset in a search service. */
export async function resetSkills(
  context: Client,
  skillNames: SkillNames,
  name: string,
  options: ResetSkillsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetSkillsSend(context, skillNames, name, options);
  return _resetSkillsDeserialize(result);
}

export function _createSkillsetSend(
  context: Client,
  skillset: SearchIndexerSkillset,
  options: CreateSkillsetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skillsets{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: searchIndexerSkillsetSerializer(skillset),
  });
}

export async function _createSkillsetDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexerSkillset> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerSkillsetDeserializer(result.body);
}

/** Creates a new skillset in a search service. */
export async function createSkillset(
  context: Client,
  skillset: SearchIndexerSkillset,
  options: CreateSkillsetOptionalParams = { requestOptions: {} },
): Promise<SearchIndexerSkillset> {
  const result = await _createSkillsetSend(context, skillset, options);
  return _createSkillsetDeserialize(result);
}

export function _getSkillsetsSend(
  context: Client,
  options: GetSkillsetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skillsets{?api%2Dversion,%24select}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24select": options?.select,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSkillsetsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListSkillsetsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return listSkillsetsResultDeserializer(result.body);
}

/** List all skillsets in a search service. */
export async function getSkillsets(
  context: Client,
  options: GetSkillsetsOptionalParams = { requestOptions: {} },
): Promise<ListSkillsetsResult> {
  const result = await _getSkillsetsSend(context, options);
  return _getSkillsetsDeserialize(result);
}

export function _getSkillsetSend(
  context: Client,
  name: string,
  options: GetSkillsetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skillsets('{skillsetName}'){?api%2Dversion}",
    {
      skillsetName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSkillsetDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexerSkillset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerSkillsetDeserializer(result.body);
}

/** Retrieves a skillset in a search service. */
export async function getSkillset(
  context: Client,
  name: string,
  options: GetSkillsetOptionalParams = { requestOptions: {} },
): Promise<SearchIndexerSkillset> {
  const result = await _getSkillsetSend(context, name, options);
  return _getSkillsetDeserialize(result);
}

export function _deleteSkillsetSend(
  context: Client,
  name: string,
  options: DeleteSkillsetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skillsets('{skillsetName}'){?api%2Dversion}",
    {
      skillsetName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteSkillsetDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a skillset in a search service. */
export async function deleteSkillset(
  context: Client,
  name: string,
  options: DeleteSkillsetOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSkillsetSend(context, name, options);
  return _deleteSkillsetDeserialize(result);
}

export function _createOrUpdateSkillsetSend(
  context: Client,
  skillset: SearchIndexerSkillset,
  name: string,
  options: CreateOrUpdateSkillsetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/skillsets('{skillsetName}'){?api%2Dversion,ignoreResetRequirements,disableCacheReprocessingChangeDetection}",
    {
      skillsetName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      ignoreResetRequirements: options?.skipIndexerResetRequirementForCache,
      disableCacheReprocessingChangeDetection: options?.disableCacheReprocessingChangeDetection,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: searchIndexerSkillsetSerializer(skillset),
  });
}

export async function _createOrUpdateSkillsetDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexerSkillset> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerSkillsetDeserializer(result.body);
}

/** Creates a new skillset in a search service or updates the skillset if it already exists. */
export async function createOrUpdateSkillset(
  context: Client,
  skillset: SearchIndexerSkillset,
  name: string,
  options: CreateOrUpdateSkillsetOptionalParams = { requestOptions: {} },
): Promise<SearchIndexerSkillset> {
  const result = await _createOrUpdateSkillsetSend(context, skillset, name, options);
  return _createOrUpdateSkillsetDeserialize(result);
}

export function _getIndexerStatusSend(
  context: Client,
  name: string,
  options: GetIndexerStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}')/search.status{?api%2Dversion}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getIndexerStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexerStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerStatusDeserializer(result.body);
}

/** Returns the current status and execution history of an indexer. */
export async function getIndexerStatus(
  context: Client,
  name: string,
  options: GetIndexerStatusOptionalParams = { requestOptions: {} },
): Promise<SearchIndexerStatus> {
  const result = await _getIndexerStatusSend(context, name, options);
  return _getIndexerStatusDeserialize(result);
}

export function _createIndexerSend(
  context: Client,
  indexer: SearchIndexer,
  options: CreateIndexerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: searchIndexerSerializer(indexer),
  });
}

export async function _createIndexerDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexer> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerDeserializer(result.body);
}

/** Creates a new indexer. */
export async function createIndexer(
  context: Client,
  indexer: SearchIndexer,
  options: CreateIndexerOptionalParams = { requestOptions: {} },
): Promise<SearchIndexer> {
  const result = await _createIndexerSend(context, indexer, options);
  return _createIndexerDeserialize(result);
}

export function _getIndexersSend(
  context: Client,
  options: GetIndexersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers{?api%2Dversion,%24select}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24select": options?.select,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getIndexersDeserialize(
  result: PathUncheckedResponse,
): Promise<ListIndexersResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return listIndexersResultDeserializer(result.body);
}

/** Lists all indexers available for a search service. */
export async function getIndexers(
  context: Client,
  options: GetIndexersOptionalParams = { requestOptions: {} },
): Promise<ListIndexersResult> {
  const result = await _getIndexersSend(context, options);
  return _getIndexersDeserialize(result);
}

export function _getIndexerSend(
  context: Client,
  name: string,
  options: GetIndexerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}'){?api%2Dversion}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getIndexerDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerDeserializer(result.body);
}

/** Retrieves an indexer definition. */
export async function getIndexer(
  context: Client,
  name: string,
  options: GetIndexerOptionalParams = { requestOptions: {} },
): Promise<SearchIndexer> {
  const result = await _getIndexerSend(context, name, options);
  return _getIndexerDeserialize(result);
}

export function _deleteIndexerSend(
  context: Client,
  name: string,
  options: DeleteIndexerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}'){?api%2Dversion}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteIndexerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an indexer. */
export async function deleteIndexer(
  context: Client,
  name: string,
  options: DeleteIndexerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteIndexerSend(context, name, options);
  return _deleteIndexerDeserialize(result);
}

export function _createOrUpdateIndexerSend(
  context: Client,
  indexer: SearchIndexer,
  name: string,
  options: CreateOrUpdateIndexerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}'){?api%2Dversion,ignoreResetRequirements,disableCacheReprocessingChangeDetection}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      ignoreResetRequirements: options?.skipIndexerResetRequirementForCache,
      disableCacheReprocessingChangeDetection: options?.disableCacheReprocessingChangeDetection,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: searchIndexerSerializer(indexer),
  });
}

export async function _createOrUpdateIndexerDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexer> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerDeserializer(result.body);
}

/** Creates a new indexer or updates an indexer if it already exists. */
export async function createOrUpdateIndexer(
  context: Client,
  indexer: SearchIndexer,
  name: string,
  options: CreateOrUpdateIndexerOptionalParams = { requestOptions: {} },
): Promise<SearchIndexer> {
  const result = await _createOrUpdateIndexerSend(context, indexer, name, options);
  return _createOrUpdateIndexerDeserialize(result);
}

export function _runIndexerSend(
  context: Client,
  name: string,
  options: RunIndexerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}')/search.run{?api%2Dversion}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _runIndexerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Runs an indexer on-demand. */
export async function runIndexer(
  context: Client,
  name: string,
  options: RunIndexerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _runIndexerSend(context, name, options);
  return _runIndexerDeserialize(result);
}

export function _resetDocumentsSend(
  context: Client,
  name: string,
  options: ResetDocumentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}')/search.resetdocs{?api%2Dversion,overwrite}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      overwrite: options?.overwrite,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: !options["keysOrIds"]
      ? options["keysOrIds"]
      : documentKeysOrIdsSerializer(options["keysOrIds"]),
  });
}

export async function _resetDocumentsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resets specific documents in the datasource to be selectively re-ingested by the indexer. */
export async function resetDocuments(
  context: Client,
  name: string,
  options: ResetDocumentsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetDocumentsSend(context, name, options);
  return _resetDocumentsDeserialize(result);
}

export function _resyncSend(
  context: Client,
  indexerResync: IndexerResyncBody,
  name: string,
  options: ResyncOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}')/search.resync{?api%2Dversion}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: indexerResyncBodySerializer(indexerResync),
  });
}

export async function _resyncDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resync selective options from the datasource to be re-ingested by the indexer." */
export async function resync(
  context: Client,
  indexerResync: IndexerResyncBody,
  name: string,
  options: ResyncOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resyncSend(context, indexerResync, name, options);
  return _resyncDeserialize(result);
}

export function _resetIndexerSend(
  context: Client,
  name: string,
  options: ResetIndexerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/indexers('{indexerName}')/search.reset{?api%2Dversion}",
    {
      indexerName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _resetIndexerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resets the change tracking state associated with an indexer. */
export async function resetIndexer(
  context: Client,
  name: string,
  options: ResetIndexerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetIndexerSend(context, name, options);
  return _resetIndexerDeserialize(result);
}

export function _createDataSourceConnectionSend(
  context: Client,
  dataSourceConnection: SearchIndexerDataSourceConnection,
  options: CreateDataSourceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasources{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: searchIndexerDataSourceConnectionSerializer(dataSourceConnection),
  });
}

export async function _createDataSourceConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexerDataSourceConnection> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerDataSourceConnectionDeserializer(result.body);
}

/** Creates a new datasource. */
export async function createDataSourceConnection(
  context: Client,
  dataSourceConnection: SearchIndexerDataSourceConnection,
  options: CreateDataSourceConnectionOptionalParams = { requestOptions: {} },
): Promise<SearchIndexerDataSourceConnection> {
  const result = await _createDataSourceConnectionSend(context, dataSourceConnection, options);
  return _createDataSourceConnectionDeserialize(result);
}

export function _getDataSourceConnectionsSend(
  context: Client,
  options: GetDataSourceConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasources{?api%2Dversion,%24select}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      "%24select": options?.select,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDataSourceConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListDataSourcesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return listDataSourcesResultDeserializer(result.body);
}

/** Lists all datasources available for a search service. */
export async function getDataSourceConnections(
  context: Client,
  options: GetDataSourceConnectionsOptionalParams = { requestOptions: {} },
): Promise<ListDataSourcesResult> {
  const result = await _getDataSourceConnectionsSend(context, options);
  return _getDataSourceConnectionsDeserialize(result);
}

export function _getDataSourceConnectionSend(
  context: Client,
  name: string,
  options: GetDataSourceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasources('{dataSourceName}'){?api%2Dversion}",
    {
      dataSourceName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDataSourceConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexerDataSourceConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerDataSourceConnectionDeserializer(result.body);
}

/** Retrieves a datasource definition. */
export async function getDataSourceConnection(
  context: Client,
  name: string,
  options: GetDataSourceConnectionOptionalParams = { requestOptions: {} },
): Promise<SearchIndexerDataSourceConnection> {
  const result = await _getDataSourceConnectionSend(context, name, options);
  return _getDataSourceConnectionDeserialize(result);
}

export function _deleteDataSourceConnectionSend(
  context: Client,
  name: string,
  options: DeleteDataSourceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasources('{dataSourceName}'){?api%2Dversion}",
    {
      dataSourceName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteDataSourceConnectionDeserialize(
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

/** Deletes a datasource. */
export async function deleteDataSourceConnection(
  context: Client,
  name: string,
  options: DeleteDataSourceConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDataSourceConnectionSend(context, name, options);
  return _deleteDataSourceConnectionDeserialize(result);
}

export function _createOrUpdateDataSourceConnectionSend(
  context: Client,
  dataSource: SearchIndexerDataSourceConnection,
  name: string,
  options: CreateOrUpdateDataSourceConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasources('{dataSourceName}'){?api%2Dversion,ignoreResetRequirements}",
    {
      dataSourceName: name,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
      ignoreResetRequirements: options?.skipIndexerResetRequirementForCache,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json;odata.metadata=minimal",
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      prefer: "return=representation",
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
    body: searchIndexerDataSourceConnectionSerializer(dataSource),
  });
}

export async function _createOrUpdateDataSourceConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchIndexerDataSourceConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return searchIndexerDataSourceConnectionDeserializer(result.body);
}

/** Creates a new datasource or updates a datasource if it already exists. */
export async function createOrUpdateDataSourceConnection(
  context: Client,
  dataSource: SearchIndexerDataSourceConnection,
  name: string,
  options: CreateOrUpdateDataSourceConnectionOptionalParams = { requestOptions: {} },
): Promise<SearchIndexerDataSourceConnection> {
  const result = await _createOrUpdateDataSourceConnectionSend(context, dataSource, name, options);
  return _createOrUpdateDataSourceConnectionDeserialize(result);
}
