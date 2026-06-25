// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OutboundEnvironmentEndpointList,
  outboundEnvironmentEndpointListDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OutboundNetworkDependenciesEndpointsListByServiceOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: OutboundNetworkDependenciesEndpointsListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<OutboundEnvironmentEndpointList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return outboundEnvironmentEndpointListDeserializer(result.body);
}

/** Gets the network endpoints of all outbound dependencies of a ApiManagement service. */
export async function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: OutboundNetworkDependenciesEndpointsListByServiceOptionalParams = { requestOptions: {} },
): Promise<OutboundEnvironmentEndpointList> {
  const result = await _listByServiceSend(context, resourceGroupName, serviceName, options);
  return _listByServiceDeserialize(result);
}
