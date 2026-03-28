// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  LoadBalancer,
  _NetworkInterfaceLoadBalancerListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  _networkInterfaceLoadBalancerListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { NetworkInterfaceLoadBalancersListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfaceLoadBalancersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/loadBalancers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      "api%2Dversion": "2025-05-01",
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
): Promise<_NetworkInterfaceLoadBalancerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceLoadBalancerListResultDeserializer(result.body);
}

/** List all load balancers in a network interface. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfaceLoadBalancersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LoadBalancer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkInterfaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}
