// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NetworkInterfaceIPConfiguration } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkInterfaceIPConfigurationDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NetworkInterfaceIPConfigurationListResult } from "../../models/models.js";
import { _networkInterfaceIPConfigurationListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkInterfaceIPConfigurationsListOptionalParams,
  NetworkInterfaceIPConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfaceIPConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/ipConfigurations{?api%2Dversion}",
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
): Promise<_NetworkInterfaceIPConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceIPConfigurationListResultDeserializer(result.body);
}

/** Get all ip configurations in a network interface. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfaceIPConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkInterfaceIPConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkInterfaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: NetworkInterfaceIPConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/ipConfigurations/{ipConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      ipConfigurationName: ipConfigurationName,
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
): Promise<NetworkInterfaceIPConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceIPConfigurationDeserializer(result.body);
}

/** Gets the specified network interface ip configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  ipConfigurationName: string,
  options: NetworkInterfaceIPConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkInterfaceIPConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkInterfaceName,
    ipConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
