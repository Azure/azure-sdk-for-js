// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  LogCaptureConfiguration,
  _LogCaptureConfigurationListResult,
  LogCaptureConfigurationForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  logCaptureConfigurationDeserializer,
  _logCaptureConfigurationListResultDeserializer,
  logCaptureConfigurationForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LogCaptureConfigurationsListOptionalParams,
  LogCaptureConfigurationsUpdateOptionalParams,
  LogCaptureConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: LogCaptureConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/logCaptureConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_LogCaptureConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logCaptureConfigurationListResultDeserializer(result.body);
}

/** Lists the log capture configurations for a HorizonDB cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: LogCaptureConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogCaptureConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logCaptureConfigurationName: string,
  properties: LogCaptureConfigurationForPatchUpdateUpdate,
  options: LogCaptureConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/logCaptureConfigurations/{logCaptureConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      logCaptureConfigurationName: logCaptureConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: logCaptureConfigurationForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogCaptureConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logCaptureConfigurationDeserializer(result.body);
}

/** Updates a log capture configuration. Omitted properties preserve their current values. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logCaptureConfigurationName: string,
  properties: LogCaptureConfigurationForPatchUpdateUpdate,
  options: LogCaptureConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LogCaptureConfiguration>, LogCaptureConfiguration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterName,
        logCaptureConfigurationName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<LogCaptureConfiguration>, LogCaptureConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logCaptureConfigurationName: string,
  options: LogCaptureConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/logCaptureConfigurations/{logCaptureConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      logCaptureConfigurationName: logCaptureConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<LogCaptureConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logCaptureConfigurationDeserializer(result.body);
}

/** Gets a log capture configuration for a HorizonDB cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logCaptureConfigurationName: string,
  options: LogCaptureConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<LogCaptureConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    logCaptureConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
