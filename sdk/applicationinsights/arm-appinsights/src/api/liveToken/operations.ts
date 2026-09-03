// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import { errorResponseLinkedStorageDeserializer } from "../../models/applicationInsightsCommonTypes/models.js";
import {
  LiveTokenResponse,
  liveTokenResponseDeserializer,
} from "../../models/liveTokenApi/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { LiveTokenGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceUri: string,
  options: LiveTokenGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/generatelivetoken{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2021-10-14",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LiveTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseLinkedStorageDeserializer(result.body);

    throw error;
  }

  return liveTokenResponseDeserializer(result.body);
}

/** **Gets an access token for live metrics stream data.** */
export async function get(
  context: Client,
  resourceUri: string,
  options: LiveTokenGetOptionalParams = { requestOptions: {} },
): Promise<LiveTokenResponse> {
  const result = await _getSend(context, resourceUri, options);
  return _getDeserialize(result);
}
