// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BookshelfContext as Client } from "../index.js";
import {
  KnowledgeBase,
  knowledgeBaseSerializer,
  knowledgeBaseDeserializer,
  knowledgeBaseOperationResponseUnionDeserializer,
  KnowledgeBaseOperationResponseUnion,
  SearchRequest,
  searchRequestSerializer,
} from "../../../models/microsoft/discovery/bookshelf/models.js";
import { _PagedKnowledgeBase, _pagedKnowledgeBaseDeserializer } from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  KnowledgeBasesDeleteOptionalParams,
  KnowledgeBasesSearchOptionalParams,
  KnowledgeBasesCancelIndexingOptionalParams,
  KnowledgeBasesStartIndexingOptionalParams,
  KnowledgeBasesGetOperationStatusOptionalParams,
  KnowledgeBasesListOptionalParams,
  KnowledgeBasesGetOptionalParams,
  KnowledgeBasesCreateOrUpdateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases/{knowledgeBaseName}{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}
/** Delete a KnowledgeBase. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, knowledgeBaseName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _searchSend(
  context: Client,
  knowledgeBaseName: string,
  body: SearchRequest,
  options: KnowledgeBasesSearchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases/{knowledgeBaseName}:search{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.repeatabilityRequestId !== undefined
        ? { "repeatability-request-id": options?.repeatabilityRequestId }
        : {}),
      ...(options?.repeatabilityFirstSent !== undefined
        ? {
            "repeatability-first-sent": !options?.repeatabilityFirstSent
              ? options?.repeatabilityFirstSent
              : options?.repeatabilityFirstSent.toUTCString(),
          }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: searchRequestSerializer(body),
  });
}

export async function _searchDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}
/** Search the knowledge base. */
export function search(
  context: Client,
  knowledgeBaseName: string,
  body: SearchRequest,
  options: KnowledgeBasesSearchOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _searchDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _searchSend(context, knowledgeBaseName, body, options),
    resourceLocationConfig: "operation-location",
    apiVersion: "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _cancelIndexingSend(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesCancelIndexingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases/{knowledgeBaseName}:cancelIndexing{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.repeatabilityRequestId !== undefined
        ? { "repeatability-request-id": options?.repeatabilityRequestId }
        : {}),
      ...(options?.repeatabilityFirstSent !== undefined
        ? {
            "repeatability-first-sent": !options?.repeatabilityFirstSent
              ? options?.repeatabilityFirstSent
              : options?.repeatabilityFirstSent.toUTCString(),
          }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cancelIndexingDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}
/** Cancel indexing. */
export function cancelIndexing(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesCancelIndexingOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelIndexingDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelIndexingSend(context, knowledgeBaseName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startIndexingSend(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesStartIndexingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases/{knowledgeBaseName}:startIndexing{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.repeatabilityRequestId !== undefined
        ? { "repeatability-request-id": options?.repeatabilityRequestId }
        : {}),
      ...(options?.repeatabilityFirstSent !== undefined
        ? {
            "repeatability-first-sent": !options?.repeatabilityFirstSent
              ? options?.repeatabilityFirstSent
              : options?.repeatabilityFirstSent.toUTCString(),
          }
        : {}),
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { nodePoolId: options?.nodePoolId, projectId: options?.projectId },
  });
}

export async function _startIndexingDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}
/** Start indexing. */
export function startIndexing(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesStartIndexingOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startIndexingDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startIndexingSend(context, knowledgeBaseName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getOperationStatusSend(
  context: Client,
  knowledgeBaseName: string,
  operationId: string,
  options: KnowledgeBasesGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases/{knowledgeBaseName}/operations/{operationId}{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      operationId: operationId,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeBaseOperationResponseUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return knowledgeBaseOperationResponseUnionDeserializer(result.body);
}
/** Get the status of a long-running operation. */
export async function getOperationStatus(
  context: Client,
  knowledgeBaseName: string,
  operationId: string,
  options: KnowledgeBasesGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<KnowledgeBaseOperationResponseUnion> {
  const result = await _getOperationStatusSend(context, knowledgeBaseName, operationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _listSend(
  context: Client,
  options: KnowledgeBasesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases{?api%2Dversion}",
    {
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedKnowledgeBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedKnowledgeBaseDeserializer(result.body);
}
/** List KnowledgeBase resources */
export function list(
  context: Client,
  options: KnowledgeBasesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KnowledgeBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-06-01" },
  );
}

export function _getSend(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases/{knowledgeBaseName}{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<KnowledgeBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return knowledgeBaseDeserializer(result.body);
}
/** Fetch a KnowledgeBase by name. */
export async function get(
  context: Client,
  knowledgeBaseName: string,
  options: KnowledgeBasesGetOptionalParams = { requestOptions: {} },
): Promise<KnowledgeBase> {
  const result = await _getSend(context, knowledgeBaseName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  knowledgeBaseName: string,
  resource: KnowledgeBase,
  options: KnowledgeBasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/knowledgeBases/{knowledgeBaseName}{?api%2Dversion}",
    {
      knowledgeBaseName: knowledgeBaseName,
      "api%2Dversion": "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: knowledgeBaseSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<KnowledgeBase> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return knowledgeBaseDeserializer(result.body);
}
/** Creates or updates a KnowledgeBase. */
export function createOrUpdate(
  context: Client,
  knowledgeBaseName: string,
  resource: KnowledgeBase,
  options: KnowledgeBasesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<KnowledgeBase>, KnowledgeBase> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, knowledgeBaseName, resource, options),
    resourceLocationConfig: "original-uri",
    apiVersion: "2026-06-01",
    // Customization: the service returns an Operation-Location pointing at the
    // KnowledgeBase resource, whose `status` is the indexing lifecycle (stays
    // `NotStarted`). Provisioning completion is signaled by `provisioningState`,
    // so resolve the LRO terminal state from it. See getLongRunningPoller.
    lroStatusFromProvisioningState: true,
  }) as PollerLike<OperationState<KnowledgeBase>, KnowledgeBase>;
}
