// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  NetworkStatusContract,
  NetworkStatusListByServiceResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  networkStatusContractByLocationDeserializer,
  networkStatusContractDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkStatusListByLocationOptionalParams,
  NetworkStatusListByServiceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  locationName: string,
  options: NetworkStatusListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/locations/{locationName}/networkstatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkStatusContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkStatusContractDeserializer(result.body);
}

/** Gets the Connectivity Status to the external resources on which the Api Management service depends from inside the Cloud Service. This also returns the DNS Servers as visible to the CloudService. */
export async function listByLocation(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  locationName: string,
  options: NetworkStatusListByLocationOptionalParams = { requestOptions: {} },
): Promise<NetworkStatusContract> {
  const result = await _listByLocationSend(
    context,
    resourceGroupName,
    serviceName,
    locationName,
    options,
  );
  return _listByLocationDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: NetworkStatusListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/networkstatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkStatusListByServiceResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return networkStatusContractByLocationDeserializer(p);
    }),
  };
}

/** Gets the Connectivity Status to the external resources on which the Api Management service depends from inside the Cloud Service. This also returns the DNS Servers as visible to the CloudService. */
export async function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: NetworkStatusListByServiceOptionalParams = { requestOptions: {} },
): Promise<NetworkStatusListByServiceResponse> {
  const result = await _listByServiceSend(context, resourceGroupName, serviceName, options);
  return _listByServiceDeserialize(result);
}
