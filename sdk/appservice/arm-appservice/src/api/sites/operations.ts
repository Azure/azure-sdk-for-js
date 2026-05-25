// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  _NetworkSecurityPerimeterConfigurationCollection,
  _networkSecurityPerimeterConfigurationCollectionDeserializer,
  NetworkSecurityPerimeterConfiguration,
  networkSecurityPerimeterConfigurationDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SitesGetNetworkSecurityPerimeterConfigurationOptionalParams,
  SitesListNetworkSecurityPerimeterConfigurationsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getNetworkSecurityPerimeterConfigurationSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  networkSecurityPerimeterReference: string,
  options: SitesGetNetworkSecurityPerimeterConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterReference}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      networkSecurityPerimeterReference: networkSecurityPerimeterReference,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
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

export async function _getNetworkSecurityPerimeterConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Description for Gets the Network Security Perimeter Association Configuration for the site for the specified Network Security Perimeter Association reference. */
export async function getNetworkSecurityPerimeterConfiguration(
  context: Client,
  resourceGroupName: string,
  name: string,
  networkSecurityPerimeterReference: string,
  options: SitesGetNetworkSecurityPerimeterConfigurationOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getNetworkSecurityPerimeterConfigurationSend(
    context,
    resourceGroupName,
    name,
    networkSecurityPerimeterReference,
    options,
  );
  return _getNetworkSecurityPerimeterConfigurationDeserialize(result);
}

export function _listNetworkSecurityPerimeterConfigurationsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SitesListNetworkSecurityPerimeterConfigurationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
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

export async function _listNetworkSecurityPerimeterConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterConfigurationCollectionDeserializer(result.body);
}

/** Description for Gets all Network Security Perimeter Association Configurations for the site. */
export function listNetworkSecurityPerimeterConfigurations(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: SitesListNetworkSecurityPerimeterConfigurationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listNetworkSecurityPerimeterConfigurationsSend(context, resourceGroupName, name, options),
    _listNetworkSecurityPerimeterConfigurationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-15" },
  );
}
