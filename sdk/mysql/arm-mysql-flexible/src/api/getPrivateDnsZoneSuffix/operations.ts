// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { GetPrivateDnsZoneSuffixResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  getPrivateDnsZoneSuffixResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GetPrivateDnsZoneSuffixExecuteOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _executeSend(
  context: Client,
  options: GetPrivateDnsZoneSuffixExecuteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.DBforMySQL/getPrivateDnsZoneSuffix{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _executeDeserialize(
  result: PathUncheckedResponse,
): Promise<GetPrivateDnsZoneSuffixResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return getPrivateDnsZoneSuffixResponseDeserializer(result.body);
}

/** Get private DNS zone suffix in the cloud. */
export async function execute(
  context: Client,
  options: GetPrivateDnsZoneSuffixExecuteOptionalParams = {
    requestOptions: {},
  },
): Promise<GetPrivateDnsZoneSuffixResponse> {
  const result = await _executeSend(context, options);
  return _executeDeserialize(result);
}
