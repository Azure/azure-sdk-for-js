// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PlaywrightWorkspace,
  playwrightWorkspaceSerializer,
  playwrightWorkspaceDeserializer,
  PlaywrightWorkspaceUpdate,
  playwrightWorkspaceUpdateSerializer,
  _PlaywrightWorkspaceListResult,
  _playwrightWorkspaceListResultDeserializer,
  CheckNameAvailabilityRequest,
  checkNameAvailabilityRequestSerializer,
  CheckNameAvailabilityResponse,
  checkNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PlaywrightWorkspacesCheckNameAvailabilityOptionalParams,
  PlaywrightWorkspacesListBySubscriptionOptionalParams,
  PlaywrightWorkspacesListByResourceGroupOptionalParams,
  PlaywrightWorkspacesDeleteOptionalParams,
  PlaywrightWorkspacesUpdateOptionalParams,
  PlaywrightWorkspacesCreateOrUpdateOptionalParams,
  PlaywrightWorkspacesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: PlaywrightWorkspacesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: checkNameAvailabilityRequestSerializer(body),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Checks if a Playwright workspace name is available globally. */
export async function checkNameAvailability(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: PlaywrightWorkspacesCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, body, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: PlaywrightWorkspacesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/playwrightWorkspaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PlaywrightWorkspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _playwrightWorkspaceListResultDeserializer(result.body);
}

/** List PlaywrightWorkspace resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: PlaywrightWorkspacesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PlaywrightWorkspace> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PlaywrightWorkspacesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PlaywrightWorkspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _playwrightWorkspaceListResultDeserializer(result.body);
}

/** List PlaywrightWorkspace resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PlaywrightWorkspacesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PlaywrightWorkspace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  options: PlaywrightWorkspacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      playwrightWorkspaceName: playwrightWorkspaceName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes a Playwright workspace resource asynchronously. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  options: PlaywrightWorkspacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, playwrightWorkspaceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  properties: PlaywrightWorkspaceUpdate,
  options: PlaywrightWorkspacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      playwrightWorkspaceName: playwrightWorkspaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: playwrightWorkspaceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PlaywrightWorkspace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return playwrightWorkspaceDeserializer(result.body);
}

/** Updates a Playwright workspace resource synchronously. */
export async function update(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  properties: PlaywrightWorkspaceUpdate,
  options: PlaywrightWorkspacesUpdateOptionalParams = { requestOptions: {} },
): Promise<PlaywrightWorkspace> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    playwrightWorkspaceName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  resource: PlaywrightWorkspace,
  options: PlaywrightWorkspacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      playwrightWorkspaceName: playwrightWorkspaceName,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: playwrightWorkspaceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PlaywrightWorkspace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return playwrightWorkspaceDeserializer(result.body);
}

/** Create a PlaywrightWorkspace */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  resource: PlaywrightWorkspace,
  options: PlaywrightWorkspacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<PlaywrightWorkspace>, PlaywrightWorkspace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, playwrightWorkspaceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<PlaywrightWorkspace>, PlaywrightWorkspace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  options: PlaywrightWorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      playwrightWorkspaceName: playwrightWorkspaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PlaywrightWorkspace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return playwrightWorkspaceDeserializer(result.body);
}

/** Get a PlaywrightWorkspace */
export async function get(
  context: Client,
  resourceGroupName: string,
  playwrightWorkspaceName: string,
  options: PlaywrightWorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<PlaywrightWorkspace> {
  const result = await _getSend(context, resourceGroupName, playwrightWorkspaceName, options);
  return _getDeserialize(result);
}
