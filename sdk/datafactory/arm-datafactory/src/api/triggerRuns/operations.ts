// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type { RunFilterParameters, TriggerRunsQueryResponse } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  runFilterParametersSerializer,
  triggerRunsQueryResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TriggerRunsCancelOptionalParams,
  TriggerRunsRerunOptionalParams,
  TriggerRunsQueryByFactoryOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  runId: string,
  options: TriggerRunsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/triggerRuns/{runId}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      runId: runId,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancel a single trigger instance by runId. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  runId: string,
  options: TriggerRunsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(
    context,
    resourceGroupName,
    factoryName,
    triggerName,
    runId,
    options,
  );
  return _cancelDeserialize(result);
}

export function _rerunSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  runId: string,
  options: TriggerRunsRerunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/triggers/{triggerName}/triggerRuns/{runId}/rerun{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      triggerName: triggerName,
      runId: runId,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _rerunDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Rerun single trigger instance by runId. */
export async function rerun(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  triggerName: string,
  runId: string,
  options: TriggerRunsRerunOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _rerunSend(
    context,
    resourceGroupName,
    factoryName,
    triggerName,
    runId,
    options,
  );
  return _rerunDeserialize(result);
}

export function _queryByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  filterParameters: RunFilterParameters,
  options: TriggerRunsQueryByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryTriggerRuns{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runFilterParametersSerializer(filterParameters),
  });
}

export async function _queryByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<TriggerRunsQueryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return triggerRunsQueryResponseDeserializer(result.body);
}

/** Query trigger runs. */
export async function queryByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  filterParameters: RunFilterParameters,
  options: TriggerRunsQueryByFactoryOptionalParams = { requestOptions: {} },
): Promise<TriggerRunsQueryResponse> {
  const result = await _queryByFactorySend(
    context,
    resourceGroupName,
    factoryName,
    filterParameters,
    options,
  );
  return _queryByFactoryDeserialize(result);
}
