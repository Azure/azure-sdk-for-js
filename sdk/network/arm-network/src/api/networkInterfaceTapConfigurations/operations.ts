// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NetworkInterfaceTapConfiguration } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkInterfaceTapConfigurationSerializer,
  networkInterfaceTapConfigurationDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NetworkInterfaceTapConfigurationListResult } from "../../models/models.js";
import { _networkInterfaceTapConfigurationListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkInterfaceTapConfigurationsListOptionalParams,
  NetworkInterfaceTapConfigurationsDeleteOptionalParams,
  NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams,
  NetworkInterfaceTapConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfaceTapConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations{?api%2Dversion}",
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
): Promise<_NetworkInterfaceTapConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkInterfaceTapConfigurationListResultDeserializer(result.body);
}

/** Get all Tap configurations in a network interface. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  options: NetworkInterfaceTapConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkInterfaceTapConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkInterfaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  tapConfigurationName: string,
  options: NetworkInterfaceTapConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations/{tapConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      tapConfigurationName: tapConfigurationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified tap configuration from the NetworkInterface. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  tapConfigurationName: string,
  options: NetworkInterfaceTapConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, networkInterfaceName, tapConfigurationName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  tapConfigurationName: string,
  tapConfigurationParameters: NetworkInterfaceTapConfiguration,
  options: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations/{tapConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      tapConfigurationName: tapConfigurationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkInterfaceTapConfigurationSerializer(tapConfigurationParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkInterfaceTapConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceTapConfigurationDeserializer(result.body);
}

/** Creates or updates a Tap configuration in the specified NetworkInterface. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  tapConfigurationName: string,
  tapConfigurationParameters: NetworkInterfaceTapConfiguration,
  options: NetworkInterfaceTapConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkInterfaceTapConfiguration>, NetworkInterfaceTapConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        networkInterfaceName,
        tapConfigurationName,
        tapConfigurationParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<NetworkInterfaceTapConfiguration>,
    NetworkInterfaceTapConfiguration
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  tapConfigurationName: string,
  options: NetworkInterfaceTapConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations/{tapConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkInterfaceName: networkInterfaceName,
      tapConfigurationName: tapConfigurationName,
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
): Promise<NetworkInterfaceTapConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkInterfaceTapConfigurationDeserializer(result.body);
}

/** Get the specified tap configuration on a network interface. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkInterfaceName: string,
  tapConfigurationName: string,
  options: NetworkInterfaceTapConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkInterfaceTapConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkInterfaceName,
    tapConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
