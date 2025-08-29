// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Execution,
  executionSerializer,
  executionDeserializer,
  _ExecutionListResult,
  _executionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExecutionsListByWorkflowVersionOptionalParams,
  ExecutionsDeleteOptionalParams,
  ExecutionsUpdateOptionalParams,
  ExecutionsCreateOrUpdateOptionalParams,
  ExecutionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByWorkflowVersionSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  options: ExecutionsListByWorkflowVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
      versionName: versionName,
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

export async function _listByWorkflowVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExecutionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _executionListResultDeserializer(result.body);
}

/** List Execution Resources */
export function listByWorkflowVersion(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  options: ExecutionsListByWorkflowVersionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Execution> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByWorkflowVersionSend(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        options,
      ),
    _listByWorkflowVersionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  executionName: string,
  options: ExecutionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
      versionName: versionName,
      executionName: executionName,
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

/** Delete Execution Resource */
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
  versionName: string,
  executionName: string,
  options: ExecutionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        executionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  executionName: string,
  properties: Execution,
  options: ExecutionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
      versionName: versionName,
      executionName: executionName,
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
    body: executionSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Execution> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return executionDeserializer(result.body);
}

/** update an Execution Resource */
export function update(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  executionName: string,
  properties: Execution,
  options: ExecutionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Execution>, Execution> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        executionName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Execution>, Execution>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  executionName: string,
  resource: Execution,
  options: ExecutionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
      versionName: versionName,
      executionName: executionName,
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
    body: executionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Execution> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return executionDeserializer(result.body);
}

/** Create or update Execution Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  executionName: string,
  resource: Execution,
  options: ExecutionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Execution>, Execution> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        contextName,
        workflowName,
        versionName,
        executionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Execution>, Execution>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  executionName: string,
  options: ExecutionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}/executions/{executionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      contextName: contextName,
      workflowName: workflowName,
      versionName: versionName,
      executionName: executionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Execution> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return executionDeserializer(result.body);
}

/** Get Execution Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  executionName: string,
  options: ExecutionsGetOptionalParams = { requestOptions: {} },
): Promise<Execution> {
  const result = await _getSend(
    context,
    resourceGroupName,
    contextName,
    workflowName,
    versionName,
    executionName,
    options,
  );
  return _getDeserialize(result);
}
