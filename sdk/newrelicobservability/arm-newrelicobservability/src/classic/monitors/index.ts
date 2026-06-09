// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import {
  resubscribe,
  linkSaaS,
  latestLinkedSaaS,
  vmHostPayload,
  listLinkedResources,
  listMonitoredResources,
  refreshIngestionKey,
  listHosts,
  switchBilling,
  listAppServices,
  getMetricStatus,
  getMetricRules,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/monitors/operations.js";
import type {
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
} from "../../api/monitors/options.js";
import type {
  MetricRules,
  NewRelicMonitorResource,
  SaaSData,
  NewRelicMonitorResourceUpdate,
  MetricsRequest,
  MetricsStatusRequest,
  MetricsStatusResponse,
  AppServicesGetRequest,
  AppServiceInfo,
  SwitchBillingRequest,
  HostsGetRequest,
  VMInfo,
  MonitoredResource,
  LinkedResource,
  VMExtensionPayload,
  LatestLinkedSaaSResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Monitors operations. */
export interface MonitorsOperations {
  /** A long-running resource action. */
  resubscribe: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsResubscribeOptionalParams,
  ) => PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
  /** Links a new SaaS to the newrelic organization of the underlying monitor. */
  linkSaaS: (
    resourceGroupName: string,
    monitorName: string,
    body: SaaSData,
    options?: MonitorsLinkSaaSOptionalParams,
  ) => PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
  /** Returns the latest SaaS linked to the newrelic organization of the underlying monitor. */
  latestLinkedSaaS: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsLatestLinkedSaaSOptionalParams,
  ) => Promise<LatestLinkedSaaSResponse>;
  /** Returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details */
  vmHostPayload: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsVmHostPayloadOptionalParams,
  ) => Promise<VMExtensionPayload>;
  /** Lists all Azure resources that are linked to the same New Relic organization as the specified monitor resource, helping you understand the scope of integration */
  listLinkedResources: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListLinkedResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<LinkedResource>;
  /** Lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup */
  listMonitoredResources: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsListMonitoredResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<MonitoredResource>;
  /** Refreshes the ingestion key for all monitors linked to the same account associated to the underlying monitor. */
  refreshIngestionKey: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsRefreshIngestionKeyOptionalParams,
  ) => Promise<void>;
  /** Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability */
  listHosts: (
    resourceGroupName: string,
    monitorName: string,
    request: HostsGetRequest,
    options?: MonitorsListHostsOptionalParams,
  ) => PagedAsyncIterableIterator<VMInfo>;
  /** Switches the billing for the New Relic Monitor resource to be billed by Azure Marketplace */
  switchBilling: (
    resourceGroupName: string,
    monitorName: string,
    request: SwitchBillingRequest,
    options?: MonitorsSwitchBillingOptionalParams,
  ) => Promise<NewRelicMonitorResource | undefined>;
  /** Lists the app service resources currently being monitored by the New Relic resource, helping you understand which app services are under monitoring */
  listAppServices: (
    resourceGroupName: string,
    monitorName: string,
    request: AppServicesGetRequest,
    options?: MonitorsListAppServicesOptionalParams,
  ) => PagedAsyncIterableIterator<AppServiceInfo>;
  /** Retrieves the metric status that are configured in the New Relic monitor resource */
  getMetricStatus: (
    resourceGroupName: string,
    monitorName: string,
    request: MetricsStatusRequest,
    options?: MonitorsGetMetricStatusOptionalParams,
  ) => Promise<MetricsStatusResponse>;
  /** Retrieves the metric rules that are configured in the New Relic monitor resource */
  getMetricRules: (
    resourceGroupName: string,
    monitorName: string,
    request: MetricsRequest,
    options?: MonitorsGetMetricRulesOptionalParams,
  ) => Promise<MetricRules>;
  /** Lists all New Relic monitor resources either within a specific subscription */
  listBySubscription: (
    options?: MonitorsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NewRelicMonitorResource>;
  /** Retrieves a list of all New Relic monitor resources either a specific resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MonitorsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NewRelicMonitorResource>;
  /** Deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic */
  delete: (
    resourceGroupName: string,
    monitorName: string,
    userEmail: string,
    options?: MonitorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing New Relic monitor resource from your Azure subscription */
  update: (
    resourceGroupName: string,
    monitorName: string,
    properties: NewRelicMonitorResourceUpdate,
    options?: MonitorsUpdateOptionalParams,
  ) => PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
  /** Creates a new or updates an existing New Relic monitor resource in your Azure subscription. This sets up the integration between Azure and your New Relic account, enabling observability and monitoring of your Azure resources through New Relic */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    resource: NewRelicMonitorResource,
    options?: MonitorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NewRelicMonitorResource>, NewRelicMonitorResource>;
  /** Retrieves the properties and configuration details of a specific New Relic monitor resource, providing insight into its setup and status */
  get: (
    resourceGroupName: string,
    monitorName: string,
    options?: MonitorsGetOptionalParams,
  ) => Promise<NewRelicMonitorResource>;
}

function _getMonitors(context: NewRelicObservabilityContext) {
  return {
    resubscribe: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsResubscribeOptionalParams,
    ) => resubscribe(context, resourceGroupName, monitorName, options),
    linkSaaS: (
      resourceGroupName: string,
      monitorName: string,
      body: SaaSData,
      options?: MonitorsLinkSaaSOptionalParams,
    ) => linkSaaS(context, resourceGroupName, monitorName, body, options),
    latestLinkedSaaS: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsLatestLinkedSaaSOptionalParams,
    ) => latestLinkedSaaS(context, resourceGroupName, monitorName, options),
    vmHostPayload: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsVmHostPayloadOptionalParams,
    ) => vmHostPayload(context, resourceGroupName, monitorName, options),
    listLinkedResources: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListLinkedResourcesOptionalParams,
    ) => listLinkedResources(context, resourceGroupName, monitorName, options),
    listMonitoredResources: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsListMonitoredResourcesOptionalParams,
    ) => listMonitoredResources(context, resourceGroupName, monitorName, options),
    refreshIngestionKey: (
      resourceGroupName: string,
      monitorName: string,
      options?: MonitorsRefreshIngestionKeyOptionalParams,
    ) => refreshIngestionKey(context, resourceGroupName, monitorName, options),
    listHosts: (
      resourceGroupName: string,
      monitorName: string,
      request: HostsGetRequest,
      options?: MonitorsListHostsOptionalParams,
    ) => listHosts(context, resourceGroupName, monitorName, request, options),
    switchBilling: (
      resourceGroupName: string,
      monitorName: string,
      request: SwitchBillingRequest,
      options?: MonitorsSwitchBillingOptionalParams,
    ) => switchBilling(context, resourceGroupName, monitorName, request, options),
    listAppServices: (
      resourceGroupName: string,
      monitorName: string,
      request: AppServicesGetRequest,
      options?: MonitorsListAppServicesOptionalParams,
    ) => listAppServices(context, resourceGroupName, monitorName, request, options),
    getMetricStatus: (
      resourceGroupName: string,
      monitorName: string,
      request: MetricsStatusRequest,
      options?: MonitorsGetMetricStatusOptionalParams,
    ) => getMetricStatus(context, resourceGroupName, monitorName, request, options),
    getMetricRules: (
      resourceGroupName: string,
      monitorName: string,
      request: MetricsRequest,
      options?: MonitorsGetMetricRulesOptionalParams,
    ) => getMetricRules(context, resourceGroupName, monitorName, request, options),
    listBySubscription: (options?: MonitorsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MonitorsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      monitorName: string,
      userEmail: string,
      options?: MonitorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, monitorName, userEmail, options),
    update: (
      resourceGroupName: string,
      monitorName: string,
      properties: NewRelicMonitorResourceUpdate,
      options?: MonitorsUpdateOptionalParams,
    ) => update(context, resourceGroupName, monitorName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      resource: NewRelicMonitorResource,
      options?: MonitorsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, resource, options),
    get: (resourceGroupName: string, monitorName: string, options?: MonitorsGetOptionalParams) =>
      get(context, resourceGroupName, monitorName, options),
  };
}

export function _getMonitorsOperations(context: NewRelicObservabilityContext): MonitorsOperations {
  return {
    ..._getMonitors(context),
  };
}
