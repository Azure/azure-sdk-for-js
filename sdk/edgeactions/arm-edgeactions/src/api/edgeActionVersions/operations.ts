// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeActionsManagementContext as Client } from "../index.js";
import type {
  EdgeActionVersion,
  EdgeActionVersionProperties,
  EdgeActionVersionUpdate,
  _EdgeActionVersionListResult,
  VersionCode,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  edgeActionVersionSerializer,
  edgeActionVersionDeserializer,
  edgeActionVersionPropertiesDeserializer,
  edgeActionVersionUpdateSerializer,
  _edgeActionVersionListResultDeserializer,
  versionCodeSerializer,
  versionCodeDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EdgeActionVersionsSwapDefaultOptionalParams,
  EdgeActionVersionsGetVersionCodeOptionalParams,
  EdgeActionVersionsDeployVersionCodeOptionalParams,
  EdgeActionVersionsListByEdgeActionOptionalParams,
  EdgeActionVersionsDeleteOptionalParams,
  EdgeActionVersionsUpdateOptionalParams,
  EdgeActionVersionsCreateOptionalParams,
  EdgeActionVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _swapDefaultSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsSwapDefaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions/{version}/swapDefault{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({ ...operationOptionsToRequestParameters(options), contentType: "application/json" });
}

export async function _swapDefaultDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Swap the default version for the edge action. */
export function swapDefault(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsSwapDefaultOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _swapDefaultDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _swapDefaultSend(context, resourceGroupName, edgeActionName, version, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getVersionCodeSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsGetVersionCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions/{version}/getVersionCode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getVersionCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<VersionCode> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return versionCodeDeserializer(result.body);
}

/** Get the version code for the edge action version. */
export function getVersionCode(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsGetVersionCodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VersionCode>, VersionCode> {
  return getLongRunningPoller(context, _getVersionCodeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getVersionCodeSend(context, resourceGroupName, edgeActionName, version, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<VersionCode>, VersionCode>;
}

export function _deployVersionCodeSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  body: VersionCode,
  options: EdgeActionVersionsDeployVersionCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions/{version}/deployVersionCode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: versionCodeSerializer(body),
  });
}

export async function _deployVersionCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeActionVersionProperties> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeActionVersionPropertiesDeserializer(result.body);
}

/** A long-running resource action. */
export function deployVersionCode(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  body: VersionCode,
  options: EdgeActionVersionsDeployVersionCodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeActionVersionProperties>, EdgeActionVersionProperties> {
  return getLongRunningPoller(context, _deployVersionCodeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deployVersionCodeSend(context, resourceGroupName, edgeActionName, version, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<EdgeActionVersionProperties>, EdgeActionVersionProperties>;
}

export function _listByEdgeActionSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  options: EdgeActionVersionsListByEdgeActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listByEdgeActionDeserialize(
  result: PathUncheckedResponse,
): Promise<_EdgeActionVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _edgeActionVersionListResultDeserializer(result.body);
}

/** List EdgeActionVersion resources by EdgeAction */
export function listByEdgeAction(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  options: EdgeActionVersionsListByEdgeActionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeActionVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEdgeActionSend(context, resourceGroupName, edgeActionName, options),
    _listByEdgeActionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

/** Delete a EdgeActionVersion */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, edgeActionName, version, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  properties: EdgeActionVersionUpdate,
  options: EdgeActionVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: edgeActionVersionUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeActionVersion> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeActionVersionDeserializer(result.body);
}

/** Update a EdgeActionVersion */
export function update(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  properties: EdgeActionVersionUpdate,
  options: EdgeActionVersionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeActionVersion>, EdgeActionVersion> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, edgeActionName, version, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<EdgeActionVersion>, EdgeActionVersion>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  resource: EdgeActionVersion,
  options: EdgeActionVersionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: edgeActionVersionSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeActionVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeActionVersionDeserializer(result.body);
}

/** Create a EdgeActionVersion */
export function create(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  resource: EdgeActionVersion,
  options: EdgeActionVersionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeActionVersion>, EdgeActionVersion> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, edgeActionName, version, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<EdgeActionVersion>, EdgeActionVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/edgeActions/{edgeActionName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeActionName: edgeActionName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EdgeActionVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return edgeActionVersionDeserializer(result.body);
}

/** Get a EdgeActionVersion */
export async function get(
  context: Client,
  resourceGroupName: string,
  edgeActionName: string,
  version: string,
  options: EdgeActionVersionsGetOptionalParams = { requestOptions: {} },
): Promise<EdgeActionVersion> {
  const result = await _getSend(context, resourceGroupName, edgeActionName, version, options);
  return _getDeserialize(result);
}
