// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VpnProfileResponse,
  TagsObject,
  P2SVpnConnectionRequest,
  P2SVpnGateway,
  _ListP2SVpnGatewaysResult,
  P2SVpnProfileParameters,
  P2SVpnConnectionHealthRequest,
  P2SVpnConnectionHealth,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  vpnProfileResponseDeserializer,
  tagsObjectSerializer,
  p2SVpnConnectionRequestSerializer,
  p2SVpnGatewaySerializer,
  p2SVpnGatewayDeserializer,
  _listP2SVpnGatewaysResultDeserializer,
  p2SVpnProfileParametersSerializer,
  p2SVpnConnectionHealthRequestSerializer,
  p2SVpnConnectionHealthDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams,
  P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams,
  P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams,
  P2SVpnGatewaysGenerateVpnProfileOptionalParams,
  P2SVpnGatewaysResetOptionalParams,
  P2SVpnGatewaysListOptionalParams,
  P2SVpnGatewaysListByResourceGroupOptionalParams,
  P2SVpnGatewaysDeleteOptionalParams,
  P2SVpnGatewaysUpdateTagsOptionalParams,
  P2SVpnGatewaysCreateOrUpdateOptionalParams,
  P2SVpnGatewaysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _disconnectP2SVpnConnectionsSend(
  context: Client,
  resourceGroupName: string,
  p2SVpnGatewayName: string,
  request: P2SVpnConnectionRequest,
  options: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{p2sVpnGatewayName}/disconnectP2sVpnConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      p2sVpnGatewayName: p2SVpnGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: p2SVpnConnectionRequestSerializer(request),
  });
}

export async function _disconnectP2SVpnConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group. */
export function disconnectP2SVpnConnections(
  context: Client,
  resourceGroupName: string,
  p2SVpnGatewayName: string,
  request: P2SVpnConnectionRequest,
  options: P2SVpnGatewaysDisconnectP2SVpnConnectionsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _disconnectP2SVpnConnectionsDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _disconnectP2SVpnConnectionsSend(
          context,
          resourceGroupName,
          p2SVpnGatewayName,
          request,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _getP2SVpnConnectionHealthDetailedSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  request: P2SVpnConnectionHealthRequest,
  options: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/getP2sVpnConnectionHealthDetailed{?api%2Dversion}",
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
    body: p2SVpnConnectionHealthRequestSerializer(request),
  });
}

export async function _getP2SVpnConnectionHealthDetailedDeserialize(
  result: PathUncheckedResponse,
): Promise<P2SVpnConnectionHealth> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return p2SVpnConnectionHealthDeserializer(result.body);
}

/** Gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export function getP2SVpnConnectionHealthDetailed(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  request: P2SVpnConnectionHealthRequest,
  options: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<P2SVpnConnectionHealth>, P2SVpnConnectionHealth> {
  return getLongRunningPoller(
    context,
    _getP2SVpnConnectionHealthDetailedDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getP2SVpnConnectionHealthDetailedSend(
          context,
          resourceGroupName,
          gatewayName,
          request,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<P2SVpnConnectionHealth>, P2SVpnConnectionHealth>;
}

export function _getP2SVpnConnectionHealthSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/getP2sVpnConnectionHealth{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getP2SVpnConnectionHealthDeserialize(
  result: PathUncheckedResponse,
): Promise<P2SVpnGateway> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return p2SVpnGatewayDeserializer(result.body);
}

/** Gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export function getP2SVpnConnectionHealth(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: P2SVpnGatewaysGetP2SVpnConnectionHealthOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway> {
  return getLongRunningPoller(
    context,
    _getP2SVpnConnectionHealthDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getP2SVpnConnectionHealthSend(context, resourceGroupName, gatewayName, options),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
}

export function _generateVpnProfileSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  parameters: P2SVpnProfileParameters,
  options: P2SVpnGatewaysGenerateVpnProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/generatevpnprofile{?api%2Dversion}",
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
    body: p2SVpnProfileParametersSerializer(parameters),
  });
}

export async function _generateVpnProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnProfileResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnProfileResponseDeserializer(result.body);
}

/** Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group. */
export function generateVpnProfile(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  parameters: P2SVpnProfileParameters,
  options: P2SVpnGatewaysGenerateVpnProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse> {
  return getLongRunningPoller(context, _generateVpnProfileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generateVpnProfileSend(context, resourceGroupName, gatewayName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse>;
}

export function _resetSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: P2SVpnGatewaysResetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/reset{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _resetDeserialize(result: PathUncheckedResponse): Promise<P2SVpnGateway> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return p2SVpnGatewayDeserializer(result.body);
}

/** Resets the primary of the p2s vpn gateway in the specified resource group. */
export function reset(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: P2SVpnGatewaysResetOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway> {
  return getLongRunningPoller(context, _resetDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resetSend(context, resourceGroupName, gatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
}

export function _listSend(
  context: Client,
  options: P2SVpnGatewaysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/p2svpnGateways{?api%2Dversion}",
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
): Promise<_ListP2SVpnGatewaysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listP2SVpnGatewaysResultDeserializer(result.body);
}

/** Lists all the P2SVpnGateways in a subscription. */
export function list(
  context: Client,
  options: P2SVpnGatewaysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<P2SVpnGateway> {
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
  options: P2SVpnGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways{?api%2Dversion}",
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
): Promise<_ListP2SVpnGatewaysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listP2SVpnGatewaysResultDeserializer(result.body);
}

/** Lists all the P2SVpnGateways in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: P2SVpnGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<P2SVpnGateway> {
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
  options: P2SVpnGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}{?api%2Dversion}",
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

/** Deletes a virtual wan p2s vpn gateway. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: P2SVpnGatewaysDeleteOptionalParams = { requestOptions: {} },
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
  p2SVpnGatewayParameters: TagsObject,
  options: P2SVpnGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}{?api%2Dversion}",
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
    body: tagsObjectSerializer(p2SVpnGatewayParameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<P2SVpnGateway> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return p2SVpnGatewayDeserializer(result.body);
}

/** Updates virtual wan p2s vpn gateway tags. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  p2SVpnGatewayParameters: TagsObject,
  options: P2SVpnGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(context, resourceGroupName, gatewayName, p2SVpnGatewayParameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  p2SVpnGatewayParameters: P2SVpnGateway,
  options: P2SVpnGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}{?api%2Dversion}",
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
    body: p2SVpnGatewaySerializer(p2SVpnGatewayParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<P2SVpnGateway> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return p2SVpnGatewayDeserializer(result.body);
}

/** Creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  p2SVpnGatewayParameters: P2SVpnGateway,
  options: P2SVpnGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        gatewayName,
        p2SVpnGatewayParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<P2SVpnGateway>, P2SVpnGateway>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: P2SVpnGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<P2SVpnGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return p2SVpnGatewayDeserializer(result.body);
}

/** Retrieves the details of a virtual wan p2s vpn gateway. */
export async function get(
  context: Client,
  resourceGroupName: string,
  gatewayName: string,
  options: P2SVpnGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<P2SVpnGateway> {
  const result = await _getSend(context, resourceGroupName, gatewayName, options);
  return _getDeserialize(result);
}
