// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GlobalAdministratorElevateAccessOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _elevateAccessSend(
  context: Client,
  options: GlobalAdministratorElevateAccessOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/elevateAccess{?api%2Dversion}",
    {
      "api%2Dversion": "2015-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _elevateAccessDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Elevates access for a Global Administrator. */
export async function elevateAccess(
  context: Client,
  options: GlobalAdministratorElevateAccessOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _elevateAccessSend(context, options);
  return _elevateAccessDeserialize(result);
}
