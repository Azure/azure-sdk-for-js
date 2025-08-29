// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  WorkflowVersion,
  workflowVersionSerializer,
  workflowVersionDeserializer,
  _WorkflowVersionListResult,
  _workflowVersionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkflowVersionsListByWorkflowOptionalParams,
  WorkflowVersionsDeleteOptionalParams,
  WorkflowVersionsUpdateOptionalParams,
  WorkflowVersionsCreateOrUpdateOptionalParams,
  WorkflowVersionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByWorkflowSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  options: WorkflowVersionsListByWorkflowOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions{?api%2Dversion}",
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

export async function _listByWorkflowDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowVersionListResultDeserializer(result.body);
}

/** List Workflow Version Resources */
export function listByWorkflow(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  options: WorkflowVersionsListByWorkflowOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<WorkflowVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkflowSend(context, resourceGroupName, contextName, workflowName, options),
    _listByWorkflowDeserialize,
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
  options: WorkflowVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}{?api%2Dversion}",
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

/** Delete a Workflow Version Resource */
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
  options: WorkflowVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, contextName, workflowName, versionName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  properties: WorkflowVersion,
  options: WorkflowVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: workflowVersionSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<WorkflowVersion> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowVersionDeserializer(result.body);
}

/** update an WorkflowVersion Resource */
export function update(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  properties: WorkflowVersion,
  options: WorkflowVersionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkflowVersion>, WorkflowVersion> {
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
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<WorkflowVersion>, WorkflowVersion>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  resource: WorkflowVersion,
  options: WorkflowVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: workflowVersionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowVersionDeserializer(result.body);
}

/** Create or update a Workflow Version Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  resource: WorkflowVersion,
  options: WorkflowVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<WorkflowVersion>, WorkflowVersion> {
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
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<WorkflowVersion>, WorkflowVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  options: WorkflowVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/contexts/{contextName}/workflows/{workflowName}/versions/{versionName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkflowVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowVersionDeserializer(result.body);
}

/** Get a Workflow Version Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  contextName: string,
  workflowName: string,
  versionName: string,
  options: WorkflowVersionsGetOptionalParams = { requestOptions: {} },
): Promise<WorkflowVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    contextName,
    workflowName,
    versionName,
    options,
  );
  return _getDeserialize(result);
}
