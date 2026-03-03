// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { WorkflowRun, _WorkflowRunListResult } from "../../models/models.js";
import {
  workflowRunDeserializer,
  errorResponseDeserializer,
  _workflowRunListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowRunsCancelOptionalParams,
  WorkflowRunsListOptionalParams,
  WorkflowRunsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  options: WorkflowRunsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Cancels a workflow run. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  options: WorkflowRunsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    runName,
    options,
  );
  return _cancelDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WorkflowRunsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs{?api%2Dversion,%24top,%24filter}",
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
): Promise<_WorkflowRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowRunListResultDeserializer(result.body);
}

/** Gets a list of workflow runs. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  options: WorkflowRunsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowRun> {
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
  runName: string,
  options: WorkflowRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkflowRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowRunDeserializer(result.body);
}

/** Gets a workflow run. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  options: WorkflowRunsGetOptionalParams = { requestOptions: {} },
): Promise<WorkflowRun> {
  const result = await _getSend(context, resourceGroupName, name, workflowName, runName, options);
  return _getDeserialize(result);
}
