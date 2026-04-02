// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "./index.js";
import type {
  BastionShareableLinkListRequest,
  BastionShareableLink,
  _BastionShareableLinkListResult,
  BastionShareableLinkTokenListRequest,
  _BastionActiveSessionListResult,
  BastionActiveSession,
  SessionIds,
  _BastionSessionDeleteResult,
  BastionSessionState,
  ExpressRouteProviderPort,
  ActiveConfigurationParameter,
  ActiveConnectivityConfigurationsListResult,
  ActiveSecurityAdminRulesListResult,
  QueryRequestOptions,
  NetworkManagerEffectiveConnectivityConfigurationListResult,
  NetworkManagerEffectiveSecurityAdminRulesListResult,
  VirtualWanSecurityProviders,
  VirtualWanVpnProfileParameters,
  VpnProfileResponse,
  DnsNameAvailabilityResult,
} from "../models/microsoft/network/models.js";
import {
  bastionShareableLinkListRequestSerializer,
  _bastionShareableLinkListResultDeserializer,
  cloudErrorDeserializer,
  bastionShareableLinkTokenListRequestSerializer,
  _bastionActiveSessionListResultDeserializer,
  sessionIdsSerializer,
  _bastionSessionDeleteResultDeserializer,
  expressRouteProviderPortDeserializer,
  activeConfigurationParameterSerializer,
  activeConnectivityConfigurationsListResultDeserializer,
  activeSecurityAdminRulesListResultDeserializer,
  queryRequestOptionsSerializer,
  networkManagerEffectiveConnectivityConfigurationListResultDeserializer,
  networkManagerEffectiveSecurityAdminRulesListResultDeserializer,
  virtualWanSecurityProvidersDeserializer,
  virtualWanVpnProfileParametersSerializer,
  vpnProfileResponseDeserializer,
  dnsNameAvailabilityResultDeserializer,
} from "../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  CheckDnsNameAvailabilityOptionalParams,
  GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams,
  SupportedSecurityProvidersOptionalParams,
  ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams,
  ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams,
  ListActiveSecurityAdminRulesOptionalParams,
  ListActiveConnectivityConfigurationsOptionalParams,
  ExpressRouteProviderPortOptionalParams,
  DisconnectActiveSessionsOptionalParams,
  GetActiveSessionsOptionalParams,
  GetBastionShareableLinkOptionalParams,
  DeleteBastionShareableLinkByTokenOptionalParams,
  DeleteBastionShareableLinkOptionalParams,
  PutBastionShareableLinkOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkDnsNameAvailabilitySend(
  context: Client,
  location: string,
  domainNameLabel: string,
  options: CheckDnsNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/checkDnsNameAvailability{?api%2Dversion,domainNameLabel}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2025-05-01",
      domainNameLabel: domainNameLabel,
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

export async function _checkDnsNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dnsNameAvailabilityResultDeserializer(result.body);
}

/** Checks whether a domain name in the cloudapp.azure.com zone is available for use. */
export async function checkDnsNameAvailability(
  context: Client,
  location: string,
  domainNameLabel: string,
  options: CheckDnsNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<DnsNameAvailabilityResult> {
  const result = await _checkDnsNameAvailabilitySend(context, location, domainNameLabel, options);
  return _checkDnsNameAvailabilityDeserialize(result);
}

export function _generatevirtualwanvpnserverconfigurationvpnprofileSend(
  context: Client,
  resourceGroupName: string,
  virtualWANName: string,
  vpnClientParams: VirtualWanVpnProfileParameters,
  options: GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/generateVpnProfile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualWANName: virtualWANName,
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
    body: virtualWanVpnProfileParametersSerializer(vpnClientParams),
  });
}

export async function _generatevirtualwanvpnserverconfigurationvpnprofileDeserialize(
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

/** Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group. */
export function generatevirtualwanvpnserverconfigurationvpnprofile(
  context: Client,
  resourceGroupName: string,
  virtualWANName: string,
  vpnClientParams: VirtualWanVpnProfileParameters,
  options: GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse> {
  return getLongRunningPoller(
    context,
    _generatevirtualwanvpnserverconfigurationvpnprofileDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _generatevirtualwanvpnserverconfigurationvpnprofileSend(
          context,
          resourceGroupName,
          virtualWANName,
          vpnClientParams,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse>;
}

export function _supportedSecurityProvidersSend(
  context: Client,
  resourceGroupName: string,
  virtualWANName: string,
  options: SupportedSecurityProvidersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/supportedSecurityProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualWANName: virtualWANName,
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

export async function _supportedSecurityProvidersDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualWanSecurityProviders> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return virtualWanSecurityProvidersDeserializer(result.body);
}

/** Gives the supported security providers for the virtual wan. */
export async function supportedSecurityProviders(
  context: Client,
  resourceGroupName: string,
  virtualWANName: string,
  options: SupportedSecurityProvidersOptionalParams = { requestOptions: {} },
): Promise<VirtualWanSecurityProviders> {
  const result = await _supportedSecurityProvidersSend(
    context,
    resourceGroupName,
    virtualWANName,
    options,
  );
  return _supportedSecurityProvidersDeserialize(result);
}

export function _listNetworkManagerEffectiveSecurityAdminRulesSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: QueryRequestOptions,
  options: ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listNetworkManagerEffectiveSecurityAdminRules{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryRequestOptionsSerializer(parameters),
  });
}

export async function _listNetworkManagerEffectiveSecurityAdminRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkManagerEffectiveSecurityAdminRulesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerEffectiveSecurityAdminRulesListResultDeserializer(result.body);
}

/** List all effective security admin rules applied on a virtual network. */
export async function listNetworkManagerEffectiveSecurityAdminRules(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: QueryRequestOptions,
  options: ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams = { requestOptions: {} },
): Promise<NetworkManagerEffectiveSecurityAdminRulesListResult> {
  const result = await _listNetworkManagerEffectiveSecurityAdminRulesSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    parameters,
    options,
  );
  return _listNetworkManagerEffectiveSecurityAdminRulesDeserialize(result);
}

export function _listNetworkManagerEffectiveConnectivityConfigurationsSend(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: QueryRequestOptions,
  options: ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listNetworkManagerEffectiveConnectivityConfigurations{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualNetworkName: virtualNetworkName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryRequestOptionsSerializer(parameters),
  });
}

export async function _listNetworkManagerEffectiveConnectivityConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkManagerEffectiveConnectivityConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerEffectiveConnectivityConfigurationListResultDeserializer(result.body);
}

/** List all effective connectivity configurations applied on a virtual network. */
export async function listNetworkManagerEffectiveConnectivityConfigurations(
  context: Client,
  resourceGroupName: string,
  virtualNetworkName: string,
  parameters: QueryRequestOptions,
  options: ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkManagerEffectiveConnectivityConfigurationListResult> {
  const result = await _listNetworkManagerEffectiveConnectivityConfigurationsSend(
    context,
    resourceGroupName,
    virtualNetworkName,
    parameters,
    options,
  );
  return _listNetworkManagerEffectiveConnectivityConfigurationsDeserialize(result);
}

export function _listActiveSecurityAdminRulesSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: ActiveConfigurationParameter,
  options: ListActiveSecurityAdminRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/listActiveSecurityAdminRules{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activeConfigurationParameterSerializer(parameters),
  });
}

export async function _listActiveSecurityAdminRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<ActiveSecurityAdminRulesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return activeSecurityAdminRulesListResultDeserializer(result.body);
}

/** Lists active security admin rules in a network manager. */
export async function listActiveSecurityAdminRules(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: ActiveConfigurationParameter,
  options: ListActiveSecurityAdminRulesOptionalParams = { requestOptions: {} },
): Promise<ActiveSecurityAdminRulesListResult> {
  const result = await _listActiveSecurityAdminRulesSend(
    context,
    resourceGroupName,
    networkManagerName,
    parameters,
    options,
  );
  return _listActiveSecurityAdminRulesDeserialize(result);
}

export function _listActiveConnectivityConfigurationsSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: ActiveConfigurationParameter,
  options: ListActiveConnectivityConfigurationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/listActiveConnectivityConfigurations{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activeConfigurationParameterSerializer(parameters),
  });
}

export async function _listActiveConnectivityConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<ActiveConnectivityConfigurationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return activeConnectivityConfigurationsListResultDeserializer(result.body);
}

/** Lists active connectivity configurations in a network manager. */
export async function listActiveConnectivityConfigurations(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: ActiveConfigurationParameter,
  options: ListActiveConnectivityConfigurationsOptionalParams = { requestOptions: {} },
): Promise<ActiveConnectivityConfigurationsListResult> {
  const result = await _listActiveConnectivityConfigurationsSend(
    context,
    resourceGroupName,
    networkManagerName,
    parameters,
    options,
  );
  return _listActiveConnectivityConfigurationsDeserialize(result);
}

export function _expressRouteProviderPortSend(
  context: Client,
  providerport: string,
  options: ExpressRouteProviderPortOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteProviderPorts/{providerport}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerport: providerport,
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

export async function _expressRouteProviderPortDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteProviderPort> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return expressRouteProviderPortDeserializer(result.body);
}

/** Retrieves detail of a provider port. */
export async function expressRouteProviderPort(
  context: Client,
  providerport: string,
  options: ExpressRouteProviderPortOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteProviderPort> {
  const result = await _expressRouteProviderPortSend(context, providerport, options);
  return _expressRouteProviderPortDeserialize(result);
}

export function _disconnectActiveSessionsSend(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  sessionIds: SessionIds,
  options: DisconnectActiveSessionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/disconnectActiveSessions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bastionHostName: bastionHostName,
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
    body: sessionIdsSerializer(sessionIds),
  });
}

export async function _disconnectActiveSessionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BastionSessionDeleteResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _bastionSessionDeleteResultDeserializer(result.body);
}

/** Returns the list of currently active sessions on the Bastion. */
export function disconnectActiveSessions(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  sessionIds: SessionIds,
  options: DisconnectActiveSessionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BastionSessionState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _disconnectActiveSessionsSend(
        context,
        resourceGroupName,
        bastionHostName,
        sessionIds,
        options,
      ),
    _disconnectActiveSessionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getActiveSessionsSend(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  options: GetActiveSessionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/getActiveSessions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bastionHostName: bastionHostName,
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

export async function _getActiveSessionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_BastionActiveSessionListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _bastionActiveSessionListResultDeserializer(result.body);
}

/** Returns the list of currently active sessions on the Bastion. */
export function getActiveSessions(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  options: GetActiveSessionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BastionActiveSession> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _getActiveSessionsSend(context, resourceGroupName, bastionHostName, options),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _getActiveSessionsDeserialize,
    ["202", "200", "201"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _getBastionShareableLinkSend(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslRequest: BastionShareableLinkListRequest,
  options: GetBastionShareableLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/getShareableLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bastionHostName: bastionHostName,
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
    body: bastionShareableLinkListRequestSerializer(bslRequest),
  });
}

export async function _getBastionShareableLinkDeserialize(
  result: PathUncheckedResponse,
): Promise<_BastionShareableLinkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _bastionShareableLinkListResultDeserializer(result.body);
}

/** Return the Bastion Shareable Links for all the VMs specified in the request. */
export function getBastionShareableLink(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslRequest: BastionShareableLinkListRequest,
  options: GetBastionShareableLinkOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BastionShareableLink> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _getBastionShareableLinkSend(
        context,
        resourceGroupName,
        bastionHostName,
        bslRequest,
        options,
      ),
    _getBastionShareableLinkDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _deleteBastionShareableLinkByTokenSend(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslTokenRequest: BastionShareableLinkTokenListRequest,
  options: DeleteBastionShareableLinkByTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/deleteShareableLinksByToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bastionHostName: bastionHostName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: bastionShareableLinkTokenListRequestSerializer(bslTokenRequest),
  });
}

export async function _deleteBastionShareableLinkByTokenDeserialize(
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

/** Deletes the Bastion Shareable Links for all the tokens specified in the request. */
export function deleteBastionShareableLinkByToken(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslTokenRequest: BastionShareableLinkTokenListRequest,
  options: DeleteBastionShareableLinkByTokenOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteBastionShareableLinkByTokenDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteBastionShareableLinkByTokenSend(
          context,
          resourceGroupName,
          bastionHostName,
          bslTokenRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _deleteBastionShareableLinkSend(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslRequest: BastionShareableLinkListRequest,
  options: DeleteBastionShareableLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/deleteShareableLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bastionHostName: bastionHostName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: bastionShareableLinkListRequestSerializer(bslRequest),
  });
}

export async function _deleteBastionShareableLinkDeserialize(
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

/** Deletes the Bastion Shareable Links for all the VMs specified in the request. */
export function deleteBastionShareableLink(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslRequest: BastionShareableLinkListRequest,
  options: DeleteBastionShareableLinkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteBastionShareableLinkDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteBastionShareableLinkSend(
          context,
          resourceGroupName,
          bastionHostName,
          bslRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _putBastionShareableLinkSend(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslRequest: BastionShareableLinkListRequest,
  options: PutBastionShareableLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/createShareableLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bastionHostName: bastionHostName,
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
    body: bastionShareableLinkListRequestSerializer(bslRequest),
  });
}

export async function _putBastionShareableLinkDeserialize(
  result: PathUncheckedResponse,
): Promise<_BastionShareableLinkListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _bastionShareableLinkListResultDeserializer(result.body);
}

/** Creates a Bastion Shareable Links for all the VMs specified in the request. */
export function putBastionShareableLink(
  context: Client,
  resourceGroupName: string,
  bastionHostName: string,
  bslRequest: BastionShareableLinkListRequest,
  options: PutBastionShareableLinkOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BastionShareableLink> {
  const initialPagingPoller = getLongRunningPoller(
    context,
    async (result: PathUncheckedResponse) => result,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _putBastionShareableLinkSend(
          context,
          resourceGroupName,
          bastionHostName,
          bslRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2025-05-01",
    },
  ) as PollerLike<OperationState<PathUncheckedResponse>, PathUncheckedResponse>;

  return buildPagedAsyncIterator(
    context,
    async () => await initialPagingPoller,
    _putBastionShareableLinkDeserialize,
    ["202", "200", "201"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}
