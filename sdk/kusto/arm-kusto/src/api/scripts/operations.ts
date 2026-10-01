// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext as Client } from "../index.js";
import type {
  CheckNameResult,
  Script,
  _ScriptListResult,
  ScriptCheckNameRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameResultDeserializer,
  scriptSerializer,
  scriptDeserializer,
  _scriptListResultDeserializer,
  scriptCheckNameRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScriptsCheckNameAvailabilityOptionalParams,
  ScriptsListByDatabaseOptionalParams,
  ScriptsDeleteOptionalParams,
  ScriptsUpdateOptionalParams,
  ScriptsCreateOrUpdateOptionalParams,
  ScriptsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: ScriptCheckNameRequest,
  options: ScriptsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scriptsCheckNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scriptCheckNameRequestSerializer(scriptName),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameResultDeserializer(result.body);
}

/** Checks that the script name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: ScriptCheckNameRequest,
  options: ScriptsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    scriptName,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: ScriptsListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScriptListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _scriptListResultDeserializer(result.body);
}

/** Returns the list of database scripts for given database. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  options: ScriptsListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Script> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseSend(context, resourceGroupName, clusterName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  options: ScriptsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      scriptName: scriptName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a Kusto database script. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  options: ScriptsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, databaseName, scriptName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  parameters: Script,
  options: ScriptsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      scriptName: scriptName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scriptSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Script> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scriptDeserializer(result.body);
}

/** Updates a database script. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  parameters: Script,
  options: ScriptsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Script>, Script> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<Script>, Script>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  parameters: Script,
  options: ScriptsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      scriptName: scriptName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scriptSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Script> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scriptDeserializer(result.body);
}

/** Creates a Kusto database script. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  parameters: Script,
  options: ScriptsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Script>, Script> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        scriptName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<Script>, Script>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  options: ScriptsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/databases/{databaseName}/scripts/{scriptName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      databaseName: databaseName,
      scriptName: scriptName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Script> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scriptDeserializer(result.body);
}

/** Gets a Kusto cluster database script. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  databaseName: string,
  scriptName: string,
  options: ScriptsGetOptionalParams = { requestOptions: {} },
): Promise<Script> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    databaseName,
    scriptName,
    options,
  );
  return _getDeserialize(result);
}
