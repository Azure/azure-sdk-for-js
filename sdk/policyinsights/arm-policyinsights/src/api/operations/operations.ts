// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type { OperationsListResults } from "../../models/policyInsightsApi/models.js";
import { operationsListResultsDeserializer } from "../../models/policyInsightsApi/models.js";
import { queryFailureDeserializer } from "../../models/policyInsightsCommon/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OperationsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.PolicyInsights/operations{?api%2Dversion}",
    {
      "api%2Dversion": "2024-10-01",
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
): Promise<OperationsListResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return operationsListResultsDeserializer(result.body);
}

/** Lists available operations. */
export async function list(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): Promise<OperationsListResults> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}
