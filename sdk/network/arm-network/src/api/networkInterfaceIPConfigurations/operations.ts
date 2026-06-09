// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  NetworkInterfaceIPConfiguration,
  networkInterfaceIPConfigurationDeserializer,
} from "../../models/common/models.js";
import {
  _NetworkInterfaceIPConfigurationListResult,
  _networkInterfaceIPConfigurationListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  NetworkInterfaceIPConfigurationsListOptionalParams,
  NetworkInterfaceIPConfigurationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
      "api%2Dversion": "2025-07-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkInterfaceIPConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
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
      "api%2Dversion": "2025-07-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterfaceIPConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

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
