// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MetricRules,
  metricRulesDeserializer,
  NewRelicMonitorResource,
  newRelicMonitorResourceSerializer,
  newRelicMonitorResourceDeserializer,
  SaaSData,
  saaSDataSerializer,
  NewRelicMonitorResourceUpdate,
  newRelicMonitorResourceUpdateSerializer,
  _NewRelicMonitorResourceListResult,
  _newRelicMonitorResourceListResultDeserializer,
  MetricsRequest,
  metricsRequestSerializer,
  MetricsStatusRequest,
  metricsStatusRequestSerializer,
  MetricsStatusResponse,
  metricsStatusResponseDeserializer,
  AppServicesGetRequest,
  appServicesGetRequestSerializer,
  _AppServicesListResponse,
  _appServicesListResponseDeserializer,
  AppServiceInfo,
  SwitchBillingRequest,
  switchBillingRequestSerializer,
  HostsGetRequest,
  hostsGetRequestSerializer,
  _VMHostsListResponse,
  _vmHostsListResponseDeserializer,
  VMInfo,
  _MonitoredResourceListResponse,
  _monitoredResourceListResponseDeserializer,
  MonitoredResource,
  _LinkedResourceListResponse,
  _linkedResourceListResponseDeserializer,
  LinkedResource,
  VMExtensionPayload,
  vmExtensionPayloadDeserializer,
  LatestLinkedSaaSResponse,
  latestLinkedSaaSResponseDeserializer,
  resubscribePropertiesSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MonitorsResubscribeOptionalParams,
  MonitorsLinkSaaSOptionalParams,
  MonitorsLatestLinkedSaaSOptionalParams,
  MonitorsVmHostPayloadOptionalParams,
  MonitorsListLinkedResourcesOptionalParams,
  MonitorsListMonitoredResourcesOptionalParams,
  MonitorsRefreshIngestionKeyOptionalParams,
  MonitorsListHostsOptionalParams,
  MonitorsSwitchBillingOptionalParams,
  MonitorsListAppServicesOptionalParams,
  MonitorsGetMetricStatusOptionalParams,
  MonitorsGetMetricRulesOptionalParams,
  MonitorsListBySubscriptionOptionalParams,
  MonitorsListByResourceGroupOptionalParams,
  MonitorsDeleteOptionalParams,
  MonitorsUpdateOptionalParams,
  MonitorsCreateOrUpdateOptionalParams,
  MonitorsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _resubscribeSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsResubscribeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/resubscribe{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: !options?.body ? options?.body : resubscribePropertiesSerializer(options?.body),
    });
}

export async function _resubscribeDeserialize(
  result: PathUncheckedResponse,
): Promise<NewRelicMonitorResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return newRelicMonitorResourceDeserializer(result.body);
}

/** A long-running resource action. */
export function resubscribe(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsResubscribeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource> {
  return getLongRunningPoller(context, _resubscribeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resubscribeSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-05-01-preview",
  }) as PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
}

export function _linkSaaSSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  body: SaaSData,
  options: MonitorsLinkSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/linkSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: saaSDataSerializer(body),
    });
}

export async function _linkSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<NewRelicMonitorResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return newRelicMonitorResourceDeserializer(result.body);
}

/** Links a new SaaS to the newrelic organization of the underlying monitor. */
export function linkSaaS(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  body: SaaSData,
  options: MonitorsLinkSaaSOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource> {
  return getLongRunningPoller(context, _linkSaaSDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _linkSaaSSend(context, resourceGroupName, monitorName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-05-01-preview",
  }) as PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
}

export function _latestLinkedSaaSSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/latestLinkedSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _latestLinkedSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<LatestLinkedSaaSResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return latestLinkedSaaSResponseDeserializer(result.body);
}

/** Returns the latest SaaS linked to the newrelic organization of the underlying monitor. */
export async function latestLinkedSaaS(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): Promise<LatestLinkedSaaSResponse> {
  const result = await _latestLinkedSaaSSend(context, resourceGroupName, monitorName, options);
  return _latestLinkedSaaSDeserialize(result);
}

export function _vmHostPayloadSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsVmHostPayloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/vmHostPayloads{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _vmHostPayloadDeserialize(
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

/** Returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details */
export async function vmHostPayload(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsVmHostPayloadOptionalParams = { requestOptions: {} },
): Promise<VMExtensionPayload> {
  const result = await _vmHostPayloadSend(context, resourceGroupName, monitorName, options);
  return _vmHostPayloadDeserialize(result);
}

export function _listLinkedResourcesSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListLinkedResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/listLinkedResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listLinkedResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_LinkedResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _linkedResourceListResponseDeserializer(result.body);
}

/** Lists all Azure resources that are linked to the same New Relic organization as the specified monitor resource, helping you understand the scope of integration */
export function listLinkedResources(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListLinkedResourcesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LinkedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listLinkedResourcesSend(context, resourceGroupName, monitorName, options),
    _listLinkedResourcesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}

export function _listMonitoredResourcesSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsListMonitoredResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/monitoredResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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

/** Lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup */
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
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}

export function _refreshIngestionKeySend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsRefreshIngestionKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/refreshIngestionKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshIngestionKeyDeserialize(
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

/** Refreshes the ingestion key for all monitors linked to the same account associated to the underlying monitor. */
export async function refreshIngestionKey(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsRefreshIngestionKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _refreshIngestionKeySend(context, resourceGroupName, monitorName, options);
  return _refreshIngestionKeyDeserialize(result);
}

export function _listHostsSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: HostsGetRequest,
  options: MonitorsListHostsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/listHosts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: hostsGetRequestSerializer(request),
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

/** Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability */
export function listHosts(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: HostsGetRequest,
  options: MonitorsListHostsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VMInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listHostsSend(context, resourceGroupName, monitorName, request, options),
    _listHostsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}

export function _switchBillingSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: SwitchBillingRequest,
  options: MonitorsSwitchBillingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/switchBilling{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: switchBillingRequestSerializer(request),
    });
}

export async function _switchBillingDeserialize(
  result: PathUncheckedResponse,
): Promise<NewRelicMonitorResource | undefined> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? newRelicMonitorResourceDeserializer(result.body) : undefined;
}

/** Switches the billing for the New Relic Monitor resource to be billed by Azure Marketplace */
export async function switchBilling(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: SwitchBillingRequest,
  options: MonitorsSwitchBillingOptionalParams = { requestOptions: {} },
): Promise<NewRelicMonitorResource | undefined> {
  const result = await _switchBillingSend(
    context,
    resourceGroupName,
    monitorName,
    request,
    options,
  );
  return _switchBillingDeserialize(result);
}

export function _listAppServicesSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: AppServicesGetRequest,
  options: MonitorsListAppServicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/listAppServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: appServicesGetRequestSerializer(request),
    });
}

export async function _listAppServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AppServicesListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _appServicesListResponseDeserializer(result.body);
}

/** Lists the app service resources currently being monitored by the New Relic resource, helping you understand which app services are under monitoring */
export function listAppServices(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: AppServicesGetRequest,
  options: MonitorsListAppServicesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServiceInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listAppServicesSend(context, resourceGroupName, monitorName, request, options),
    _listAppServicesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}

export function _getMetricStatusSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: MetricsStatusRequest,
  options: MonitorsGetMetricStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/getMetricStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: metricsStatusRequestSerializer(request),
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

/** Retrieves the metric status that are configured in the New Relic monitor resource */
export async function getMetricStatus(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: MetricsStatusRequest,
  options: MonitorsGetMetricStatusOptionalParams = { requestOptions: {} },
): Promise<MetricsStatusResponse> {
  const result = await _getMetricStatusSend(
    context,
    resourceGroupName,
    monitorName,
    request,
    options,
  );
  return _getMetricStatusDeserialize(result);
}

export function _getMetricRulesSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: MetricsRequest,
  options: MonitorsGetMetricRulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/getMetricRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: metricsRequestSerializer(request),
    });
}

export async function _getMetricRulesDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricRules> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricRulesDeserializer(result.body);
}

/** Retrieves the metric rules that are configured in the New Relic monitor resource */
export async function getMetricRules(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  request: MetricsRequest,
  options: MonitorsGetMetricRulesOptionalParams = { requestOptions: {} },
): Promise<MetricRules> {
  const result = await _getMetricRulesSend(
    context,
    resourceGroupName,
    monitorName,
    request,
    options,
  );
  return _getMetricRulesDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: MonitorsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/NewRelic.Observability/monitors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_NewRelicMonitorResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _newRelicMonitorResourceListResultDeserializer(result.body);
}

/** Lists all New Relic monitor resources either within a specific subscription */
export function listBySubscription(
  context: Client,
  options: MonitorsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NewRelicMonitorResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MonitorsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NewRelicMonitorResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _newRelicMonitorResourceListResultDeserializer(result.body);
}

/** Retrieves a list of all New Relic monitor resources either a specific resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MonitorsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NewRelicMonitorResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  userEmail: string,
  options: MonitorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}{?api%2Dversion,userEmail}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
      userEmail: userEmail,
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic */
export function $delete(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  userEmail: string,
  options: MonitorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, monitorName, userEmail, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  properties: NewRelicMonitorResourceUpdate,
  options: MonitorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: newRelicMonitorResourceUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NewRelicMonitorResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return newRelicMonitorResourceDeserializer(result.body);
}

/** Updates an existing New Relic monitor resource from your Azure subscription */
export function update(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  properties: NewRelicMonitorResourceUpdate,
  options: MonitorsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, monitorName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01-preview",
  }) as PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  resource: NewRelicMonitorResource,
  options: MonitorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: newRelicMonitorResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NewRelicMonitorResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return newRelicMonitorResourceDeserializer(result.body);
}

/** Creates a new or updates an existing New Relic monitor resource in your Azure subscription. This sets up the integration between Azure and your New Relic account, enabling observability and monitoring of your Azure resources through New Relic */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  resource: NewRelicMonitorResource,
  options: MonitorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, monitorName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-05-01-preview",
  }) as PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
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
): Promise<NewRelicMonitorResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return newRelicMonitorResourceDeserializer(result.body);
}

/** Retrieves the properties and configuration details of a specific New Relic monitor resource, providing insight into its setup and status */
export async function get(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorsGetOptionalParams = { requestOptions: {} },
): Promise<NewRelicMonitorResource> {
  const result = await _getSend(context, resourceGroupName, monitorName, options);
  return _getDeserialize(result);
}
