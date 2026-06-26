// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GatewayHostnameConfigurationContract,
  gatewayHostnameConfigurationContractSerializer,
  gatewayHostnameConfigurationContractDeserializer,
  _GatewayHostnameConfigurationCollection,
  _gatewayHostnameConfigurationCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GatewayHostnameConfigurationListByServiceOptionalParams,
  GatewayHostnameConfigurationDeleteOptionalParams,
  GatewayHostnameConfigurationCreateOrUpdateOptionalParams,
  GatewayHostnameConfigurationGetEntityTagOptionalParams,
  GatewayHostnameConfigurationGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayHostnameConfigurationListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/hostnameConfigurations{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_GatewayHostnameConfigurationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _gatewayHostnameConfigurationCollectionDeserializer(result.body);
}

/** Lists the collection of hostname configurations for the specified gateway. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  options: GatewayHostnameConfigurationListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GatewayHostnameConfigurationContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, gatewayId, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  ifMatch: string,
  options: GatewayHostnameConfigurationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/hostnameConfigurations/{hcId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      hcId: hcId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified hostname configuration from the specified Gateway. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  ifMatch: string,
  options: GatewayHostnameConfigurationDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    hcId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  parameters: GatewayHostnameConfigurationContract,
  options: GatewayHostnameConfigurationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/hostnameConfigurations/{hcId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      hcId: hcId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: gatewayHostnameConfigurationContractSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayHostnameConfigurationContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return gatewayHostnameConfigurationContractDeserializer(result.body);
}

/** Creates of updates hostname configuration for a Gateway. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  parameters: GatewayHostnameConfigurationContract,
  options: GatewayHostnameConfigurationCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GatewayHostnameConfigurationContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    hcId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  options: GatewayHostnameConfigurationGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/hostnameConfigurations/{hcId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      hcId: hcId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks that hostname configuration entity specified by identifier exists for specified Gateway entity. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  options: GatewayHostnameConfigurationGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    gatewayId,
    hcId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  options: GatewayHostnameConfigurationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/gateways/{gatewayId}/hostnameConfigurations/{hcId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      gatewayId: gatewayId,
      hcId: hcId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
): Promise<GatewayHostnameConfigurationContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return gatewayHostnameConfigurationContractDeserializer(result.body);
}

/** Get details of a hostname configuration */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  gatewayId: string,
  hcId: string,
  options: GatewayHostnameConfigurationGetOptionalParams = { requestOptions: {} },
): Promise<GatewayHostnameConfigurationContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, gatewayId, hcId, options);
  return _getDeserialize(result);
}
