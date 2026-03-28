// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ResourceNavigationLinksListResult } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  resourceNavigationLinksListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ResourceNavigationLinksListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: ResourceNavigationLinksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/resourceNavigationLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      subnetName: subnetName,
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
): Promise<ResourceNavigationLinksListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return resourceNavigationLinksListResultDeserializer(result.body);
}

/** Gets a list of resource navigation links for a subnet. */
export async function list(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: ResourceNavigationLinksListOptionalParams = { requestOptions: {} },
): Promise<ResourceNavigationLinksListResult> {
  const result = await _listSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    options,
  );
  return _listDeserialize(result);
}
