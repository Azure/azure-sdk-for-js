// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  WorkflowRunAction,
  _WorkflowRunActionListResult,
  _ExpressionTraces,
  ExpressionRoot,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workflowRunActionDeserializer,
  _workflowRunActionListResultDeserializer,
  _expressionTracesDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowRunActionsListExpressionTracesOptionalParams,
  WorkflowRunActionsListOptionalParams,
  WorkflowRunActionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listExpressionTracesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  options: WorkflowRunActionsListExpressionTracesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/listExpressionTraces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
      actionName: actionName,
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

export async function _listExpressionTracesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExpressionTraces> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _expressionTracesDeserializer(result.body);
}

/** Lists a workflow run expression trace. */
export function listExpressionTraces(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  options: WorkflowRunActionsListExpressionTracesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressionRoot> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listExpressionTracesSend(
        context,
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        options,
      ),
    _listExpressionTracesDeserialize,
    ["200"],
    {
      itemName: "inputs",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  options: WorkflowRunActionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
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
): Promise<_WorkflowRunActionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowRunActionListResultDeserializer(result.body);
}

/** Gets a list of workflow run actions. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  options: WorkflowRunActionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowRunAction> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, workflowName, runName, options),
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
  actionName: string,
  options: WorkflowRunActionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
      actionName: actionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkflowRunAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowRunActionDeserializer(result.body);
}

/** Gets a workflow run action. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  options: WorkflowRunActionsGetOptionalParams = { requestOptions: {} },
): Promise<WorkflowRunAction> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    runName,
    actionName,
    options,
  );
  return _getDeserialize(result);
}
