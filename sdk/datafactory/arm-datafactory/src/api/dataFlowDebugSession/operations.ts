// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  CreateDataFlowDebugSessionRequest,
  createDataFlowDebugSessionRequestSerializer,
  CreateDataFlowDebugSessionResponse,
  createDataFlowDebugSessionResponseDeserializer,
  _QueryDataFlowDebugSessionsResponse,
  _queryDataFlowDebugSessionsResponseDeserializer,
  DataFlowDebugSessionInfo,
  DataFlowDebugPackage,
  dataFlowDebugPackageSerializer,
  AddDataFlowToDebugSessionResponse,
  addDataFlowToDebugSessionResponseDeserializer,
  DeleteDataFlowDebugSessionRequest,
  deleteDataFlowDebugSessionRequestSerializer,
  DataFlowDebugCommandRequest,
  dataFlowDebugCommandRequestSerializer,
  DataFlowDebugCommandResponse,
  dataFlowDebugCommandResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DataFlowDebugSessionExecuteCommandOptionalParams,
  DataFlowDebugSessionDeleteOptionalParams,
  DataFlowDebugSessionAddDataFlowOptionalParams,
  DataFlowDebugSessionListQueryByFactoryOptionalParams,
  DataFlowDebugSessionCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

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

export function _listQueryByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: DataFlowDebugSessionListQueryByFactoryOptionalParams = { requestOptions: {} },
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

export async function _listQueryByFactoryDeserialize(
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
export function listQueryByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: DataFlowDebugSessionListQueryByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataFlowDebugSessionInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listQueryByFactorySend(context, resourceGroupName, factoryName, options),
    _listQueryByFactoryDeserialize,
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
