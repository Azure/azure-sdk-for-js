// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { RequestHistory, _RequestHistoryListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  requestHistoryDeserializer,
  _requestHistoryListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams,
  WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams,
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
  repetitionName: string,
  options: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/requestHistories{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RequestHistoryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _requestHistoryListResultDeserializer(result.body);
}

/** List a workflow run repetition request history. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  repetitionName: string,
  options: WorkflowRunActionRepetitionsRequestHistoriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RequestHistory> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        name,
        workflowName,
        runName,
        actionName,
        repetitionName,
        options,
      ),
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
  requestHistoryName: string,
  options: WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/requestHistories/{requestHistoryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      runName: runName,
      actionName: actionName,
      repetitionName: repetitionName,
      requestHistoryName: requestHistoryName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RequestHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return requestHistoryDeserializer(result.body);
}

/** Gets a workflow run repetition request history. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  runName: string,
  actionName: string,
  repetitionName: string,
  requestHistoryName: string,
  options: WorkflowRunActionRepetitionsRequestHistoriesGetOptionalParams = { requestOptions: {} },
): Promise<RequestHistory> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    runName,
    actionName,
    repetitionName,
    requestHistoryName,
    options,
  );
  return _getDeserialize(result);
}
