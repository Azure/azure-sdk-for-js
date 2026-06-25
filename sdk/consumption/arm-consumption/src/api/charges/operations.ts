// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ChargesListResult,
  chargesListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ChargesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: ChargesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Consumption/charges{?api%2Dversion,startDate,endDate,%24filter,%24apply}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      startDate: options?.startDate,
      endDate: options?.endDate,
      "%24filter": options?.filter,
      "%24apply": options?.apply,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<ChargesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return chargesListResultDeserializer(result.body);
}

/** Lists the charges based for the defined scope. */
export async function list(
  context: Client,
  scope: string,
  options: ChargesListOptionalParams = { requestOptions: {} },
): Promise<ChargesListResult> {
  const result = await _listSend(context, scope, options);
  return _listDeserialize(result);
}
