// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  IntegrationFabric,
  integrationFabricSerializer,
  integrationFabricDeserializer,
  IntegrationFabricUpdateParameters,
  integrationFabricUpdateParametersSerializer,
  _IntegrationFabricListResponse,
  _integrationFabricListResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IntegrationFabricsListOptionalParams,
  IntegrationFabricsDeleteOptionalParams,
  IntegrationFabricsUpdateOptionalParams,
  IntegrationFabricsCreateOptionalParams,
  IntegrationFabricsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IntegrationFabricsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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
): Promise<_IntegrationFabricListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _integrationFabricListResponseDeserializer(result.body);
}

/** List IntegrationFabric resources by ManagedGrafana */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: IntegrationFabricsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IntegrationFabric> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  options: IntegrationFabricsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      integrationFabricName: integrationFabricName,
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
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a IntegrationFabric */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  options: IntegrationFabricsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, integrationFabricName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  requestBodyParameters: IntegrationFabricUpdateParameters,
  options: IntegrationFabricsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      integrationFabricName: integrationFabricName,
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
    body: integrationFabricUpdateParametersSerializer(requestBodyParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationFabric> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return integrationFabricDeserializer(result.body);
}

/** Update a IntegrationFabric */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  requestBodyParameters: IntegrationFabricUpdateParameters,
  options: IntegrationFabricsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IntegrationFabric>, IntegrationFabric> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        workspaceName,
        integrationFabricName,
        requestBodyParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<IntegrationFabric>, IntegrationFabric>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  requestBodyParameters: IntegrationFabric,
  options: IntegrationFabricsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      integrationFabricName: integrationFabricName,
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
    body: integrationFabricSerializer(requestBodyParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationFabric> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return integrationFabricDeserializer(result.body);
}

/** Create a IntegrationFabric */
export function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  requestBodyParameters: IntegrationFabric,
  options: IntegrationFabricsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IntegrationFabric>, IntegrationFabric> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        workspaceName,
        integrationFabricName,
        requestBodyParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<IntegrationFabric>, IntegrationFabric>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  options: IntegrationFabricsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      integrationFabricName: integrationFabricName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IntegrationFabric> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return integrationFabricDeserializer(result.body);
}

/** Get a IntegrationFabric */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  integrationFabricName: string,
  options: IntegrationFabricsGetOptionalParams = { requestOptions: {} },
): Promise<IntegrationFabric> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    integrationFabricName,
    options,
  );
  return _getDeserialize(result);
}
