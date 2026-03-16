// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  RunFilterParameters,
  PipelineRunsQueryResponse,
  PipelineRun,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  runFilterParametersSerializer,
  pipelineRunsQueryResponseDeserializer,
  pipelineRunDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PipelineRunsCancelOptionalParams,
  PipelineRunsGetOptionalParams,
  PipelineRunsQueryByFactoryOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  runId: string,
  options: PipelineRunsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/pipelineruns/{runId}/cancel{?api%2Dversion,isRecursive}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      runId: runId,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
      isRecursive: options?.isRecursive,
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

/** Cancel a pipeline run by its run ID. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  runId: string,
  options: PipelineRunsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(context, resourceGroupName, factoryName, runId, options);
  return _cancelDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  runId: string,
  options: PipelineRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/pipelineruns/{runId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      runId: runId,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PipelineRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return pipelineRunDeserializer(result.body);
}

/** Get a pipeline run by its run ID. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  runId: string,
  options: PipelineRunsGetOptionalParams = { requestOptions: {} },
): Promise<PipelineRun> {
  const result = await _getSend(context, resourceGroupName, factoryName, runId, options);
  return _getDeserialize(result);
}

export function _queryByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  filterParameters: RunFilterParameters,
  options: PipelineRunsQueryByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/queryPipelineRuns{?api%2Dversion}",
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
): Promise<PipelineRunsQueryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return pipelineRunsQueryResponseDeserializer(result.body);
}

/** Query pipeline runs in the factory based on input filter conditions. */
export async function queryByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  filterParameters: RunFilterParameters,
  options: PipelineRunsQueryByFactoryOptionalParams = { requestOptions: {} },
): Promise<PipelineRunsQueryResponse> {
  const result = await _queryByFactorySend(
    context,
    resourceGroupName,
    factoryName,
    filterParameters,
    options,
  );
  return _queryByFactoryDeserialize(result);
}
