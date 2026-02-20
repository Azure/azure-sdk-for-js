// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  memorySearchOptionsSerializer,
  apiErrorResponseDeserializer,
  memoryStoreDefinitionUnionSerializer,
  MemoryStoreDefinitionUnion,
  MemoryStore,
  memoryStoreDeserializer,
  _AgentsPagedResultMemoryStoreObject,
  _agentsPagedResultMemoryStoreObjectDeserializer,
  DeleteMemoryStoreResponse,
  deleteMemoryStoreResponseDeserializer,
  inputItemUnionArraySerializer,
  MemoryStoreSearchResponse,
  memoryStoreSearchResponseDeserializer,
  MemoryStoreUpdateResponse,
  memoryStoreUpdateResponseDeserializer,
  MemoryStoreUpdateCompletedResult,
  memoryStoreUpdateCompletedResultDeserializer,
  MemoryStoreDeleteScopeResponse,
  memoryStoreDeleteScopeResponseDeserializer,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaMemoryStoresDeleteScopeOptionalParams,
  BetaMemoryStoresGetUpdateResultOptionalParams,
  BetaMemoryStoresUpdateMemoriesOptionalParams,
  BetaMemoryStoresSearchMemoriesOptionalParams,
  BetaMemoryStoresDeleteOptionalParams,
  BetaMemoryStoresListOptionalParams,
  BetaMemoryStoresGetOptionalParams,
  BetaMemoryStoresUpdateOptionalParams,
  BetaMemoryStoresCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteScopeSend(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}:delete_scope{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { scope: scope },
  });
}

export async function _deleteScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreDeleteScopeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreDeleteScopeResponseDeserializer(result.body);
}

/** Delete all memories associated with a specific scope from a memory store. */
export async function deleteScope(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresDeleteScopeOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreDeleteScopeResponse> {
  const result = await _deleteScopeSend(context, name, scope, options);
  return _deleteScopeDeserialize(result);
}

export function _getUpdateResultSend(
  context: Client,
  name: string,
  updateId: string,
  options: BetaMemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}/updates/{update_id}{?api-version}",
    {
      name: name,
      update_id: updateId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getUpdateResultDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreUpdateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreUpdateResponseDeserializer(result.body);
}

/** Get memory store update result. */
export async function getUpdateResult(
  context: Client,
  name: string,
  updateId: string,
  options: BetaMemoryStoresGetUpdateResultOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreUpdateResponse> {
  const result = await _getUpdateResultSend(context, name, updateId, options);
  return _getUpdateResultDeserialize(result);
}

export function _updateMemoriesSend(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}:update_memories{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      scope: scope,
      items: !options?.items ? options?.items : inputItemUnionArraySerializer(options?.items),
      previous_update_id: options?.previousUpdateId,
      update_delay: options?.updateDelayInSecs,
    },
  });
}

export async function _updateMemoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreUpdateCompletedResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return memoryStoreUpdateCompletedResultDeserializer(result.body.result);
}

/** Update memory store with conversation memories. */
export function updateMemories(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresUpdateMemoriesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MemoryStoreUpdateCompletedResult>, MemoryStoreUpdateCompletedResult> {
  return getLongRunningPoller(context, _updateMemoriesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateMemoriesSend(context, name, scope, options),

    apiVersion: context.apiVersion,
  }) as PollerLike<
    OperationState<MemoryStoreUpdateCompletedResult>,
    MemoryStoreUpdateCompletedResult
  >;
}

export function _searchMemoriesSend(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}:search_memories{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      scope: scope,
      items: !options?.items ? options?.items : inputItemUnionArraySerializer(options?.items),
      previous_search_id: options?.previousSearchId,
      options: !options?.options
        ? options?.options
        : memorySearchOptionsSerializer(options?.options),
    },
  });
}

export async function _searchMemoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<MemoryStoreSearchResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreSearchResponseDeserializer(result.body);
}

/** Search for relevant memories from a memory store based on conversation context. */
export async function searchMemories(
  context: Client,
  name: string,
  scope: string,
  options: BetaMemoryStoresSearchMemoriesOptionalParams = { requestOptions: {} },
): Promise<MemoryStoreSearchResponse> {
  const result = await _searchMemoriesSend(context, name, scope, options);
  return _searchMemoriesDeserialize(result);
}

export function _deleteSend(
  context: Client,
  name: string,
  options: BetaMemoryStoresDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteMemoryStoreResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return deleteMemoryStoreResponseDeserializer(result.body);
}

/** Delete a memory store. */
export async function $delete(
  context: Client,
  name: string,
  options: BetaMemoryStoresDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteMemoryStoreResponse> {
  const result = await _deleteSend(context, name, options);
  return _deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  options: BetaMemoryStoresListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores{?limit,order,after,before,api-version}",
    {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultMemoryStoreObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultMemoryStoreObjectDeserializer(result.body);
}

/** List all memory stores. */
export function list(
  context: Client,
  options: BetaMemoryStoresListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MemoryStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: BetaMemoryStoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Retrieve a memory store. */
export async function get(
  context: Client,
  name: string,
  options: BetaMemoryStoresGetOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  name: string,
  options: BetaMemoryStoresUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { description: options?.description, metadata: options?.metadata },
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Update a memory store. */
export async function update(
  context: Client,
  name: string,
  options: BetaMemoryStoresUpdateOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _updateSend(context, name, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  name: string,
  definition: MemoryStoreDefinitionUnion,
  options: BetaMemoryStoresCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "MemoryStores=V1Preview";
  const path = expandUrlTemplate(
    "/memory_stores{?api-version}",
    {
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      name: name,
      description: options?.description,
      metadata: options?.metadata,
      definition: memoryStoreDefinitionUnionSerializer(definition),
    },
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<MemoryStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);
    throw error;
  }

  return memoryStoreDeserializer(result.body);
}

/** Create a memory store. */
export async function create(
  context: Client,
  name: string,
  definition: MemoryStoreDefinitionUnion,
  options: BetaMemoryStoresCreateOptionalParams = { requestOptions: {} },
): Promise<MemoryStore> {
  const result = await _createSend(context, name, definition, options);
  return _createDeserialize(result);
}
