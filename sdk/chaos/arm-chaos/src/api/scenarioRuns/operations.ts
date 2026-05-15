// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext as Client } from "../index.js";
import type { ScenarioRun, _ScenarioRunListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  scenarioRunDeserializer,
  _scenarioRunListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScenarioRunsCancelOptionalParams,
  ScenarioRunsListAllOptionalParams,
  ScenarioRunsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  runId: string,
  options: ScenarioRunsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/runs/{runId}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      runId: runId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancel the currently running scenario execution. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  runId: string,
  options: ScenarioRunsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(
    context,
    resourceGroupName,
    workspaceName,
    scenarioName,
    runId,
    options,
  );
  return _cancelDeserialize(result);
}

export function _listAllSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenarioRunsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/runs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScenarioRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _scenarioRunListResultDeserializer(result.body);
}

/** Get a list of scenario runs. */
export function listAll(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  options: ScenarioRunsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScenarioRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, resourceGroupName, workspaceName, scenarioName, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  runId: string,
  options: ScenarioRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/workspaces/{workspaceName}/scenarios/{scenarioName}/runs/{runId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      scenarioName: scenarioName,
      runId: runId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ScenarioRun> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return scenarioRunDeserializer(result.body);
}

/** Get a scenario run. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  scenarioName: string,
  runId: string,
  options: ScenarioRunsGetOptionalParams = { requestOptions: {} },
): Promise<ScenarioRun> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    scenarioName,
    runId,
    options,
  );
  return _getDeserialize(result);
}
