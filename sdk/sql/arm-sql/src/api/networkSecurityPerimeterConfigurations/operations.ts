// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  NetworkSecurityPerimeterConfiguration,
  networkSecurityPerimeterConfigurationDeserializer,
  _NetworkSecurityPerimeterConfigurationListResult,
  _networkSecurityPerimeterConfigurationListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListByServerOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  nspConfigName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/networkSecurityPerimeterConfigurations/{nspConfigName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      nspConfigName: nspConfigName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _reconcileDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Reconcile network security perimeter configuration for SQL Resource Provider */
export function reconcile(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  nspConfigName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkSecurityPerimeterConfiguration>,
  NetworkSecurityPerimeterConfiguration
> {
  return getLongRunningPoller(context, _reconcileDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reconcileSend(context, resourceGroupName, serverName, nspConfigName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01",
  }) as PollerLike<
    OperationState<NetworkSecurityPerimeterConfiguration>,
    NetworkSecurityPerimeterConfiguration
  >;
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: NetworkSecurityPerimeterConfigurationsListByServerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterConfigurationListResultDeserializer(result.body);
}

/** Gets a list of NSP configurations for a server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: NetworkSecurityPerimeterConfigurationsListByServerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  nspConfigName: string,
  options: NetworkSecurityPerimeterConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/networkSecurityPerimeterConfigurations/{nspConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      nspConfigName: nspConfigName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Gets a network security perimeter configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  nspConfigName: string,
  options: NetworkSecurityPerimeterConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getSend(context, resourceGroupName, serverName, nspConfigName, options);
  return _getDeserialize(result);
}
