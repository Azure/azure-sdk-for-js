// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { AlertOperationResult } from "../../models/microsoft/roleManagementAlerts/models.js";
import { alertOperationResultDeserializer } from "../../models/microsoft/roleManagementAlerts/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AlertOperationGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  scope: string,
  operationId: string,
  options: AlertOperationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlertOperations/{+operationId}{?api%2Dversion}",
    {
      scope: scope,
      operationId: operationId,
      "api%2Dversion": "2022-08-01-preview",
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
): Promise<AlertOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertOperationResultDeserializer(result.body);
}

/** Get the specified alert operation. */
export async function get(
  context: Client,
  scope: string,
  operationId: string,
  options: AlertOperationGetOptionalParams = { requestOptions: {} },
): Promise<AlertOperationResult> {
  const result = await _getSend(context, scope, operationId, options);
  return _getDeserialize(result);
}
