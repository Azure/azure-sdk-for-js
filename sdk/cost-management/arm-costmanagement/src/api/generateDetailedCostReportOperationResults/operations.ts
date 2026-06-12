// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext as Client } from "../index.js";
import type { GenerateDetailedCostReportOperationResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  generateDetailedCostReportOperationResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GenerateDetailedCostReportOperationResultsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSend(
  context: Client,
  operationId: string,
  scope: string,
  options: GenerateDetailedCostReportOperationResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/operationResults/{operationId}{?api%2Dversion}",
    {
      scope: scope,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
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
): Promise<GenerateDetailedCostReportOperationResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return generateDetailedCostReportOperationResultDeserializer(result.body);
}

/** Gets the result of the specified operation. The link with this operationId is provided as a response header of the initial request. */
export function get(
  context: Client,
  operationId: string,
  scope: string,
  options: GenerateDetailedCostReportOperationResultsGetOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<GenerateDetailedCostReportOperationResult>,
  GenerateDetailedCostReportOperationResult
> {
  return getLongRunningPoller(context, _getDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _getSend(context, operationId, scope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01",
  }) as PollerLike<
    OperationState<GenerateDetailedCostReportOperationResult>,
    GenerateDetailedCostReportOperationResult
  >;
}
