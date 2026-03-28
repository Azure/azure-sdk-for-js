// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ServiceAssociationLinksListResult } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  serviceAssociationLinksListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ServiceAssociationLinksListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: ServiceAssociationLinksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/serviceAssociationLinks{?api%2Dversion}",
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
): Promise<ServiceAssociationLinksListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return serviceAssociationLinksListResultDeserializer(result.body);
}

/** Gets a list of service association links for a subnet. */
export async function list(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  subnetName: string,
  options: ServiceAssociationLinksListOptionalParams = { requestOptions: {} },
): Promise<ServiceAssociationLinksListResult> {
  const result = await _listSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    subnetName,
    options,
  );
  return _listDeserialize(result);
}
