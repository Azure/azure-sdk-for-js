// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ExpressRouteProviderPortListResult } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  expressRouteProviderPortListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ExpressRouteProviderPortsLocationListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ExpressRouteProviderPortsLocationListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteProviderPorts{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
      "%24filter": options?.filter,
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
): Promise<ExpressRouteProviderPortListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteProviderPortListResultDeserializer(result.body);
}

/** Retrieves all the ExpressRouteProviderPorts in a subscription. */
export async function list(
  context: Client,
  options: ExpressRouteProviderPortsLocationListOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteProviderPortListResult> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}
