// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  WorkflowRunActionRepetitionDefinition,
  _WorkflowRunActionRepetitionDefinitionCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workflowRunActionRepetitionDefinitionDeserializer,
  _workflowRunActionRepetitionDefinitionCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowRunActionScopeRepetitionsListOptionalParams,
  WorkflowRunActionScopeRepetitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  options: WorkflowRunActionScopeRepetitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/scopeRepetitions{?api%2Dversion}",
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

/** List the workflow run action scoped repetitions. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  options: WorkflowRunActionScopeRepetitionsListOptionalParams = { requestOptions: {} },
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
  options: WorkflowRunActionScopeRepetitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/scopeRepetitions/{repetitionName}{?api%2Dversion}",
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

/** Get a workflow run action scoped repetition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  repetitionName: string,
  options: WorkflowRunActionScopeRepetitionsGetOptionalParams = { requestOptions: {} },
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
