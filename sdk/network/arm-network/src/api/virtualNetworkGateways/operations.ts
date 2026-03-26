// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  VirtualNetworkGateway,
  _VirtualNetworkGatewayListConnectionsResult,
  VirtualNetworkGatewayConnectionListEntity,
  VpnClientParameters,
  BgpPeerStatusListResult,
  RadiusAuthServerListResult,
  GatewayRouteListResult,
  GatewayResiliencyInformation,
  GatewayRouteSetsInformation,
  VpnClientIPsecParameters,
  VpnPacketCaptureStopParameters,
  ExpressRouteFailoverTestDetails,
  ExpressRouteFailoverSingleTestDetails,
  ExpressRouteFailoverStopApiParameters,
  VpnClientConnectionHealthDetailListResult,
  P2SVpnConnectionRequest,
  VirtualNetworkGatewayMigrationParameters,
  VpnDeviceScriptParameters,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  errorDeserializer,
  virtualNetworkGatewaySerializer,
  virtualNetworkGatewayDeserializer,
  _virtualNetworkGatewayListConnectionsResultDeserializer,
  vpnClientParametersSerializer,
  _generatevpnclientpackageFinalResultDeserializer,
  _getVpnProfilePackageUrlFinalResultDeserializer,
  bgpPeerStatusListResultDeserializer,
  radiusAuthServerListResultDeserializer,
  gatewayRouteListResultDeserializer,
  gatewayResiliencyInformationDeserializer,
  gatewayRouteSetsInformationDeserializer,
  vpnClientIPsecParametersSerializer,
  vpnClientIPsecParametersDeserializer,
  vpnPacketCaptureStartParametersSerializer,
  _startPacketCaptureFinalResultDeserializer,
  vpnPacketCaptureStopParametersSerializer,
  _stopPacketCaptureFinalResultDeserializer,
  _startExpressRouteSiteFailoverSimulationFinalResultDeserializer,
  expressRouteFailoverStopApiParametersSerializer,
  _stopExpressRouteSiteFailoverSimulationFinalResultDeserializer,
  vpnClientConnectionHealthDetailListResultDeserializer,
  p2SVpnConnectionRequestSerializer,
  virtualNetworkGatewayMigrationParametersSerializer,
  vpnDeviceScriptParametersSerializer,
  expressRouteFailoverTestDetailsArrayDeserializer,
  expressRouteFailoverSingleTestDetailsArrayDeserializer,
} from "../../models/microsoft/network/models.js";
import type {
  _VirtualNetworkGatewayListResult,
  ArmAcceptedLroResponse,
  VirtualNetworkGatewaysVpnDeviceConfigurationScriptResponse,
  VirtualNetworkGatewaysSupportedVpnDevicesResponse,
} from "../../models/models.js";
import {
  _virtualNetworkGatewayListResultDeserializer,
  armAcceptedLroResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkGatewaysVpnDeviceConfigurationScriptOptionalParams,
  VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
  VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
  VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
  VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
  VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
  VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
  VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
  VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
  VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
  VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
  VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
  VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
  VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
  VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
  VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
  VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
  VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
  VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
  VirtualNetworkGatewaysListRadiusSecretsOptionalParams,
  VirtualNetworkGatewaysSupportedVpnDevicesOptionalParams,
  VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
  VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
  VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
  VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
  VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
  VirtualNetworkGatewaysResetOptionalParams,
  VirtualNetworkGatewaysListConnectionsOptionalParams,
  VirtualNetworkGatewaysListOptionalParams,
  VirtualNetworkGatewaysDeleteOptionalParams,
  VirtualNetworkGatewaysUpdateTagsOptionalParams,
  VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
  VirtualNetworkGatewaysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _vpnDeviceConfigurationScriptSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: VpnDeviceScriptParameters,
  options: VirtualNetworkGatewaysVpnDeviceConfigurationScriptOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/vpndeviceconfigurationscript{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayConnectionName: virtualNetworkGatewayConnectionName,
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
    body: vpnDeviceScriptParametersSerializer(parameters),
  });
}

export async function _vpnDeviceConfigurationScriptDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGatewaysVpnDeviceConfigurationScriptResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Gets a xml format representation for vpn device configuration script. */
export async function vpnDeviceConfigurationScript(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayConnectionName: string,
  parameters: VpnDeviceScriptParameters,
  options: VirtualNetworkGatewaysVpnDeviceConfigurationScriptOptionalParams = {
    requestOptions: {},
  },
): Promise<VirtualNetworkGatewaysVpnDeviceConfigurationScriptResponse> {
  const result = await _vpnDeviceConfigurationScriptSend(
    context,
    resourceGroupName,
    virtualNetworkGatewayConnectionName,
    parameters,
    options,
  );
  return _vpnDeviceConfigurationScriptDeserialize(result);
}

export function _invokeAbortMigrationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/abortMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _invokeAbortMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Trigger abort migration for the virtual network gateway. */
export function invokeAbortMigration(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _invokeAbortMigrationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _invokeAbortMigrationSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _invokeCommitMigrationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/commitMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _invokeCommitMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Trigger commit migration for the virtual network gateway. */
export function invokeCommitMigration(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _invokeCommitMigrationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _invokeCommitMigrationSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _invokeExecuteMigrationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/executeMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _invokeExecuteMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Trigger execute migration for the virtual network gateway. */
export function invokeExecuteMigration(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _invokeExecuteMigrationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _invokeExecuteMigrationSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _invokePrepareMigrationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  migrationParams: VirtualNetworkGatewayMigrationParameters,
  options: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/prepareMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: virtualNetworkGatewayMigrationParametersSerializer(migrationParams),
  });
}

export async function _invokePrepareMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Trigger prepare migration for the virtual network gateway. */
export function invokePrepareMigration(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  migrationParams: VirtualNetworkGatewayMigrationParameters,
  options: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _invokePrepareMigrationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _invokePrepareMigrationSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        migrationParams,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _disconnectVirtualNetworkGatewayVpnConnectionsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  request: P2SVpnConnectionRequest,
  options: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/disconnectVirtualNetworkGatewayVpnConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _disconnectVirtualNetworkGatewayVpnConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disconnect vpn connections of virtual network gateway in the specified resource group. */
export function disconnectVirtualNetworkGatewayVpnConnections(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  request: P2SVpnConnectionRequest,
  options: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _disconnectVirtualNetworkGatewayVpnConnectionsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _disconnectVirtualNetworkGatewayVpnConnectionsSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          request,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _getVpnclientConnectionHealthSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getVpnClientConnectionHealth{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _getVpnclientConnectionHealthDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnClientConnectionHealthDetailListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnClientConnectionHealthDetailListResultDeserializer(result.body);
}

/** Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group. */
export function getVpnclientConnectionHealth(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<VpnClientConnectionHealthDetailListResult>,
  VpnClientConnectionHealthDetailListResult
> {
  return getLongRunningPoller(
    context,
    _getVpnclientConnectionHealthDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getVpnclientConnectionHealthSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<VpnClientConnectionHealthDetailListResult>,
    VpnClientConnectionHealthDetailListResult
  >;
}

export function _stopExpressRouteSiteFailoverSimulationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  stopParameters: ExpressRouteFailoverStopApiParameters,
  options: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/stopSiteFailoverTest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
    body: expressRouteFailoverStopApiParametersSerializer(stopParameters),
  });
}

export async function _stopExpressRouteSiteFailoverSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _stopExpressRouteSiteFailoverSimulationFinalResultDeserializer(result.body);
}

/** This operation stops failover simulation on the gateway for the specified peering location */
export function stopExpressRouteSiteFailoverSimulation(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  stopParameters: ExpressRouteFailoverStopApiParameters,
  options: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(
    context,
    _stopExpressRouteSiteFailoverSimulationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _stopExpressRouteSiteFailoverSimulationSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          stopParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
}

export function _startExpressRouteSiteFailoverSimulationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  peeringLocation: string,
  options: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/startSiteFailoverTest{?api%2Dversion,peeringLocation}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      peeringLocation: peeringLocation,
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

export async function _startExpressRouteSiteFailoverSimulationDeserialize(
  result: PathUncheckedResponse,
): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _startExpressRouteSiteFailoverSimulationFinalResultDeserializer(result.body);
}

/** This operation starts failover simulation on the gateway for the specified peering location */
export function startExpressRouteSiteFailoverSimulation(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  peeringLocation: string,
  options: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(
    context,
    _startExpressRouteSiteFailoverSimulationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _startExpressRouteSiteFailoverSimulationSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          peeringLocation,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
}

export function _getFailoverSingleTestDetailsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  peeringLocation: string,
  failoverTestId: string,
  options: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getFailoverSingleTestDetails{?api%2Dversion,peeringLocation,failoverTestId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      peeringLocation: peeringLocation,
      failoverTestId: failoverTestId,
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

export async function _getFailoverSingleTestDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteFailoverSingleTestDetails[]> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteFailoverSingleTestDetailsArrayDeserializer(result.body);
}

/** This operation retrieves the details of a particular failover test performed on the gateway based on the test Guid */
export function getFailoverSingleTestDetails(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  peeringLocation: string,
  failoverTestId: string,
  options: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<ExpressRouteFailoverSingleTestDetails[]>,
  ExpressRouteFailoverSingleTestDetails[]
> {
  return getLongRunningPoller(
    context,
    _getFailoverSingleTestDetailsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getFailoverSingleTestDetailsSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          peeringLocation,
          failoverTestId,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<ExpressRouteFailoverSingleTestDetails[]>,
    ExpressRouteFailoverSingleTestDetails[]
  >;
}

export function _getFailoverAllTestDetailsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  typeParam: string,
  fetchLatest: boolean,
  options: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getFailoverAllTestsDetails{?api%2Dversion,type,fetchLatest}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      type: typeParam,
      fetchLatest: fetchLatest,
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

export async function _getFailoverAllTestDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteFailoverTestDetails[]> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteFailoverTestDetailsArrayDeserializer(result.body);
}

/** This operation retrieves the details of all the failover tests performed on the gateway for different peering locations */
export function getFailoverAllTestDetails(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  typeParam: string,
  fetchLatest: boolean,
  options: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteFailoverTestDetails[]>,
  ExpressRouteFailoverTestDetails[]
> {
  return getLongRunningPoller(
    context,
    _getFailoverAllTestDetailsDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getFailoverAllTestDetailsSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          typeParam,
          fetchLatest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<ExpressRouteFailoverTestDetails[]>,
    ExpressRouteFailoverTestDetails[]
  >;
}

export function _stopPacketCaptureSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VpnPacketCaptureStopParameters,
  options: VirtualNetworkGatewaysStopPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/stopPacketCapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
    body: vpnPacketCaptureStopParametersSerializer(parameters),
  });
}

export async function _stopPacketCaptureDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _stopPacketCaptureFinalResultDeserializer(result.body);
}

/** Stops packet capture on virtual network gateway in the specified resource group. */
export function stopPacketCapture(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VpnPacketCaptureStopParameters,
  options: VirtualNetworkGatewaysStopPacketCaptureOptionalParams = { requestOptions: {} },
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
      _stopPacketCaptureSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      ),
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
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysStartPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/startPacketCapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
      : vpnPacketCaptureStartParametersSerializer(options["parameters"]),
  });
}

export async function _startPacketCaptureDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _startPacketCaptureFinalResultDeserializer(result.body);
}

/** Starts packet capture on virtual network gateway in the specified resource group. */
export function startPacketCapture(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysStartPacketCaptureOptionalParams = { requestOptions: {} },
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
      _startPacketCaptureSend(context, resourceGroupName, virtualNetworkGatewayName, options),
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

export function _getVpnclientIpsecParametersSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getvpnclientipsecparameters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _getVpnclientIpsecParametersDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnClientIPsecParameters> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnClientIPsecParametersDeserializer(result.body);
}

/** The Get VpnclientIpsecParameters operation retrieves information about the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
export function getVpnclientIpsecParameters(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters> {
  return getLongRunningPoller(
    context,
    _getVpnclientIpsecParametersDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getVpnclientIpsecParametersSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters>;
}

export function _setVpnclientIpsecParametersSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  vpnclientIpsecParams: VpnClientIPsecParameters,
  options: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/setvpnclientipsecparameters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
    body: vpnClientIPsecParametersSerializer(vpnclientIpsecParams),
  });
}

export async function _setVpnclientIpsecParametersDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnClientIPsecParameters> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnClientIPsecParametersDeserializer(result.body);
}

/** The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
export function setVpnclientIpsecParameters(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  vpnclientIpsecParams: VpnClientIPsecParameters,
  options: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters> {
  return getLongRunningPoller(
    context,
    _setVpnclientIpsecParametersDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _setVpnclientIpsecParametersSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          vpnclientIpsecParams,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters>;
}

export function _getRoutesInformationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetRoutesInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getRoutesInformation{?api%2Dversion,attemptRefresh}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      attemptRefresh: options?.attemptRefresh,
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

export async function _getRoutesInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayRouteSetsInformation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return gatewayRouteSetsInformationDeserializer(result.body);
}

/** This operation retrieves the route set information for an Express Route Gateway based on their resiliency */
export function getRoutesInformation(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetRoutesInformationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation> {
  return getLongRunningPoller(context, _getRoutesInformationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getRoutesInformationSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation>;
}

export function _getResiliencyInformationSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getResiliencyInformation{?api%2Dversion,attemptRefresh}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      attemptRefresh: options?.attemptRefresh,
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

export async function _getResiliencyInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayResiliencyInformation> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return gatewayResiliencyInformationDeserializer(result.body);
}

/** This operation retrieves the resiliency information for an Express Route Gateway, including the gateway's current resiliency score and recommendations to further improve the score */
export function getResiliencyInformation(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation> {
  return getLongRunningPoller(
    context,
    _getResiliencyInformationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getResiliencyInformationSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation>;
}

export function _getAdvertisedRoutesSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  peer: string,
  options: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getAdvertisedRoutes{?api%2Dversion,peer}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      peer: peer,
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

export async function _getAdvertisedRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayRouteListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return gatewayRouteListResultDeserializer(result.body);
}

/** This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer. */
export function getAdvertisedRoutes(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  peer: string,
  options: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult> {
  return getLongRunningPoller(context, _getAdvertisedRoutesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getAdvertisedRoutesSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peer,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult>;
}

export function _getLearnedRoutesSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getLearnedRoutes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _getLearnedRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<GatewayRouteListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return gatewayRouteListResultDeserializer(result.body);
}

/** This operation retrieves a list of routes the virtual network gateway has learned, including routes learned from BGP peers. */
export function getLearnedRoutes(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult> {
  return getLongRunningPoller(context, _getLearnedRoutesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getLearnedRoutesSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult>;
}

export function _listRadiusSecretsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysListRadiusSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/listRadiusSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _listRadiusSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<RadiusAuthServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return radiusAuthServerListResultDeserializer(result.body);
}

/** List all Radius servers with respective radius secrets from virtual network gateway VpnClientConfiguration. */
export async function listRadiusSecrets(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysListRadiusSecretsOptionalParams = { requestOptions: {} },
): Promise<RadiusAuthServerListResult> {
  const result = await _listRadiusSecretsSend(
    context,
    resourceGroupName,
    virtualNetworkGatewayName,
    options,
  );
  return _listRadiusSecretsDeserialize(result);
}

export function _supportedVpnDevicesSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysSupportedVpnDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/supportedvpndevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _supportedVpnDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGatewaysSupportedVpnDevicesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Gets a xml format representation for supported vpn devices. */
export async function supportedVpnDevices(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysSupportedVpnDevicesOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkGatewaysSupportedVpnDevicesResponse> {
  const result = await _supportedVpnDevicesSend(
    context,
    resourceGroupName,
    virtualNetworkGatewayName,
    options,
  );
  return _supportedVpnDevicesDeserialize(result);
}

export function _getBgpPeerStatusSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getBgpPeerStatus{?api%2Dversion,peer}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      peer: options?.peer,
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

export async function _getBgpPeerStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<BgpPeerStatusListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return bgpPeerStatusListResultDeserializer(result.body);
}

/** The GetBgpPeerStatus operation retrieves the status of all BGP peers. */
export function getBgpPeerStatus(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BgpPeerStatusListResult>, BgpPeerStatusListResult> {
  return getLongRunningPoller(context, _getBgpPeerStatusDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getBgpPeerStatusSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<BgpPeerStatusListResult>, BgpPeerStatusListResult>;
}

export function _getVpnProfilePackageUrlSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getvpnprofilepackageurl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _getVpnProfilePackageUrlDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _getVpnProfilePackageUrlFinalResultDeserializer(result.body);
}

/** Gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile. */
export function getVpnProfilePackageUrl(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(context, _getVpnProfilePackageUrlDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getVpnProfilePackageUrlSend(context, resourceGroupName, virtualNetworkGatewayName, options),
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

export function _generateVpnProfileSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VpnClientParameters,
  options: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/generatevpnprofile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
    body: vpnClientParametersSerializer(parameters),
  });
}

export async function _generateVpnProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmAcceptedLroResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return armAcceptedLroResponseDeserializer(result.body);
}

/** Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication. */
export function generateVpnProfile(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VpnClientParameters,
  options: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmAcceptedLroResponse>, ArmAcceptedLroResponse> {
  return getLongRunningPoller(context, _generateVpnProfileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generateVpnProfileSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ArmAcceptedLroResponse>, ArmAcceptedLroResponse>;
}

export function _generatevpnclientpackageSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VpnClientParameters,
  options: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/generatevpnclientpackage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
    body: vpnClientParametersSerializer(parameters),
  });
}

export async function _generatevpnclientpackageDeserialize(result: PathUncheckedResponse): Promise<{
  body: string;
}> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _generatevpnclientpackageFinalResultDeserializer(result.body);
}

/** Generates VPN client package for P2S client of the virtual network gateway in the specified resource group. */
export function generatevpnclientpackage(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VpnClientParameters,
  options: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<{
    body: string;
  }>,
  {
    body: string;
  }
> {
  return getLongRunningPoller(
    context,
    _generatevpnclientpackageDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _generatevpnclientpackageSend(
          context,
          resourceGroupName,
          virtualNetworkGatewayName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<
    OperationState<{
      body: string;
    }>,
    {
      body: string;
    }
  >;
}

export function _resetVpnClientSharedKeySend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/resetvpnclientsharedkey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetVpnClientSharedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Resets the VPN client shared key of the virtual network gateway in the specified resource group. */
export function resetVpnClientSharedKey(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resetVpnClientSharedKeyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetVpnClientSharedKeySend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resetSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysResetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/reset{?api%2Dversion,gatewayVip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
      "api%2Dversion": "2025-05-01",
      gatewayVip: options?.gatewayVip,
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

export async function _resetDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGateway> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayDeserializer(result.body);
}

/** Resets the primary of the virtual network gateway in the specified resource group. */
export function reset(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysResetOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway> {
  return getLongRunningPoller(context, _resetDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resetSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>;
}

export function _listConnectionsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysListConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

export async function _listConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkGatewayListConnectionsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkGatewayListConnectionsResultDeserializer(result.body);
}

/** Gets all the connections in a virtual network gateway. */
export function listConnections(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysListConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkGatewayConnectionListEntity> {
  return buildPagedAsyncIterator(
    context,
    () => _listConnectionsSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    _listConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkGatewaysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _virtualNetworkGatewayListResultDeserializer(result.body);
}

/** Gets all virtual network gateways by resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: VirtualNetworkGatewaysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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

/** Deletes the specified virtual network gateway. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualNetworkGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: TagsObject,
  options: VirtualNetworkGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGateway> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayDeserializer(result.body);
}

/** Updates a virtual network gateway tags. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: TagsObject,
  options: VirtualNetworkGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(context, resourceGroupName, virtualNetworkGatewayName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VirtualNetworkGateway,
  options: VirtualNetworkGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
    body: virtualNetworkGatewaySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkGateway> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayDeserializer(result.body);
}

/** Creates or updates a virtual network gateway in the specified resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  parameters: VirtualNetworkGateway,
  options: VirtualNetworkGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkGatewayName: virtualNetworkGatewayName,
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
): Promise<VirtualNetworkGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualNetworkGatewayDeserializer(result.body);
}

/** Gets the specified virtual network gateway by resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualNetworkGatewayName: string,
  options: VirtualNetworkGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkGateway> {
  const result = await _getSend(context, resourceGroupName, virtualNetworkGatewayName, options);
  return _getDeserialize(result);
}
