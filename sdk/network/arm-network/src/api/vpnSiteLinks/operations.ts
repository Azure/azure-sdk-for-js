// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VpnSiteLink,
  _ListVpnSiteLinksResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  vpnSiteLinkDeserializer,
  _listVpnSiteLinksResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VpnSiteLinksListByVpnSiteOptionalParams,
  VpnSiteLinksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByVpnSiteSend(
  context: Client,
  resourceGroupName: string,
  vpnSiteName: string,
  options: VpnSiteLinksListByVpnSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnSites/{vpnSiteName}/vpnSiteLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnSiteName: vpnSiteName,
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

export async function _listByVpnSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVpnSiteLinksResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnSiteLinksResultDeserializer(result.body);
}

/** Lists all the vpnSiteLinks in a resource group for a vpn site. */
export function listByVpnSite(
  context: Client,
  resourceGroupName: string,
  vpnSiteName: string,
  options: VpnSiteLinksListByVpnSiteOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnSiteLink> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVpnSiteSend(context, resourceGroupName, vpnSiteName, options),
    _listByVpnSiteDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vpnSiteName: string,
  vpnSiteLinkName: string,
  options: VpnSiteLinksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnSites/{vpnSiteName}/vpnSiteLinks/{vpnSiteLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnSiteName: vpnSiteName,
      vpnSiteLinkName: vpnSiteLinkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VpnSiteLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnSiteLinkDeserializer(result.body);
}

/** Retrieves the details of a VPN site link. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vpnSiteName: string,
  vpnSiteLinkName: string,
  options: VpnSiteLinksGetOptionalParams = { requestOptions: {} },
): Promise<VpnSiteLink> {
  const result = await _getSend(context, resourceGroupName, vpnSiteName, vpnSiteLinkName, options);
  return _getDeserialize(result);
}
