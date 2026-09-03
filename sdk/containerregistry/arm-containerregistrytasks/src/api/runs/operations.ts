// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryTasksManagementContext as Client } from "../index.js";
import type {
  Run,
  RunUpdateParameters,
  _RunListResult,
  RunGetLogResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  runDeserializer,
  runUpdateParametersSerializer,
  _runListResultDeserializer,
  runGetLogResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RunsCancelOptionalParams,
  RunsGetLogSasUrlOptionalParams,
  RunsListOptionalParams,
  RunsUpdateOptionalParams,
  RunsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  options: RunsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/runs/{runId}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      runId: runId,
      "api%2Dversion": context.apiVersion,
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

/** Cancel an existing run. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  options: RunsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(context, resourceGroupName, registryName, runId, options);
  return _cancelDeserialize(result);
}

export function _getLogSasUrlSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  options: RunsGetLogSasUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/runs/{runId}/listLogSasUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      runId: runId,
      "api%2Dversion": context.apiVersion,
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

export async function _getLogSasUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<RunGetLogResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return runGetLogResultDeserializer(result.body);
}

/** Gets a link to download the run logs. */
export async function getLogSasUrl(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  options: RunsGetLogSasUrlOptionalParams = { requestOptions: {} },
): Promise<RunGetLogResult> {
  const result = await _getLogSasUrlSend(context, resourceGroupName, registryName, runId, options);
  return _getLogSasUrlDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RunsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/runs{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_RunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _runListResultDeserializer(result.body);
}

/** Gets all the runs for a registry. */
export function list(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: RunsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Run> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, registryName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  runUpdateParameters: RunUpdateParameters,
  options: RunsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/runs/{runId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      runId: runId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runUpdateParametersSerializer(runUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Run> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return runDeserializer(result.body);
}

/** Patch the run properties. */
export async function update(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  runUpdateParameters: RunUpdateParameters,
  options: RunsUpdateOptionalParams = { requestOptions: {} },
): Promise<Run> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    registryName,
    runId,
    runUpdateParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  options: RunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/runs/{runId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      runId: runId,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Run> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return runDeserializer(result.body);
}

/** Gets the detailed information for a given run. */
export async function get(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  runId: string,
  options: RunsGetOptionalParams = { requestOptions: {} },
): Promise<Run> {
  const result = await _getSend(context, resourceGroupName, registryName, runId, options);
  return _getDeserialize(result);
}
