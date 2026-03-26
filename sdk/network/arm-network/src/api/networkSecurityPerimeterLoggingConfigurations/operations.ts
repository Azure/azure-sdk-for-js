// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NspLoggingConfiguration } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  nspLoggingConfigurationSerializer,
  nspLoggingConfigurationDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NspLoggingConfigurationListResult } from "../../models/models.js";
import { _nspLoggingConfigurationListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsDeleteOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterLoggingConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/loggingConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
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
): Promise<_NspLoggingConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _nspLoggingConfigurationListResultDeserializer(result.body);
}

/** Lists the NSP logging configuration. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimeterLoggingConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NspLoggingConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkSecurityPerimeterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  loggingConfigurationName: string,
  options: NetworkSecurityPerimeterLoggingConfigurationsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/loggingConfigurations/{loggingConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      loggingConfigurationName: loggingConfigurationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an NSP Logging configuration. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  loggingConfigurationName: string,
  options: NetworkSecurityPerimeterLoggingConfigurationsDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    loggingConfigurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  loggingConfigurationName: string,
  parameters: NspLoggingConfiguration,
  options: NetworkSecurityPerimeterLoggingConfigurationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/loggingConfigurations/{loggingConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      loggingConfigurationName: loggingConfigurationName,
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
    body: nspLoggingConfigurationSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NspLoggingConfiguration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspLoggingConfigurationDeserializer(result.body);
}

/** Creates or updates NSP logging configuration. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  loggingConfigurationName: string,
  parameters: NspLoggingConfiguration,
  options: NetworkSecurityPerimeterLoggingConfigurationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<NspLoggingConfiguration> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    loggingConfigurationName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  loggingConfigurationName: string,
  options: NetworkSecurityPerimeterLoggingConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/loggingConfigurations/{loggingConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      loggingConfigurationName: loggingConfigurationName,
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
): Promise<NspLoggingConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspLoggingConfigurationDeserializer(result.body);
}

/** Gets the NSP logging configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  loggingConfigurationName: string,
  options: NetworkSecurityPerimeterLoggingConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<NspLoggingConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    loggingConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
