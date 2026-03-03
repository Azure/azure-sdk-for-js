// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  WorkflowTriggerHistory,
  _WorkflowTriggerHistoryListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workflowTriggerHistoryDeserializer,
  _workflowTriggerHistoryListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowTriggerHistoriesResubmitOptionalParams,
  WorkflowTriggerHistoriesListOptionalParams,
  WorkflowTriggerHistoriesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resubmitSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  historyName: string,
  options: WorkflowTriggerHistoriesResubmitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/histories/{historyName}/resubmit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      triggerName: triggerName,
      historyName: historyName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resubmitDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resubmits a workflow run based on the trigger history. */
export function resubmit(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  historyName: string,
  options: WorkflowTriggerHistoriesResubmitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resubmitDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resubmitSend(
        context,
        resourceGroupName,
        name,
        workflowName,
        triggerName,
        historyName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggerHistoriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/histories{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      triggerName: triggerName,
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
): Promise<_WorkflowTriggerHistoryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workflowTriggerHistoryListResultDeserializer(result.body);
}

/** Gets a list of workflow trigger histories. */
export function list(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  options: WorkflowTriggerHistoriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkflowTriggerHistory> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, name, workflowName, triggerName, options),
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
  historyName: string,
  options: WorkflowTriggerHistoriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/triggers/{triggerName}/histories/{historyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      triggerName: triggerName,
      historyName: historyName,
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
): Promise<WorkflowTriggerHistory> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workflowTriggerHistoryDeserializer(result.body);
}

/** Gets a workflow trigger history. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  triggerName: string,
  historyName: string,
  options: WorkflowTriggerHistoriesGetOptionalParams = { requestOptions: {} },
): Promise<WorkflowTriggerHistory> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    triggerName,
    historyName,
    options,
  );
  return _getDeserialize(result);
}
