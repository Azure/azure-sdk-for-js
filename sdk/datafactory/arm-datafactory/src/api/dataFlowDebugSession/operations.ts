// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  CreateDataFlowDebugSessionRequest,
  CreateDataFlowDebugSessionResponse,
  _QueryDataFlowDebugSessionsResponse,
  DataFlowDebugSessionInfo,
  DataFlowDebugPackage,
  AddDataFlowToDebugSessionResponse,
  DeleteDataFlowDebugSessionRequest,
  DataFlowDebugCommandRequest,
  DataFlowDebugCommandResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  createDataFlowDebugSessionRequestSerializer,
  createDataFlowDebugSessionResponseDeserializer,
  _queryDataFlowDebugSessionsResponseDeserializer,
  dataFlowDebugPackageSerializer,
  addDataFlowToDebugSessionResponseDeserializer,
  deleteDataFlowDebugSessionRequestSerializer,
  dataFlowDebugCommandRequestSerializer,
  dataFlowDebugCommandResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataFlowDebugSessionExecuteCommandOptionalParams,
  DataFlowDebugSessionDeleteOptionalParams,
  DataFlowDebugSessionAddDataFlowOptionalParams,
  DataFlowDebugSessionQueryByFactoryOptionalParams,
  DataFlowDebugSessionCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _executeCommandSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: DataFlowDebugCommandRequest,
  options: DataFlowDebugSessionExecuteCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/executeDataFlowDebugCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataFlowDebugCommandRequestSerializer(request),
  });
}

export async function _executeCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<DataFlowDebugCommandResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dataFlowDebugCommandResponseDeserializer(result.body);
}

/** Execute a data flow debug command. */
export function executeCommand(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: DataFlowDebugCommandRequest,
  options: DataFlowDebugSessionExecuteCommandOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DataFlowDebugCommandResponse>, DataFlowDebugCommandResponse> {
  return getLongRunningPoller(context, _executeCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _executeCommandSend(context, resourceGroupName, factoryName, request, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<OperationState<DataFlowDebugCommandResponse>, DataFlowDebugCommandResponse>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: DeleteDataFlowDebugSessionRequest,
  options: DataFlowDebugSessionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/deleteDataFlowDebugSession{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: deleteDataFlowDebugSessionRequestSerializer(request),
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a data flow debug session. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: DeleteDataFlowDebugSessionRequest,
  options: DataFlowDebugSessionDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, factoryName, request, options);
  return _$deleteDeserialize(result);
}

export function _addDataFlowSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: DataFlowDebugPackage,
  options: DataFlowDebugSessionAddDataFlowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/addDataFlowToDebugSession{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataFlowDebugPackageSerializer(request),
  });
}

export async function _addDataFlowDeserialize(
  result: PathUncheckedResponse,
): Promise<AddDataFlowToDebugSessionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return addDataFlowToDebugSessionResponseDeserializer(result.body);
}

/** Add a data flow into debug session. */
export async function addDataFlow(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: DataFlowDebugPackage,
  options: DataFlowDebugSessionAddDataFlowOptionalParams = { requestOptions: {} },
): Promise<AddDataFlowToDebugSessionResponse> {
  const result = await _addDataFlowSend(context, resourceGroupName, factoryName, request, options);
  return _addDataFlowDeserialize(result);
}

export function _queryByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: DataFlowDebugSessionQueryByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryDataFlowDebugSessions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _queryByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_QueryDataFlowDebugSessionsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _queryDataFlowDebugSessionsResponseDeserializer(result.body);
}

/** Query all active data flow debug sessions. */
export function queryByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: DataFlowDebugSessionQueryByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataFlowDebugSessionInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _queryByFactorySend(context, resourceGroupName, factoryName, options),
    _queryByFactoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: CreateDataFlowDebugSessionRequest,
  options: DataFlowDebugSessionCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/createDataFlowDebugSession{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: createDataFlowDebugSessionRequestSerializer(request),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateDataFlowDebugSessionResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return createDataFlowDebugSessionResponseDeserializer(result.body);
}

/** Creates a data flow debug session. */
export function create(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  request: CreateDataFlowDebugSessionRequest,
  options: DataFlowDebugSessionCreateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CreateDataFlowDebugSessionResponse>,
  CreateDataFlowDebugSessionResponse
> {
  return getLongRunningPoller(context, _createDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, factoryName, request, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<
    OperationState<CreateDataFlowDebugSessionResponse>,
    CreateDataFlowDebugSessionResponse
  >;
}
