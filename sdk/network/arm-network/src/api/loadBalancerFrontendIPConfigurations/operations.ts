// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  FrontendIPConfiguration,
  _LoadBalancerFrontendIPConfigurationListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  frontendIPConfigurationDeserializer,
  _loadBalancerFrontendIPConfigurationListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LoadBalancerFrontendIPConfigurationsListOptionalParams,
  LoadBalancerFrontendIPConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancerFrontendIPConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/frontendIPConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
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
): Promise<_LoadBalancerFrontendIPConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _loadBalancerFrontendIPConfigurationListResultDeserializer(result.body);
}

/** Gets all the load balancer frontend IP configurations. */
export function list(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancerFrontendIPConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FrontendIPConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, loadBalancerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  frontendIPConfigurationName: string,
  options: LoadBalancerFrontendIPConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/frontendIPConfigurations/{frontendIPConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      frontendIPConfigurationName: frontendIPConfigurationName,
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
): Promise<FrontendIPConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return frontendIPConfigurationDeserializer(result.body);
}

/** Gets load balancer frontend IP configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  frontendIPConfigurationName: string,
  options: LoadBalancerFrontendIPConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<FrontendIPConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    loadBalancerName,
    frontendIPConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
