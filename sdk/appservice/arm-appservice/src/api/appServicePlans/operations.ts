// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  Capability,
  _WebAppCollection,
  Site,
  Operation,
  _AppServicePlanCollection,
  AppServicePlan,
  _CsmUsageQuotaCollection,
  CsmUsageQuota,
  HybridConnection,
  VnetInfoResource,
  VnetRoute,
  VnetGateway,
  ServerFarmRdpDetails,
  ServerFarmInstanceDetails,
  AppServicePlanPatchResource,
  _HybridConnectionCollection,
  HybridConnectionKey,
  _ResourceCollection,
  HybridConnectionLimits,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  capabilityArrayDeserializer,
  _webAppCollectionDeserializer,
  operationDeserializer,
  _appServicePlanCollectionDeserializer,
  appServicePlanSerializer,
  appServicePlanDeserializer,
  _csmUsageQuotaCollectionDeserializer,
  hybridConnectionDeserializer,
  vnetInfoResourceDeserializer,
  vnetRouteArrayDeserializer,
  vnetRouteSerializer,
  vnetRouteDeserializer,
  vnetGatewaySerializer,
  vnetGatewayDeserializer,
  serverFarmRdpDetailsDeserializer,
  serverFarmInstanceDetailsDeserializer,
  appServicePlanPatchResourceSerializer,
  _hybridConnectionCollectionDeserializer,
  hybridConnectionKeyDeserializer,
  _resourceCollectionDeserializer,
  hybridConnectionLimitsDeserializer,
  vnetInfoResourceArrayDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AppServicePlansListRoutesForVnetOptionalParams,
  AppServicePlansDeleteVnetRouteOptionalParams,
  AppServicePlansUpdateVnetRouteOptionalParams,
  AppServicePlansCreateOrUpdateVnetRouteOptionalParams,
  AppServicePlansGetRouteForVnetOptionalParams,
  AppServicePlansUpdateVnetGatewayOptionalParams,
  AppServicePlansGetVnetGatewayOptionalParams,
  AppServicePlansListVnetsOptionalParams,
  AppServicePlansGetVnetFromServerFarmOptionalParams,
  AppServicePlansGetHybridConnectionPlanLimitOptionalParams,
  AppServicePlansListWebAppsByHybridConnectionOptionalParams,
  AppServicePlansListHybridConnectionKeysOptionalParams,
  AppServicePlansDeleteHybridConnectionOptionalParams,
  AppServicePlansGetHybridConnectionOptionalParams,
  AppServicePlansRebootWorkerOptionalParams,
  AppServicePlansListUsagesOptionalParams,
  AppServicePlansGetServerFarmSkusOptionalParams,
  AppServicePlansListWebAppsOptionalParams,
  AppServicePlansRestartWebAppsOptionalParams,
  AppServicePlansListHybridConnectionsOptionalParams,
  AppServicePlansListCapabilitiesOptionalParams,
  AppServicePlansListOptionalParams,
  AppServicePlansListByResourceGroupOptionalParams,
  AppServicePlansDeleteOptionalParams,
  AppServicePlansUpdateOptionalParams,
  AppServicePlansCreateOrUpdateOptionalParams,
  AppServicePlansGetOptionalParams,
  AppServicePlansGetServerFarmInstanceDetailsOptionalParams,
  AppServicePlansRecycleManagedInstanceWorkerOptionalParams,
  AppServicePlansGetServerFarmRdpPasswordOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listRoutesForVnetSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: AppServicePlansListRoutesForVnetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listRoutesForVnetDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetRoute[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetRouteArrayDeserializer(result.body);
}

/** Description for Get all routes that are associated with a Virtual Network in an App Service plan. */
export async function listRoutesForVnet(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: AppServicePlansListRoutesForVnetOptionalParams = { requestOptions: {} },
): Promise<VnetRoute[]> {
  const result = await _listRoutesForVnetSend(context, resourceGroupName, name, vnetName, options);
  return _listRoutesForVnetDeserialize(result);
}

export function _deleteVnetRouteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  options: AppServicePlansDeleteVnetRouteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteVnetRouteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Delete a Virtual Network route in an App Service plan. */
export async function deleteVnetRoute(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  options: AppServicePlansDeleteVnetRouteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVnetRouteSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    routeName,
    options,
  );
  return _deleteVnetRouteDeserialize(result);
}

export function _updateVnetRouteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  route: VnetRoute,
  options: AppServicePlansUpdateVnetRouteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetRouteSerializer(route),
  });
}

export async function _updateVnetRouteDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetRoute> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetRouteDeserializer(result.body);
}

/** Description for Create or update a Virtual Network route in an App Service plan. */
export async function updateVnetRoute(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  route: VnetRoute,
  options: AppServicePlansUpdateVnetRouteOptionalParams = { requestOptions: {} },
): Promise<VnetRoute> {
  const result = await _updateVnetRouteSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    routeName,
    route,
    options,
  );
  return _updateVnetRouteDeserialize(result);
}

export function _createOrUpdateVnetRouteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  route: VnetRoute,
  options: AppServicePlansCreateOrUpdateVnetRouteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetRouteSerializer(route),
  });
}

export async function _createOrUpdateVnetRouteDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetRoute> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetRouteDeserializer(result.body);
}

/** Description for Create or update a Virtual Network route in an App Service plan. */
export async function createOrUpdateVnetRoute(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  route: VnetRoute,
  options: AppServicePlansCreateOrUpdateVnetRouteOptionalParams = { requestOptions: {} },
): Promise<VnetRoute> {
  const result = await _createOrUpdateVnetRouteSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    routeName,
    route,
    options,
  );
  return _createOrUpdateVnetRouteDeserialize(result);
}

export function _getRouteForVnetSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  options: AppServicePlansGetRouteForVnetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      routeName: routeName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getRouteForVnetDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetRoute[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetRouteArrayDeserializer(result.body);
}

/** Description for Get a Virtual Network route in an App Service plan. */
export async function getRouteForVnet(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  routeName: string,
  options: AppServicePlansGetRouteForVnetOptionalParams = { requestOptions: {} },
): Promise<VnetRoute[]> {
  const result = await _getRouteForVnetSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    routeName,
    options,
  );
  return _getRouteForVnetDeserialize(result);
}

export function _updateVnetGatewaySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  connectionEnvelope: VnetGateway,
  options: AppServicePlansUpdateVnetGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vnetGatewaySerializer(connectionEnvelope),
  });
}

export async function _updateVnetGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Update a Virtual Network gateway. */
export async function updateVnetGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  connectionEnvelope: VnetGateway,
  options: AppServicePlansUpdateVnetGatewayOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _updateVnetGatewaySend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    connectionEnvelope,
    options,
  );
  return _updateVnetGatewayDeserialize(result);
}

export function _getVnetGatewaySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  options: AppServicePlansGetVnetGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      gatewayName: gatewayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getVnetGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetGatewayDeserializer(result.body);
}

/** Description for Get a Virtual Network gateway. */
export async function getVnetGateway(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  gatewayName: string,
  options: AppServicePlansGetVnetGatewayOptionalParams = { requestOptions: {} },
): Promise<VnetGateway> {
  const result = await _getVnetGatewaySend(
    context,
    resourceGroupName,
    name,
    vnetName,
    gatewayName,
    options,
  );
  return _getVnetGatewayDeserialize(result);
}

export function _listVnetsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListVnetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listVnetsDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetInfoResourceArrayDeserializer(result.body);
}

/** Description for Get all Virtual Networks associated with an App Service plan. */
export async function listVnets(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListVnetsOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource[]> {
  const result = await _listVnetsSend(context, resourceGroupName, name, options);
  return _listVnetsDeserialize(result);
}

export function _getVnetFromServerFarmSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: AppServicePlansGetVnetFromServerFarmOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      vnetName: vnetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getVnetFromServerFarmDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetInfoResourceDeserializer(result.body);
}

/** Description for Get a Virtual Network associated with an App Service plan. */
export async function getVnetFromServerFarm(
  context: Client,
  resourceGroupName: string,
  name: string,
  vnetName: string,
  options: AppServicePlansGetVnetFromServerFarmOptionalParams = { requestOptions: {} },
): Promise<VnetInfoResource> {
  const result = await _getVnetFromServerFarmSend(
    context,
    resourceGroupName,
    name,
    vnetName,
    options,
  );
  return _getVnetFromServerFarmDeserialize(result);
}

export function _getHybridConnectionPlanLimitSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetHybridConnectionPlanLimitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionPlanLimits/limit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getHybridConnectionPlanLimitDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnectionLimits> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return hybridConnectionLimitsDeserializer(result.body);
}

/** Description for Get the maximum number of Hybrid Connections allowed in an App Service plan. */
export async function getHybridConnectionPlanLimit(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetHybridConnectionPlanLimitOptionalParams = { requestOptions: {} },
): Promise<HybridConnectionLimits> {
  const result = await _getHybridConnectionPlanLimitSend(context, resourceGroupName, name, options);
  return _getHybridConnectionPlanLimitDeserialize(result);
}

export function _listWebAppsByHybridConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansListWebAppsByHybridConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}/sites{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listWebAppsByHybridConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _resourceCollectionDeserializer(result.body);
}

/** Description for Get all apps that use a Hybrid Connection in an App Service Plan. */
export function listWebAppsByHybridConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansListWebAppsByHybridConnectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listWebAppsByHybridConnectionSend(
        context,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options,
      ),
    _listWebAppsByHybridConnectionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listHybridConnectionKeysSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansListHybridConnectionKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listHybridConnectionKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnectionKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return hybridConnectionKeyDeserializer(result.body);
}

/** Description for Get the send key name and value of a Hybrid Connection. */
export async function listHybridConnectionKeys(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansListHybridConnectionKeysOptionalParams = { requestOptions: {} },
): Promise<HybridConnectionKey> {
  const result = await _listHybridConnectionKeysSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    options,
  );
  return _listHybridConnectionKeysDeserialize(result);
}

export function _deleteHybridConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansDeleteHybridConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteHybridConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Delete a Hybrid Connection in use in an App Service plan. */
export async function deleteHybridConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansDeleteHybridConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteHybridConnectionSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    options,
  );
  return _deleteHybridConnectionDeserialize(result);
}

export function _getHybridConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansGetHybridConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      namespaceName: namespaceName,
      relayName: relayName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getHybridConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return hybridConnectionDeserializer(result.body);
}

/** Description for Retrieve a Hybrid Connection in use in an App Service plan. */
export async function getHybridConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  namespaceName: string,
  relayName: string,
  options: AppServicePlansGetHybridConnectionOptionalParams = { requestOptions: {} },
): Promise<HybridConnection> {
  const result = await _getHybridConnectionSend(
    context,
    resourceGroupName,
    name,
    namespaceName,
    relayName,
    options,
  );
  return _getHybridConnectionDeserialize(result);
}

export function _rebootWorkerSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerName: string,
  options: AppServicePlansRebootWorkerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/serverfarms/{name}/workers/{workerName}/reboot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerName: workerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _rebootWorkerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Reboot a worker machine in an App Service plan. */
export async function rebootWorker(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerName: string,
  options: AppServicePlansRebootWorkerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _rebootWorkerSend(context, resourceGroupName, name, workerName, options);
  return _rebootWorkerDeserialize(result);
}

export function _listUsagesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/usages{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24filter": options?.filter,
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

export async function _listUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmUsageQuotaCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _csmUsageQuotaCollectionDeserializer(result.body);
}

/** Description for Gets server farm usage information */
export function listUsages(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmUsageQuota> {
  return buildPagedAsyncIterator(
    context,
    () => _listUsagesSend(context, resourceGroupName, name, options),
    _listUsagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getServerFarmSkusSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetServerFarmSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getServerFarmSkusDeserialize(result: PathUncheckedResponse): Promise<any> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return result.body;
}

/** Description for Gets all selectable SKUs for a given App Service Plan */
export async function getServerFarmSkus(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetServerFarmSkusOptionalParams = { requestOptions: {} },
): Promise<any> {
  const result = await _getServerFarmSkusSend(context, resourceGroupName, name, options);
  return _getServerFarmSkusDeserialize(result);
}

export function _listWebAppsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListWebAppsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/sites{?api%2Dversion,%24skipToken,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      "%24skipToken": options?.skipToken,
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listWebAppsDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebAppCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _webAppCollectionDeserializer(result.body);
}

/** Description for Get all apps associated with an App Service plan. */
export function listWebApps(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListWebAppsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Site> {
  return buildPagedAsyncIterator(
    context,
    () => _listWebAppsSend(context, resourceGroupName, name, options),
    _listWebAppsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _restartWebAppsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansRestartWebAppsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/restartSites{?api%2Dversion,softRestart}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      softRestart: options?.softRestart,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartWebAppsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Restart all apps in an App Service plan. */
export async function restartWebApps(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansRestartWebAppsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _restartWebAppsSend(context, resourceGroupName, name, options);
  return _restartWebAppsDeserialize(result);
}

export function _listHybridConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListHybridConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionRelays{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listHybridConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_HybridConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _hybridConnectionCollectionDeserializer(result.body);
}

/** Description for Retrieve all Hybrid Connections in use in an App Service plan. */
export function listHybridConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListHybridConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HybridConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listHybridConnectionsSend(context, resourceGroupName, name, options),
    _listHybridConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listCapabilitiesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/capabilities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<Capability[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return capabilityArrayDeserializer(result.body);
}

/** Description for List all capabilities of an App Service plan. */
export async function listCapabilities(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansListCapabilitiesOptionalParams = { requestOptions: {} },
): Promise<Capability[]> {
  const result = await _listCapabilitiesSend(context, resourceGroupName, name, options);
  return _listCapabilitiesDeserialize(result);
}

export function _listSend(
  context: Client,
  options: AppServicePlansListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/serverfarms{?api%2Dversion,detailed}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      detailed: options?.detailed,
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
): Promise<_AppServicePlanCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _appServicePlanCollectionDeserializer(result.body);
}

/** Description for Get all App Service plans for a subscription. */
export function list(
  context: Client,
  options: AppServicePlansListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServicePlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AppServicePlansListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
): Promise<_AppServicePlanCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _appServicePlanCollectionDeserializer(result.body);
}

/** Description for Get all App Service plans in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AppServicePlansListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServicePlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Delete an App Service plan. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  appServicePlan: AppServicePlanPatchResource,
  options: AppServicePlansUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServicePlanPatchResourceSerializer(appServicePlan),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AppServicePlan> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServicePlanDeserializer(result.body);
}

/** Description for Creates or updates an App Service Plan. */
export async function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  appServicePlan: AppServicePlanPatchResource,
  options: AppServicePlansUpdateOptionalParams = { requestOptions: {} },
): Promise<AppServicePlan> {
  const result = await _updateSend(context, resourceGroupName, name, appServicePlan, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  appServicePlan: AppServicePlan,
  options: AppServicePlansCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServicePlanSerializer(appServicePlan),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServicePlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServicePlanDeserializer(result.body);
}

/** Description for Creates or updates an App Service Plan. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  appServicePlan: AppServicePlan,
  options: AppServicePlansCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AppServicePlan>, AppServicePlan> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, name, appServicePlan, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<AppServicePlan>, AppServicePlan>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AppServicePlan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServicePlanDeserializer(result.body);
}

/** Description for Get an App Service plan. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetOptionalParams = { requestOptions: {} },
): Promise<AppServicePlan> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}

export function _getServerFarmInstanceDetailsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetServerFarmInstanceDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/listinstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getServerFarmInstanceDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerFarmInstanceDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return serverFarmInstanceDetailsDeserializer(result.body);
}

/** Description for Get the instance details for an app service plan. */
export async function getServerFarmInstanceDetails(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetServerFarmInstanceDetailsOptionalParams = { requestOptions: {} },
): Promise<ServerFarmInstanceDetails> {
  const result = await _getServerFarmInstanceDetailsSend(context, resourceGroupName, name, options);
  return _getServerFarmInstanceDetailsDeserialize(result);
}

export function _recycleManagedInstanceWorkerSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerName: string,
  options: AppServicePlansRecycleManagedInstanceWorkerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/serverfarms/{name}/workers/{workerName}/recycleinstance{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workerName: workerName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _recycleManagedInstanceWorkerDeserialize(
  result: PathUncheckedResponse,
): Promise<Operation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return operationDeserializer(result.body);
}

/** Description for Recycles a managed instance worker machine. */
export async function recycleManagedInstanceWorker(
  context: Client,
  resourceGroupName: string,
  name: string,
  workerName: string,
  options: AppServicePlansRecycleManagedInstanceWorkerOptionalParams = { requestOptions: {} },
): Promise<Operation> {
  const result = await _recycleManagedInstanceWorkerSend(
    context,
    resourceGroupName,
    name,
    workerName,
    options,
  );
  return _recycleManagedInstanceWorkerDeserialize(result);
}

export function _getServerFarmRdpPasswordSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetServerFarmRdpPasswordOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/getrdppassword{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getServerFarmRdpPasswordDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerFarmRdpDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return serverFarmRdpDetailsDeserializer(result.body);
}

/** Description for Get the RDP password for an IsCustomMode ServerFarm. */
export async function getServerFarmRdpPassword(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServicePlansGetServerFarmRdpPasswordOptionalParams = { requestOptions: {} },
): Promise<ServerFarmRdpDetails> {
  const result = await _getServerFarmRdpPasswordSend(context, resourceGroupName, name, options);
  return _getServerFarmRdpPasswordDeserialize(result);
}
