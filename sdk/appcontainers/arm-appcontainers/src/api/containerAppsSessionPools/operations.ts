// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  SessionPool,
  sessionPoolSerializer,
  sessionPoolDeserializer,
  errorResponseDeserializer,
  SessionPoolUpdatableProperties,
  sessionPoolUpdatablePropertiesSerializer,
  _SessionPoolCollection,
  _sessionPoolCollectionDeserializer,
  McpServerCredential,
  mcpServerCredentialDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsSessionPoolsRotateMcpServerCredentialsOptionalParams,
  ContainerAppsSessionPoolsFetchMcpServerCredentialsOptionalParams,
  ContainerAppsSessionPoolsListBySubscriptionOptionalParams,
  ContainerAppsSessionPoolsListByResourceGroupOptionalParams,
  ContainerAppsSessionPoolsDeleteOptionalParams,
  ContainerAppsSessionPoolsUpdateOptionalParams,
  ContainerAppsSessionPoolsCreateOrUpdateOptionalParams,
  ContainerAppsSessionPoolsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _rotateMcpServerCredentialsSend(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsRotateMcpServerCredentialsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}/rotateMcpServerCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sessionPoolName: sessionPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _rotateMcpServerCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<McpServerCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mcpServerCredentialDeserializer(result.body);
}

/** Rotate and fetch the rotated MCP server credentials of a session pool. */
export async function rotateMcpServerCredentials(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsRotateMcpServerCredentialsOptionalParams = {
    requestOptions: {},
  },
): Promise<McpServerCredential> {
  const result = await _rotateMcpServerCredentialsSend(
    context,
    resourceGroupName,
    sessionPoolName,
    options,
  );
  return _rotateMcpServerCredentialsDeserialize(result);
}

export function _fetchMcpServerCredentialsSend(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsFetchMcpServerCredentialsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}/fetchMcpServerCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sessionPoolName: sessionPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _fetchMcpServerCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<McpServerCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return mcpServerCredentialDeserializer(result.body);
}

/** Fetch the MCP server credentials of a session pool. */
export async function fetchMcpServerCredentials(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsFetchMcpServerCredentialsOptionalParams = {
    requestOptions: {},
  },
): Promise<McpServerCredential> {
  const result = await _fetchMcpServerCredentialsSend(
    context,
    resourceGroupName,
    sessionPoolName,
    options,
  );
  return _fetchMcpServerCredentialsDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ContainerAppsSessionPoolsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/sessionPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SessionPoolCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sessionPoolCollectionDeserializer(result.body);
}

/** Get the session pools in a given subscription. */
export function listBySubscription(
  context: Client,
  options: ContainerAppsSessionPoolsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SessionPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ContainerAppsSessionPoolsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SessionPoolCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _sessionPoolCollectionDeserializer(result.body);
}

/** Get the session pools in a given resource group of a subscription. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ContainerAppsSessionPoolsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SessionPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sessionPoolName: sessionPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

/** Delete the session pool with the given name. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, sessionPoolName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  sessionPoolEnvelope: SessionPoolUpdatableProperties,
  options: ContainerAppsSessionPoolsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sessionPoolName: sessionPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sessionPoolUpdatablePropertiesSerializer(sessionPoolEnvelope),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SessionPool> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sessionPoolDeserializer(result.body);
}

/** Patches a session pool using JSON merge patch */
export function update(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  sessionPoolEnvelope: SessionPoolUpdatableProperties,
  options: ContainerAppsSessionPoolsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SessionPool>, SessionPool> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, sessionPoolName, sessionPoolEnvelope, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<SessionPool>, SessionPool>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  sessionPoolEnvelope: SessionPool,
  options: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sessionPoolName: sessionPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sessionPoolSerializer(sessionPoolEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionPool> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sessionPoolDeserializer(result.body);
}

/** Create or update a session pool with the given properties. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  sessionPoolEnvelope: SessionPool,
  options: ContainerAppsSessionPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SessionPool>, SessionPool> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        sessionPoolName,
        sessionPoolEnvelope,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<SessionPool>, SessionPool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/sessionPools/{sessionPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sessionPoolName: sessionPoolName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SessionPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return sessionPoolDeserializer(result.body);
}

/** Get the properties of a session pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sessionPoolName: string,
  options: ContainerAppsSessionPoolsGetOptionalParams = { requestOptions: {} },
): Promise<SessionPool> {
  const result = await _getSend(context, resourceGroupName, sessionPoolName, options);
  return _getDeserialize(result);
}
