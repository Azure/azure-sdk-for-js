// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  Server,
  ServerForUpdate,
  _ServerListResult,
  HighAvailabilityValidationEstimation,
  ServerRestartParameter,
  ServerGtidSetParameter,
  ServerDetachVNetParameter,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverSerializer,
  serverDeserializer,
  serverForUpdateSerializer,
  _serverListResultDeserializer,
  highAvailabilityValidationEstimationSerializer,
  highAvailabilityValidationEstimationDeserializer,
  serverRestartParameterSerializer,
  serverGtidSetParameterSerializer,
  serverDetachVNetParameterSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServersDetachVNetOptionalParams,
  ServersResetGtidOptionalParams,
  ServersStopOptionalParams,
  ServersStartOptionalParams,
  ServersRestartOptionalParams,
  ServersValidateEstimateHighAvailabilityOptionalParams,
  ServersFailoverOptionalParams,
  ServersListOptionalParams,
  ServersListByResourceGroupOptionalParams,
  ServersDeleteOptionalParams,
  ServersUpdateOptionalParams,
  ServersCreateOptionalParams,
  ServersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _detachVNetSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerDetachVNetParameter,
  options: ServersDetachVNetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/detachVNet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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
    body: serverDetachVNetParameterSerializer(parameters),
  });
}

export async function _detachVNetDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serverDeserializer(result.body);
}

/** Detach VNet on a server. */
export function detachVNet(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerDetachVNetParameter,
  options: ServersDetachVNetOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Server>, Server> {
  return getLongRunningPoller(context, _detachVNetDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _detachVNetSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Server>, Server>;
}

export function _resetGtidSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerGtidSetParameter,
  options: ServersResetGtidOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/resetGtid{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: serverGtidSetParameterSerializer(parameters),
  });
}

export async function _resetGtidDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resets GTID on a server. */
export function resetGtid(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerGtidSetParameter,
  options: ServersResetGtidOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resetGtidDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetGtidSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Stops a server. */
export function stop(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Starts a server. */
export function start(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerRestartParameter,
  options: ServersRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: serverRestartParameterSerializer(parameters),
  });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Restarts a server. */
export function restart(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerRestartParameter,
  options: ServersRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _validateEstimateHighAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: HighAvailabilityValidationEstimation,
  options: ServersValidateEstimateHighAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/validateEstimateHighAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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
    body: highAvailabilityValidationEstimationSerializer(parameters),
  });
}

export async function _validateEstimateHighAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<HighAvailabilityValidationEstimation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return highAvailabilityValidationEstimationDeserializer(result.body);
}

/** Validate a deployment of high availability. */
export async function validateEstimateHighAvailability(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: HighAvailabilityValidationEstimation,
  options: ServersValidateEstimateHighAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<HighAvailabilityValidationEstimation> {
  const result = await _validateEstimateHighAvailabilitySend(
    context,
    resourceGroupName,
    serverName,
    parameters,
    options,
  );
  return _validateEstimateHighAvailabilityDeserialize(result);
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _failoverDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Manual failover a server. */
export function failover(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _failoverDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _failoverSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: ServersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/flexibleServers{?api%2Dversion}",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _serverListResultDeserializer(result.body);
}

/** List all the servers in a given subscription. */
export function list(
  context: Client,
  options: ServersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Server> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ServersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers{?api%2Dversion}",
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
): Promise<_ServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _serverListResultDeserializer(result.body);
}

/** List all the servers in a given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ServersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Server> {
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
  serverName: string,
  options: ServersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes a server. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerForUpdate,
  options: ServersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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
    body: serverForUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serverDeserializer(result.body);
}

/** Updates an existing server. The request body can contain one to many of the properties present in the normal server definition. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerForUpdate,
  options: ServersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Server>, Server> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Server>, Server>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: Server,
  options: ServersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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
    body: serverSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serverDeserializer(result.body);
}

/** Creates a new server or updates an existing server. The update action will overwrite the existing server. */
export function create(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: Server,
  options: ServersCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Server>, Server> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Server>, Server>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serverDeserializer(result.body);
}

/** Gets information about a server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersGetOptionalParams = { requestOptions: {} },
): Promise<Server> {
  const result = await _getSend(context, resourceGroupName, serverName, options);
  return _getDeserialize(result);
}
