// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  VirtualNetworkSubnetUsageParameter,
  virtualNetworkSubnetUsageParameterSerializer,
  VirtualNetworkSubnetUsageResult,
  virtualNetworkSubnetUsageResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { CheckVirtualNetworkSubnetUsageExecuteOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _executeSend(
  context: Client,
  locationName: string,
  parameters: VirtualNetworkSubnetUsageParameter,
  options: CheckVirtualNetworkSubnetUsageExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/checkVirtualNetworkSubnetUsage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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

export async function _executeDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkSubnetUsageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return virtualNetworkSubnetUsageResultDeserializer(result.body);
}

/** Get virtual network subnet usage for a given vNet resource id. */
export async function execute(
  context: Client,
  locationName: string,
  parameters: VirtualNetworkSubnetUsageParameter,
  options: CheckVirtualNetworkSubnetUsageExecuteOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkSubnetUsageResult> {
  const result = await _executeSend(context, locationName, parameters, options);
  return _executeDeserialize(result);
}
