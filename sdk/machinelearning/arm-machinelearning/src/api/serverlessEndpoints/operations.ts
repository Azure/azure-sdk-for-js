// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  EndpointAuthKeys,
  RegenerateEndpointKeysRequest,
  ServerlessEndpoint,
  PartialMinimalTrackedResourceWithSkuAndIdentity,
  _ServerlessEndpointTrackedResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  endpointAuthKeysDeserializer,
  regenerateEndpointKeysRequestSerializer,
  serverlessEndpointSerializer,
  serverlessEndpointDeserializer,
  partialMinimalTrackedResourceWithSkuAndIdentitySerializer,
  _serverlessEndpointTrackedResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerlessEndpointsRegenerateKeysOptionalParams,
  ServerlessEndpointsListKeysOptionalParams,
  ServerlessEndpointsListOptionalParams,
  ServerlessEndpointsDeleteOptionalParams,
  ServerlessEndpointsUpdateOptionalParams,
  ServerlessEndpointsCreateOrUpdateOptionalParams,
  ServerlessEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  body: RegenerateEndpointKeysRequest,
  options: ServerlessEndpointsRegenerateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}/regenerateKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: regenerateEndpointKeysRequestSerializer(body),
  });
}

export async function _regenerateKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointAuthKeys> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return endpointAuthKeysDeserializer(result.body);
}

/** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
export function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  body: RegenerateEndpointKeysRequest,
  options: ServerlessEndpointsRegenerateKeysOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EndpointAuthKeys>, EndpointAuthKeys> {
  return getLongRunningPoller(context, _regenerateKeysDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _regenerateKeysSend(context, resourceGroupName, workspaceName, name, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<EndpointAuthKeys>, EndpointAuthKeys>;
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ServerlessEndpointsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointAuthKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return endpointAuthKeysDeserializer(result.body);
}

/** List EndpointAuthKeys for an Endpoint using Key-based authentication. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ServerlessEndpointsListKeysOptionalParams = { requestOptions: {} },
): Promise<EndpointAuthKeys> {
  const result = await _listKeysSend(context, resourceGroupName, workspaceName, name, options);
  return _listKeysDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ServerlessEndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints{?api%2Dversion,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      "%24skip": options?.skip,
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
): Promise<_ServerlessEndpointTrackedResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _serverlessEndpointTrackedResourceArmPaginatedResultDeserializer(result.body);
}

/** List Serverless Endpoints. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ServerlessEndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerlessEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ServerlessEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Serverless Endpoint (asynchronous). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ServerlessEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  body: PartialMinimalTrackedResourceWithSkuAndIdentity,
  options: ServerlessEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partialMinimalTrackedResourceWithSkuAndIdentitySerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerlessEndpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverlessEndpointDeserializer(result.body);
}

/** Update Serverless Endpoint (asynchronous). */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  body: PartialMinimalTrackedResourceWithSkuAndIdentity,
  options: ServerlessEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, workspaceName, name, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  body: ServerlessEndpoint,
  options: ServerlessEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serverlessEndpointSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerlessEndpoint> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverlessEndpointDeserializer(result.body);
}

/** Create or update Serverless Endpoint (asynchronous). */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  body: ServerlessEndpoint,
  options: ServerlessEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, workspaceName, name, body, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<ServerlessEndpoint>, ServerlessEndpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ServerlessEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServerlessEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverlessEndpointDeserializer(result.body);
}

/** Get Serverless Endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ServerlessEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<ServerlessEndpoint> {
  const result = await _getSend(context, resourceGroupName, workspaceName, name, options);
  return _getDeserialize(result);
}
