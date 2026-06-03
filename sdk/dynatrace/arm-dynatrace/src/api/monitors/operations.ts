// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ObservabilityContext as Client } from "../index.js";
import type {
  MonitorResource,
  MonitorResourceUpdate,
  _MonitorResourceListResult,
  _MonitoredResourceListResponse,
  MonitoredResource,
  VMExtensionPayload,
  ManageAgentInstallationRequest,
  _VMHostsListResponse,
  VMInfo,
  MetricsStatusResponse,
  _AppServiceListResponse,
  AppServiceInfo,
  UpgradePlanRequest,
  SSODetailsResponse,
  LinkableEnvironmentRequest,
  _LinkableEnvironmentListResponse,
  LinkableEnvironmentResponse,
  MarketplaceSubscriptionIdRequest,
  ConnectedResourcesCountResponse,
  MarketplaceSaaSResourceDetailsRequest,
  MarketplaceSaaSResourceDetailsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  monitorResourceSerializer,
  monitorResourceDeserializer,
  monitorResourceUpdateSerializer,
  _monitorResourceListResultDeserializer,
  logStatusRequestSerializer,
  _monitoredResourceListResponseDeserializer,
  vmExtensionPayloadDeserializer,
  manageAgentInstallationRequestSerializer,
  _vmHostsListResponseDeserializer,
  metricStatusRequestSerializer,
  metricsStatusResponseDeserializer,
  _appServiceListResponseDeserializer,
  upgradePlanRequestSerializer,
  ssoDetailsRequestSerializer,
  ssoDetailsResponseDeserializer,
  linkableEnvironmentRequestSerializer,
  _linkableEnvironmentListResponseDeserializer,
  marketplaceSubscriptionIdRequestSerializer,
  connectedResourcesCountResponseDeserializer,
  marketplaceSaaSResourceDetailsRequestSerializer,
  marketplaceSaaSResourceDetailsResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams,
  MonitorsGetAllConnectedResourcesCountOptionalParams,
  MonitorsListLinkableEnvironmentsOptionalParams,
  MonitorsGetSSODetailsOptionalParams,
  MonitorsUpgradePlanOptionalParams,
  MonitorsListAppServicesOptionalParams,
  MonitorsGetMetricStatusOptionalParams,
  MonitorsListHostsOptionalParams,
  MonitorsManageAgentInstallationOptionalParams,
  MonitorsGetVMHostPayloadOptionalParams,
  MonitorsListMonitoredResourcesOptionalParams,
  MonitorsListBySubscriptionIdOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOrUpdateOptionalParams,
  MonitorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getMarketplaceSaaSResourceDetailsSend(
  context: Client,
  request: MarketplaceSaaSResourceDetailsRequest,
  options: MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Dynatrace.Observability/getMarketplaceSaaSResourceDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: marketplaceSaaSResourceDetailsRequestSerializer(request),
  });
}

export async function _getMarketplaceSaaSResourceDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<MarketplaceSaaSResourceDetailsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return marketplaceSaaSResourceDetailsResponseDeserializer(result.body);
}

/** Get Marketplace SaaS resource details */
export async function getMarketplaceSaaSResourceDetails(
  context: Client,
  request: MarketplaceSaaSResourceDetailsRequest,
  options: MonitorsGetMarketplaceSaaSResourceDetailsOptionalParams = { requestOptions: {} },
): Promise<MarketplaceSaaSResourceDetailsResponse> {
  const result = await _getMarketplaceSaaSResourceDetailsSend(context, request, options);
  return _getMarketplaceSaaSResourceDetailsDeserialize(result);
}

export function _getAllConnectedResourcesCountSend(
  context: Client,
  request: MarketplaceSubscriptionIdRequest,
  options: MonitorsGetAllConnectedResourcesCountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Dynatrace.Observability/getAllConnectedResourcesCount{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: marketplaceSubscriptionIdRequestSerializer(request),
  });
}

export async function _getAllConnectedResourcesCountDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedResourcesCountResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectedResourcesCountResponseDeserializer(result.body);
}

/** Get the total number of connected resources for the given marketplace subscription Id */
export async function getAllConnectedResourcesCount(
  context: Client,
  request: MarketplaceSubscriptionIdRequest,
  options: MonitorsGetAllConnectedResourcesCountOptionalParams = { requestOptions: {} },
): Promise<ConnectedResourcesCountResponse> {
  const result = await _getAllConnectedResourcesCountSend(context, request, options);
  return _getAllConnectedResourcesCountDeserialize(result);
}

export function _listLinkableEnvironmentsSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: LinkableEnvironmentRequest,
  options: MonitorsListLinkableEnvironmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/listLinkableEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: linkableEnvironmentRequestSerializer(request),
  });
}

export async function _listLinkableEnvironmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_LinkableEnvironmentListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _linkableEnvironmentListResponseDeserializer(result.body);
}

/** Gets all the Dynatrace environments that a user can link a azure resource to */
export function listLinkableEnvironments(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: LinkableEnvironmentRequest,
  options: MonitorsListLinkableEnvironmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LinkableEnvironmentResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listLinkableEnvironmentsSend(context, resourceGroupName, monitorName, request, options),
    _listLinkableEnvironmentsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-24" },
  );
}

export function _getSSODetailsSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetSSODetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/getSSODetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.request ? options?.request : ssoDetailsRequestSerializer(options?.request),
  });
}

export async function _getSSODetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SSODetailsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ssoDetailsResponseDeserializer(result.body);
}

/** Gets the SSO configuration details from the partner. */
export async function getSSODetails(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetSSODetailsOptionalParams = { requestOptions: {} },
): Promise<SSODetailsResponse> {
  const result = await _getSSODetailsSend(context, resourceGroupName, monitorName, options);
  return _getSSODetailsDeserialize(result);
}

export function _upgradePlanSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: UpgradePlanRequest,
  options: MonitorsUpgradePlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/upgradePlan{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: upgradePlanRequestSerializer(request),
  });
}

export async function _upgradePlanDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Upgrades the billing Plan for Dynatrace monitor resource. */
export function upgradePlan(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: UpgradePlanRequest,
  options: MonitorsUpgradePlanOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _upgradePlanDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradePlanSend(context, resourceGroupName, monitorName, request, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-24",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listAppServicesSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListAppServicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/listAppServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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

export async function _listAppServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AppServiceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _appServiceListResponseDeserializer(result.body);
}

/** Gets list of App Services with Dynatrace PaaS OneAgent enabled */
export function listAppServices(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListAppServicesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServiceInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listAppServicesSend(context, resourceGroupName, monitorName, options),
    _listAppServicesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-24" },
  );
}

export function _getMetricStatusSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetMetricStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/getMetricStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.request ? options?.request : metricStatusRequestSerializer(options?.request),
  });
}

export async function _getMetricStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricsStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricsStatusResponseDeserializer(result.body);
}

/** Get metric status */
export async function getMetricStatus(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetMetricStatusOptionalParams = { requestOptions: {} },
): Promise<MetricsStatusResponse> {
  const result = await _getMetricStatusSend(context, resourceGroupName, monitorName, options);
  return _getMetricStatusDeserialize(result);
}

export function _listHostsSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListHostsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/listHosts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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

export async function _listHostsDeserialize(
  result: PathUncheckedResponse,
): Promise<_VMHostsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _vmHostsListResponseDeserializer(result.body);
}

/** List the VM/VMSS resources currently being monitored by the Dynatrace resource. */
export function listHosts(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListHostsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VMInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listHostsSend(context, resourceGroupName, monitorName, options),
    _listHostsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-24" },
  );
}

export function _manageAgentInstallationSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: ManageAgentInstallationRequest,
  options: MonitorsManageAgentInstallationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/manageAgentInstallation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: manageAgentInstallationRequestSerializer(request),
  });
}

export async function _manageAgentInstallationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources. */
export async function manageAgentInstallation(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: ManageAgentInstallationRequest,
  options: MonitorsManageAgentInstallationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _manageAgentInstallationSend(
    context,
    resourceGroupName,
    monitorName,
    request,
    options,
  );
  return _manageAgentInstallationDeserialize(result);
}

export function _getVMHostPayloadSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetVMHostPayloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/getVMHostPayload{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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

export async function _getVMHostPayloadDeserialize(
  result: PathUncheckedResponse,
): Promise<VMExtensionPayload> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return vmExtensionPayloadDeserializer(result.body);
}

/** Returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM. */
export async function getVMHostPayload(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetVMHostPayloadOptionalParams = { requestOptions: {} },
): Promise<VMExtensionPayload> {
  const result = await _getVMHostPayloadSend(context, resourceGroupName, monitorName, options);
  return _getVMHostPayloadDeserialize(result);
}

export function _listMonitoredResourcesSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListMonitoredResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/listMonitoredResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.request ? options?.request : logStatusRequestSerializer(options?.request),
  });
}

export async function _listMonitoredResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_MonitoredResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _monitoredResourceListResponseDeserializer(result.body);
}

/** List the resources currently being monitored by the Dynatrace monitor resource. */
export function listMonitoredResources(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListMonitoredResourcesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitoredResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listMonitoredResourcesSend(context, resourceGroupName, monitorName, options),
    _listMonitoredResourcesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-24" },
  );
}

export function _listBySubscriptionIdSend(
  context: Client,
  options: MonitorsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Dynatrace.Observability/monitors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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

export async function _listBySubscriptionIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_MonitorResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _monitorResourceListResultDeserializer(result.body);
}

/** List all MonitorResource by subscriptionId */
export function listBySubscriptionId(
  context: Client,
  options: MonitorsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitorResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdSend(context, options),
    _listBySubscriptionIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-24" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MonitorsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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
): Promise<_MonitorResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _monitorResourceListResultDeserializer(result.body);
}

/** List MonitorResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MonitorsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitorResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-24" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a MonitorResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-24",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  resource: MonitorResourceUpdate,
  options: MonitorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: monitorResourceUpdateSerializer(resource),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<MonitorResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorResourceDeserializer(result.body);
}

/** Update a MonitorResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  resource: MonitorResourceUpdate,
  options: MonitorsUpdateOptionalParams = { requestOptions: {} },
): Promise<MonitorResource> {
  const result = await _updateSend(context, resourceGroupName, monitorName, resource, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  resource: MonitorResource,
  options: MonitorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: monitorResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MonitorResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorResourceDeserializer(result.body);
}

/** Create a MonitorResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  resource: MonitorResource,
  options: MonitorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MonitorResource>, MonitorResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, monitorName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-24",
  }) as PollerLike<OperationState<MonitorResource>, MonitorResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2024-04-24",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MonitorResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorResourceDeserializer(result.body);
}

/** Get a MonitorResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetOptionalParams = { requestOptions: {} },
): Promise<MonitorResource> {
  const result = await _getSend(context, resourceGroupName, monitorName, options);
  return _getDeserialize(result);
}
