// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  _ExpressionTraces,
  ExpressionRoot,
  WorkflowRunActionRepetitionDefinition,
  _WorkflowRunActionRepetitionDefinitionCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _expressionTracesDeserializer,
  workflowRunActionRepetitionDefinitionDeserializer,
  _workflowRunActionRepetitionDefinitionCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowRunActionRepetitionsListExpressionTracesOptionalParams,
  WorkflowRunActionRepetitionsListOptionalParams,
  WorkflowRunActionRepetitionsGetOptionalParams,
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
  repetitionName: string,
  options: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/listExpressionTraces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
      actionName: actionName,
      repetitionName: repetitionName,
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
  repetitionName: string,
  options: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams = { requestOptions: {} },
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
        repetitionName,
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
  actionName: string,
  options: WorkflowRunActionRepetitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowRunActionRepetitionDefinitionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowRunActionRepetitionDefinitionCollectionDeserializer(result.body);
}

/** Get all of a workflow run action repetitions. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  options: WorkflowRunActionRepetitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowRunActionRepetitionDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, workflowName, runName, actionName, options),
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
  repetitionName: string,
  options: WorkflowRunActionRepetitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
      actionName: actionName,
      repetitionName: repetitionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkflowRunActionRepetitionDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowRunActionRepetitionDefinitionDeserializer(result.body);
}

/** Get a workflow run action repetition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  repetitionName: string,
  options: WorkflowRunActionRepetitionsGetOptionalParams = { requestOptions: {} },
): Promise<WorkflowRunActionRepetitionDefinition> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    runName,
    actionName,
    repetitionName,
    options,
  );
  return _getDeserialize(result);
}
