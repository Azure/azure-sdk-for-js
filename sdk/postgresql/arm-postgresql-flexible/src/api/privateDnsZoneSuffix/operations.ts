// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type { PrivateDnsZoneSuffixGetResponse } from "../../models/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateDnsZoneSuffixGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  options: PrivateDnsZoneSuffixGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.DBforPostgreSQL/getPrivateDnsZoneSuffix{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateDnsZoneSuffixGetResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Gets the private DNS zone suffix. */
export async function get(
  context: Client,
  options: PrivateDnsZoneSuffixGetOptionalParams = { requestOptions: {} },
): Promise<PrivateDnsZoneSuffixGetResponse> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
