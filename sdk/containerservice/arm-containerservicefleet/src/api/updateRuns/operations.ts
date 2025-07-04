// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  UpdateRun,
  updateRunSerializer,
  updateRunDeserializer,
  _UpdateRunListResult,
  _updateRunListResultDeserializer,
  SkipProperties,
  skipPropertiesSerializer,
} from "../../models/models.js";
import {
  UpdateRunsSkipOptionalParams,
  UpdateRunsStopOptionalParams,
  UpdateRunsStartOptionalParams,
  UpdateRunsListByFleetOptionalParams,
  UpdateRunsDeleteOptionalParams,
  UpdateRunsCreateOrUpdateOptionalParams,
  UpdateRunsGetOptionalParams,
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

export function _skipSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  body: SkipProperties,
  options: UpdateRunsSkipOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/skip{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      updateRunName: updateRunName,
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
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: skipPropertiesSerializer(body),
  });
}

export async function _skipDeserialize(result: PathUncheckedResponse): Promise<UpdateRun> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return updateRunDeserializer(result.body);
}

/** Skips one or a combination of member/group/stage/afterStageWait(s) of an update run. */
export function skip(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  body: SkipProperties,
  options: UpdateRunsSkipOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<UpdateRun>, UpdateRun> {
  return getLongRunningPoller(context, _skipDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _skipSend(context, resourceGroupName, fleetName, updateRunName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<UpdateRun>, UpdateRun>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      updateRunName: updateRunName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<UpdateRun> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return updateRunDeserializer(result.body);
}

/** Stops an UpdateRun. */
export function stop(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<UpdateRun>, UpdateRun> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, fleetName, updateRunName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<UpdateRun>, UpdateRun>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      updateRunName: updateRunName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<UpdateRun> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return updateRunDeserializer(result.body);
}

/** Starts an UpdateRun. */
export function start(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<UpdateRun>, UpdateRun> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, fleetName, updateRunName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<UpdateRun>, UpdateRun>;
}

export function _listByFleetSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: UpdateRunsListByFleetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
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

export async function _listByFleetDeserialize(
  result: PathUncheckedResponse,
): Promise<_UpdateRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _updateRunListResultDeserializer(result.body);
}

/** List UpdateRun resources by Fleet */
export function listByFleet(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: UpdateRunsListByFleetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpdateRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFleetSend(context, resourceGroupName, fleetName, options),
    _listByFleetDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      updateRunName: updateRunName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
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

/** Delete a UpdateRun */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, fleetName, updateRunName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  resource: UpdateRun,
  options: UpdateRunsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      updateRunName: updateRunName,
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
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateRunSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateRun> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return updateRunDeserializer(result.body);
}

/** Create a UpdateRun */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  resource: UpdateRun,
  options: UpdateRunsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<UpdateRun>, UpdateRun> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, fleetName, updateRunName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<UpdateRun>, UpdateRun>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      updateRunName: updateRunName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<UpdateRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return updateRunDeserializer(result.body);
}

/** Get a UpdateRun */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  updateRunName: string,
  options: UpdateRunsGetOptionalParams = { requestOptions: {} },
): Promise<UpdateRun> {
  const result = await _getSend(context, resourceGroupName, fleetName, updateRunName, options);
  return _getDeserialize(result);
}
