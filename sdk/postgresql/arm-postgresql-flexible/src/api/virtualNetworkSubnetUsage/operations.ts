// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  VirtualNetworkSubnetUsageParameter,
  VirtualNetworkSubnetUsageModel,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  virtualNetworkSubnetUsageParameterSerializer,
  virtualNetworkSubnetUsageModelDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { VirtualNetworkSubnetUsageListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  locationName: string,
  parameters: VirtualNetworkSubnetUsageParameter,
  options: VirtualNetworkSubnetUsageListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/{locationName}/checkVirtualNetworkSubnetUsage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualNetworkSubnetUsageParameterSerializer(parameters),
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkSubnetUsageModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return virtualNetworkSubnetUsageModelDeserializer(result.body);
}

/** Lists the virtual network subnet usage for a given virtual network. */
export async function list(
  context: Client,
  locationName: string,
  parameters: VirtualNetworkSubnetUsageParameter,
  options: VirtualNetworkSubnetUsageListOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkSubnetUsageModel> {
  const result = await _listSend(context, locationName, parameters, options);
  return _listDeserialize(result);
}
