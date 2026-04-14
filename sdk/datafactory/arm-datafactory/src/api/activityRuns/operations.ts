// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type { RunFilterParameters, ActivityRunsQueryResponse } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  runFilterParametersSerializer,
  activityRunsQueryResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ActivityRunsQueryByPipelineRunOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _queryByPipelineRunSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  runId: string,
  filterParameters: RunFilterParameters,
  options: ActivityRunsQueryByPipelineRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.DataFactory/factories/{factoryName}/pipelineruns/{runId}/queryActivityruns{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: runFilterParametersSerializer(filterParameters),
  });
}

export async function _queryByPipelineRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ActivityRunsQueryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return activityRunsQueryResponseDeserializer(result.body);
}

/** Query activity runs based on input filter conditions. */
export async function queryByPipelineRun(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  runId: string,
  filterParameters: RunFilterParameters,
  options: ActivityRunsQueryByPipelineRunOptionalParams = { requestOptions: {} },
): Promise<ActivityRunsQueryResponse> {
  const result = await _queryByPipelineRunSend(
    context,
    resourceGroupName,
    factoryName,
    runId,
    filterParameters,
    options,
  );
  return _queryByPipelineRunDeserialize(result);
}
