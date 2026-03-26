// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  VpnGateway,
  _ListVpnGatewaysResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  vpnGatewaySerializer,
  vpnGatewayDeserializer,
  _listVpnGatewaysResultDeserializer,
  vpnGatewayPacketCaptureStartParametersSerializer,
  _startPacketCaptureFinalResult2Deserializer,
  vpnGatewayPacketCaptureStopParametersSerializer,
  _stopPacketCaptureFinalResult2Deserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VpnGatewaysStopPacketCaptureOptionalParams,
  VpnGatewaysStartPacketCaptureOptionalParams,
  VpnGatewaysResetOptionalParams,
  VpnGatewaysListOptionalParams,
  VpnGatewaysListByResourceGroupOptionalParams,
  VpnGatewaysDeleteOptionalParams,
  VpnGatewaysUpdateTagsOptionalParams,
  VpnGatewaysCreateOrUpdateOptionalParams,
  VpnGatewaysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _stopPacketCaptureSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysStopPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/stoppacketcapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : vpnGatewayPacketCaptureStopParametersSerializer(options["parameters"]),
  });
}

export async function _stopPacketCaptureDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _stopPacketCaptureFinalResult2Deserializer(result.body);
}

/** Stops packet capture on vpn gateway in the specified resource group. */
export function stopPacketCapture(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysStopPacketCaptureOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(context, _stopPacketCaptureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopPacketCaptureSend(context, resourceGroupName, gatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
}

export function _startPacketCaptureSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysStartPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/startpacketcapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : vpnGatewayPacketCaptureStartParametersSerializer(options["parameters"]),
  });
}

export async function _startPacketCaptureDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _startPacketCaptureFinalResult2Deserializer(result.body);
}

/** Starts packet capture on vpn gateway in the specified resource group. */
export function startPacketCapture(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysStartPacketCaptureOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(context, _startPacketCaptureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startPacketCaptureSend(context, resourceGroupName, gatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
}

export function _resetSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysResetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/reset{?api%2Dversion,ipConfigurationId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      "api%2Dversion": "2025-05-01",
      ipConfigurationId: options?.ipConfigurationId,
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

export async function _resetDeserialize(result: PathUncheckedResponse): Promise<VpnGateway> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnGatewayDeserializer(result.body);
}

/** Resets the primary of the vpn gateway in the specified resource group. */
export function reset(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysResetOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnGateway>, VpnGateway> {
  return getLongRunningPoller(context, _resetDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resetSend(context, resourceGroupName, gatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VpnGateway>, VpnGateway>;
}

export function _listSend(
  context: Client,
  options: VpnGatewaysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/vpnGateways{?api%2Dversion}",
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
): Promise<_ListVpnGatewaysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnGatewaysResultDeserializer(result.body);
}

/** Lists all the VpnGateways in a subscription. */
export function list(
  context: Client,
  options: VpnGatewaysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VpnGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVpnGatewaysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnGatewaysResultDeserializer(result.body);
}

/** Lists all the VpnGateways in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VpnGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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

/** Deletes a virtual wan vpn gateway. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, gatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnGatewayParameters: TagsObject,
  options: VpnGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(vpnGatewayParameters),
  });
}

export async function _updateTagsDeserialize(result: PathUncheckedResponse): Promise<VpnGateway> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnGatewayDeserializer(result.body);
}

/** Updates virtual wan vpn gateway tags. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnGatewayParameters: TagsObject,
  options: VpnGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnGateway>, VpnGateway> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(context, resourceGroupName, gatewayName, vpnGatewayParameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VpnGateway>, VpnGateway>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnGatewayParameters: VpnGateway,
  options: VpnGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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
    body: vpnGatewaySerializer(vpnGatewayParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnGateway> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnGatewayDeserializer(result.body);
}

/** Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  vpnGatewayParameters: VpnGateway,
  options: VpnGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnGateway>, VpnGateway> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, gatewayName, vpnGatewayParameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VpnGateway>, VpnGateway>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      gatewayName: gatewayName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VpnGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnGatewayDeserializer(result.body);
}

/** Retrieves the details of a virtual wan vpn gateway. */
export async function get(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: VpnGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<VpnGateway> {
  const result = await _getSend(context, resourceGroupName, gatewayName, options);
  return _getDeserialize(result);
}
