// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NetworkVirtualApplianceSku } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkVirtualApplianceSkuDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NetworkVirtualApplianceSkuListResult } from "../../models/models.js";
import { _networkVirtualApplianceSkuListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualApplianceSkusListOptionalParams,
  VirtualApplianceSkusGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: VirtualApplianceSkusListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkVirtualApplianceSkus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
): Promise<_NetworkVirtualApplianceSkuListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkVirtualApplianceSkuListResultDeserializer(result.body);
}

/** List all SKUs available for a virtual appliance. */
export function list(
  context: Client,
  options: VirtualApplianceSkusListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkVirtualApplianceSku> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  skuName: string,
  options: VirtualApplianceSkusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkVirtualApplianceSkus/{skuName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      skuName: skuName,
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
): Promise<NetworkVirtualApplianceSku> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkVirtualApplianceSkuDeserializer(result.body);
}

/** Retrieves a single available sku for network virtual appliance. */
export async function get(
  context: Client,
  skuName: string,
  options: VirtualApplianceSkusGetOptionalParams = { requestOptions: {} },
): Promise<NetworkVirtualApplianceSku> {
  const result = await _getSend(context, skuName, options);
  return _getDeserialize(result);
}
