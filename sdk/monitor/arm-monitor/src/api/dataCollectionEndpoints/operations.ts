// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MicrosoftDataCollectionDataCollectionEndpointResource } from "../../models/microsoft/dataCollection/models.js";
import {
  microsoftDataCollectionDataCollectionEndpointResourceSerializer,
  microsoftDataCollectionDataCollectionEndpointResourceDeserializer,
  microsoftDataCollectionErrorResponseCommonV2Deserializer,
  microsoftDataCollectionResourceForUpdateSerializer,
} from "../../models/microsoft/dataCollection/models.js";
import type {
  _DataCollectionEndpointResourceListResult,
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _dataCollectionEndpointResourceListResultDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
  _networkSecurityPerimeterConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataCollectionEndpointsReconcileNSPOptionalParams,
  DataCollectionEndpointsListNSPOptionalParams,
  DataCollectionEndpointsGetNSPOptionalParams,
  DataCollectionEndpointsListBySubscriptionOptionalParams,
  DataCollectionEndpointsListByResourceGroupOptionalParams,
  DataCollectionEndpointsDeleteOptionalParams,
  DataCollectionEndpointsUpdateOptionalParams,
  DataCollectionEndpointsCreateOptionalParams,
  DataCollectionEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileNSPSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: DataCollectionEndpointsReconcileNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": "2021-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reconcileNSPDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Reconciles the specified NSP configuration for the specified data collection endpoint. */
export function reconcileNSP(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: DataCollectionEndpointsReconcileNSPOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reconcileNSPDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reconcileNSPSend(
        context,
        resourceGroupName,
        dataCollectionEndpointName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2021-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listNSPSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsListNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
      "api%2Dversion": "2021-10-01",
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

export async function _listNSPDeserialize(
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

/** Gets a list of NSP configurations for the specified data collection endpoint. */
export function listNSP(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsListNSPOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listNSPSend(context, resourceGroupName, dataCollectionEndpointName, options),
    _listNSPDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-10-01" },
  );
}

export function _getNSPSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: DataCollectionEndpointsGetNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": "2021-10-01",
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

export async function _getNSPDeserialize(
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

/** Gets the specified NSP configuration for the specified data collection endpoint. */
export async function getNSP(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: DataCollectionEndpointsGetNSPOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getNSPSend(
    context,
    resourceGroupName,
    dataCollectionEndpointName,
    networkSecurityPerimeterConfigurationName,
    options,
  );
  return _getNSPDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: DataCollectionEndpointsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/dataCollectionEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-03-11",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataCollectionEndpointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return _dataCollectionEndpointResourceListResultDeserializer(result.body);
}

/** Lists all data collection endpoints in the specified subscription */
export function listBySubscription(
  context: Client,
  options: DataCollectionEndpointsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-11" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DataCollectionEndpointsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-03-11",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataCollectionEndpointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return _dataCollectionEndpointResourceListResultDeserializer(result.body);
}

/** Lists all data collection endpoints in the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DataCollectionEndpointsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-11" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
      "api%2Dversion": "2024-03-11",
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
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a data collection endpoint. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    dataCollectionEndpointName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
      "api%2Dversion": "2024-03-11",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : microsoftDataCollectionResourceForUpdateSerializer(options["body"]),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftDataCollectionDataCollectionEndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionEndpointResourceDeserializer(result.body);
}

/** Updates part of a data collection endpoint. */
export async function update(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionEndpointResource> {
  const result = await _updateSend(context, resourceGroupName, dataCollectionEndpointName, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
      "api%2Dversion": "2024-03-11",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : microsoftDataCollectionDataCollectionEndpointResourceSerializer(options["body"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftDataCollectionDataCollectionEndpointResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionEndpointResourceDeserializer(result.body);
}

/** Creates or updates a data collection endpoint. */
export async function create(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsCreateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionEndpointResource> {
  const result = await _createSend(context, resourceGroupName, dataCollectionEndpointName, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
      "api%2Dversion": "2024-03-11",
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
): Promise<MicrosoftDataCollectionDataCollectionEndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionEndpointResourceDeserializer(result.body);
}

/** Returns the specified data collection endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionEndpointResource> {
  const result = await _getSend(context, resourceGroupName, dataCollectionEndpointName, options);
  return _getDeserialize(result);
}
