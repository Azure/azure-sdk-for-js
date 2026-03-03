// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  WorkflowTrigger,
  _WorkflowTriggerListResult,
  WorkflowTriggerCallbackUrl,
  JsonSchema,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workflowTriggerDeserializer,
  _workflowTriggerListResultDeserializer,
  workflowTriggerCallbackUrlDeserializer,
  jsonSchemaDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowTriggersGetSchemaJsonOptionalParams,
  WorkflowTriggersRunOptionalParams,
  WorkflowTriggersListCallbackUrlOptionalParams,
  WorkflowTriggersListOptionalParams,
  WorkflowTriggersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSchemaJsonSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersGetSchemaJsonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/schemas/json{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getSchemaJsonDeserialize(
  result: PathUncheckedResponse,
): Promise<JsonSchema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jsonSchemaDeserializer(result.body);
}

/** Get the trigger schema as JSON. */
export async function getSchemaJson(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersGetSchemaJsonOptionalParams = { requestOptions: {} },
): Promise<JsonSchema> {
  const result = await _getSchemaJsonSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    triggerName,
    options,
  );
  return _getSchemaJsonDeserialize(result);
}

export function _runSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/run{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _runDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Runs a workflow trigger. */
export function run(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersRunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _runDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runSend(context, resourceGroupName, name, workflowName, triggerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listCallbackUrlSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersListCallbackUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/listCallbackUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listCallbackUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowTriggerCallbackUrl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowTriggerCallbackUrlDeserializer(result.body);
}

/** Get the callback URL for a workflow trigger. */
export async function listCallbackUrl(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersListCallbackUrlOptionalParams = { requestOptions: {} },
): Promise<WorkflowTriggerCallbackUrl> {
  const result = await _listCallbackUrlSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    triggerName,
    options,
  );
  return _listCallbackUrlDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WorkflowTriggersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24top": options?.top,
      "%24filter": options?.filter,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowTriggerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowTriggerListResultDeserializer(result.body);
}

/** Gets a list of workflow triggers. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WorkflowTriggersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowTrigger> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, workflowName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkflowTrigger> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowTriggerDeserializer(result.body);
}

/** Gets a workflow trigger. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggersGetOptionalParams = { requestOptions: {} },
): Promise<WorkflowTrigger> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    triggerName,
    options,
  );
  return _getDeserialize(result);
}
