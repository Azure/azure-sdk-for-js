// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GetPrivateDnsZoneSuffixResponse,
  getPrivateDnsZoneSuffixResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GetPrivateDnsZoneSuffixExecuteOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _executeSend(
  context: Client,
  options: GetPrivateDnsZoneSuffixExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.DBforMySQL/getPrivateDnsZoneSuffix{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _executeDeserialize(
  result: PathUncheckedResponse,
): Promise<GetPrivateDnsZoneSuffixResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getPrivateDnsZoneSuffixResponseDeserializer(result.body);
}

/** Get private DNS zone suffix in the cloud. */
export async function execute(
  context: Client,
  options: GetPrivateDnsZoneSuffixExecuteOptionalParams = { requestOptions: {} },
): Promise<GetPrivateDnsZoneSuffixResponse> {
  const result = await _executeSend(context, options);
  return _executeDeserialize(result);
}
