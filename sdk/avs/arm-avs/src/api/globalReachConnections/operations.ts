// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _GlobalReachConnectionList,
  _globalReachConnectionListDeserializer,
  GlobalReachConnection,
  globalReachConnectionSerializer,
  globalReachConnectionDeserializer,
} from "../../models/models.js";
import {
  GlobalReachConnectionsDeleteOptionalParams,
  GlobalReachConnectionsCreateOrUpdateOptionalParams,
  GlobalReachConnectionsGetOptionalParams,
  GlobalReachConnectionsListOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  globalReachConnectionName: string,
  options: GlobalReachConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      globalReachConnectionName: globalReachConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a GlobalReachConnection */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  globalReachConnectionName: string,
  options: GlobalReachConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        privateCloudName,
        globalReachConnectionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  globalReachConnectionName: string,
  globalReachConnection: GlobalReachConnection,
  options: GlobalReachConnectionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      globalReachConnectionName: globalReachConnectionName,
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
    body: globalReachConnectionSerializer(globalReachConnection),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GlobalReachConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return globalReachConnectionDeserializer(result.body);
}

/** Create a GlobalReachConnection */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  globalReachConnectionName: string,
  globalReachConnection: GlobalReachConnection,
  options: GlobalReachConnectionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<GlobalReachConnection>, GlobalReachConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        privateCloudName,
        globalReachConnectionName,
        globalReachConnection,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<GlobalReachConnection>, GlobalReachConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  globalReachConnectionName: string,
  options: GlobalReachConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections/{globalReachConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
      globalReachConnectionName: globalReachConnectionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<GlobalReachConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return globalReachConnectionDeserializer(result.body);
}

/** Get a GlobalReachConnection */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  globalReachConnectionName: string,
  options: GlobalReachConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<GlobalReachConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    privateCloudName,
    globalReachConnectionName,
    options,
  );
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  options: GlobalReachConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AVS/privateClouds/{privateCloudName}/globalReachConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateCloudName: privateCloudName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_GlobalReachConnectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _globalReachConnectionListDeserializer(result.body);
}

/** List GlobalReachConnection resources by PrivateCloud */
export function list(
  context: Client,
  resourceGroupName: string,
  privateCloudName: string,
  options: GlobalReachConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GlobalReachConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, privateCloudName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
