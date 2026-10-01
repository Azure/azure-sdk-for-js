// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext as Client } from "../index.js";
import type {
  GenerateDetailedCostReportOperationResult,
  GenerateDetailedCostReportDefinition,
} from "../../models/models.js";
import {
  generateDetailedCostReportOperationResultDeserializer,
  generateDetailedCostReportDefinitionSerializer,
  generateDetailedCostReportErrorResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GenerateDetailedCostReportCreateOperationOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createOperationSend(
  context: Client,
  scope: string,
  parameters: GenerateDetailedCostReportDefinition,
  options: GenerateDetailedCostReportCreateOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/generateDetailedCostReport{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: generateDetailedCostReportDefinitionSerializer(parameters),
  });
}

export async function _createOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateDetailedCostReportOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = generateDetailedCostReportErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return generateDetailedCostReportOperationResultDeserializer(result.body);
}

/** Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored. */
export function createOperation(
  context: Client,
  scope: string,
  parameters: GenerateDetailedCostReportDefinition,
  options: GenerateDetailedCostReportCreateOperationOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<GenerateDetailedCostReportOperationResult>,
  GenerateDetailedCostReportOperationResult
> {
  return getLongRunningPoller(context, _createOperationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOperationSend(context, scope, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<
    OperationState<GenerateDetailedCostReportOperationResult>,
    GenerateDetailedCostReportOperationResult
  >;
}
