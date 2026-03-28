// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  EndpointAuthKeys,
  PartialMinimalTrackedResourceWithIdentity,
  OnlineEndpoint,
  _OnlineEndpointTrackedResourceArmPaginatedResult,
  RegenerateEndpointKeysRequest,
  EndpointAuthToken,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  endpointAuthKeysDeserializer,
  partialMinimalTrackedResourceWithIdentitySerializer,
  onlineEndpointSerializer,
  onlineEndpointDeserializer,
  _onlineEndpointTrackedResourceArmPaginatedResultDeserializer,
  regenerateEndpointKeysRequestSerializer,
  endpointAuthTokenDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OnlineEndpointsGetTokenOptionalParams,
  OnlineEndpointsRegenerateKeysOptionalParams,
  OnlineEndpointsListKeysOptionalParams,
  OnlineEndpointsListOptionalParams,
  OnlineEndpointsDeleteOptionalParams,
  OnlineEndpointsUpdateOptionalParams,
  OnlineEndpointsCreateOrUpdateOptionalParams,
  OnlineEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getTokenSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: OnlineEndpointsGetTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/token{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
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

export async function _getTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointAuthToken> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return endpointAuthTokenDeserializer(result.body);
}

/** Retrieve a valid AML token for an Endpoint using AMLToken-based authentication. */
export async function getToken(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: OnlineEndpointsGetTokenOptionalParams = { requestOptions: {} },
): Promise<EndpointAuthToken> {
  const result = await _getTokenSend(
    context,
    resourceGroupName,
    workspaceName,
    endpointName,
    options,
  );
  return _getTokenDeserialize(result);
}

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: RegenerateEndpointKeysRequest,
  options: OnlineEndpointsRegenerateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/regenerateKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: regenerateEndpointKeysRequestSerializer(body),
  });
}

export async function _regenerateKeysDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous). */
export function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: RegenerateEndpointKeysRequest,
  options: OnlineEndpointsRegenerateKeysOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _regenerateKeysDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _regenerateKeysSend(context, resourceGroupName, workspaceName, endpointName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: OnlineEndpointsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
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
  endpointName: string,
  options: OnlineEndpointsListKeysOptionalParams = { requestOptions: {} },
): Promise<EndpointAuthKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    workspaceName,
    endpointName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: OnlineEndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints{?api%2Dversion,name,count,computeType,%24skip,tags,properties,orderBy}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      name: options?.name,
      count: options?.count,
      computeType: options?.computeType,
      "%24skip": options?.skip,
      tags: options?.tags,
      properties: options?.properties,
      orderBy: options?.orderBy,
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
): Promise<_OnlineEndpointTrackedResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _onlineEndpointTrackedResourceArmPaginatedResultDeserializer(result.body);
}

/** List Online Endpoints. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: OnlineEndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OnlineEndpoint> {
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
  endpointName: string,
  options: OnlineEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Online Endpoint (asynchronous). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: OnlineEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, endpointName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: PartialMinimalTrackedResourceWithIdentity,
  options: OnlineEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
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
    body: partialMinimalTrackedResourceWithIdentitySerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<OnlineEndpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return onlineEndpointDeserializer(result.body);
}

/** Update Online Endpoint (asynchronous). */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: PartialMinimalTrackedResourceWithIdentity,
  options: OnlineEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, workspaceName, endpointName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: OnlineEndpoint,
  options: OnlineEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
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
    body: onlineEndpointSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<OnlineEndpoint> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return onlineEndpointDeserializer(result.body);
}

/** Create or update Online Endpoint (asynchronous). */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: OnlineEndpoint,
  options: OnlineEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, workspaceName, endpointName, body, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<OnlineEndpoint>, OnlineEndpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: OnlineEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OnlineEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return onlineEndpointDeserializer(result.body);
}

/** Get Online Endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: OnlineEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<OnlineEndpoint> {
  const result = await _getSend(context, resourceGroupName, workspaceName, endpointName, options);
  return _getDeserialize(result);
}
