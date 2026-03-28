// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { VpnSiteLinkConnection } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  vpnSiteLinkConnectionDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { VpnSiteLinkConnectionsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnSiteLinkConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      connectionName: connectionName,
      linkConnectionName: linkConnectionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnSiteLinkConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnSiteLinkConnectionDeserializer(result.body);
}

/** Retrieves the details of a vpn site link connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  connectionName: string,
  linkConnectionName: string,
  options: VpnSiteLinkConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<VpnSiteLinkConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    gatewayName,
    connectionName,
    linkConnectionName,
    options,
  );
  return _getDeserialize(result);
}
