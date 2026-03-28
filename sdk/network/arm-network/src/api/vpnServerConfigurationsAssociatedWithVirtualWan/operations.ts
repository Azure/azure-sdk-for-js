// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { VpnServerConfigurationsResponse } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  vpnServerConfigurationsResponseDeserializer,
} from "../../models/microsoft/network/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualWANName: string,
  options: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/vpnServerConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualWANName: virtualWANName,
      "api%2Dversion": "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnServerConfigurationsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnServerConfigurationsResponseDeserializer(result.body);
}

/** Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  virtualWANName: string,
  options: VpnServerConfigurationsAssociatedWithVirtualWanListOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<VpnServerConfigurationsResponse>, VpnServerConfigurationsResponse> {
  return getLongRunningPoller(context, _listDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _listSend(context, resourceGroupName, virtualWANName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<VpnServerConfigurationsResponse>,
    VpnServerConfigurationsResponse
  >;
}
