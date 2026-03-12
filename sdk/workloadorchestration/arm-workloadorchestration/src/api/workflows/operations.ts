// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Workflow,
  workflowSerializer,
  workflowDeserializer,
  _WorkflowListResult,
  _workflowListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkflowsListByContextOptionalParams,
  WorkflowsDeleteOptionalParams,
  WorkflowsUpdateOptionalParams,
  WorkflowsCreateOrUpdateOptionalParams,
  WorkflowsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByContextSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  options: WorkflowsListByContextOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
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

export async function _listByContextDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowListResultDeserializer(result.body);
}

/** List Workflow resources */
export function listByContext(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  options: WorkflowsListByContextOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workflow> {
  return buildPagedAsyncIterator(
    context,
    () => _listByContextSend(context, resourceGroupName, contextName, options),
    _listByContextDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  options: WorkflowsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
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

/** Delete a Workflow resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  options: WorkflowsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, contextName, workflowName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  properties: Workflow,
  options: WorkflowsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
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
    body: workflowSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Workflow> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowDeserializer(result.body);
}

/** update a Workflow resource */
export function update(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  properties: Workflow,
  options: WorkflowsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Workflow>, Workflow> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, contextName, workflowName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Workflow>, Workflow>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  resource: Workflow,
  options: WorkflowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
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
    body: workflowSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Workflow> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowDeserializer(result.body);
}

/** Create or update a Workflow resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  resource: Workflow,
  options: WorkflowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Workflow>, Workflow> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, contextName, workflowName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Workflow>, Workflow>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  options: WorkflowsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Workflow> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowDeserializer(result.body);
}

/** Get a Workflow resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  options: WorkflowsGetOptionalParams = { requestOptions: {} },
): Promise<Workflow> {
  const result = await _getSend(context, resourceGroupName, contextName, workflowName, options);
  return _getDeserialize(result);
}
