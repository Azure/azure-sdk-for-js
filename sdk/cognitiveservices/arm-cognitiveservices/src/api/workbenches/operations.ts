// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Workbench,
  workbenchSerializer,
  workbenchDeserializer,
  _WorkbenchListResult,
  _workbenchListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkbenchesRestartOptionalParams,
  WorkbenchesStopOptionalParams,
  WorkbenchesStartOptionalParams,
  WorkbenchesListOptionalParams,
  WorkbenchesDeleteOptionalParams,
  WorkbenchesUpdateOptionalParams,
  WorkbenchesCreateOrUpdateOptionalParams,
  WorkbenchesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches/{workbenchName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      workbenchName: workbenchName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Restarts a running workbench resource.
 * This is a long-running operation that returns 202 Accepted.
 * Returns 204 if the workbench is already in the target state.
 */
export function restart(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, accountName, projectName, workbenchName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches/{workbenchName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      workbenchName: workbenchName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Stops a running workbench resource.
 * This is a long-running operation that returns 202 Accepted.
 * Returns 204 if the workbench is already in the target state.
 */
export function stop(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, accountName, projectName, workbenchName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches/{workbenchName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      workbenchName: workbenchName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Starts a stopped workbench resource.
 * This is a long-running operation that returns 202 Accepted.
 * Returns 204 if the workbench is already in the target state.
 */
export function start(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, accountName, projectName, workbenchName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  options: WorkbenchesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
): Promise<_WorkbenchListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _workbenchListResultDeserializer(result.body);
}

/** Gets the workbenches associated with the project. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  options: WorkbenchesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workbench> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, projectName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches/{workbenchName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      workbenchName: workbenchName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

/** Deletes the specified workbench associated with the project. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, projectName, workbenchName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  properties: Workbench,
  options: WorkbenchesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches/{workbenchName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      workbenchName: workbenchName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workbenchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Workbench> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workbenchDeserializer(result.body);
}

/** Updates a workbench associated with the project. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  properties: Workbench,
  options: WorkbenchesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Workbench>, Workbench> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<Workbench>, Workbench>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  resource: Workbench,
  options: WorkbenchesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches/{workbenchName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      workbenchName: workbenchName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workbenchSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Workbench> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workbenchDeserializer(result.body);
}

/** Creates or updates a workbench associated with the project. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  resource: Workbench,
  options: WorkbenchesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Workbench>, Workbench> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        projectName,
        workbenchName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<Workbench>, Workbench>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/workbenches/{workbenchName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      projectName: projectName,
      workbenchName: workbenchName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Workbench> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return workbenchDeserializer(result.body);
}

/** Gets the specified workbench associated with the project. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  projectName: string,
  workbenchName: string,
  options: WorkbenchesGetOptionalParams = { requestOptions: {} },
): Promise<Workbench> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    projectName,
    workbenchName,
    options,
  );
  return _getDeserialize(result);
}
