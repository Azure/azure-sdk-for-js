// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  GenerateDetailedCostReportOperationStatuses,
  generateDetailedCostReportOperationStatusesDeserializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GenerateDetailedCostReportOperationStatusGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  operationId: string,
  scope: string,
  options: GenerateDetailedCostReportOperationStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/operationStatus/{operationId}{?api%2Dversion}",
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
): Promise<GenerateDetailedCostReportOperationStatuses> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return generateDetailedCostReportOperationStatusesDeserializer(result.body);
}

/** Get the status of the specified operation. This link is provided in the GenerateDetailedCostReport creation request response header. */
export async function get(
  context: Client,
  operationId: string,
  scope: string,
  options: GenerateDetailedCostReportOperationStatusGetOptionalParams = { requestOptions: {} },
): Promise<GenerateDetailedCostReportOperationStatuses> {
  const result = await _getSend(context, operationId, scope, options);
  return _getDeserialize(result);
}
